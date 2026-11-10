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
  gsap.set(q(root, "[data-skel]"), { opacity: 0, scale: 0.96, y: 12, transformOrigin: "50% 50%" });
  gsap.set(q(root, "[data-fill]"), { opacity: 0, y: 8 });
  gsap.set(q(root, "[data-split] [data-char]"), { opacity: 0, y: "0.3em", filter: "blur(4px)" });
  gsap.set(q(root, "[data-pop]"), { opacity: 0, scale: 0.6 });
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
      tl.fromTo(col, { yPercent: 0 }, { yPercent: -(idx / 20) * 100, duration: 0.8 + c * 0.1, ease: "power3.inOut" }, at + i * 0.05);
    });
  });
  return tl;
}

export function playEntrance(root: HTMLElement, fast = false) {
  prepareEntrance(root);
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  const skelDur = fast ? 0.35 : 0.6;
  const skelStagger = fast ? 0.025 : 0.045;
  const fillDur = fast ? 0.28 : 0.45;

  tl.to(q(root, "[data-skel]"), { opacity: 1, scale: 1, y: 0, duration: skelDur, stagger: skelStagger }, 0);
  tl.to(q(root, "[data-fill]"), { opacity: 1, y: 0, duration: fillDur, stagger: 0.02, ease: "power2.out" }, fast ? 0.1 : 0.2);

  q(root, "[data-split]").forEach((el, i) =>
    tl.to(el.querySelectorAll("[data-char]"), { opacity: 1, y: 0, filter: "blur(0px)", duration: fast ? 0.3 : 0.45, stagger: fast ? 0.015 : 0.025 }, (fast ? 0.1 : 0.2) + i * 0.08),
  );

  tl.to(q(root, "[data-pop]"), { opacity: 1, scale: 1, duration: fast ? 0.35 : 0.5, stagger: 0.03, ease: "back.out(1.6)" }, fast ? 0.15 : 0.3);
  tl.to(q(root, '[data-grow="x"]'), { scaleX: 1, duration: fast ? 0.5 : 0.8, stagger: 0.04 }, fast ? 0.2 : 0.4);
  tl.to(q(root, '[data-grow="y"]'), { scaleY: 1, duration: fast ? 0.5 : 0.8, stagger: 0.05 }, fast ? 0.2 : 0.4);

  addRolls(tl, q(root, "[data-roll]"), fast ? 0.2 : 0.35);

  tl.to(q(root, "[data-tick][data-on]"), { backgroundColor: "#2fae8a", duration: 0.15, stagger: 0.01, ease: "none" }, fast ? 0.35 : 0.55);
  return tl;
}

/** Track whether the user has finished the initial app entrance */
let initialAppEntranceDone = false;

/** Hook: hide the page's animated parts immediately, then play once the intro says it's ready. */
export function usePageEntrance(ref: RefObject<HTMLElement>) {
  const { ready } = useIntro();

  useLayoutEffect(() => {
    if (ref.current) prepareEntrance(ref.current);
  }, [ref]);

  useEffect(() => {
    if (!ready || !ref.current) return;
    const isSubsequent = initialAppEntranceDone;
    const tl = playEntrance(ref.current, isSubsequent);
    initialAppEntranceDone = true;
    return () => { tl.kill(); };
  }, [ready, ref]);
}
