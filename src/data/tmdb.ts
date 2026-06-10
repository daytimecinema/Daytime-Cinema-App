import { Film } from './catalog';

/**
 * TMDB (themoviedb.org) integration — the same movie database Letterboxd
 * is built on. Works entirely from the browser: paste a free TMDB API key
 * in Settings and the app fetches real posters and search results.
 * Without a key the app falls back to its bundled CSS poster art.
 */

const KEY_STORE = 'mfc-tmdb-key';
const POSTER_CACHE = 'mfc-poster-cache-v1';

export const IMG_BASE = 'https://image.tmdb.org/t/p/w342';

export function getTmdbKey(): string {
  try {
    return localStorage.getItem(KEY_STORE) ?? '';
  } catch {
    return '';
  }
}

export function setTmdbKey(key: string) {
  try {
    localStorage.setItem(KEY_STORE, key.trim());
  } catch { /* private mode */ }
}

async function tmdb(path: string, params: Record<string, string>): Promise<any> {
  const key = getTmdbKey();
  if (!key) throw new Error('No TMDB key configured');
  const url = new URL(`https://api.themoviedb.org/3${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const init: RequestInit = {};
  if (key.startsWith('eyJ')) {
    // v4 read access token
    init.headers = { Authorization: `Bearer ${key}` };
  } else {
    url.searchParams.set('api_key', key);
  }
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}

export interface TmdbResult {
  tmdbId: number;
  title: string;
  year: number;
  posterUrl: string | null;
  overview: string;
  vote: number; // 0–10
}

export async function searchTmdb(query: string): Promise<TmdbResult[]> {
  const data = await tmdb('/search/movie', { query, include_adult: 'false' });
  return (data.results ?? []).slice(0, 12).map((r: any) => ({
    tmdbId: r.id,
    title: r.title,
    year: r.release_date ? +r.release_date.slice(0, 4) : 0,
    posterUrl: r.poster_path ? IMG_BASE + r.poster_path : null,
    overview: r.overview ?? '',
    vote: r.vote_average ?? 0,
  }));
}

function loadCache(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(POSTER_CACHE) ?? '{}');
  } catch {
    return {};
  }
}

let cache: Record<string, string> | null = null;
const inFlight = new Map<string, Promise<string>>();

/**
 * Resolve a real poster URL for a catalog film via TMDB title search.
 * Caches results (including misses, as '') in localStorage.
 */
export function posterFor(film: Film): Promise<string> {
  if (film.posterUrl) return Promise.resolve(film.posterUrl);
  cache ??= loadCache();
  if (film.id in cache) return Promise.resolve(cache[film.id]);
  if (!getTmdbKey()) return Promise.resolve('');
  const pending = inFlight.get(film.id);
  if (pending) return pending;

  const params: Record<string, string> = { query: film.tmdb ?? film.title, include_adult: 'false' };
  if (film.year) params.year = String(film.year);
  const p = tmdb('/search/movie', params)
    .then((data) => {
      const hit = (data.results ?? [])[0];
      const url = hit?.poster_path ? IMG_BASE + hit.poster_path : '';
      cache![film.id] = url;
      try {
        localStorage.setItem(POSTER_CACHE, JSON.stringify(cache));
      } catch { /* full or private */ }
      return url;
    })
    .catch(() => '')
    .finally(() => inFlight.delete(film.id));
  inFlight.set(film.id, p);
  return p;
}

export function cachedPoster(film: Film): string {
  if (film.posterUrl) return film.posterUrl;
  cache ??= loadCache();
  return cache[film.id] ?? '';
}

export function filmFromTmdb(r: TmdbResult): Film {
  return {
    id: `tmdb-${r.tmdbId}`,
    title: r.title,
    year: r.year,
    kind: 'film',
    genres: [],
    runtime: 0,
    rated: '—',
    director: '—',
    cast: [],
    synopsis: r.overview,
    score: Math.round(r.vote * 10),
    rarity: r.vote >= 8 ? 'gold' : r.vote >= 6.5 ? 'classic' : 'matinee',
    streamingOn: [],
    poster: { from: '#2c3440', to: '#14181c', emoji: '🎬' },
    posterUrl: r.posterUrl ?? undefined,
  };
}
