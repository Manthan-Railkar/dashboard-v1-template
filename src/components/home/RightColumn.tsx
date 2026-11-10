"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Bell, BellOff, ChevronLeft, ChevronRight, CirclePlus, Eye, Link2, MessageSquare } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Thumb from "@/components/ui/Thumb";
import Card from "@/components/ui/Card";
import { days, lastVideos, notifications } from "@/lib/data";
import { cn } from "@/lib/cn";

export function RightColumn() {
  return (
    <div className="absolute" style={{ left: 930, top: 30, width: 400, height: 704 }}>
      <Calendar />
      <Videos />
      <Notifications />
    </div>
  );
}

function Calendar() {
  const [sel, setSel] = useState(5);
  return (
    <div className="absolute left-0 top-0 w-[366px]">
      <div data-fill className="flex items-center justify-between">
        <h2 className="font-display text-[28px] font-medium leading-none tracking-[-0.6px]">November, 2026</h2>
        <div className="flex gap-[8px]">
          {[ChevronLeft, ChevronRight].map((I, i) => (
            <motion.button key={i} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.08 }} className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/90 shadow-[0_6px_14px_-6px_rgba(18,70,56,.35)]"><I size={14} /></motion.button>
          ))}
        </div>
      </div>
      <div className="mt-[22px] flex justify-between pl-[3px] pr-[3px]">
        {days.map((d, i) => (
          <button key={d.n} data-fill onClick={() => setSel(i)} className="relative flex h-[58px] w-[40px] flex-col items-center justify-center text-[9px] text-muted">
            {sel === i && <motion.span layoutId="day" className="absolute inset-0 rounded-[11px] bg-forest-2 shadow-[0_10px_18px_-8px_rgba(8,40,31,.7)]" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
            <span className={cn("relative", sel === i && "text-white/70")}>{d.d}</span>
            <span className={cn("relative mt-[5px] font-display text-[14px] font-medium", sel === i ? "text-white" : "text-ink")}>{d.n}</span>
            <span className="relative mt-[3px] flex h-[3px] gap-[2px]">{Array.from({ length: d.dots }, (_, k) => <i key={k} className={cn("h-[2px] w-[2px] rounded-full", sel === i ? "bg-white/70" : "bg-muted/60")} />)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Videos() {
  return (
    <div className="absolute left-0 w-[400px]" style={{ top: 143 }}>
      <div data-fill className="flex w-[366px] items-center justify-between">
        <h3 className="font-display text-[16px] font-medium text-ink/80">Last videos</h3>
        <CirclePlus size={15} strokeWidth={1.5} />
      </div>
      <motion.div drag="x" dragConstraints={{ left: -180, right: 0 }} dragElastic={0.12} className="mt-[17px] flex w-max cursor-grab gap-[14px] active:cursor-grabbing">
        {lastVideos.map((v, i) => (
          <Card key={i} className="h-[180px] w-[146px] shrink-0 p-[8px]">
            <motion.div whileHover={{ y: -2 }} className="h-full">
              <div data-fill className="relative flex h-[88px] items-center justify-center rounded-[14px] bg-gradient-to-b from-[#f2f5f4] to-[#e6ecea]">
                <Thumb tone={v.tone} seed={i + 2} className="h-[78px] w-[120px]" />
                <span className="absolute bottom-[6px] right-[6px] rounded-full bg-forest-2/90 px-[6px] py-[2px] text-[7px] font-semibold text-white">{v.len}</span>
              </div>
              <p data-fill className="mt-[9px] line-clamp-3 px-[3px] text-[9.5px] font-semibold leading-[12px]">{v.title}</p>
              <div data-fill className="mt-[8px] flex items-center gap-[8px] px-[3px] text-[7.5px] text-muted">
                <span className="flex items-center gap-[3px]"><CalIcon />{v.date}</span>
                <span className="flex items-center gap-[3px]"><Eye size={8} />{v.views}</span>
                <span className="flex items-center gap-[3px]"><MessageSquare size={8} />{v.comments}</span>
              </div>
            </motion.div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
const CalIcon = () => <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>;

function Notifications() {
  const [tab, setTab] = useState("Overview");
  const [muted, setMuted] = useState(false);
  const tabs = ["Overview", "Shared", "Comments"];
  const list = tab === "Overview" ? notifications : tab === "Shared" ? notifications.filter((n) => n.tag === "Shared") : notifications.filter((n) => n.tag === "Comment");
  return (
    <div className="absolute left-0 w-[366px]" style={{ top: 384 }}>
      <div data-fill className="flex items-center justify-between">
        <h3 className="font-display text-[16px] font-medium text-ink/90">Notifications</h3>
        <div className="flex items-center gap-[10px]">
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => setMuted(false)} className={cn("flex h-[24px] w-[24px] items-center justify-center rounded-full transition-colors", !muted ? "bg-forest-2 text-white" : "text-ink/60")}><Bell size={11} /></motion.button>
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => setMuted(true)} className={cn("flex h-[24px] w-[24px] items-center justify-center rounded-full transition-colors", muted ? "bg-forest-2 text-white" : "text-ink/60")}><BellOff size={11} /></motion.button>
        </div>
      </div>
      <div data-fill className="mt-[14px] flex gap-[16px] border-b border-black/[.06] text-[10px]">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("relative pb-[7px] transition-colors", tab === t ? "font-medium text-ink" : "text-muted")}>
            {t}
            {tab === t && <motion.span layoutId="ntab" className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-mint-3" />}
          </button>
        ))}
      </div>
      <motion.div key={tab + muted} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="mt-[12px] flex h-[246px] flex-col gap-[10px] overflow-hidden">
        {(muted ? [] : list).map((n) => (
          <div key={n.who} data-skel className="relative flex h-[68px] shrink-0 items-center gap-[10px] rounded-[16px] bg-white/90 pl-[10px] pr-[12px] shadow-card">
            <Avatar name={n.who} size={30} />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-[9.5px] font-medium leading-[13px]">{n.text}</p>
              <p className="mt-[5px] text-[7.5px] text-muted">{n.tag}</p>
            </div>
            <div className="flex h-full flex-col items-end justify-between py-[12px]">
              <span className="flex items-center gap-[4px] rounded-full bg-forest-2 px-[7px] py-[3px] text-[7.5px] font-medium text-white"><Link2 size={8} />Link</span>
              <span className="text-[7px] text-muted">{n.time}</span>
            </div>
          </div>
        ))}
        {muted && <p className="pt-[30px] text-center text-[10px] text-muted">Notifications are muted.</p>}
      </motion.div>
    </div>
  );
}
