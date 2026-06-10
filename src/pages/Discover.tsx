import { useMemo, useState } from 'react';
import { FILMS, filmById } from '../data/catalog';
import { filmFromTmdb, getTmdbKey, searchTmdb, TmdbResult } from '../data/tmdb';
import { useClub } from '../state/store';
import { Poster, RarityBadge, Stars } from '../components/Poster';

type KindFilter = 'all' | 'film' | 'stage';

export function Discover() {
  const club = useClub();
  const [q, setQ] = useState('');
  const [kind, setKind] = useState<KindFilter>('all');
  const [genre, setGenre] = useState('all');
  const [toast, setToast] = useState<string | null>(null);
  const [tmdbResults, setTmdbResults] = useState<TmdbResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const hasTmdb = !!getTmdbKey();

  const genres = useMemo(() => Array.from(new Set(FILMS.flatMap((f) => f.genres))).sort(), []);

  async function runTmdbSearch() {
    if (!q.trim()) return;
    setSearching(true);
    try {
      setTmdbResults(await searchTmdb(q.trim()));
    } catch {
      setToast('TMDB search failed — check your API key in Settings (⚙︎).');
    } finally {
      setSearching(false);
    }
  }

  function addTmdb(r: TmdbResult) {
    const film = filmFromTmdb(r);
    club.addCustomFilm(film);
    club.enqueue(film.id);
    setToast(`Added “${film.title}” (${film.year}) to your queue.`);
  }

  const allFilms = [...FILMS, ...club.customFilms];
  const results = allFilms.filter((f) => {
    if (kind !== 'all' && f.kind !== kind) return false;
    if (genre !== 'all' && !f.genres.includes(genre)) return false;
    const needle = q.trim().toLowerCase();
    if (needle && !`${f.title} ${f.director} ${f.cast.join(' ')}`.toLowerCase().includes(needle)) return false;
    return true;
  });

  function watch(filmId: string) {
    const film = club.logWatch(filmId);
    setToast(`Logged “${film.title}” — +50 pts and the ${film.title} card joins your binder! 🃏`);
  }

  return (
    <div className="page">
      <header className="page-head">
        <h1>🔍 Discover</h1>
        <p className="muted">Find your next film or filmed stage show, queue it up, and earn points when you log the watch.</p>
      </header>

      {toast && (
        <div className="card success" onClick={() => setToast(null)}>
          {toast} <span className="muted">(tap to dismiss)</span>
        </div>
      )}

      <div className="filters">
        <div className="row-gap search-row">
          <input
            className="search"
            placeholder={hasTmdb ? 'Search the club — or all of TMDB…' : 'Search titles, directors, cast…'}
            value={q}
            onChange={(e) => { setQ(e.target.value); setTmdbResults(null); }}
            onKeyDown={(e) => { if (e.key === 'Enter' && hasTmdb) runTmdbSearch(); }}
          />
          {hasTmdb && (
            <button className="btn" onClick={runTmdbSearch} disabled={searching || !q.trim()}>
              {searching ? 'Searching…' : 'TMDB ↵'}
            </button>
          )}
        </div>
        <div className="chip-row">
          {(['all', 'film', 'stage'] as const).map((k) => (
            <button key={k} className={`chip ${kind === k ? 'on' : ''}`} onClick={() => setKind(k)}>
              {k === 'all' ? 'Everything' : k === 'film' ? '🎬 Films' : '🎭 Stage on screen'}
            </button>
          ))}
          <select className="chip select" value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="all">All genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {tmdbResults && (
        <section>
          <h2>TMDB results · {tmdbResults.length}</h2>
          <div className="tmdb-grid">
            {tmdbResults.map((r) => (
              <div key={r.tmdbId} className="card tmdb-card">
                {r.posterUrl
                  ? <img className="tmdb-poster" src={r.posterUrl} alt={`${r.title} poster`} loading="lazy" />
                  : <div className="tmdb-poster placeholder">🎬</div>}
                <strong>{r.title}</strong>
                <span className="muted">{r.year || '—'} <Stars score={r.vote * 10} /></span>
                <button className="btn" onClick={() => addTmdb(r)}>+ Queue</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {club.queue.length > 0 && (
        <section>
          <h2>Your queue · {club.queue.length}</h2>
          <div className="queue-list">
            {club.queue.map((id) => {
              const f = filmById(id);
              return (
                <div key={id} className="card queue-row">
                  <Poster film={f} size="sm" />
                  <div className="show-info">
                    <strong>{f.title}</strong>
                    <span className="muted">Streaming on {f.streamingOn.join(', ')}</span>
                  </div>
                  <div className="btn-col">
                    <button className="btn" onClick={() => watch(id)}>✓ Watched · +50</button>
                    <button className="link" onClick={() => club.dequeue(id)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2>{results.length} title{results.length === 1 ? '' : 's'}</h2>
        <div className="discover-grid">
          {results.map((f) => {
            const queued = club.queue.includes(f.id);
            const watched = club.watched.includes(f.id);
            return (
              <div key={f.id} className="card film-card">
                <Poster film={f} />
                <div className="film-card-body">
                  <div className="row-between">
                    <strong>{f.title}</strong>
                    <Stars score={f.score} />
                  </div>
                  <span className="muted">{f.year}{f.runtime ? ` · ${f.runtime} min` : ''}{f.genres.length ? ` · ${f.genres.join(' / ')}` : ''}</span>
                  <p className="synopsis">{f.synopsis}</p>
                  {f.streamingOn.length > 0 && <span className="muted">📺 {f.streamingOn.join(' · ')}</span>}
                  <div className="row-gap">
                    <RarityBadge film={f} />
                    {watched && <span className="badge">Watched ✓</span>}
                  </div>
                  <div className="row-gap">
                    {queued ? (
                      <button className="btn ghost" onClick={() => club.dequeue(f.id)}>In queue ✓</button>
                    ) : (
                      <button className="btn" onClick={() => club.enqueue(f.id)}>+ Queue</button>
                    )}
                    {!watched && (
                      <button className="btn ghost" onClick={() => watch(f.id)}>Log watch</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
