"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { addRolls } from "@/lib/entrance";
import { motion } from "motion/react";
import { ArrowRight, Check, CirclePlus, Layers, X, Zap, Plus } from "lucide-react";
import Card from "@/components/ui/Card";
import Roll from "@/components/ui/Roll";
import Split from "@/components/ui/Split";
import Avatar from "@/components/ui/Avatar";
import { bannerFaces, members } from "@/lib/data";
import { cn } from "@/lib/cn";

/* ───────────── Banner ───────────── */
export function Banner() {
  return (
    <div
      data-skel
      className="relative min-h-[127px] w-full overflow-hidden rounded-[20px] px-[24px] py-[20px] flex flex-col md:flex-row md:items-center justify-between gap-[16px]"
      style={{
        background: "linear-gradient(100deg,#103a30 0%,#1a4a3d 62%,#164237 100%)",
        boxShadow: "0 18px 34px -18px rgba(8,40,31,.6), inset 0 1px 0 rgba(255,255,255,.08)",
      }}
    >
      <div className="flex-1 max-w-[460px]">
        <h2 className="font-display text-[26px] font-light leading-none tracking-[-0.2px] text-[#e8f6f1]">
          <Split label="Work’s always better together">
            Work’s always <em className="font-serif text-[30px] font-normal italic text-[#f2b784]">better</em> together
          </Split>
        </h2>
        <p data-fill className="mt-[12px] text-[11px] leading-[16px] text-[#86b0a3]">
          Add teammates and you’ll be able to collaborate and quickly get a sense of what’s happening at work.
        </p>
      </div>

      <div className="flex items-center gap-[20px] shrink-0">
        <motion.button
          data-fill
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-[36px] items-center gap-[7px] rounded-full bg-peach px-[16px] text-[11px] font-medium text-forest shadow-[0_8px_18px_-8px_rgba(243,168,119,.8)]"
        >
          <CirclePlus size={13} strokeWidth={2} /> Add member
        </motion.button>

        <div data-fill className="flex flex-col items-end gap-[8px]">
          <div className="flex items-center">
            <span className="mr-[8px] text-[9px] text-[#86b0a3]">+2</span>
            {bannerFaces.map((n) => (
              <span key={n} data-pop className="-ml-[8px] rounded-full border-2 border-[#1a4a3d] first:ml-0">
                <Avatar name={n} size={34} />
              </span>
            ))}
          </div>
          <span className="flex items-center gap-[6px] text-[9px] text-[#a9cfc2]">
            <i className="h-[5px] w-[5px] rounded-full bg-peach" /> 4 online now
          </span>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Members ───────────── */
export function Members() {
  return (
    <Card className="h-[202px] flex-1 min-w-[280px] overflow-hidden px-[18px] pt-[16px]">
      <div data-fill className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <h3 className="font-display text-[16px] font-medium text-ink">Members</h3>
          <span className="flex items-center gap-[3px] rounded-full bg-mint-2 dark:bg-mint-3/20 px-[6px] py-[1px] text-[8px] font-semibold text-mint-4 dark:text-mint">
            <i className="h-[4px] w-[4px] rounded-full bg-mint-3" />4
          </span>
        </div>
        <CirclePlus size={15} strokeWidth={1.5} className="text-muted hover:text-ink cursor-pointer transition-colors" />
      </div>
      <div className="mt-[14px] grid grid-cols-3 gap-x-[8px] gap-y-[10px]">
        {members.map((m, i) => (
          <motion.div key={m} data-pop whileHover={{ y: -3 }} className="flex flex-col items-center">
            <Avatar name={m} size={60} ring={i === 0} dot={i < 2} />
            <p className="mt-[6px] text-center text-[10px] font-medium leading-[11px] text-ink">
              {m.split(" ")[0]}
              <br />
              {m.split(" ")[1]}
            </p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

/* ───────────── Data ───────────── */
export function DataCard() {
  return (
    <Card className="h-[202px] flex-1 min-w-[220px] px-[18px] pt-[16px]">
      <div data-fill className="flex items-center justify-between text-[11px] text-muted">
        <span>Data</span>
        <ArrowRight size={14} className="text-ink" />
      </div>
      <Roll value="10,4h" className="mt-[16px] font-display text-[40px] font-medium tracking-[-1px] text-ink" />
      <div data-fill className="mt-[16px] flex text-[8px] text-muted">
        <span style={{ width: "60%" }}>6h14m</span>
        <span style={{ width: "28%" }}>2h54m</span>
        <span>74m</span>
      </div>
      <div className="mt-[4px] flex h-[9px] gap-[3px]">
        <i data-grow="x" className="block rounded-full bg-mint-4" style={{ width: "60%" }} />
        <i data-grow="x" className="block rounded-full bg-mint" style={{ width: "28%" }} />
        <i data-grow="x" className="block rounded-full bg-peach" style={{ width: "12%" }} />
      </div>
      <div data-fill className="mt-[8px] flex text-[8px] font-medium text-ink/80">
        <span className="flex items-center gap-[4px]" style={{ width: "60%" }}>
          <i className="h-[5px] w-[5px] rounded-full bg-mint-4" />60%
        </span>
        <span className="flex items-center gap-[4px]" style={{ width: "28%" }}>
          <i className="h-[5px] w-[5px] rounded-full bg-mint" />28%
        </span>
        <span className="flex items-center gap-[4px]">
          <i className="h-[5px] w-[5px] rounded-full bg-peach" />12%
        </span>
      </div>
    </Card>
  );
}

/* ───────────── Impact ───────────── */
export function ImpactCard() {
  const [tab, setTab] = useState<"impact" | "engagement">("impact");
  const bars = tab === "impact" ? [56, 128, 90] : [96, 62, 118];
  return (
    <Card className="relative h-[202px] flex-1 min-w-[160px] px-[14px] pt-[16px]">
      <div data-fill className="flex gap-[10px] text-[10px]">
        {(["impact", "engagement"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn("capitalize transition-colors", tab === t ? "font-medium text-ink" : "text-muted/80")}
          >
            {t === "impact" ? "Impact" : "Engagement"}
          </button>
        ))}
      </div>
      <div className="absolute bottom-[18px] left-[14px] right-[14px] flex h-[138px] items-end justify-between">
        {bars.map((h, i) => (
          <div key={i} className="relative flex h-full items-end">
            {i === 1 && (
              <motion.span
                key={tab}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-forest-2 dark:bg-mint dark:text-forest px-[6px] py-[2px] text-[8px] font-semibold text-white"
                style={{ bottom: h + 6 }}
              >
                {tab === "impact" ? "+66%" : "+41%"}
              </motion.span>
            )}
            <motion.i
              data-grow="y"
              animate={{ height: h }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
              className="block w-[30px] rounded-full"
              style={{
                background:
                  i === 1 ? "linear-gradient(180deg,#2fae8a,#7fe0c0)" : "linear-gradient(180deg,#f9cdb0,#fbdcc7)",
                boxShadow: i === 1 ? "0 10px 18px -8px rgba(47,174,138,.7)" : undefined,
              }}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ───────────── Statistics ───────────── */
export function Statistics() {
  const [mode, setMode] = useState<"Weekly" | "Monthly">("Weekly");
  const stats = mode === "Weekly" ? { a: "49", b: "83", p: 23, q: 16 } : { a: "212", b: "340", p: 91, q: 38 };
  const filled = Math.round((Number(stats.a) / Number(stats.b)) * 46);
  const body = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const tl = gsap.timeline();
    addRolls(tl, Array.from(body.current!.querySelectorAll<HTMLElement>("[data-roll]")), 0);
    gsap.fromTo(
      body.current!.querySelectorAll("[data-tick]"),
      { scaleY: 0.4 },
      { scaleY: 1, duration: 0.4, stagger: 0.008, ease: "back.out(2)" }
    );
    return () => {
      tl.kill();
    };
  }, [mode]);

  return (
    <Card className="h-[326px] flex-1 min-w-[340px] px-[19px] pt-[19px]">
      <div data-fill className="flex items-center justify-between">
        <h3 className="font-display text-[16px] font-medium text-ink">Statistics</h3>
        <div className="relative flex rounded-full bg-black/[.05] dark:bg-white/[.08] p-[2px] text-[10px]">
          {(["Weekly", "Monthly"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "relative z-10 rounded-full px-[10px] py-[4px] transition-colors",
                mode === m ? "text-white dark:text-forest font-medium" : "text-muted"
              )}
            >
              {mode === m && (
                <motion.span
                  layoutId="stat-toggle"
                  className="absolute inset-0 -z-10 rounded-full bg-forest-2 dark:bg-mint"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {m}
            </button>
          ))}
        </div>
      </div>
      <div ref={body}>
        <div className="mt-[10px] flex items-end gap-[8px]">
          <Roll key={mode + "a"} value={stats.a} className="font-display text-[36px] font-normal tracking-[-1px] text-ink" />
          <span className="mb-[6px] h-[26px] w-px bg-black/15 dark:bg-white/15" />
          <Roll key={mode + "b"} value={stats.b} className="font-display text-[36px] font-normal tracking-[-1px] text-ink" />
          <span data-fill className="mb-[8px] ml-[2px] text-[10px] text-muted">
            tasks complete...
          </span>
        </div>
        <div className="mt-[10px] flex h-[16px] gap-[3px]">
          {Array.from({ length: 46 }, (_, i) => (
            <i
              key={i}
              data-tick
              {...(i < filled ? { "data-on": "" } : {})}
              className="block flex-1 rounded-[1.5px] bg-black/[.08] dark:bg-white/[.08]"
            />
          ))}
        </div>
        <div className="mt-[16px] flex gap-[14px]">
          {[
            { n: stats.p, l: "Project complete", Icon: Layers },
            { n: stats.q, l: "Project in progress", Icon: null },
          ].map(({ n, l, Icon }) => (
            <motion.div
              key={l}
              data-fill
              whileHover={{ y: -3 }}
              className="flex h-[141px] flex-1 flex-col items-center justify-center rounded-[18px] bg-[#e9efec] dark:bg-[#12382f] transition-colors"
            >
              {Icon ? (
                <Icon size={34} strokeWidth={1.2} className="text-[#6b8a80] dark:text-mint/70" />
              ) : (
                <span className="relative h-[34px] w-[34px]">
                  <i className="absolute left-0 top-[6px] h-[22px] w-[22px] rounded-full border border-[#6b8a80] dark:border-mint/60" />
                  <i className="absolute left-[11px] top-[2px] h-[22px] w-[22px] rounded-full bg-mint/90" />
                </span>
              )}
              <Roll value={String(n)} className="mt-[12px] font-display text-[20px] font-medium text-ink" />
              <span className="mt-[4px] text-[9px] text-muted">{l}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ───────────── Brainstorm (dark) ───────────── */
export function Brainstorm() {
  return (
    <div
      data-skel
      className="relative h-[94px] rounded-[20px] bg-[#1d4a3e] dark:bg-[#11382e] p-[18px] shadow-[0_18px_30px_-16px_rgba(8,40,31,.6)] dark:shadow-[0_18px_30px_-16px_rgba(0,0,0,.7)] transition-colors"
    >
      <div className="flex h-[58px] items-center gap-[12px] rounded-full bg-gradient-to-b from-white to-[#e9f1ee] dark:from-[#1b4a3e] dark:to-[#143a31] pl-[14px] pr-[10px] shadow-[0_8px_16px_-8px_rgba(0,0,0,.4)] transition-all">
        <span data-fill className="flex h-[24px] w-[24px] items-center justify-center rounded-[7px] bg-mint-2 dark:bg-mint/20">
          <i className="h-[8px] w-[8px] rounded-[2px] bg-mint-4 dark:bg-mint" />
        </span>
        <div data-fill className="flex-1 leading-none">
          <p className="text-[10.5px] font-semibold text-ink">Breakthrough Brainstorm</p>
          <p className="mt-[5px] text-[8px] text-muted">12:45 pm</p>
        </div>
        <motion.button
          data-pop
          whileTap={{ scale: 0.88 }}
          className="relative flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#eef2f0] dark:bg-[#163f35] text-ink"
        >
          <svg className="absolute inset-0" viewBox="0 0 34 34">
            <circle
              cx="17"
              cy="17"
              r="15"
              fill="none"
              stroke="#2fae8a"
              strokeWidth="2"
              strokeDasharray="60 100"
              strokeLinecap="round"
              transform="rotate(-90 17 17)"
            />
          </svg>
          <X size={11} />
        </motion.button>
      </div>
    </div>
  );
}

/* ───────────── Upgrade ───────────── */
export function Upgrade() {
  return (
    <Card className="relative h-[213px] w-full overflow-hidden">
      <div
        data-fill
        className="absolute bottom-[10px] left-[18px] top-[10px] w-[110px] rounded-[14px] p-[12px] bg-gradient-to-b from-[#bdeedd] via-[#d8f2e8] to-[#fbdcc7] dark:from-[#163f35] dark:via-[#13352c] dark:to-[#1e342c] transition-colors"
      >
        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[8px] bg-forest-2 dark:bg-mint dark:text-forest text-white">
          <Zap size={12} />
        </span>
        <p className="mt-[8px] font-display text-[15px] font-semibold text-ink">Pro</p>
        <ul className="mt-[10px] space-y-[8px] text-[8px] text-ink/80">
          {["Unlimited team", "1 TB storage", "4K videos"].map((t) => (
            <li key={t} className="flex items-center gap-[5px]">
              <Check size={9} className="text-mint-4 dark:text-mint" strokeWidth={3} />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute left-[142px] right-[18px] top-[18px]">
        <h3 data-fill className="font-display text-[20px] font-medium leading-[22px] text-ink">
          Unleash Your Potential
        </h3>
        <p data-fill className="mt-[10px] text-[10px] leading-[14px] text-muted">
          Indulge in the ultimate subscription
        </p>
      </div>
      <motion.button
        data-fill
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="absolute bottom-[16px] right-[18px] flex h-[34px] items-center gap-[7px] rounded-full bg-mint px-[16px] text-[10.5px] font-semibold text-forest shadow-[0_10px_18px_-8px_rgba(47,174,138,.8)]"
      >
        <Plus size={13} strokeWidth={2.4} /> Upgrade plan
      </motion.button>
    </Card>
  );
}
