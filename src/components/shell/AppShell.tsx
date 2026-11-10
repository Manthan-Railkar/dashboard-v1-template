"use client";
import { useRef, useState, type ReactNode } from "react";
import { IntroContext } from "@/lib/intro-context";
import Stage from "./Stage";
import Shell from "./Shell";
import Intro from "./Intro";

export default function AppShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  return (
    <IntroContext.Provider value={{ ready }}>
      {/* dark vignette under everything */}
      <div ref={bgRef} className="intro-bg fixed inset-0 z-0" />
      {/* the dashboard, hidden behind a circular clip that the intro expands */}
      <div ref={revealRef} className="fixed inset-0 z-10 bg-stage" style={{ clipPath: "circle(0px at 0px 0px)" }}>
        <Stage>
          <Shell>{children}</Shell>
        </Stage>
      </div>
      <Intro bgRef={bgRef} revealRef={revealRef} onReady={() => setReady(true)} />
    </IntroContext.Provider>
  );
}
