import { useEffect, useState } from 'react';

/**
 * The walk-in: marquee flickers on → the booth prints your ticket →
 * curtains part onto the lobby. Plays once per session; always skippable.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), 4400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onDone, 700);
    return () => clearTimeout(t);
  }, [leaving, onDone]);

  return (
    <div className={`intro ${leaving ? 'intro-leaving' : ''}`}>
      <div className="intro-stage">
        <div className="intro-marquee">
          <span className="marquee-text">MATINEE FILM CLUB</span>
          <span className="marquee-sub">NOW SEATING · DAYLIGHT ONLY</span>
        </div>
        <div className="intro-booth">
          <div className="booth-window" />
          <div className="booth-slot" />
          <div className="intro-ticket">🎟 ADMIT ONE</div>
          <div className="booth-sign">BOX OFFICE</div>
        </div>
      </div>
      <div className="curtain curtain-left" />
      <div className="curtain curtain-right" />
      <button className="intro-skip" onClick={() => setLeaving(true)}>Skip ›</button>
    </div>
  );
}
