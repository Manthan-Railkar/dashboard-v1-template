import { cn } from "@/lib/cn";

/** Odometer number. Every digit is a 0-9-0-9 column; the entrance engine rolls it to its target. */
export default function Roll({ value, className }: { value: string; className?: string }) {
  return (
    <span data-roll aria-label={value} className={cn("inline-flex leading-[1.1] tabular-nums", className)}>
      {[...value].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} aria-hidden className="inline-block h-[1.1em] overflow-hidden">
            <span data-col data-target={ch} className="flex flex-col will-change-transform">
              {Array.from({ length: 20 }, (_, n) => (
                <span key={n} className="block h-[1.1em] text-center leading-[1.1em]">{n % 10}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden className="inline-block h-[1.1em] whitespace-pre leading-[1.1em]">{ch}</span>
        ),
      )}
    </span>
  );
}
