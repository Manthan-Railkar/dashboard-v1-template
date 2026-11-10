"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { Bookmark, Cloud, LogOut, MessageCircle, PhoneCall, Search, Settings, Sun, User, Video } from "lucide-react";
import { SIDEBAR } from "@/lib/layout";
import { useIntro } from "@/lib/intro-context";
import Logo from "./Logo";

const Dots = ({ size = 18, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    {[[7, 7], [17, 7], [7, 17], [17, 17]].map(([x, y]) => <circle key={x + "" + y} cx={x} cy={y} r={strokeWidth * 0.8} />)}
  </svg>
);

/** `y` = icon centre, relative to the sidebar top (measured from the reference). */
const TOP = [
  { id: "videos", label: "Videos", icon: Video, y: 103 },
  { id: "profile", label: "Profile", icon: User, y: 161, href: "/profile" },
  { id: "home", label: "Home", icon: Dots, y: 219, href: "/" },
  { id: "saved", label: "Saved", icon: Bookmark, y: 276, href: "/saved" },
  { id: "cloud", label: "Cloud", icon: Cloud, y: 334 },
  { id: "chat", label: "Messages", icon: MessageCircle, y: 391 },
  { id: "settings", label: "Settings", icon: Settings, y: 448 },
  { id: "calls", label: "Calls", icon: PhoneCall, y: 505 },
] as const;
const BOTTOM = [
  { id: "search", label: "Search", icon: Search, y: 573 },
  { id: "theme", label: "Theme", icon: Sun, y: 621 },
  { id: "logout", label: "Log out", icon: LogOut, y: 669 },
] as const;
type Item = (typeof TOP)[number] | (typeof BOTTOM)[number];

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const { ready } = useIntro();
  const root = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  const activeId = pending ?? (path === "/" ? "home" : path.startsWith("/profile") ? "profile" : path.startsWith("/saved") ? "saved" : "home");
  const active = TOP.find((t) => t.id === activeId)!;

  // staggered icon entrance during the reveal
  useEffect(() => {
    if (!ready || !root.current) return;
    const items = root.current.querySelectorAll("[data-nav]");
    const tl = gsap.fromTo(items, { opacity: 0, x: -10, scale: 0.7 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, stagger: 0.045, ease: "back.out(1.6)", delay: 0.1 });
    return () => { tl.kill(); };
  }, [ready]);
  useEffect(() => { if (root.current && !ready) gsap.set(root.current.querySelectorAll("[data-nav]"), { opacity: 0 }); }, [ready]);

  const go = (it: Item) => {
    if (!("href" in it) || !it.href || it.href === path) return;
    setPending(it.id);
    gsap.to("[data-page]", {
      opacity: 0, y: -10, duration: 0.26, ease: "power2.in",
      onComplete: () => { router.push(it.href!); setTimeout(() => setPending(null), 60); },
    });
  };

  const render = (it: Item) => {
    const Icon = it.icon;
    const on = it.id === activeId;
    return (
      <button
        key={it.id} data-nav aria-label={it.label} onClick={() => go(it)}
        onMouseEnter={() => setHover(it.id)} onMouseLeave={() => setHover(null)}
        className="absolute left-1/2 z-10 flex h-[44px] w-[44px] -translate-x-1/2 items-center justify-center rounded-full outline-none"
        style={{ top: it.y - 22 }}
      >
        <motion.span
          animate={{ scale: hover === it.id && !on ? 1.18 : 1, color: on ? "#06372b" : hover === it.id ? "#ffffff" : "#a7d3c5" }}
          transition={{ type: "spring", stiffness: 500, damping: 26 }}
          className="relative z-10"
        >
          <Icon size={18} strokeWidth={1.7} />
        </motion.span>
      </button>
    );
  };

  return (
    <div ref={root} className="absolute z-20" style={{ left: SIDEBAR.x, top: SIDEBAR.y, width: SIDEBAR.w, height: SIDEBAR.h }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(180deg,#0f362c 0%,#0a2a22 55%,#071f19 100%)",
          boxShadow: "0 22px 40px -14px rgba(4,32,24,.55), inset 0 0 0 1px rgba(255,255,255,.06), inset 0 1px 0 rgba(255,255,255,.08)",
        }}
      />
      <div className="absolute left-1/2 text-[#c9f6e8]" style={{ top: 37 - 12, transform: "translateX(-50%)" }}>
        <Logo size={27} />
      </div>

      {/* sliding mint orb + right-edge notch */}
      <motion.div
        className="absolute left-1/2 z-[5] -ml-[23px] h-[46px] w-[46px] rounded-full"
        style={{ top: -23, background: "radial-gradient(circle at 35% 28%,#d3fbee 0%,#8ee6c8 55%,#6fd6b4 100%)", boxShadow: "0 0 22px rgba(127,224,192,.55), inset 0 1px 0 rgba(255,255,255,.7)" }}
        initial={false}
        animate={{ y: active.y, scaleY: [1, 1.22, 1], scaleX: [1, 0.92, 1] }}
        transition={{ y: { type: "spring", stiffness: 330, damping: 30 }, scaleY: { duration: 0.5, times: [0, 0.4, 1] }, scaleX: { duration: 0.5, times: [0, 0.4, 1] } }}
      />
      <motion.div
        className="absolute z-[4] h-[24px] w-[14px] rounded-r-[14px] bg-[#071f19]"
        style={{ left: SIDEBAR.w - 4, top: -12 }}
        initial={false}
        animate={{ y: active.y }}
        transition={{ type: "spring", stiffness: 330, damping: 30, delay: 0.03 }}
      />

      {TOP.map(render)}
      {BOTTOM.map(render)}

      <AnimatePresence>
        {hover && (() => {
          const it = [...TOP, ...BOTTOM].find((i) => i.id === hover)!;
          return (
            <motion.div
              key={hover}
              initial={{ opacity: 0, x: -6, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -4, scale: 0.95 }}
              transition={{ duration: 0.16 }}
              className="pointer-events-none absolute z-30 -translate-y-1/2 whitespace-nowrap rounded-[8px] bg-forest px-[10px] py-[6px] text-[10px] font-medium text-white shadow-[0_8px_20px_-6px_rgba(4,32,24,.5)]"
              style={{ left: SIDEBAR.w + 22, top: it.y }}
            >
              {it.label}
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
