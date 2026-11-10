"use client";
import { useId } from "react";

const TONES = {
  teal: ["#8fd9c9", "#2c8f7e", "#0f5b4f"],
  blue: ["#a9d2f0", "#3f86c4", "#1d4f87"],
  red: ["#f0b79e", "#c9583d", "#8a2f1f"],
  slate: ["#b9cbd0", "#5f7a82", "#2f4a52"],
} as const;
export type ThumbTone = keyof typeof TONES;

/** Stand-in for the 3D "brain" renders: displaced, lit blob on a soft floor shadow. Swap for <Image/> when you have the real renders. */
export default function Thumb({ tone = "teal", seed = 3, className }: { tone?: ThumbTone; seed?: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  const [hi, mid, lo] = TONES[tone];
  return (
    <svg viewBox="0 0 140 90" className={className} aria-hidden>
      <defs>
        <radialGradient id={`g${id}`} cx="35%" cy="28%" r="80%">
          <stop offset="0" stopColor={hi} /><stop offset=".55" stopColor={mid} /><stop offset="1" stopColor={lo} />
        </radialGradient>
        <filter id={`f${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="3" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="11" />
        </filter>
        <filter id={`b${id}`}><feGaussianBlur stdDeviation="3.5" /></filter>
      </defs>
      <ellipse cx="70" cy="76" rx="38" ry="5" fill="#0b2b23" opacity=".14" filter={`url(#b${id})`} />
      <ellipse cx="70" cy="42" rx="31" ry="22" fill={`url(#g${id})`} filter={`url(#f${id})`} />
      <ellipse cx="60" cy="33" rx="12" ry="6" fill="#fff" opacity=".22" filter={`url(#b${id})`} />
    </svg>
  );
}
