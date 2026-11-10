"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, CirclePlus, Mail, MapPin, Star, Video, Users, Clock, FolderPlus, MessageSquare, UploadCloud } from "lucide-react";
import Card from "@/components/ui/Card";
import Roll from "@/components/ui/Roll";
import Split from "@/components/ui/Split";
import Avatar from "@/components/ui/Avatar";
import { usePageEntrance } from "@/lib/entrance";
import { cn } from "@/lib/cn";

const stats = [
  { label: "Projects shipped", value: "12", sub: "6 this quarter", Icon: Star },
  { label: "Videos published", value: "248", sub: "Top: Brain Aneurysm Clipping", Icon: Video },
  { label: "Followers", value: "1,284", sub: "+64 this month", Icon: Users },
  { label: "Focus hours", value: "126", sub: "Since January", Icon: Clock },
];
const week = [
  { d: "Mon", v: 72 }, { d: "Tue", v: 84 }, { d: "Wed", v: 100, on: true, label: "6.5h" }, { d: "Thu", v: 38 },
  { d: "Fri", v: 66 }, { d: "Sat", v: 22 }, { d: "Sun", v: 10 },
];
const skills = ["Product strategy", "Design systems", "Prototyping", "User research", "Motion"];
const activity = [
  { Icon: UploadCloud, text: "Uploaded ‘Inside the Operating Room’", time: "2 hours ago" },
  { Icon: MessageSquare, text: "Commented on ‘Awake Craniotomy: Language Mapping’", time: "Yesterday" },
  { Icon: FolderPlus, text: "Created collection ‘Neurosurgery reference’", time: "Mar 18" },
];
const team = [
  { n: "Sophia Brown", r: "Design lead" }, { n: "Alex Johnson", r: "Frontend engineer" }, { n: "Daniel Turner", r: "Video producer" },
];

