import { useState } from 'react';
import { ClubProvider, useClub } from './state/store';
import { Settings } from './components/Settings';
import { Intro } from './components/Intro';
import { Lobby } from './pages/Lobby';
import { Matinees } from './pages/Matinees';
import { Discover } from './pages/Discover';
import { Frames } from './pages/Frames';
import { Collection } from './pages/Collection';
import { Rewards } from './pages/Rewards';

export type Tab = 'lobby' | 'matinees' | 'discover' | 'frames' | 'collection' | 'rewards';

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'lobby', label: 'Lobby', emoji: '🛎️' },
  { id: 'matinees', label: 'Box Office', emoji: '🎟️' },
  { id: 'discover', label: 'Coming Soon', emoji: '🎬' },
  { id: 'frames', label: 'Screening Rm', emoji: '📽️' },
  { id: 'collection', label: 'Gallery', emoji: '🃏' },
  { id: 'rewards', label: 'Concessions', emoji: '🍿' },
];

function introSeen(): boolean {
  try {
    return sessionStorage.getItem('mfc-intro') === '1';
  } catch {
    return true;
  }
}

function Shell() {
  const [tab, setTab] = useState<Tab>('lobby');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(() => !introSeen());
  const club = useClub();

  function introDone() {
    try {
      sessionStorage.setItem('mfc-intro', '1');
    } catch { /* private mode */ }
    setShowIntro(false);
  }

  return (
    <div className="shell">
      {showIntro && <Intro onDone={introDone} />}

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
        <div className="room" key={tab}>
          {tab === 'lobby' && <Lobby go={setTab} />}
          {tab === 'matinees' && <Matinees />}
          {tab === 'discover' && <Discover />}
          {tab === 'frames' && <Frames />}
          {tab === 'collection' && <Collection />}
          {tab === 'rewards' && <Rewards />}
        </div>
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
