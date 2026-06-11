import { useState } from 'react';
import { FILMS, filmById } from '../data/catalog';
import { MAX_GUESSES, puzzleForDate } from '../data/frames';
import { todayKey } from '../data/theaters';
import { useClub } from '../state/store';
import { Poster } from '../components/Poster';
import { RoomHeader } from '../components/Room';

export function Frames() {
  const club = useClub();
  const today = todayKey();
  const puzzle = puzzleForDate(today);
  const day = club.frame[today] ?? { guesses: [], solved: false };
  const over = day.solved || day.guesses.length >= MAX_GUESSES;
  const frameIdx = Math.min(day.solved ? day.guesses.length - 1 : day.guesses.length, MAX_GUESSES - 1);
  const frame = puzzle.frames[frameIdx];
  const answer = filmById(puzzle.answerId);

  const [pick, setPick] = useState('');
  const [copied, setCopied] = useState(false);

  const guessedIds = new Set(day.guesses);
  const options = FILMS.filter((f) => !guessedIds.has(f.id)).sort((a, b) => a.title.localeCompare(b.title));

  function submit() {
    if (!pick || over) return;
    club.guessFrame(pick);
    setPick('');
  }

  function share() {
    const squares = day.guesses
      .map((g) => (g === puzzle.answerId ? '🟩' : '🟥'))
      .join('');
    const pad = day.solved ? '' : '⬛'.repeat(Math.max(0, MAX_GUESSES - day.guesses.length));
    const text = `Six Frames ${today} — ${day.solved ? `${day.guesses.length}/${MAX_GUESSES}` : 'X/6'}\n${squares}${pad}\nmatinee film club 🎞️`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="page">
      <RoomHeader
        scene="screening"
        sign="SCREENING ROOM"
        sub="Lights down. One film hides behind six frames — each wrong guess rolls the next one. Up to 100 points and the film’s card."
      />

      <div
        className="frame-still"
        style={{ background: `linear-gradient(to bottom, ${frame.sky} 0%, ${frame.sky} 45%, ${frame.ground} 100%)` }}
      >
        <span className="frame-number">FRAME {frameIdx + 1} / {MAX_GUESSES}</span>
        <span className="frame-props">{frame.props}</span>
        <span className="frame-caption">“{frame.caption}”</span>
      </div>

      <div className="guess-dots">
        {Array.from({ length: MAX_GUESSES }).map((_, i) => {
          const g = day.guesses[i];
          const cls = g === undefined ? '' : g === puzzle.answerId ? 'hit' : 'miss';
          return <span key={i} className={`dot ${cls}`} />;
        })}
      </div>

      {!over ? (
        <div className="guess-bar">
          <select className="search" value={pick} onChange={(e) => setPick(e.target.value)}>
            <option value="">Which film is this…?</option>
            {options.map((f) => (
              <option key={f.id} value={f.id}>{f.title} ({f.year})</option>
            ))}
          </select>
          <button className="btn" disabled={!pick} onClick={submit}>Guess</button>
        </div>
      ) : (
        <div className={`card ${day.solved ? 'success' : 'fail'}`}>
          {day.solved ? (
            <p>
              🎉 Solved in {day.guesses.length}! It was <strong>{answer.title}</strong> ({answer.year}).
              +{100 - (day.guesses.length - 1) * 10} pts and the card is in your binder.
            </p>
          ) : (
            <p>So close! It was <strong>{answer.title}</strong> ({answer.year}). A new film premieres tomorrow.</p>
          )}
          <div className="row-gap reveal-row">
            <Poster film={answer} size="sm" />
            <button className="btn ghost" onClick={share}>{copied ? 'Copied! ✓' : 'Share result 📋'}</button>
          </div>
        </div>
      )}

      {day.guesses.length > 0 && (
        <section>
          <h2>Your guesses</h2>
          <ol className="guess-log">
            {day.guesses.map((g, i) => (
              <li key={i} className={g === puzzle.answerId ? 'hit' : 'miss'}>
                {g === puzzle.answerId ? '🟩' : '🟥'} {filmById(g).title}
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
