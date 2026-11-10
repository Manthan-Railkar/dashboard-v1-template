"use client";
import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import Logo from "./Logo";
import { LOGO, computeStage } from "@/lib/layout";

/**
 * Timeline (seconds):
 *  0.00  logo draws in on the dark vignette, caption fades up, glow breathes
 *  0.55  caption leaves, logo flies to the sidebar slot (top-left)
 *  1.00  mint circle expands from the logo and reveals the dashboard
 *  1.25  pages receive `ready` → skeleton cards, typing, counters, bars
 *  1.90  intro layer removed
 */
export default function Intro({
  bgRef, revealRef, onReady,
}: { bgRef: RefObject<HTMLDivElement>; revealRef: RefObject<HTMLDivElement>; onReady: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reveal = revealRef.current!, bg = bgRef.current!, el = wrap.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { reveal.style.clipPath = "none"; bg.style.display = "none"; el.style.display = "none"; onReady(); return; }

    const { k, x, y, vw, vh } = computeStage();
    const cx = x + LOGO.x * k, cy = y + LOGO.y * k;
    const R = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy)) + 24;
    const proxy = { r: 0 };
    const clip = () => { reveal.style.clipPath = `circle(${proxy.r}px at ${cx}px ${cy}px)`; };

    const ctx = gsap.context(() => {
      clip();
      const bars = el.querySelectorAll<SVGPathElement>("[data-logo-bar]");
      bars.forEach((b) => { const l = b.getTotalLength(); gsap.set(b, { strokeDasharray: l, strokeDashoffset: l }); });
      gsap.set(el, { x: vw / 2, y: vh / 2 - 10 * k, xPercent: -50, yPercent: -50, scale: k * 1.5, opacity: 1 });
      gsap.set(caption.current, { opacity: 0, y: 8 });

      const tl = gsap.timeline();
      tl.to(bars, { strokeDashoffset: 0, duration: 0.55, stagger: 0.1, ease: "power2.out" }, 0.05)
        .to(caption.current, { opacity: 0.85, y: 0, duration: 0.6, ease: "power2.out" }, 0.25)
        .fromTo(glow.current, { scale: 0.9, opacity: 0.6 }, { scale: 1.12, opacity: 1, duration: 1.6, ease: "sine.inOut" }, 0)
        .to(caption.current, { opacity: 0, y: 6, duration: 0.25, ease: "power2.in" }, 0.5)
        .to(el, { x: cx, y: cy, scale: k, duration: 0.55, ease: "power3.inOut" }, 0.55)
        .to(glow.current, { opacity: 0, duration: 0.4 }, 0.6)
        .to(proxy, { r: R, duration: 0.9, ease: "power2.inOut", onUpdate: clip }, 1.0)
        .call(onReady, undefined, 1.25)
        .to(bg, { opacity: 0, duration: 0.3 }, 1.7)
        .set(el, { display: "none" }, 1.9)
        .call(() => { reveal.style.clipPath = "none"; bg.style.display = "none"; }, undefined, 1.95);
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrap} className="pointer-events-none fixed left-0 top-0 z-30 text-[#c9f6e8] opacity-0" style={{ width: 28 }}>
      <div ref={glow} className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(40,150,115,.28) 0%, transparent 62%)" }} />
      <Logo size={28} className="relative drop-shadow-[0_0_14px_rgba(127,224,192,.55)]" />
      <p ref={caption} className="absolute left-1/2 top-full mt-[10px] -translate-x-1/2 whitespace-nowrap font-serif text-[9px] italic tracking-wide text-[#7fb9a6]">
        Team Workspace
      </p>
    </div>
  );
}