export default function ProfileView() {
  const ref = useRef<HTMLDivElement>(null);
  usePageEntrance(ref);
  const [on, setOn] = useState<string[]>(skills.slice(0, 3));
  const [stars, setStars] = useState<string[]>([]);
  const [available, setAvailable] = useState(true);

  return (
    <div ref={ref} data-page className="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div className="relative flex flex-col w-full" style={{ padding: "24px 32px 32px 110px" }}>
        {/* hero */}
        <div data-skel className="card relative h-[190px] w-full shrink-0 overflow-hidden">
          <div className="h-[95px] w-full" style={{ background: "linear-gradient(105deg,#0c2f26 0%,#12392f 55%,#1a4a3d 100%)" }} />
          <span data-pop className="absolute left-[20px] top-[56px] rounded-full border-[3px] border-white dark:border-[#103028] bg-white dark:bg-[#103028] shadow-[0_10px_20px_-8px_rgba(8,40,31,.4)]">
            <Avatar name="Hannah Brooks" size={76} />
          </span>
          <div className="absolute left-[116px] top-[102px]">
            <h1 className="font-display text-[23px] font-medium leading-none tracking-[-0.3px] text-ink">
              <Split label="Hannah Brooks">Hannah Brooks</Split>
            </h1>
            <p data-fill className="mt-[6px] text-[12px] text-ink/80">Lead Product Designer · Workspace Studio</p>
            <p data-fill className="mt-[6px] flex items-center gap-[14px] text-[9.5px] text-muted">
              <span className="flex items-center gap-[4px]"><MapPin size={10} />Lisbon, Portugal</span>
              <span className="flex items-center gap-[4px]"><Mail size={10} />hannah@workspace.studio</span>
            </p>
          </div>
          <div data-fill className="absolute bottom-[14px] right-[20px] flex items-center gap-[10px]">
            <button onClick={() => setAvailable((a) => !a)} className="flex h-[32px] items-center gap-[6px] rounded-full bg-[#eef6f2] dark:bg-[#164034] px-[14px] text-[10px] font-medium text-ink transition-colors">
              <i className={cn("h-[6px] w-[6px] rounded-full transition-colors", available ? "bg-mint-3" : "bg-peach")} />{available ? "Available" : "Away"}
            </button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="h-[34px] rounded-full bg-forest-2 dark:bg-mint dark:text-forest px-[20px] text-[10.5px] font-medium text-white transition-colors">
              Edit profile
            </motion.button>
          </div>
        </div>

        {/* stats */}
        <div className="mt-[18px] grid grid-cols-2 md:grid-cols-4 gap-[20px] w-full">
          {stats.map(({ label, value, sub, Icon }) => (
            <Card key={label} className="h-[110px] p-[16px]">
              <div data-fill className="flex items-center gap-[8px] text-[10px] text-ink/80">
                <span className="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] bg-mint-2/70 dark:bg-mint-3/20 text-mint-4 dark:text-mint"><Icon size={11} /></span>
                {label}
              </div>
              <Roll value={value} className="mt-[10px] font-display text-[28px] font-medium tracking-[-0.5px] text-ink" />
              <p data-fill className="mt-[6px] text-[8.5px] text-muted">{sub}</p>
            </Card>
          ))}
        </div>

        {/* about + focus */}
        <div className="mt-[18px] flex flex-col xl:flex-row gap-[20px] w-full">
          <Card className="min-h-[200px] flex-[1.2] min-w-0 p-[20px]">
            <h3 data-fill className="font-display text-[15px] font-medium text-ink">About</h3>
            <p data-fill className="mt-[10px] text-[10.5px] leading-[17px] text-ink/80">
              I lead design for our collaboration tools — turning messy team workflows into calm, focused spaces. Previously at two health-tech startups, so neurology videos feel like home.
            </p>
            <p data-fill className="mt-[16px] text-[9px] text-muted"><span className="font-medium text-ink">Skills</span>&nbsp;&nbsp;tap to highlight</p>
            <div className="mt-[9px] flex flex-wrap gap-[8px]">
              {skills.map((s) => {
                const sel = on.includes(s);
                return (
                  <motion.button key={s} data-fill layout whileTap={{ scale: 0.93 }} onClick={() => setOn((o) => (sel ? o.filter((x) => x !== s) : [...o, s]))}
                    className={cn("flex h-[26px] items-center gap-[5px] rounded-full px-[12px] text-[10px] font-medium transition-colors", sel ? "bg-forest-2 dark:bg-mint text-white dark:text-forest" : "bg-black/[.05] dark:bg-white/[.08] text-ink/75")}>
                    {sel && <Check size={10} strokeWidth={3} />}{s}
                  </motion.button>
                );
              })}
            </div>
          </Card>

          <Card className="min-h-[200px] flex-1 min-w-0 px-[22px] pt-[18px]">
            <div data-fill className="flex items-center justify-between">
              <h3 className="font-display text-[15px] font-medium text-ink">Focus this week</h3>
              <Roll value="26.4h" className="font-display text-[13px] text-ink/80" />
            </div>
            <div className="mt-[14px] flex justify-between px-[6px]">
              {week.map((w) => (
                <div key={w.d} className="flex flex-col items-center">
                  <div className="relative h-[110px] w-[30px] overflow-hidden rounded-full bg-black/[.045] dark:bg-white/[.06]">
                    <i data-grow="y" className="absolute inset-x-0 bottom-0 block rounded-full"
                      style={{ height: `${w.v}%`, background: w.on ? "linear-gradient(180deg,#1f8a6c,#2fae8a)" : "linear-gradient(180deg,#f8c3a2,#fbd9c2)" }} />
                  </div>
                  {w.on && <span data-fill className="absolute mt-[84px] rounded-full bg-forest-2 dark:bg-mint dark:text-forest px-[6px] py-[2px] text-[7.5px] font-semibold text-white">{w.label}</span>}
                  <span data-fill className="mt-[8px] text-[8.5px] text-muted">{w.d}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* activity + team */}
        <div className="mt-[18px] flex flex-col xl:flex-row gap-[20px] w-full">
          <Card className="min-h-[190px] flex-[1.2] min-w-0 p-[20px]">
            <h3 data-fill className="font-display text-[15px] font-medium text-ink">Recent activity</h3>
            <ul className="mt-[12px] space-y-[11px]">
              {activity.map(({ Icon, text, time }) => (
                <li key={text} data-fill className="flex items-center gap-[10px] text-[10.5px] text-ink">
                  <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-mint-2/60 dark:bg-mint-3/20 text-mint-4 dark:text-mint shrink-0"><Icon size={12} /></span>
                  <span className="flex-1 truncate">{text}</span><span className="text-[9px] text-muted shrink-0">{time}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="min-h-[190px] flex-1 min-w-0 p-[20px]">
            <div data-fill className="flex items-center justify-between text-ink">
              <h3 className="font-display text-[15px] font-medium">Team</h3>
              <CirclePlus size={15} strokeWidth={1.5} className="text-muted hover:text-ink cursor-pointer" />
            </div>
            <ul className="mt-[12px] space-y-[10px]">
              {team.map(({ n, r }) => (
                <li key={n} data-fill className="flex items-center gap-[10px]">
                  <Avatar name={n} size={28} />
                  <div className="flex-1 leading-none min-w-0"><p className="text-[10.5px] font-medium text-ink truncate">{n}</p><p className="mt-[4px] text-[8.5px] text-muted truncate">{r}</p></div>
                  <motion.button whileTap={{ scale: 0.8 }} onClick={() => setStars((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]))}>
                    <Star size={13} className={cn("transition-colors", stars.includes(n) ? "fill-peach text-peach" : "text-muted/60 dark:text-muted/40")} />
                  </motion.button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
