"use client";
import { useRef } from "react";
import { usePageEntrance } from "@/lib/entrance";
import { Banner, Members, DataCard, ImpactCard, Statistics, Brainstorm, Upgrade } from "./Cards";
import { RightColumn } from "./RightColumn";

/** Coordinates are shell-relative px taken from the reference recording. */
export default function HomeView() {
  const ref = useRef<HTMLDivElement>(null);
  usePageEntrance(ref);
  return (
    <div ref={ref} data-page className="absolute inset-0">
      <div className="absolute flex flex-col gap-[25px]" style={{ left: 117, top: 30, width: 778 }}>
        <Banner />
        <div className="flex gap-[24px]">
          <Members /><DataCard /><ImpactCard />
        </div>
        <div className="flex gap-[23px]">
          <Statistics />
          <div className="flex w-[332px] flex-col gap-[19px]">
            <Brainstorm /><Upgrade />
          </div>
        </div>
      </div>
      <RightColumn />
    </div>
  );
}
