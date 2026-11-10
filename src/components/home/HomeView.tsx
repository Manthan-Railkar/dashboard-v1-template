"use client";
import { useRef } from "react";
import { usePageEntrance } from "@/lib/entrance";
import { Banner, Members, DataCard, ImpactCard, Statistics, Brainstorm, Upgrade } from "./Cards";
import { RightColumn } from "./RightColumn";

export default function HomeView() {
  const ref = useRef<HTMLDivElement>(null);
  usePageEntrance(ref);

  return (
    <div ref={ref} data-page className="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div
        className="relative flex flex-col xl:flex-row gap-[24px] w-full min-h-full"
        style={{ padding: "24px 32px 32px 110px" }}
      >
        {/* Left main workspace column */}
        <div className="flex-1 min-w-0 flex flex-col gap-[20px]">
          <Banner />
          <div className="flex flex-wrap lg:flex-nowrap gap-[20px] w-full">
            <Members />
            <DataCard />
            <ImpactCard />
          </div>
          <div className="flex flex-wrap lg:flex-nowrap gap-[20px] w-full">
            <Statistics />
            <div className="flex w-full lg:w-[320px] shrink-0 flex-col gap-[18px]">
              <Brainstorm />
              <Upgrade />
            </div>
          </div>
        </div>

        {/* Right activity & media column (calendar removed, adjusted to fit full height) */}
        <div className="w-full xl:w-[400px] shrink-0 flex flex-col">
          <RightColumn />
        </div>
      </div>
    </div>
  );
}
