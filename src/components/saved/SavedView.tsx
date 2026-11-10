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
    <div ref={ref} data-page className="absolute inset-0">
      <div className="absolute" style={{ left: 122, top: 24 }}>
        <h1 className="font-display text-[31px] font-normal leading-none tracking-[-0.8px] text-ink/90"><Split label="Saved for later">Saved for later</Split></h1>
        <p data-fill className="mt-[16px] text-[10.5px] text-muted">Videos, docs and links you bookmarked across the workspace.</p>
      </div>

      <div data-fill className="absolute flex items-center gap-[10px]" style={{ right: 30, top: 50 }}>
        <div className="flex rounded-full bg-white/60 p-[3px] text-[10px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.7)]">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn("relative rounded-full px-[11px] py-[5px] transition-colors", filter === f ? "text-white" : "text-muted")}>
              {filter === f && <motion.span layoutId="saved-filter" className="absolute inset-0 -z-0 rounded-full bg-forest-2" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setItems(initial); setFilter("All"); }}
          className="flex h-[30px] items-center gap-[6px] rounded-full bg-forest-2/85 px-[14px] text-[10px] font-medium text-white"><Bookmark size={10} />Restore all</motion.button>
      </div>

      <LayoutGroup>
        <div className="absolute grid grid-cols-4 content-start gap-x-[17px] gap-y-[15px]" style={{ left: 122, top: 111, width: 895 }}>
          <AnimatePresence mode="popLayout">
            {shown.map((it, i) => (
              <motion.div key={it.id} layout exit={{ opacity: 0, scale: 0.88 }} transition={{ type: "spring", stiffness: 380, damping: 34 }}>
                <SavedCard item={it} index={i} onRemove={() => setItems((l) => l.filter((x) => x.id !== it.id))} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>

      <Card className="absolute w-[260px] p-[18px]" style={{ left: 1040, top: 111 }}>
        <div data-fill className="flex items-center justify-between"><h3 className="font-display text-[15px] font-medium">Collections</h3><Settings2 size={14} strokeWidth={1.5} /></div>
        <ul className="mt-[16px] space-y-[14px]">
          {collections.map((c) => (
            <li key={c.name} data-fill className="flex items-center gap-[10px]">
              <span className={cn("flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[10px]", c.tone === "dark" ? "bg-forest-2 text-white" : c.tone === "peach" ? "bg-peach-3 text-peach" : "bg-mint-2/60 text-mint-4")}><Folder size={13} /></span>
              <div className="flex-1">
                <div className="flex justify-between text-[9.5px]"><span className="font-medium">{c.name}</span><span className="text-[8px] text-muted">{c.items} items</span></div>
                <div className="mt-[6px] h-[4px] rounded-full bg-black/[.06]">
                  <i data-grow="x" className={cn("block h-full rounded-full", c.tone === "peach" ? "bg-peach" : "bg-mint-3")} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div data-fill className="mt-[18px] flex items-baseline gap-[8px] border-t border-black/[.06] pt-[14px]">
          <Roll key={items.length} value={String(items.length)} className="font-display text-[22px] font-medium" />
          <span className="text-[9px] text-muted">items saved right now</span>
        </div>
      </Card>
    </div>
  );
}

function SavedCard({ item, onRemove }: { item: SavedItem; index: number; onRemove: () => void }) {
  const Icon = item.kind === "Doc" ? FileText : Globe;
  return (
    <Card className="h-[193px] p-[8px]">
      <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400, damping: 22 }} className="flex h-full flex-col">
        <div data-fill className="relative flex h-[96px] items-center justify-center overflow-hidden rounded-[13px]" style={{ background: item.tint }}>
          <span className="absolute left-[8px] top-[8px] rounded-full bg-forest-2/90 px-[7px] py-[2px] text-[7.5px] font-medium text-white">{item.kind}</span>
          {item.tone ? <Thumb tone={item.tone} seed={item.id.length + item.title.length} className="h-[84px] w-[130px]" /> : (
            <span className="flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-white/70 text-ink/70 shadow-[0_6px_14px_-8px_rgba(0,0,0,.3)]"><Icon size={16} strokeWidth={1.6} /></span>
          )}
        </div>
        <p data-fill className="mt-[11px] line-clamp-2 px-[4px] text-[10.5px] font-semibold leading-[14px]">{item.title}</p>
        <div data-fill className="mt-auto flex items-end justify-between px-[4px] pb-[4px]">
          <div className="leading-none"><p className="text-[8.5px] text-ink/75">{item.source}</p><p className="mt-[4px] text-[7.5px] text-muted">{item.saved}</p></div>
          <div className="flex gap-[6px]">
            <button aria-label="Open" className="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] bg-black/[.05] text-ink/70"><ExternalLink size={9} /></button>
            <motion.button whileTap={{ scale: 0.8 }} aria-label="Remove from saved" onClick={onRemove} className="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] bg-mint-2/70 text-mint-4"><Bookmark size={9} className="fill-current" /></motion.button>
          </div>
        </div>
      </motion.div>
    </Card>
  );
}
