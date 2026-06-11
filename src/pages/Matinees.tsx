import { useEffect, useMemo, useState } from 'react';
import { useClub } from '../state/store';
import { Film, filmById, registerFilms } from '../data/catalog';
import { filmFromTmdb, nowPlayingTmdb } from '../data/tmdb';
import { ticketLinks, movieGluNowShowing, INDIE_PROGRAM } from '../data/providers';
import { dailyProgram, takenSeats, todayKey, MATINEE_PRICE, Showtime, THEATERS } from '../data/theaters';
import { Poster } from '../components/Poster';
import { RoomHeader } from '../components/Room';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8];

export function Matinees() {
  const club = useClub();
  const today = todayKey();
  const [livePool, setLivePool] = useState<Film[] | null>(null);
  const [mgCount, setMgCount] = useState<number | null>(null);
  const [theaterFilter, setTheaterFilter] = useState<string>('all');
  const [booking, setBooking] = useState<Showtime | null>(null);
  const [seats, setSeats] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  // Program the film houses with movies actually in US theaters this week.
  useEffect(() => {
    let live = true;
    nowPlayingTmdb()
      .then((rs) => {
        const films = rs.map(filmFromTmdb);
        registerFilms(films);
        if (live) setLivePool(films);
      })
      .catch(() => { /* offline or no key — curated catalog stands in */ });
    movieGluNowShowing().then((films) => {
      if (live && films.length > 0) setMgCount(films.length);
    });
    return () => { live = false; };
  }, []);

  const program = useMemo(() => dailyProgram(today, livePool ?? undefined), [today, livePool]);

  const visible = program.filter((s) => theaterFilter === 'all' || s.theater.id === theaterFilter);

  const taken = booking
    ? takenSeats(booking.theater.id, booking.film.id, booking.time, today)
    : new Set<string>();

  function toggleSeat(id: string) {
    if (taken.has(id)) return;
    setSeats((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function purchase() {
    if (!booking || seats.length === 0) return;
    club.addCustomFilm(booking.film); // persist live titles so tickets & cards survive reloads
    const ticket = club.buyTicket({
      filmId: booking.film.id,
      theaterName: booking.theater.name,
      time: booking.time,
      seats,
    });
    setConfirmed(
      `🎉 Enjoy “${booking.film.title}” at ${booking.time}! Seats ${ticket.seats.join(', ')} · $${ticket.total.toFixed(2)} · +200 pts & a new card for your binder.`,
    );
    setBooking(null);
    setSeats([]);
  }

  return (
    <div className="page">
      <RoomHeader
        scene="boxoffice"
        sign="BOX OFFICE"
        sub={`Daylight shows only — every screening ends before 5 PM. Tickets earn 200 points and a collector card.${livePool ? ' Now playing is live from TMDB this week.' : ''}${mgCount ? ` MovieGlu live: ${mgCount} films nearby.` : ''} Seeing it at a chain? Use the ticket links, then upload your stub at Concessions for 150 pts.`}
      />

      {confirmed && (
        <div className="card success" onClick={() => setConfirmed(null)}>
          {confirmed} <span className="muted">(tap to dismiss)</span>
        </div>
      )}

      <div className="chip-row">
        <button className={`chip ${theaterFilter === 'all' ? 'on' : ''}`} onClick={() => setTheaterFilter('all')}>
          All houses
        </button>
        {THEATERS.map((t) => (
          <button key={t.id} className={`chip ${theaterFilter === t.id ? 'on' : ''}`} onClick={() => setTheaterFilter(t.id)}>
            {t.emoji} {t.name}
          </button>
        ))}
      </div>

      {booking ? (
        <div className="card seat-sheet">
          <div className="row-head">
            <h2>{booking.film.title} · {booking.time}</h2>
            <button className="link" onClick={() => { setBooking(null); setSeats([]); }}>✕ Cancel</button>
          </div>
          <p className="muted">{booking.theater.emoji} {booking.theater.name} · {booking.theater.neighborhood} · ${MATINEE_PRICE.toFixed(2)} per seat (matinee price)</p>
          <div className="screen-line">S C R E E N</div>
          <div className="seat-grid">
            {ROWS.map((r) =>
              COLS.map((c) => {
                const id = `${r}${c}`;
                const isTaken = taken.has(id);
                const isMine = seats.includes(id);
                return (
                  <button
                    key={id}
                    className={`seat ${isTaken ? 'taken' : ''} ${isMine ? 'mine' : ''}`}
                    onClick={() => toggleSeat(id)}
                    disabled={isTaken}
                    title={id}
                  >
                    {isMine ? '✓' : id}
                  </button>
                );
              }),
            )}
          </div>
          <div className="pay-row muted">
            Pay with:
            <label className="pay-opt"><input type="radio" checked readOnly /> Club demo wallet</label>
            <label className="pay-opt disabled" title="Stripe checkout activates with indie partner #1">
              <input type="radio" disabled /> 💳 Card via Stripe — soon
            </label>
          </div>
          <div className="row-between">
            <span>{seats.length} seat{seats.length === 1 ? '' : 's'} · ${(seats.length * MATINEE_PRICE).toFixed(2)}</span>
            <button className="btn" disabled={seats.length === 0} onClick={purchase}>
              Buy tickets · earn 200 pts
            </button>
          </div>
        </div>
      ) : (
        <div className="show-list">
          {visible.map((s, i) => (
            <div key={`${s.theater.id}-${s.film.id}-${s.time}-${i}`} className="card show-row">
              <Poster film={s.film} size="sm" />
              <div className="show-info">
                <strong>{s.film.title}</strong>
                <span className="muted">
                  {[s.film.runtime ? `${s.film.runtime} min` : '', s.film.rated !== '—' ? s.film.rated : '', s.film.genres.join(' / ')]
                    .filter(Boolean).join(' · ') || `${s.film.year}`}
                </span>
                <span className="muted">{s.theater.emoji} {s.theater.name} — {s.theater.perk}</span>
                <span className="partner-links">
                  Also playing at:{' '}
                  {ticketLinks(s.film.title).map((p) => (
                    <a
                      key={p.name}
                      className="ext"
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      title={p.affiliate ? 'Affiliate link — the club earns on this ticket' : undefined}
                    >
                      {p.name}{p.affiliate ? ' ✦' : ''} ↗
                    </a>
                  ))}
                </span>
              </div>
              <button className="btn time-btn" onClick={() => { setBooking(s); setSeats([]); }}>
                {s.time}
              </button>
            </div>
          ))}
        </div>
      )}

      {!booking && (
        <section className="card indie-card">
          <h2>🏛️ Indie Partner Program</h2>
          <p className="muted">{INDIE_PROGRAM.pitch}</p>
          <ul className="indie-list">
            {THEATERS.map((t) => (
              <li key={t.id}>
                <span>{t.emoji} <strong>{t.name}</strong> · {t.neighborhood}</span>
                <span className="badge">{INDIE_PROGRAM.statuses[t.id] ?? 'In talks'}</span>
              </li>
            ))}
          </ul>
          <a className="btn ghost" href={`mailto:${INDIE_PROGRAM.contact}?subject=Partner my theater with Matinee Film Club`}>
            Own a theater? Partner with the club ✉
          </a>
        </section>
      )}

      {club.tickets.length > 0 && !booking && (
        <section>
          <h2>Your tickets</h2>
          {club.tickets.map((t) => (
            <div key={t.id} className="card ticket-stub">
              <span className="stub-notch" />
              <div>
                <strong>🎬 {filmById(t.filmId).title}</strong>
                <p className="muted">{t.theaterName} · {t.date} · {t.time} · Seats {t.seats.join(', ')} · ${t.total.toFixed(2)}</p>
              </div>
              <span className="badge">ADMIT {t.seats.length}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
