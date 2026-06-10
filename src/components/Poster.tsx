import { useEffect, useState } from 'react';
import { Film, RARITY_LABEL } from '../data/catalog';
import { cachedPoster, getTmdbKey, posterFor } from '../data/tmdb';

/** Real TMDB poster URL for a film, resolving lazily once a key is set. */
export function usePoster(film: Film): string {
  const [url, setUrl] = useState(() => cachedPoster(film));
  useEffect(() => {
    let live = true;
    if (!cachedPoster(film) && getTmdbKey()) {
      posterFor(film).then((u) => {
        if (live && u) setUrl(u);
      });
    } else {
      setUrl(cachedPoster(film));
    }
    return () => {
      live = false;
    };
  }, [film.id]);
  return url;
}

export function Poster({ film, size = 'md' }: { film: Film; size?: 'sm' | 'md' | 'lg' }) {
  const art = usePoster(film);
  if (art) {
    return (
      <div className={`poster poster-${size} rarity-${film.rarity} poster-art`} title={`${film.title} (${film.year})`}>
        <img src={art} alt={`${film.title} poster`} loading="lazy" />
      </div>
    );
  }
  return (
    <div
      className={`poster poster-${size} rarity-${film.rarity}`}
      style={{ background: `linear-gradient(160deg, ${film.poster.from}, ${film.poster.to})` }}
      title={`${film.title} (${film.year})`}
    >
      <span className="poster-emoji">{film.poster.emoji}</span>
      <span className="poster-title">{film.title}</span>
      <span className="poster-year">{film.year || ''}{film.kind === 'stage' ? ' · STAGE' : ''}</span>
    </div>
  );
}

export function RarityBadge({ film }: { film: Film }) {
  return <span className={`badge rarity-badge-${film.rarity}`}>{RARITY_LABEL[film.rarity]}</span>;
}

/** Letterboxd-style 0–5 star score in club green. */
export function Stars({ score }: { score: number }) {
  if (!score) return null;
  return <span className="stars">★ {(score / 20).toFixed(1)}</span>;
}
