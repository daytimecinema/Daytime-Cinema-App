import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { FILMS, Film, filmById, registerFilms } from '../data/catalog';
import { todayKey, MATINEE_PRICE } from '../data/theaters';
import { MAX_GUESSES, puzzleForDate } from '../data/frames';
import { PACK_COST, PACK_SIZE, REWARDS } from '../data/rewards';

export interface LedgerEntry {
  id: string;
  ts: number;
  label: string;
  delta: number;
}

export interface Ticket {
  id: string;
  filmId: string;
  theaterName: string;
  date: string;
  time: string;
  seats: string[];
  total: number;
}

export interface Stub {
  id: string;
  fileName: string;
  theater: string;
  ts: number;
  status: 'verified';
}

export interface FrameDay {
  guesses: string[]; // film ids guessed
  solved: boolean;
}

interface ClubState {
  points: number;
  ledger: LedgerEntry[];
  queue: string[];
  watched: string[];
  collection: Record<string, number>;
  tickets: Ticket[];
  stubs: Stub[];
  frame: Record<string, FrameDay>;
  redeemed: string[]; // reward ids, repeats allowed
  streak: number;
  lastVisit: string;
  customFilms: Film[]; // added via TMDB search or Letterboxd import
}

const FRESH: ClubState = {
  points: 250, // welcome bonus
  ledger: [{ id: 'welcome', ts: Date.now(), label: 'Welcome to the club! 🎉', delta: 250 }],
  queue: [],
  watched: [],
  collection: {},
  tickets: [],
  stubs: [],
  frame: {},
  redeemed: [],
  streak: 1,
  lastVisit: todayKey(),
  customFilms: [],
};

const KEY = 'matinee-film-club-v1';

function load(): ClubState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return FRESH;
    const state = { ...FRESH, ...(JSON.parse(raw) as ClubState) };
    registerFilms(state.customFilms);
    return state;
  } catch {
    return FRESH;
  }
}

let idCounter = 0;
const uid = () => `${Date.now().toString(36)}-${(idCounter++).toString(36)}`;

export interface ClubApi extends ClubState {
  today: string;
  earn(label: string, delta: number): void;
  spend(label: string, cost: number): boolean;
  enqueue(filmId: string): void;
  dequeue(filmId: string): void;
  logWatch(filmId: string): Film; // returns card earned
  buyTicket(args: { filmId: string; theaterName: string; time: string; seats: string[] }): Ticket;
  uploadStub(fileName: string, theater: string): void;
  guessFrame(filmId: string): void;
  openPack(): Film[] | null;
  redeem(rewardId: string): boolean;
  addCustomFilm(film: Film): void;
  importLetterboxd(entries: { name: string; year: number }[], mode: 'queue' | 'watched'): number;
  resetAll(): void;
}

const Ctx = createContext<ClubApi | null>(null);

