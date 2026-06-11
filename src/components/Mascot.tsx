export type MascotPose = 'welcome' | 'point' | 'popcorn' | 'think' | 'cheer';

/**
 * "Reely" — the film-reel usher. CSS/SVG placeholder until the illustrated
 * character sheet lands (docs/ART-DIRECTION.md §1); poses map 1:1 to the
 * commissioned set so swapping in real art is a one-file change.
 */
export function Mascot({ pose = 'welcome', size = 130 }: { pose?: MascotPose; size?: number }) {
  // arm endpoints per pose: [leftX, leftY, rightX, rightY] from shoulders (55,118)/(145,118)
  const arms: Record<MascotPose, [number, number, number, number]> = {
    welcome: [28, 150, 178, 78],
    point: [30, 152, 172, 52],
    popcorn: [55, 168, 145, 168],
    think: [30, 152, 138, 70],
    cheer: [22, 60, 178, 60],
  };
  const [lx, ly, rx, ry] = arms[pose];
  const holes = [0, 1, 2, 3, 4].map((i) => {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    return { cx: 100 + 44 * Math.cos(a), cy: 108 + 44 * Math.sin(a) };
  });
  return (
    <svg
      className={`mascot mascot-${pose}`}
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      role="img"
      aria-label="Reely, the club usher"
    >
      {/* film tail */}
      <path d="M158 160 q30 18 18 46" fill="none" stroke="#3b2f1d" strokeWidth="10" strokeLinecap="round" />
      <path d="M158 160 q30 18 18 46" fill="none" stroke="#ffce54" strokeWidth="2" strokeDasharray="3 5" />
      {/* legs */}
      <line x1="82" y1="172" x2="78" y2="210" stroke="#1b2228" strokeWidth="9" strokeLinecap="round" />
      <line x1="118" y1="172" x2="122" y2="210" stroke="#1b2228" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="72" cy="216" rx="16" ry="8" fill="#ff8000" />
      <ellipse cx="128" cy="216" rx="16" ry="8" fill="#ff8000" />
      {/* arms */}
      <line x1="58" y1="120" x2={lx} y2={ly} stroke="#1b2228" strokeWidth="9" strokeLinecap="round" />
      <line x1="142" y1="120" x2={rx} y2={ry} stroke="#1b2228" strokeWidth="9" strokeLinecap="round" />
      <circle cx={lx} cy={ly} r="9" fill="#fff" />
      <circle cx={rx} cy={ry} r="9" fill="#fff" />
      {/* reel body */}
      <circle cx="100" cy="108" r="64" fill="#2c3440" stroke="#ffce54" strokeWidth="5" />
      {holes.map((h, i) => (
        <circle key={i} cx={h.cx} cy={h.cy} r="11" fill="#14181c" stroke="#3a4654" strokeWidth="2" />
      ))}
      {/* face hub */}
      <circle cx="100" cy="108" r="27" fill="#fdf3da" stroke="#ffce54" strokeWidth="3" />
      <circle cx="91" cy="103" r="3.4" fill="#14181c" />
      <circle cx="109" cy="103" r="3.4" fill="#14181c" />
      {pose === 'think'
        ? <path d="M92 119 h16" stroke="#14181c" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        : <path d="M90 114 q10 10 20 0" stroke="#14181c" strokeWidth="2.6" strokeLinecap="round" fill="none" />}
      {/* bow tie */}
      <path d="M88 170 l10 6 l-10 6 z M112 170 l-10 6 l10 6 z" fill="#ff8000" />
      {pose === 'popcorn' && (
        <g>
          <path d="M84 150 l8 26 h16 l8 -26 z" fill="#fff" stroke="#d33" strokeWidth="2" />
          <path d="M86 150 h28" stroke="#d33" strokeWidth="3" />
          <circle cx="92" cy="146" r="4" fill="#ffce54" />
          <circle cx="100" cy="143" r="4" fill="#fdf3da" />
          <circle cx="108" cy="146" r="4" fill="#ffce54" />
        </g>
      )}
    </svg>
  );
}
