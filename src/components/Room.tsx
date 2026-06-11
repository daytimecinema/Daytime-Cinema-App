import { ReactNode } from 'react';

export type Scene = 'boxoffice' | 'screening' | 'gallery' | 'concessions' | 'posterwall';

/**
 * Themed room banner — each tab is a room of the theater, not a menu.
 * All scenery is CSS placeholder art; real banners drop in per
 * docs/ART-DIRECTION.md §4 without layout changes.
 */
export function RoomHeader({ scene, sign, sub, children }: { scene: Scene; sign: string; sub?: string; children?: ReactNode }) {
  return (
    <header className={`room-head scene-${scene}`}>
      {scene === 'screening' && <div className="beam" />}
      {scene === 'gallery' && (
        <div className="gallery-frames">
          <span /><span /><span />
        </div>
      )}
      {scene === 'posterwall' && (
        <div className="lightboxes">
          <span /><span /><span /><span />
        </div>
      )}
      {scene === 'concessions' && <div className="awning" />}
      {scene === 'boxoffice' && <div className="booth-arch"><i /><i /><i /></div>}
      <div className="room-sign">{sign}</div>
      {sub && <p className="room-sub">{sub}</p>}
      {children}
    </header>
  );
}
