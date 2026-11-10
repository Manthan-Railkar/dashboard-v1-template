"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, CirclePlus, FileText, Mail, MapPin, Star, Video, Users, Clock, FolderPlus, MessageSquare, UploadCloud } from "lucide-react";
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
    <div ref={ref} data-page className="scroll-hide absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div className="relative flex flex-col" style={{ padding: "24px 30px 48px 117px" }}>
        {/* hero */}
        <div data-skel className="relative h-[220px] shrink-0 overflow-hidden rounded-[20px] bg-white shadow-card">
          <div className="h-[112px]" style={{ background: "linear-gradient(105deg,#0c2f26 0%,#12392f 55%,#1a4a3d 100%)" }} />
          <span data-pop className="absolute left-[21px] top-[104px] rounded-full border-[4px] border-white bg-white shadow-[0_10px_20px_-8px_rgba(8,40,31,.4)]"><Avatar name="Hannah Brooks" size={86} /></span>
          <div className="absolute left-[129px] top-[126px]">
            <h1 className="font-display text-[24px] font-medium leading-none tracking-[-0.3px]"><Split label="Hannah Brooks">Hannah Brooks</Split></h1>
            <p data-fill className="mt-[9px] text-[12px] text-ink/80">Lead Product Designer · Workspace Studio</p>
            <p data-fill className="mt-[9px] flex items-center gap-[14px] text-[9.5px] text-muted">
              <span className="flex items-center gap-[4px]"><MapPin size={10} />Lisbon, Portugal</span>
              <span className="flex items-center gap-[4px]"><Mail size={10} />hannah@workspace.studio</span>
            </p>
          </div>
          <div data-fill className="absolute bottom-[14px] right-[20px] flex items-center gap-[10px]">
            <button onClick={() => setAvailable((a) => !a)} className="flex h-[32px] items-center gap-[6px] rounded-full bg-[#eef6f2] px-[14px] text-[10px] font-medium text-ink">
              <i className={cn("h-[6px] w-[6px] rounded-full transition-colors", available ? "bg-mint-3" : "bg-peach")} />{available ? "Available" : "Away"}
            </button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="h-[34px] rounded-full bg-forest-2 px-[20px] text-[10.5px] font-medium text-white">Edit profile</motion.button>
          </div>
        </div>

        {/* stats */}
        <div className="mt-[22px] grid grid-cols-4 gap-[24px]">
          {stats.map(({ label, value, sub, Icon }) => (
            <Card key={label} className="h-[120px] p-[16px]">
              <div data-fill className="flex items-center gap-[8px] text-[10px] text-ink/80">
                <span className="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] bg-mint-2/70 text-mint-4"><Icon size={11} /></span>{label}
              </div>
              <Roll value={value} className="mt-[14px] font-display text-[28px] font-medium tracking-[-0.5px]" />
              <p data-fill className="mt-[8px] text-[8.5px] text-muted">{sub}</p>
            </Card>
          ))}
        </div>

        {/* about + focus */}
        <div className="mt-[32px] flex gap-[34px]">
          <Card className="h-[227px] w-[631px] shrink-0 p-[20px]">
            <h3 data-fill className="font-display text-[15px] font-medium">About</h3>
            <p data-fill className="mt-[12px] w-[560px] text-[10.5px] leading-[17px] text-ink/80">
              I lead design for our collaboration tools — turning messy team workflows into calm, focused spaces. Previously at two health-tech startups, so neurology videos feel like home.
            </p>
            <p data-fill className="mt-[18px] text-[9px] text-muted"><span className="font-medium text-ink">Skills</span>&nbsp;&nbsp;tap to highlight</p>
            <div className="mt-[10px] flex flex-wrap gap-[8px]">
              {skills.map((s) => {
                const sel = on.includes(s);
                return (
                  <motion.button key={s} data-fill layout whileTap={{ scale: 0.93 }} onClick={() => setOn((o) => (sel ? o.filter((x) => x !== s) : [...o, s]))}
                    className={cn("flex h-[26px] items-center gap-[5px] rounded-full px-[12px] text-[10px] font-medium transition-colors", sel ? "bg-forest-2 text-white" : "bg-black/[.05] text-ink/70")}>
                    {sel && <Check size={10} strokeWidth={3} />}{s}
                  </motion.button>
                );
              })}
            </div>
          </Card>

          <Card className="h-[222px] w-[518px] shrink-0 px-[22px] pt-[18px]">
            <div data-fill className="flex items-center justify-between">
              <h3 className="font-display text-[15px] font-medium">Focus this week</h3>
              <Roll value="26.4h" className="font-display text-[13px] text-ink/80" />
            </div>
            <div className="mt-[14px] flex justify-between px-[8px]">
              {week.map((w) => (
                <div key={w.d} className="flex flex-col items-center">
                  <div className="relative h-[130px] w-[30px] overflow-hidden rounded-full bg-black/[.045]">
                    <i data-grow="y" className="absolute inset-x-0 bottom-0 block rounded-full"
                      style={{ height: `${w.v}%`, background: w.on ? "linear-gradient(180deg,#1f8a6c,#2fae8a)" : "linear-gradient(180deg,#f8c3a2,#fbd9c2)" }} />
                  </div>
                  {w.on && <span data-fill className="absolute mt-[104px] rounded-full bg-forest-2 px-[6px] py-[2px] text-[7.5px] font-semibold text-white">{w.label}</span>}
                  <span data-fill className="mt-[10px] text-[8.5px] text-muted">{w.d}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* activity + team */}
        <div className="mt-[30px] flex gap-[34px]">
          <Card className="w-[631px] shrink-0 p-[20px]">
            <h3 data-fill className="font-display text-[15px] font-medium">Recent activity</h3>
            <ul className="mt-[12px] space-y-[12px]">
              {activity.map(({ Icon, text, time }) => (
                <li key={text} data-fill className="flex items-center gap-[10px] text-[10.5px]">
                  <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-mint-2/60 text-mint-4"><Icon size={12} /></span>
                  <span className="flex-1">{text}</span><span className="text-[9px] text-muted">{time}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="w-[518px] shrink-0 p-[20px]">
            <div data-fill className="flex items-center justify-between"><h3 className="font-display text-[15px] font-medium">Team</h3><CirclePlus size={15} strokeWidth={1.5} /></div>
            <ul className="mt-[12px] space-y-[10px]">
              {team.map(({ n, r }) => (
                <li key={n} data-fill className="flex items-center gap-[10px]">
                  <Avatar name={n} size={28} />
                  <div className="flex-1 leading-none"><p className="text-[10.5px] font-medium">{n}</p><p className="mt-[4px] text-[8.5px] text-muted">{r}</p></div>
                  <motion.button whileTap={{ scale: 0.8 }} onClick={() => setStars((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]))}>
                    <Star size={13} className={cn("transition-colors", stars.includes(n) ? "fill-peach text-peach" : "text-muted/60")} />
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
