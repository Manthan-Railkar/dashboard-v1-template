"use client";
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Video,
  Play,
  Clock,
  Eye,
  MessageSquare,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  TrendingUp,
  Share2,
  X,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Split from "@/components/ui/Split";
import Thumb, { type ThumbTone } from "@/components/ui/Thumb";
import Avatar from "@/components/ui/Avatar";
import { usePageEntrance } from "@/lib/entrance";
import { cn } from "@/lib/cn";

interface VideoItem {
  id: string;
  title: string;
  category: "Surgical" | "Tutorial" | "Case Study" | "Keynote";
  duration: string;
  views: string;
  comments: number;
  date: string;
  author: string;
  tone: ThumbTone;
  featured?: boolean;
}

const VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Brain Aneurysm Clipping with the Leica M530 OH6",
    category: "Surgical",
    duration: "4:32",
    views: "24.5k",
    comments: 48,
    date: "2 days ago",
    author: "Hannah Brooks",
    tone: "teal",
    featured: true,
  },
  {
    id: "v2",
    title: "Awake Craniotomy: Cortical Language Mapping Protocols",
    category: "Surgical",
    duration: "11:15",
    views: "18.2k",
    comments: 34,
    date: "Mar 14",
    author: "Dr. Julian Vance",
    tone: "red",
  },
  {
    id: "v3",
    title: "Video Neurosurgery New Techniques in Telemedicine",
    category: "Keynote",
    duration: "6:40",
    views: "12.8k",
    comments: 21,
    date: "Mar 20",
    author: "Sophia Brown",
    tone: "slate",
  },
  {
    id: "v4",
    title: "Endoscopic Pituitary Surgery: Transsphenoidal Approach",
    category: "Case Study",
    duration: "8:50",
    views: "31.0k",
    comments: 52,
    date: "Feb 28",
    author: "Hannah Brooks",
    tone: "blue",
  },
  {
    id: "v5",
    title: "Microvascular Decompression for Trigeminal Neuralgia",
    category: "Surgical",
    duration: "14:20",
    views: "9.4k",
    comments: 19,
    date: "Feb 15",
    author: "Alex Johnson",
    tone: "teal",
  },
  {
    id: "v6",
    title: "Deep Brain Stimulation: Subthalamic Nucleus Targeting Guide",
    category: "Tutorial",
    duration: "19:05",
    views: "42.1k",
    comments: 86,
    date: "Jan 30",
    author: "Daniel Turner",
    tone: "slate",
  },
];

const CATEGORIES = ["All", "Surgical", "Tutorial", "Case Study", "Keynote"] as const;

