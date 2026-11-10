"use client";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Bookmark, ExternalLink, FileText, Folder, Globe, Settings2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Split from "@/components/ui/Split";
import Thumb from "@/components/ui/Thumb";
import Roll from "@/components/ui/Roll";
import { usePageEntrance } from "@/lib/entrance";
import { collections, saved as initial, type SavedItem } from "@/lib/data";
import { cn } from "@/lib/cn";

const FILTERS = ["All", "Videos", "Docs", "Links"] as const;
const kindOf: Record<string, SavedItem["kind"] | null> = { All: null, Videos: "Video", Docs: "Doc", Links: "Link" };

export default function SavedView() {
  const ref = useRef<HTMLDivElement>(null);
  usePageEntrance(ref);
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = useMemo(() => items.filter((i) => !kindOf[filter] || i.kind === kindOf[filter]), [items, filter]);

  return (
    <div ref={ref} data-page className="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div className="relative flex flex-col w-full min-h-full" style={{ padding: "24px 32px 32px 110px" }}>
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[16px] w-full">
          <div>
            <h1 className="font-display text-[31px] font-normal leading-none tracking-[-0.8px] text-ink"><Split label="Saved for later">Saved for later</Split></h1>
            <p data-fill className="mt-[12px] text-[10.5px] text-muted">Videos, docs and links you bookmarked across the workspace.</p>
          </div>

          <div data-fill className="flex items-center gap-[10px]">
            <div className="flex rounded-full bg-white/60 dark:bg-white/[.08] p-[3px] text-[10px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.7)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]">
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={cn("relative rounded-full px-[11px] py-[5px] transition-colors", filter === f ? "text-white dark:text-forest font-medium" : "text-muted")}>
                  {filter === f && <motion.span layoutId="saved-filter" className="absolute inset-0 -z-0 rounded-full bg-forest-2 dark:bg-mint" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setItems(initial); setFilter("All"); }}
              className="flex h-[30px] items-center gap-[6px] rounded-full bg-forest-2/85 dark:bg-mint dark:text-forest px-[14px] text-[10px] font-medium text-white transition-colors"><Bookmark size={10} />Restore all</motion.button>
          </div>
        </div>

        {/* Content row */}
        <div className="mt-[24px] flex flex-col xl:flex-row gap-[24px] w-full">
          <div className="flex-1 min-w-0">
            <LayoutGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px]">
                <AnimatePresence mode="popLayout">
                  {shown.map((it, i) => (
                    <motion.div key={it.id} layout exit={{ opacity: 0, scale: 0.88 }} transition={{ type: "spring", stiffness: 380, damping: 34 }}>
                      <SavedCard item={it} index={i} onRemove={() => setItems((l) => l.filter((x) => x.id !== it.id))} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </LayoutGroup>
          </div>

          <div className="w-full xl:w-[280px] shrink-0">
            <Card className="w-full p-[18px]">
              <div data-fill className="flex items-center justify-between text-ink"><h3 className="font-display text-[15px] font-medium">Collections</h3><Settings2 size={14} strokeWidth={1.5} className="text-muted hover:text-ink cursor-pointer" /></div>
              <ul className="mt-[16px] space-y-[14px]">
                {collections.map((c) => (
                  <li key={c.name} data-fill className="flex items-center gap-[10px]">
                    <span className={cn("flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[10px]", c.tone === "dark" ? "bg-forest-2 dark:bg-mint/20 text-white dark:text-mint" : c.tone === "peach" ? "bg-peach-3 dark:bg-peach/20 text-peach" : "bg-mint-2/60 dark:bg-mint/20 text-mint-4 dark:text-mint")}><Folder size={13} /></span>
                    <div className="flex-1">
                      <div className="flex justify-between text-[9.5px]"><span className="font-medium text-ink">{c.name}</span><span className="text-[8px] text-muted">{c.items} items</span></div>
                      <div className="mt-[6px] h-[4px] rounded-full bg-black/[.06] dark:bg-white/[.08]">
                        <i data-grow="x" className={cn("block h-full rounded-full", c.tone === "peach" ? "bg-peach" : "bg-mint-3")} style={{ width: `${c.pct}%` }} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div data-fill className="mt-[18px] flex items-baseline gap-[8px] border-t border-black/[.06] dark:border-white/[.08] pt-[14px]">
                <Roll key={items.length} value={String(items.length)} className="font-display text-[22px] font-medium text-ink" />
                <span className="text-[9px] text-muted">items saved right now</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function SavedCard({ item, onRemove }: { item: SavedItem; index: number; onRemove: () => void }) {
  const Icon = item.kind === "Doc" ? FileText : Globe;
  return (
    <Card className="h-[193px] p-[8px]">
      <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400, damping: 22 }} className="flex h-full flex-col">
        <div data-fill className="relative flex h-[96px] items-center justify-center overflow-hidden rounded-[13px]" style={{ background: item.tint }}>
          <span className="absolute left-[8px] top-[8px] rounded-full bg-forest-2/90 dark:bg-mint dark:text-forest px-[7px] py-[2px] text-[7.5px] font-medium text-white">{item.kind}</span>
          {item.tone ? <Thumb tone={item.tone} seed={item.id.length + item.title.length} className="h-[84px] w-[130px]" /> : (
            <span className="flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-white/70 dark:bg-black/40 text-ink/70 dark:text-mint shadow-[0_6px_14px_-8px_rgba(0,0,0,.3)]"><Icon size={16} strokeWidth={1.6} /></span>
          )}
        </div>
        <p data-fill className="mt-[11px] line-clamp-2 px-[4px] text-[10.5px] font-semibold leading-[14px] text-ink">{item.title}</p>
        <div data-fill className="mt-auto flex items-end justify-between px-[4px] pb-[4px]">
          <div className="leading-none"><p className="text-[8.5px] text-ink/75">{item.source}</p><p className="mt-[4px] text-[7.5px] text-muted">{item.saved}</p></div>
          <div className="flex gap-[6px]">
            <button aria-label="Open" className="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] bg-black/[.05] dark:bg-white/[.08] text-ink/70 dark:text-ink"><ExternalLink size={9} /></button>
            <motion.button whileTap={{ scale: 0.8 }} aria-label="Remove from saved" onClick={onRemove} className="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] bg-mint-2/70 dark:bg-mint/20 text-mint-4 dark:text-mint"><Bookmark size={9} className="fill-current" /></motion.button>
          </div>
        </div>
      </motion.div>
    </Card>
  );
}
