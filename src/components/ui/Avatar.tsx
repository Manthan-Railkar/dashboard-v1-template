"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";

const TONES = [
  ["#f6d3b8", "#e9a77c"],
  ["#cfe3d8", "#8fbfa8"],
  ["#f1dcc6", "#c9996f"],
  ["#d9d4ec", "#a39ad0"],
  ["#f7e0a8", "#d9a84a"],
  ["#cde4ee", "#84b4cc"],
];
const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

export default function Avatar({
  name,
  size = 40,
  ring,
  dot,
  className,
  src,
}: {
  name: string;
  size?: number;
  ring?: boolean;
  dot?: boolean;
  className?: string;
  src?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const [a, b] = TONES[hash(name) % TONES.length];
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <span className={cn("relative inline-block shrink-0", className)} style={{ width: size, height: size }}>
      <span
        className={cn(
          "block h-full w-full overflow-hidden rounded-full transition-colors",
          ring && "ring-2 ring-mint ring-offset-2 ring-offset-white dark:ring-offset-[#103028]"
        )}
        style={{ background: `linear-gradient(145deg, ${a}, ${b})` }}
      >
        {src && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            className="h-full w-full object-cover"
            draggable={false}
            onError={() => setImgError(true)}
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center font-medium text-white/90 select-none"
            style={{ fontSize: size * 0.34 }}
            aria-label={name}
          >
            {initials}
          </span>
        )}
      </span>
      {dot && (
        <span className="absolute bottom-[2px] right-[2px] h-[9px] w-[9px] rounded-full border-2 border-white dark:border-[#103028] bg-mint-3 transition-colors" />
      )}
    </span>
  );
}