export default function VideosView() {
  const ref = useRef<HTMLDivElement>(null);
  usePageEntrance(ref);

  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePlaying, setActivePlaying] = useState<VideoItem | null>(null);

  const filtered = useMemo(() => {
    return VIDEOS.filter((v) => {
      const matchCat = activeCategory === "All" || v.category === activeCategory;
      const matchSearch =
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div ref={ref} data-page className="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div className="relative flex flex-col w-full min-h-full" style={{ padding: "24px 32px 32px 110px" }}>
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[16px] w-full">
          <div>
            <h1 className="font-display text-[31px] font-normal leading-none tracking-[-0.8px] text-ink">
              <Split label="Published Videos">Published Videos</Split>
            </h1>
            <p data-fill className="mt-[10px] text-[11px] text-muted">
              Surgical recordings, peer-reviewed clinical procedures, and educational seminars.
            </p>
          </div>

          <div data-fill className="flex items-center gap-[10px]">
            {/* Search */}
            <div className="relative flex items-center">
              <Search size={13} className="absolute left-[12px] text-muted" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter videos..."
                className="h-[32px] w-[170px] sm:w-[210px] rounded-full bg-white/70 dark:bg-white/[.08] pl-[32px] pr-[12px] text-[11px] text-ink outline-none placeholder:text-muted shadow-[inset_0_0_0_1px_rgba(255,255,255,.7)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("Upload dialog opened: select video asset to encode.")}
              className="flex h-[32px] items-center gap-[6px] rounded-full bg-forest-2 dark:bg-mint px-[14px] text-[11px] font-medium text-white dark:text-forest shadow-sm"
            >
              <Video size={13} />
              <span>Upload Video</span>
            </motion.button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="mt-[20px] grid grid-cols-2 md:grid-cols-4 gap-[14px]">
          <Card className="p-[16px] flex flex-col justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted">Total Videos</span>
            <div className="mt-[8px] flex items-baseline gap-[8px]">
              <span className="font-display text-[26px] font-medium text-ink">248</span>
              <span className="text-[10px] font-medium text-mint-4 dark:text-mint flex items-center gap-[2px]">
                <TrendingUp size={11} /> +12%
              </span>
            </div>
          </Card>
          <Card className="p-[16px] flex flex-col justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted">Total Watch Time</span>
            <div className="mt-[8px] flex items-baseline gap-[8px]">
              <span className="font-display text-[26px] font-medium text-ink">14.2k</span>
              <span className="text-[10px] text-muted">hours</span>
            </div>
          </Card>
          <Card className="p-[16px] flex flex-col justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted">Active Views</span>
            <div className="mt-[8px] flex items-baseline gap-[8px]">
              <span className="font-display text-[26px] font-medium text-ink">186.4k</span>
              <span className="text-[10px] font-medium text-mint-4 dark:text-mint flex items-center gap-[2px]">
                <TrendingUp size={11} /> +24%
              </span>
            </div>
          </Card>
          <Card className="p-[16px] flex flex-col justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted">Avg Completion</span>
            <div className="mt-[8px] flex items-baseline gap-[8px]">
              <span className="font-display text-[26px] font-medium text-ink">79.6%</span>
              <span className="text-[10px] text-muted">retention</span>
            </div>
          </Card>
        </div>

        {/* Categories Bar */}
        <div data-fill className="mt-[20px] flex items-center gap-[8px] overflow-x-auto pb-[4px]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "relative rounded-full px-[14px] py-[6px] text-[11px] font-medium transition-colors",
                activeCategory === cat ? "text-white dark:text-forest" : "text-muted hover:text-ink"
              )}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="video-cat"
                  className="absolute inset-0 -z-0 rounded-full bg-forest-2 dark:bg-mint"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Video Cards Grid */}
        <div className="mt-[16px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {filtered.map((video) => (
            <Card
              key={video.id}
              className="group overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_18px_36px_-10px_rgba(4,32,24,.18)]"
            >
              {/* Thumbnail Container */}
              <div className="relative h-[155px] w-full overflow-hidden bg-forest/5 dark:bg-white/[.04] flex items-center justify-center">
                <Thumb tone={video.tone} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                
                {/* Play Button Overlay */}
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setActivePlaying(video)}
                  className="absolute flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white/90 dark:bg-[#09261f]/90 text-forest dark:text-mint shadow-[0_8px_20px_rgba(0,0,0,.25)] backdrop-blur-sm transition-transform"
                >
                  <Play size={18} className="translate-x-[1px] fill-current" />
                </motion.button>

                {/* Duration Badge */}
                <div className="absolute bottom-[10px] right-[10px] flex items-center gap-[4px] rounded-full bg-black/75 px-[8px] py-[3px] text-[9.5px] font-medium text-white backdrop-blur-sm">
                  <Clock size={10} />
                  <span>{video.duration}</span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-[10px] left-[10px] rounded-full bg-white/80 dark:bg-black/60 px-[8px] py-[3px] text-[9.5px] font-medium text-forest-2 dark:text-mint backdrop-blur-sm">
                  {video.category}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-[16px] flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-[13.5px] font-medium leading-[1.3] text-ink group-hover:text-forest-2 dark:group-hover:text-mint transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="mt-[10px] flex items-center gap-[8px]">
                    <Avatar name={video.author} size={22} />
                    <span className="text-[11px] text-muted">{video.author}</span>
                  </div>
                </div>

                {/* Footer Details */}
                <div className="mt-[14px] flex items-center justify-between border-t border-black/[.06] dark:border-white/[.06] pt-[12px] text-[10.5px] text-muted">
                  <div className="flex items-center gap-[12px]">
                    <span className="flex items-center gap-[4px]">
                      <Eye size={12} /> {video.views}
                    </span>
                    <span className="flex items-center gap-[4px]">
                      <MessageSquare size={11} /> {video.comments}
                    </span>
                  </div>
                  <span>{video.date}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {activePlaying && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePlaying(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              className="relative w-full max-w-[760px] overflow-hidden rounded-[24px] bg-[#071f19] text-white shadow-2xl border border-white/[.15]"
            >
              <div className="relative aspect-video w-full bg-black/80 flex items-center justify-center">
                <Thumb tone={activePlaying.tone} className="h-full w-full opacity-60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                  <div className="h-[64px] w-[64px] rounded-full bg-mint flex items-center justify-center text-forest shadow-lg">
                    <Play size={28} className="translate-x-[2px] fill-current" />
                  </div>
                  <p className="mt-[14px] text-[13px] font-medium text-white/90">Simulated 4K 60fps Surgical Feed</p>
                  <p className="text-[11px] text-white/50">{activePlaying.title}</p>
                </div>
                <button
                  onClick={() => setActivePlaying(null)}
                  className="absolute top-[14px] right-[14px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-black/50 text-white/80 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-[20px] flex items-center justify-between">
                <div>
                  <h2 className="text-[16px] font-medium text-white">{activePlaying.title}</h2>
                  <p className="text-[11px] text-white/60 mt-[4px]">
                    Presented by {activePlaying.author} · {activePlaying.duration} · {activePlaying.views} views
                  </p>
                </div>
                <button
                  onClick={() => setActivePlaying(null)}
                  className="rounded-full bg-mint px-[16px] py-[8px] text-[11px] font-medium text-forest hover:brightness-105"
                >
                  Close Player
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

