"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const TONES = [["#f6d3b8", "#e9a77c"], ["#cfe3d8", "#8fbfa8"], ["#f1dcc6", "#c9996f"], ["#d9d4ec", "#a39ad0"], ["#f7e0a8", "#d9a84a"], ["#cde4ee", "#84b4cc"]];
const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

/**
 * Photo avatar. Looks for /public/avatars/<slug>.jpg and falls back to a soft gradient + initials,
 * so the UI is complete even before you drop real photos in.
 */
export default function Avatar({ name, size = 40, ring, dot, className }: { name: string; size?: number; ring?: boolean; dot?: boolean; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const slug = name.toLowerCase().replace(/[^a-z]+/g, "-");
  const [a, b] = TONES[hash(name) % TONES.length];
  // Probe the photo first: initials show until it actually loads (avoids broken-image flashes and pre-hydration errors).
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLoaded(true);
    img.src = `/avatars/${slug}.jpg`;
    return () => { img.onload = null; };
  }, [slug]);
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <span className={cn("relative inline-block shrink-0", className)} style={{ width: size, height: size }}>
      <span
        className={cn("block h-full w-full overflow-hidden rounded-full", ring && "ring-2 ring-mint ring-offset-2 ring-offset-white")}
        style={{ background: `linear-gradient(145deg, ${a}, ${b})` }}
      >
        {loaded ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/avatars/${slug}.jpg`} alt={name} className="h-full w-full object-cover" draggable={false} />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-medium text-white/90" style={{ fontSize: size * 0.34 }} aria-label={name}>{initials}</span>
        )}
      </span>
      {dot && <span className="absolute bottom-[2px] right-[2px] h-[9px] w-[9px] rounded-full border-2 border-white bg-mint-3" />}
    </span>
  );
}
