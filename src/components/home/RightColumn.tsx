"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Bell, BellOff, CirclePlus, Eye, Link2, MessageSquare } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Thumb from "@/components/ui/Thumb";
import Card from "@/components/ui/Card";
import { lastVideos, notifications } from "@/lib/data";
import { cn } from "@/lib/cn";

export function RightColumn() {
  return (
    <div className="flex flex-col gap-[20px] w-full h-full">
      <Videos />
      <Notifications />
    </div>
  );
}

function Videos() {
  return (
    <div className="w-full shrink-0">
      <div data-fill className="flex items-center justify-between">
        <h3 className="font-display text-[16px] font-medium text-ink">Last videos</h3>
        <CirclePlus size={15} strokeWidth={1.5} className="text-muted hover:text-ink cursor-pointer transition-colors" />
      </div>
      <div className="mt-[14px] overflow-x-auto pb-[4px]">
        <div className="flex gap-[12px] w-max">
          {lastVideos.map((v, i) => (
            <Card key={i} className="h-[185px] w-[154px] shrink-0 p-[8px]">
              <motion.div whileHover={{ y: -2 }} className="h-full flex flex-col justify-between">
                <div>
                  <div
                    data-fill
                    className="relative flex h-[90px] items-center justify-center rounded-[14px] bg-gradient-to-b from-[#f2f5f4] to-[#e6ecea] dark:from-[#14382e] dark:to-[#0f2c24] transition-colors"
                  >
                    <Thumb tone={v.tone} seed={i + 2} className="h-[80px] w-[124px]" />
                    <span className="absolute bottom-[6px] right-[6px] rounded-full bg-forest-2/90 dark:bg-mint dark:text-forest px-[6px] py-[2px] text-[7px] font-semibold text-white">
                      {v.len}
                    </span>
                  </div>
                  <p data-fill className="mt-[8px] line-clamp-2 px-[3px] text-[9.5px] font-semibold leading-[13px] text-ink">
                    {v.title}
                  </p>
                </div>
                <div data-fill className="mt-[6px] flex items-center justify-between px-[3px] text-[7.5px] text-muted">
                  <span className="flex items-center gap-[3px]">
                    <CalIcon />
                    {v.date}
                  </span>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[2px]">
                      <Eye size={8} />
                      {v.views}
                    </span>
                    <span className="flex items-center gap-[2px]">
                      <MessageSquare size={8} />
                      {v.comments}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const CalIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

function Notifications() {
  const [tab, setTab] = useState("Overview");
  const [muted, setMuted] = useState(false);
  const tabs = ["Overview", "Shared", "Comments"];
  const list =
    tab === "Overview"
      ? notifications
      : tab === "Shared"
      ? notifications.filter((n) => n.tag === "Shared")
      : notifications.filter((n) => n.tag === "Comment");

  return (
    <div className="w-full flex-1 flex flex-col min-h-0">
      <div data-fill className="flex items-center justify-between shrink-0">
        <h3 className="font-display text-[16px] font-medium text-ink">Notifications</h3>
        <div className="flex items-center gap-[10px]">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setMuted(false)}
            className={cn(
              "flex h-[24px] w-[24px] items-center justify-center rounded-full transition-colors",
              !muted ? "bg-forest-2 dark:bg-mint dark:text-forest text-white" : "text-ink/60"
            )}
          >
            <Bell size={11} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setMuted(true)}
            className={cn(
              "flex h-[24px] w-[24px] items-center justify-center rounded-full transition-colors",
              muted ? "bg-forest-2 dark:bg-mint dark:text-forest text-white" : "text-ink/60"
            )}
          >
            <BellOff size={11} />
          </motion.button>
        </div>
      </div>

      <div data-fill className="mt-[12px] flex gap-[16px] border-b border-black/[.06] dark:border-white/[.08] text-[10px] shrink-0">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative pb-[7px] transition-colors",
              tab === t ? "font-medium text-ink" : "text-muted"
            )}
          >
            {t}
            {tab === t && (
              <motion.span
                layoutId="ntab"
                className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-mint-3 dark:bg-mint"
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        key={tab + muted}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-[12px] flex-1 flex flex-col gap-[10px] overflow-y-auto pr-[2px] min-h-[300px]"
      >
        {(muted ? [] : list).map((n) => (
          <div
            key={n.who}
            data-skel
            className="relative flex min-h-[68px] shrink-0 items-center gap-[10px] rounded-[16px] bg-white/90 dark:bg-[#12362c] pl-[12px] pr-[14px] shadow-card dark:shadow-card-dark transition-colors"
          >
            <Avatar name={n.who} size={32} />
            <div className="min-w-0 flex-1 py-[8px]">
              <p className="line-clamp-2 text-[9.5px] font-medium leading-[14px] text-ink">{n.text}</p>
              <p className="mt-[4px] text-[8px] text-muted">{n.tag}</p>
            </div>
            <div className="flex h-full flex-col items-end justify-between py-[12px] shrink-0">
              <span className="flex items-center gap-[4px] rounded-full bg-forest-2 dark:bg-mint dark:text-forest px-[8px] py-[3px] text-[7.5px] font-medium text-white">
                <Link2 size={8} />Link
              </span>
              <span className="text-[7px] text-muted">{n.time}</span>
            </div>
          </div>
        ))}
        {muted && <p className="pt-[30px] text-center text-[10px] text-muted">Notifications are muted.</p>}
      </motion.div>
    </div>
  );
}
