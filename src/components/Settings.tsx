import { useRef, useState } from 'react';
import { getTmdbKey, setTmdbKey } from '../data/tmdb';
import { useClub } from '../state/store';

/** Parse a Letterboxd export CSV (watchlist.csv / watched.csv / diary.csv). */
export function parseLetterboxdCsv(text: string): { name: string; year: number }[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const parseLine = (line: string): string[] => {
    const out: string[] = [];
    let cur = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQ) {
        if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (c === '"') inQ = false;
        else cur += c;
      } else if (c === '"') inQ = true;
      else if (c === ',') { out.push(cur); cur = ''; }
      else cur += c;
    }
    out.push(cur);
    return out;
  };
  const header = parseLine(lines[0]).map((h) => h.trim().toLowerCase());
  const nameIdx = header.indexOf('name');
  const yearIdx = header.indexOf('year');
  if (nameIdx < 0) return [];
  const seen = new Set<string>();
  const rows: { name: string; year: number }[] = [];
  for (const line of lines.slice(1)) {
    const cols = parseLine(line);
    const name = (cols[nameIdx] ?? '').trim();
    if (!name) continue;
    const year = yearIdx >= 0 ? parseInt(cols[yearIdx], 10) || 0 : 0;
    const k = `${name.toLowerCase()}|${year}`;
    if (seen.has(k)) continue;
    seen.add(k);
    rows.push({ name, year });
  }
  return rows;
}

export function Settings({ onClose }: { onClose: () => void }) {
  const club = useClub();
  const [key, setKey] = useState(getTmdbKey());
  const [saved, setSaved] = useState(false);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const watchlistRef = useRef<HTMLInputElement>(null);
  const watchedRef = useRef<HTMLInputElement>(null);

  function saveKey() {
    setTmdbKey(key);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  async function onCsv(files: FileList | null, mode: 'queue' | 'watched') {
    if (!files || files.length === 0) return;
    const text = await files[0].text();
    const rows = parseLetterboxdCsv(text);
    if (rows.length === 0) {
      setImportMsg('Could not find any titles in that file — expected a Letterboxd export CSV with Name/Year columns.');
      return;
    }
    const n = club.importLetterboxd(rows, mode);
    setImportMsg(`Imported ${n} titles ${mode === 'queue' ? 'into your queue' : 'as watched (+cards)'} — +100 pts. 📥`);
    if (watchlistRef.current) watchlistRef.current.value = '';
    if (watchedRef.current) watchedRef.current.value = '';
  }

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="row-head">
          <h1>Settings & connections</h1>
          <button className="link" onClick={onClose}>✕ Close</button>
        </div>

        <section className="card">
          <h2>🎬 Real movie data (TMDB)</h2>
          <p className="muted">
            The club ships with a shared TMDB key, so real posters, movie search, and the live
            now-playing board work out of the box. Paste your own free key from
            <strong> themoviedb.org</strong> (Settings → API) to use your personal quota instead —
            it stays in your browser only.
          </p>
          <div className="row-gap">
            <input
              className="search"
              placeholder="TMDB API key or v4 read token"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <button className="btn" onClick={saveKey}>{saved ? 'Saved ✓' : 'Save'}</button>
          </div>
          <p className="muted">✅ TMDB active — posters load on the fly, Discover searches all of TMDB, and Matinees shows this week’s real releases.</p>
        </section>

        <section className="card">
          <h2>📗 Letterboxd</h2>
          <p className="muted">
            Letterboxd’s API is approval-only (you apply at letterboxd.com/api-beta), so there’s no
            public “Sign in with Letterboxd” yet. Until the club is granted access, import your data the
            official way: Letterboxd → Settings → Data → <strong>Export your data</strong>, then upload
            the CSVs from that ZIP here.
          </p>
          <div className="row-gap">
            <label className="btn">
              Import watchlist.csv → Queue
              <input ref={watchlistRef} type="file" accept=".csv,text/csv" hidden onChange={(e) => onCsv(e.target.files, 'queue')} />
            </label>
            <label className="btn ghost">
              Import watched.csv → Watched
              <input ref={watchedRef} type="file" accept=".csv,text/csv" hidden onChange={(e) => onCsv(e.target.files, 'watched')} />
            </label>
          </div>
          {importMsg && <p className="muted">{importMsg}</p>}
        </section>

        <section className="card">
          <h2>🧹 Reset</h2>
          <p className="muted">Wipe this browser’s club data (points, cards, tickets, imports) and start fresh.</p>
          <button className="btn danger" onClick={() => { if (confirm('Reset all club data in this browser?')) club.resetAll(); }}>
            Reset club data
          </button>
        </section>
      </div>
    </div>
  );
}
