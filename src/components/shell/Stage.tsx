"use client";
import { useLayoutEffect, useState, type ReactNode } from "react";
import { STAGE, computeStage } from "@/lib/layout";

/** Fixed 1440×810 design canvas, uniformly scaled + centred to fit any viewport (letterboxed). */
export default function Stage({ children }: { children: ReactNode }) {
  const [m, setM] = useState({ k: 1, x: 0, y: 0, ok: false });
  useLayoutEffect(() => {
    const f = () => { const { k, x, y } = computeStage(); setM({ k, x, y, ok: true }); };
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return (
    <div
      style={{
        position: "absolute", left: 0, top: 0, width: STAGE.w, height: STAGE.h,
        transform: `translate(${m.x}px, ${m.y}px) scale(${m.k})`, transformOrigin: "0 0",
        visibility: m.ok ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
}
