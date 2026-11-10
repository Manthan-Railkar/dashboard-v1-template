/** Brand mark: two slanted bars + a short tick. Drawn with strokes so the intro can "draw" it. */
export default function Logo({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={(size * 24) / 28} viewBox="0 0 28 24" fill="none" className={className} aria-label="Team Workspace">
      <g stroke="currentColor" strokeWidth="3.4" strokeLinecap="round">
        <path data-logo-bar d="M4.6 19.6 9.4 5.6" />
        <path data-logo-bar d="M12.4 19.6 17.2 5.6" />
        <path data-logo-bar d="M21 9 23.4 3.6" strokeWidth="2.8" />
      </g>
    </svg>
  );
}
