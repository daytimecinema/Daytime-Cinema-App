import { useState } from 'react';
import { ClubProvider, useClub } from './state/store';
import { Settings } from './components/Settings';
import { Marquee } from './pages/Marquee';
import { Matinees } from './pages/Matinees';
import { Discover } from './pages/Discover';
import { Frames } from './pages/Frames';
import { Collection } from './pages/Collection';
import { Rewards } from './pages/Rewards';

export type Tab = 'marquee' | 'matinees' | 'discover' | 'frames' | 'collection' | 'rewards';

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'marquee', label: 'Marquee', emoji: '🌞' },
  { id: 'matinees', label: 'Matinees', emoji: '🎟️' },
  { id: 'discover', label: 'Discover', emoji: '🔍' },
  { id: 'frames', label: 'Six Frames', emoji: '🖼️' },
  { id: 'collection', label: 'Binder', emoji: '🃏' },
  { id: 'rewards', label: 'Earn', emoji: '💰' },
];

function Shell() {
  const [tab, setTab] = useState<Tab>('marquee');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const club = useClub();

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-dots"><i className="d1" /><i className="d2" /><i className="d3" /></span>
          <div>
            <strong>Matinee Film Club</strong>
            <span className="tagline">daylight cinema, collected</span>
          </div>
        </div>
        <div className="row-gap">
          <span className="points-chip">{club.points.toLocaleString()} pts</span>
          <button className="gear" onClick={() => setSettingsOpen(true)} title="Settings & connections">⚙︎</button>
        </div>
      </header>

      {settingsOpen && <Settings onClose={() => setSettingsOpen(false)} />}

      <main>
        {tab === 'marquee' && <Marquee go={setTab} />}
        {tab === 'matinees' && <Matinees />}
        {tab === 'discover' && <Discover />}
        {tab === 'frames' && <Frames />}
        {tab === 'collection' && <Collection />}
        {tab === 'rewards' && <Rewards />}
      </main>

      <nav className="tabbar">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)}>
            <span className="tab-emoji">{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <ClubProvider>
      <Shell />
    </ClubProvider>
  );
}
