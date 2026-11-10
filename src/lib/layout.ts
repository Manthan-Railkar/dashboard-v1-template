/** Full-screen layout configuration */
export const STAGE = { w: 1440, h: 810 } as const;
/** Full-screen dashboard shell */
export const SHELL = { x: 0, y: 0, r: 0 } as const;
/** Sidebar positioning relative to viewport */
export const SIDEBAR = { x: 24, y: 24, w: 57, h: 705 } as const;
/** Centre of the sidebar logo in viewport px — the intro logo flies here and the reveal circle grows from it */
export const LOGO = { x: 52.5, y: 61 } as const;

export function computeStage() {
  const vw = typeof window === "undefined" ? 1440 : window.innerWidth;
  const vh = typeof window === "undefined" ? 810 : window.innerHeight;
  return { k: 1, x: 0, y: 0, vw, vh };
}
