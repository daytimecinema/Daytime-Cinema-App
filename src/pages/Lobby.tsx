import { useMemo, useState } from 'react';
import { useClub } from '../state/store';
import { dailyProgram, todayKey } from '../data/theaters';
import { MAX_GUESSES } from '../data/frames';
import { Poster } from '../components/Poster';
import { Mascot, MascotPose } from '../components/Mascot';
import { Tab } from '../App';

const SIGNS: { tab: Tab; label: string; glow: 'orange' | 'green' | 'blue' }[] = [
  { tab: 'matinees', label: 'MOVIE TIMES', glow: 'orange' },
  { tab: 'frames', label: 'SIX FRAMES', glow: 'green' },
  { tab: 'discover', label: 'COMING SOON', glow: 'blue' },
  { tab: 'collection', label: 'THE GALLERY', glow: 'green' },
  { tab: 'rewards', label: 'CONCESSIONS', glow: 'orange' },
];

export function Lobby({ go }: { go: (t: Tab) => void }) {
  const club = useClub();
  const today = todayKey();
  const frameDay = club.frame[today];
  const cardsOwned = Object.keys(club.collection).length;

  // The usher has opinions. Tap him for the next one.
  const lines = useMemo(() => {
    const l: { text: string; pose: MascotPose; tab: Tab }[] = [];
    if (!frameDay) {
      l.push({ text: 'Today’s Six Frames is rolling in the screening room — first frame’s a toughie!', pose: 'think', tab: 'frames' });
    } else if (!frameDay.solved && frameDay.guesses.length < MAX_GUESSES) {
      l.push({ text: `Frame ${frameDay.guesses.length + 1} is up on the screen. ${MAX_GUESSES - frameDay.guesses.length} guesses left!`, pose: 'think', tab: 'frames' });
    } else if (frameDay.solved) {
      l.push({ text: `Solved in ${frameDay.guesses.length} today — that’s the good stuff. New reel tomorrow!`, pose: 'cheer', tab: 'frames' });
    }
    if (club.queue.length > 0) {
      l.push({ text: `${club.queue.length} film${club.queue.length === 1 ? '' : 's'} waiting in your queue. Log one tonight?`, pose: 'point', tab: 'discover' });
    }
    l.push({ text: `Day ${club.streak} streak and ${club.points.toLocaleString()} points. Popcorn’s at 800, just saying…`, pose: 'popcorn', tab: 'rewards' });
    l.push({ text: 'Fresh matinees on the board — everything ends before five!', pose: 'welcome', tab: 'matinees' });
    return l;
  }, [frameDay, club.queue.length, club.streak, club.points]);

  const [lineIdx, setLineIdx] = useState(0);
  const line = lines[lineIdx % lines.length];

  // First showing of each unique film today, up to 4 for the lobby board.
  const seen = new Set<string>();
  const picks = dailyProgram(today).filter((s) => {
    if (seen.has(s.film.id)) return false;
    seen.add(s.film.id);
    return true;
  }).slice(0, 4);

  return (
    <div className="page lobby">
      <div className="lobby-scene">
        <div className="lobby-wall">
          <div className="lobby-title">— THE LOBBY —</div>
          <div className="directory">
            {SIGNS.map((s) => (
              <button key={s.tab} className={`dir-sign glow-${s.glow}`} onClick={() => go(s.tab)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="lobby-floor">
          <div className="counter">
            <span className="counter-goods">🍿</span>
            <span className="counter-goods">🥤</span>
            <span className="counter-goods">🍫</span>
            <span className="counter-goods">🌭</span>
          </div>
          <div className="usher" onClick={() => setLineIdx((i) => i + 1)} role="button" tabIndex={0} title="Tap Reely for another tip">
            <Mascot pose={line.pose} />
          </div>
          <button className="speech" onClick={() => go(line.tab)}>
            {line.text} <span className="chev-sm">›</span>
          </button>
        </div>
      </div>

      <div className="stat-strip">
        <span>🔥 Day {club.streak}</span>
        <span>✨ {club.points.toLocaleString()} pts</span>
        <span>🃏 {cardsOwned} cards</span>
        <span>🎟️ {club.tickets.length} ticket{club.tickets.length === 1 ? '' : 's'}</span>
      </div>

      <section>
        <div className="row-head">
          <h2>Now seating</h2>
          <button className="link" onClick={() => go('matinees')}>Box office ›</button>
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
    </div>
  );
}
