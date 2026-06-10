import { useClub } from '../state/store';
import { dailyProgram, todayKey } from '../data/theaters';
import { MAX_GUESSES } from '../data/frames';
import { Poster } from '../components/Poster';
import { Tab } from '../App';

export function Marquee({ go }: { go: (t: Tab) => void }) {
  const club = useClub();
  const today = todayKey();
  const program = dailyProgram(today);
  const frameDay = club.frame[today];

  // First showing of each unique film today, up to 6.
  const seen = new Set<string>();
  const picks = program.filter((s) => {
    if (seen.has(s.film.id)) return false;
    seen.add(s.film.id);
    return true;
  }).slice(0, 6);

  const cardsOwned = Object.keys(club.collection).length;

  return (
    <div className="page">
      <section className="sunburst">
        <p className="overline">Good morning, club member ☀️</p>
        <h1 className="display">Today’s Matinees</h1>
        <p className="sub">
          Day {club.streak} streak 🔥 · {club.points.toLocaleString()} reel points · {cardsOwned} cards collected
        </p>
      </section>

      <section className="card frame-teaser" onClick={() => go('frames')} role="button" tabIndex={0}>
        <div>
          <h2>🖼️ Six Frames — daily puzzle</h2>
          <p className="muted">
            {frameDay?.solved
              ? `Solved in ${frameDay.guesses.length} today. Come back tomorrow!`
              : frameDay && frameDay.guesses.length >= MAX_GUESSES
                ? 'Out of guesses today — tomorrow’s a new film.'
                : frameDay
                  ? `${MAX_GUESSES - frameDay.guesses.length} guesses left — frame ${frameDay.guesses.length + 1} is waiting.`
                  : 'One film. Six frames. Can you name it from the first?'}
          </p>
        </div>
        <span className="chev">›</span>
      </section>

      <section>
        <div className="row-head">
          <h2>On the marquee before 5 PM</h2>
          <button className="link" onClick={() => go('matinees')}>All showtimes ›</button>
        </div>
        <div className="poster-row">
          {picks.map((s) => (
            <div key={s.film.id} className="poster-stack" onClick={() => go('matinees')}>
              <Poster film={s.film} />
              <span className="poster-caption">{s.time} · {s.theater.emoji} {s.theater.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="tile-grid">
        <button className="tile" onClick={() => go('discover')}>
          <span className="tile-emoji">🔍</span>
          <strong>Discover & Queue</strong>
          <span className="muted">{club.queue.length} in your queue</span>
        </button>
        <button className="tile" onClick={() => go('collection')}>
          <span className="tile-emoji">🃏</span>
          <strong>Card Binder</strong>
          <span className="muted">{cardsOwned} cards collected</span>
        </button>
        <button className="tile" onClick={() => go('rewards')}>
          <span className="tile-emoji">💰</span>
          <strong>Watch to Earn</strong>
          <span className="muted">{club.points.toLocaleString()} pts</span>
        </button>
        <button className="tile" onClick={() => go('matinees')}>
          <span className="tile-emoji">🎟️</span>
          <strong>Ticket Portal</strong>
          <span className="muted">{club.tickets.length} ticket{club.tickets.length === 1 ? '' : 's'} booked</span>
        </button>
      </section>
    </div>
  );
}
