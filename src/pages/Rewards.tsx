import { useRef, useState } from 'react';
import { EARN_RULES, REWARDS } from '../data/rewards';
import { THEATERS } from '../data/theaters';
import { useClub } from '../state/store';

export function Rewards() {
  const club = useClub();
  const [toast, setToast] = useState<string | null>(null);
  const [stubTheater, setStubTheater] = useState(THEATERS[0].name);
  const fileRef = useRef<HTMLInputElement>(null);

  function onUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    club.uploadStub(files[0].name, stubTheater);
    setToast(`Stub “${files[0].name}” verified — +150 reel points! 🧾`);
    if (fileRef.current) fileRef.current.value = '';
  }

  function redeem(id: string) {
    const reward = REWARDS.find((r) => r.id === id)!;
    if (club.redeem(id)) {
      setToast(`Redeemed ${reward.name} ${reward.emoji} — check your member wallet at the box office.`);
    }
  }

  return (
    <div className="page">
      <header className="page-head">
        <h1>💰 Watch to Earn</h1>
        <p className="muted">Every matinee, watch, and puzzle pays you back in reel points.</p>
      </header>

      <div className="card points-hero">
        <span className="points-big">{club.points.toLocaleString()}</span>
        <span className="muted">reel points · day {club.streak} streak 🔥</span>
      </div>

      {toast && (
        <div className="card success" onClick={() => setToast(null)}>
          {toast} <span className="muted">(tap to dismiss)</span>
        </div>
      )}

      <section className="card">
        <h2>🧾 Upload a ticket stub</h2>
        <p className="muted">
          Saw a matinee somewhere else? Snap your stub and upload it — verified stubs earn 150 points.
          Tickets bought in our portal earn automatically.
        </p>
        <div className="row-gap stub-form">
          <select className="chip select" value={stubTheater} onChange={(e) => setStubTheater(e.target.value)}>
            {THEATERS.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
            <option value="Another theater">Another theater</option>
          </select>
          <label className="btn">
            Choose photo…
            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf"
              hidden
              onChange={(e) => onUpload(e.target.files)}
            />
          </label>
        </div>
        {club.stubs.length > 0 && (
          <ul className="stub-list">
            {club.stubs.slice(0, 5).map((s) => (
              <li key={s.id}>✅ {s.fileName} · {s.theater} · +150 pts</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>How members earn</h2>
        <div className="card">
          <ul className="earn-list">
            {EARN_RULES.map((r) => (
              <li key={r.label}>
                <span>{r.emoji} {r.label}</span>
                <strong>+{r.pts} pts</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2>Redeem</h2>
        <div className="reward-grid">
          {REWARDS.map((r) => {
            const afford = club.points >= r.cost;
            return (
              <div key={r.id} className="card reward-card">
                <span className="tile-emoji">{r.emoji}</span>
                <strong>{r.name}</strong>
                <p className="muted">{r.blurb}</p>
                <button className="btn" disabled={!afford} onClick={() => redeem(r.id)}>
                  {r.cost.toLocaleString()} pts
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2>Points ledger</h2>
        <div className="card">
          <ul className="ledger">
            {club.ledger.slice(0, 12).map((e) => (
              <li key={e.id}>
                <span>{e.label}</span>
                <strong className={e.delta >= 0 ? 'gain' : 'loss'}>
                  {e.delta >= 0 ? '+' : ''}{e.delta}
                </strong>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
