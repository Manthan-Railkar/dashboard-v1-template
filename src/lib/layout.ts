/** Fixed design stage (matches the reference recording). Everything is authored in these px. */
export const STAGE = { w: 1440, h: 810 } as const;
/** Dashboard shell inside the stage */
export const SHELL = { x: 55, y: 14, w: 1330, h: 782, r: 30 } as const;
/** Sidebar, relative to the stage */
export const SIDEBAR = { x: 80, y: 40, w: 57, h: 705 } as const;
/** Centre of the sidebar logo, in stage px — the intro logo flies here and the reveal circle grows from it */
export const LOGO = { x: 108.5, y: 77 } as const;

export function computeStage() {
  const vw = typeof window === "undefined" ? STAGE.w : window.innerWidth;
  const vh = typeof window === "undefined" ? STAGE.h : window.innerHeight;
  const k = Math.min(vw / STAGE.w, vh / STAGE.h);
  return { k, x: (vw - STAGE.w * k) / 2, y: (vh - STAGE.h * k) / 2, vw, vh };
}
