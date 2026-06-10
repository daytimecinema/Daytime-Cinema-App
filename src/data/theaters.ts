import { FILMS, Film } from './catalog';

export interface Theater {
  id: string;
  name: string;
  neighborhood: string;
  perk: string;
  emoji: string;
}

export const THEATERS: Theater[] = [
  {
    id: 'paradiso-palace', name: 'The Paradiso Palace', neighborhood: 'Old Town',
    perk: '1924 picture palace · organ overture before every noon show', emoji: '🏛️',
  },
  {
    id: 'sunbeam', name: 'Sunbeam Screening Room', neighborhood: 'Riverside',
    perk: '48 seats · espresso bar · skylight lobby', emoji: '☀️',
  },
  {
    id: 'gilded-curtain', name: 'The Gilded Curtain', neighborhood: 'Theater District',
    perk: 'Stage-on-screen house · filmed theater every day', emoji: '🎭',
  },
  {
    id: 'civic-daylight', name: 'Civic Daylight Cinema', neighborhood: 'Civic Center',
    perk: 'Four screens · cartoons before noon shows · $1 coffee refills', emoji: '🎟️',
  },
];

/** All shows end by 5pm — this is a matinee club. */
const MATINEE_SLOTS = ['10:15 AM', '11:00 AM', '11:45 AM', '12:30 PM', '1:15 PM', '2:00 PM', '2:45 PM', '3:30 PM', '4:15 PM'];

export function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export interface Showtime {
  theater: Theater;
  film: Film;
  time: string;
}

/** Deterministic daily program: each theater shows a rotating slice of the catalog, matinee slots only. */
export function dailyProgram(dateKey: string): Showtime[] {
  const shows: Showtime[] = [];
  for (const theater of THEATERS) {
    const stageHouse = theater.id === 'gilded-curtain';
    const pool = FILMS.filter((f) => (stageHouse ? f.kind === 'stage' : f.kind === 'film'));
    const seed = hashStr(theater.id + dateKey);
    const count = 3 + (seed % 2); // 3–4 titles per house per day
    for (let i = 0; i < count; i++) {
      const film = pool[(seed + i * 7) % pool.length];
      if (shows.some((s) => s.theater.id === theater.id && s.film.id === film.id)) continue;
      const nTimes = 2 + ((seed >> (i + 2)) % 2); // 2–3 shows each
      const used = new Set<number>();
      for (let t = 0; t < nTimes; t++) {
        const slot = (seed + i * 13 + t * 5) % MATINEE_SLOTS.length;
        if (used.has(slot)) continue;
        used.add(slot);
        shows.push({ theater, film, time: MATINEE_SLOTS[slot] });
      }
    }
  }
  return shows.sort((a, b) => MATINEE_SLOTS.indexOf(a.time) - MATINEE_SLOTS.indexOf(b.time));
}

export const MATINEE_PRICE = 8.5;

/** Deterministic set of already-taken seats for a given show. */
export function takenSeats(theaterId: string, filmId: string, time: string, dateKey: string): Set<string> {
  const taken = new Set<string>();
  const seed = hashStr(theaterId + filmId + time + dateKey);
  const rows = 'ABCDEF';
  for (let i = 0; i < 14; i++) {
    const r = rows[(seed >> i) % rows.length];
    const c = 1 + ((seed >> (i + 3)) % 8);
    taken.add(`${r}${c}`);
  }
  return taken;
}
