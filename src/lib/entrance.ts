"use client";
import { useEffect, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { useIntro } from "./intro-context";

/**
 * Generic, attribute-driven entrance. Mark up the DOM and this builds the whole sequence:
 *  data-skel   white cards — scale/fade in first (staggered by DOM order)
 *  data-fill   card contents — fade/slide in after their card
 *  data-split  text split into chars — blur-in typing
 *  data-pop    avatars/icons — elastic pop
 *  data-grow   "x" | "y" — bars growing from their baseline
 *  data-roll   odometer digits (see <Roll/>)
 *  data-tick   progress ticks; [data-on] ones light up in sequence
 */
const q = (root: HTMLElement, s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));

export function prepareEntrance(root: HTMLElement) {
  gsap.set(q(root, "[data-skel]"), { opacity: 0, scale: 0.94, y: 16, transformOrigin: "50% 50%" });
  gsap.set(q(root, "[data-fill]"), { opacity: 0, y: 10 });
  gsap.set(q(root, "[data-split] [data-char]"), { opacity: 0, y: "0.45em", filter: "blur(6px)" });
  gsap.set(q(root, "[data-pop]"), { opacity: 0, scale: 0.4 });
  gsap.set(q(root, '[data-grow="x"]'), { scaleX: 0, transformOrigin: "0% 50%" });
  gsap.set(q(root, '[data-grow="y"]'), { scaleY: 0, transformOrigin: "50% 100%" });
  gsap.set(q(root, "[data-col]"), { yPercent: 0 });
  gsap.set(q(root, "[data-tick][data-on]"), { clearProps: "backgroundColor" });
}

/** Odometer rolls: one full 0-9 revolution, then settle on the target digit. */
export function addRolls(tl: gsap.core.Timeline, rolls: HTMLElement[], at: number) {
  rolls.forEach((el, i) => {
    el.querySelectorAll<HTMLElement>("[data-col]").forEach((col, c) => {
      const idx = 10 + Number(col.dataset.target);
      tl.fromTo(col, { yPercent: 0 }, { yPercent: -(idx / 20) * 100, duration: 1.05 + c * 0.14, ease: "power3.inOut" }, at + i * 0.07);
    });
  });
  return tl;
}

export function playEntrance(root: HTMLElement) {
  prepareEntrance(root);
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(q(root, "[data-skel]"), { opacity: 1, scale: 1, y: 0, duration: 0.75, stagger: 0.055 }, 0);
  tl.to(q(root, "[data-fill]"), { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: "power2.out" }, 0.3);

  q(root, "[data-split]").forEach((el, i) =>
    tl.to(el.querySelectorAll("[data-char]"), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.028 }, 0.3 + i * 0.12),
  );

  tl.to(q(root, "[data-pop]"), { opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.8)" }, 0.5);
  tl.to(q(root, '[data-grow="x"]'), { scaleX: 1, duration: 0.95, stagger: 0.07 }, 0.6);
  tl.to(q(root, '[data-grow="y"]'), { scaleY: 1, duration: 1.0, stagger: 0.08 }, 0.6);

  addRolls(tl, q(root, "[data-roll]"), 0.5);

  tl.to(q(root, "[data-tick][data-on]"), { backgroundColor: "#2fae8a", duration: 0.2, stagger: 0.016, ease: "none" }, 0.75);
  return tl;
}

/** Hook: hide the page's animated parts immediately, then play once the intro says it's ready. */
export function usePageEntrance(ref: RefObject<HTMLElement>) {
  const { ready } = useIntro();
  useLayoutEffect(() => {
    if (ref.current) prepareEntrance(ref.current);
  }, [ref]);
  useEffect(() => {
    if (!ready || !ref.current) return;
    const tl = playEntrance(ref.current);
    return () => { tl.kill(); };
  }, [ready, ref]);
}
