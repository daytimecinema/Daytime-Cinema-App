import { useState } from 'react';
import { FILMS, Film, RARITY_LABEL, RARITY_ORDER } from '../data/catalog';
import { PACK_COST, PACK_SIZE } from '../data/rewards';
import { useClub } from '../state/store';
import { Poster, RarityBadge } from '../components/Poster';

export function Collection() {
  const club = useClub();
  const [pulls, setPulls] = useState<Film[] | null>(null);

  const owned = Object.keys(club.collection).length;
  const total = FILMS.length;

  function openPack() {
    const cards = club.openPack();
    if (cards) setPulls(cards);
  }

  return (
    <div className="page">
      <header className="page-head">
        <h1>🃏 Card Binder</h1>
        <p className="muted">
          Every film you watch, every matinee you attend, and every puzzle you solve adds a card.
          Collect all {total} — duplicates raise a card’s shine count.
        </p>
      </header>

      <div className="card row-between binder-bar">
        <div>
          <strong>{owned} / {total} collected</strong>
          <div className="progress"><span style={{ width: `${(owned / total) * 100}%` }} /></div>
        </div>
        <button className="btn" onClick={openPack} disabled={club.points < PACK_COST}>
          Open Matinee Pack · {PACK_COST} pts ({PACK_SIZE} cards)
        </button>
      </div>

      {pulls && (
        <div className="card success pack-reveal" onClick={() => setPulls(null)}>
          <h2>Pack opened! ✨</h2>
          <div className="poster-row">
            {pulls.map((f, i) => (
              <div key={i} className="poster-stack">
                <Poster film={f} />
                <RarityBadge film={f} />
              </div>
            ))}
          </div>
          <span className="muted">(tap to dismiss)</span>
        </div>
      )}

      {club.customFilms.some((f) => (club.collection[f.id] ?? 0) > 0) && (
        <section>
          <h2 className="rarity-head-classic">Imports & Discoveries</h2>
          <div className="binder-grid">
            {club.customFilms
              .filter((f) => (club.collection[f.id] ?? 0) > 0)
              .map((f) => {
                const count = club.collection[f.id] ?? 0;
                return (
                  <div key={f.id} className="binder-slot">
                    <Poster film={f} />
                    {count > 1 && <span className="count-pip">×{count}</span>}
                  </div>
                );
              })}
          </div>
        </section>
      )}

      {RARITY_ORDER.slice().reverse().map((rarity) => {
        const films = FILMS.filter((f) => f.rarity === rarity);
        if (films.length === 0) return null;
        return (
          <section key={rarity}>
            <h2 className={`rarity-head-${rarity}`}>{RARITY_LABEL[rarity]}</h2>
            <div className="binder-grid">
              {films.map((f) => {
                const count = club.collection[f.id] ?? 0;
                return (
                  <div key={f.id} className={`binder-slot ${count === 0 ? 'unowned' : ''}`}>
                    <Poster film={f} />
                    {count > 1 && <span className="count-pip">×{count}</span>}
                    {count === 0 && <span className="lock">🔒</span>}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