export function ClubProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ClubState>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  // Daily check-in streak.
  useEffect(() => {
    const today = todayKey();
    setState((s) => {
      if (s.lastVisit === today) return s;
      const yesterday = todayKey(new Date(Date.now() - 86400000));
      const streak = s.lastVisit === yesterday ? s.streak + 1 : 1;
      const bonus = 10 * streak;
      return {
        ...s,
        streak,
        lastVisit: today,
        points: s.points + bonus,
        ledger: [{ id: uid(), ts: Date.now(), label: `Day ${streak} check-in streak 🔥`, delta: bonus }, ...s.ledger],
      };
    });
  }, []);

  const api = useMemo<ClubApi>(() => {
    const addLedger = (s: ClubState, label: string, delta: number): ClubState => ({
      ...s,
      points: s.points + delta,
      ledger: [{ id: uid(), ts: Date.now(), label, delta }, ...s.ledger].slice(0, 200),
    });

    const addCard = (s: ClubState, filmId: string): ClubState => ({
      ...s,
      collection: { ...s.collection, [filmId]: (s.collection[filmId] ?? 0) + 1 },
    });

    return {
      ...state,
      today: todayKey(),

      earn(label, delta) {
        setState((s) => addLedger(s, label, delta));
      },

      spend(label, cost) {
        if (state.points < cost) return false;
        setState((s) => addLedger(s, label, -cost));
        return true;
      },

      enqueue(filmId) {
        setState((s) => (s.queue.includes(filmId) ? s : { ...s, queue: [...s.queue, filmId] }));
      },

      dequeue(filmId) {
        setState((s) => ({ ...s, queue: s.queue.filter((id) => id !== filmId) }));
      },

      logWatch(filmId) {
        const film = filmById(filmId);
        setState((s) => {
          let next = {
            ...s,
            queue: s.queue.filter((id) => id !== filmId),
            watched: s.watched.includes(filmId) ? s.watched : [...s.watched, filmId],
          };
          next = addLedger(next, `Watched “${film.title}” ✅`, 50);
          next = addCard(next, filmId);
          return next;
        });
        return film;
      },

      buyTicket({ filmId, theaterName, time, seats }) {
        const film = filmById(filmId);
        const ticket: Ticket = {
          id: uid(),
          filmId,
          theaterName,
          date: todayKey(),
          time,
          seats,
          total: +(seats.length * MATINEE_PRICE).toFixed(2),
        };
        setState((s) => {
          let next = { ...s, tickets: [ticket, ...s.tickets] };
          next = addLedger(next, `Matinee ticket: “${film.title}” at ${theaterName} 🎟️`, 200);
          next = addCard(next, filmId);
          return next;
        });
        return ticket;
      },

      uploadStub(fileName, theater) {
        setState((s) => {
          const stub: Stub = { id: uid(), fileName, theater, ts: Date.now(), status: 'verified' };
          let next = { ...s, stubs: [stub, ...s.stubs] };
          next = addLedger(next, `Ticket stub verified (${theater}) 🧾`, 150);
          return next;
        });
      },

      guessFrame(filmId) {
        const today = todayKey();
        const answer = puzzleForDate(today).answerId;
        setState((s) => {
          const day: FrameDay = s.frame[today] ?? { guesses: [], solved: false };
          if (day.solved || day.guesses.length >= MAX_GUESSES) return s;
          const guesses = [...day.guesses, filmId];
          const solved = filmId === answer;
          let next: ClubState = { ...s, frame: { ...s.frame, [today]: { guesses, solved } } };
          if (solved) {
            const pts = 100 - (guesses.length - 1) * 10;
            next = addLedger(next, `Six Frames solved in ${guesses.length} 🖼️`, pts);
            next = addCard(next, answer);
          }
          return next;
        });
      },

      openPack() {
        if (state.points < PACK_COST) return null;
        const cards: Film[] = [];
        for (let i = 0; i < PACK_SIZE; i++) {
          cards.push(FILMS[Math.floor(Math.random() * FILMS.length)]);
        }
        setState((s) => {
          let next = addLedger(s, 'Opened a Matinee Pack 🃏', -PACK_COST);
          for (const c of cards) next = addCard(next, c.id);
          return next;
        });
        return cards;
      },

      addCustomFilm(film) {
        registerFilms([film]);
        setState((s) =>
          s.customFilms.some((f) => f.id === film.id) || FILMS.some((f) => f.id === film.id)
            ? s
            : { ...s, customFilms: [...s.customFilms, film] },
        );
      },

      importLetterboxd(entries, mode) {
        const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const newFilms: Film[] = [];
        const ids: string[] = [];
        for (const e of entries) {
          const existing =
            [...FILMS, ...state.customFilms, ...newFilms].find(
              (f) => f.title.toLowerCase() === e.name.toLowerCase() && (!e.year || !f.year || f.year === e.year),
            );
          if (existing) {
            ids.push(existing.id);
            continue;
          }
          const film: Film = {
            id: `lb-${slug(e.name)}-${e.year || 'x'}`,
            title: e.name, year: e.year, kind: 'film', genres: [], runtime: 0,
            rated: '—', director: '—', cast: [], synopsis: '', score: 0, rarity: 'matinee',
            streamingOn: [], poster: { from: '#2c3440', to: '#14181c', emoji: '🎬' },
          };
          newFilms.push(film);
          ids.push(film.id);
        }
        registerFilms(newFilms);
        setState((s) => {
          let next: ClubState = { ...s, customFilms: [...s.customFilms, ...newFilms] };
          if (mode === 'queue') {
            const queue = [...next.queue];
            for (const id of ids) if (!queue.includes(id) && !next.watched.includes(id)) queue.push(id);
            next = { ...next, queue };
          } else {
            const watched = [...next.watched];
            const collection = { ...next.collection };
            for (const id of ids) {
              if (!watched.includes(id)) {
                watched.push(id);
                collection[id] = (collection[id] ?? 0) + 1;
              }
            }
            next = { ...next, watched, collection, queue: next.queue.filter((id) => !watched.includes(id)) };
          }
          next = addLedger(next, `Letterboxd import: ${ids.length} ${mode === 'queue' ? 'watchlist' : 'watched'} titles 📥`, 100);
          return next;
        });
        return ids.length;
      },

      resetAll() {
        try {
          localStorage.removeItem(KEY);
        } catch { /* ignore */ }
        location.reload();
      },

      redeem(rewardId) {
        const reward = REWARDS.find((r) => r.id === rewardId);
        if (!reward || state.points < reward.cost) return false;
        setState((s) => {
          let next = addLedger(s, `Redeemed: ${reward.name} ${reward.emoji}`, -reward.cost);
          next = { ...next, redeemed: [...next.redeemed, rewardId] };
          return next;
        });
        return true;
      },
    };
  }, [state]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useClub(): ClubApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useClub outside provider');
  return ctx;
}
