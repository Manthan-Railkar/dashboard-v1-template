"use client";
import { useRef, useState, type ReactNode } from "react";
import { IntroContext } from "@/lib/intro-context";
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
      {/* the dashboard, occupying the entire screen, revealed by the expanding intro circle */}
      <div ref={revealRef} className="fixed inset-0 z-10" style={{ clipPath: "circle(0px at 0px 0px)" }}>
        <Shell>{children}</Shell>
      </div>
      <Intro bgRef={bgRef} revealRef={revealRef} onReady={() => setReady(true)} />
    </IntroContext.Provider>
  );
}
