import { Film, RARITY_LABEL } from '../data/catalog';

export function Poster({ film, size = 'md' }: { film: Film; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div
      className={`poster poster-${size} rarity-${film.rarity}`}
      style={{ background: `linear-gradient(160deg, ${film.poster.from}, ${film.poster.to})` }}
      title={film.title}
    >
      <span className="poster-emoji">{film.poster.emoji}</span>
      <span className="poster-title">{film.title}</span>
      <span className="poster-year">{film.year}{film.kind === 'stage' ? ' · STAGE' : ''}</span>
    </div>
  );
}

export function RarityBadge({ film }: { film: Film }) {
  return <span className={`badge rarity-badge-${film.rarity}`}>{RARITY_LABEL[film.rarity]}</span>;
}
