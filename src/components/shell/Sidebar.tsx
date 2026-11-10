"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import {
  Bookmark,
  Cloud,
  LogOut,
  MessageCircle,
  Moon,
  PhoneCall,
  Search,
  Settings,
  Sun,
  User,
  Video,
} from "lucide-react";
import { SIDEBAR } from "@/lib/layout";
import { useIntro } from "@/lib/intro-context";
import { useTheme } from "@/lib/theme-context";
import { useSearch } from "@/lib/search-context";
import Logo from "./Logo";

const Dots = ({ size = 18, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    {[[7, 7], [17, 7], [7, 17], [17, 17]].map(([x, y]) => (
      <circle key={x + "" + y} cx={x} cy={y} r={strokeWidth * 0.8} />
    ))}
  </svg>
);

/** `y` = icon centre, relative to the sidebar top */
const TOP = [
  { id: "videos", label: "Videos", icon: Video, y: 103, href: "/videos" },
  { id: "profile", label: "Profile", icon: User, y: 161, href: "/profile" },
  { id: "home", label: "Home", icon: Dots, y: 219, href: "/" },
  { id: "saved", label: "Saved", icon: Bookmark, y: 276, href: "/saved" },
  { id: "cloud", label: "Cloud", icon: Cloud, y: 334, href: "/cloud" },
  { id: "chat", label: "Messages", icon: MessageCircle, y: 391, href: "/chat" },
  { id: "settings", label: "Settings", icon: Settings, y: 448, href: "/settings" },
  { id: "calls", label: "Calls", icon: PhoneCall, y: 505, href: "/calls" },
] as const;

const BOTTOM = [
  { id: "search", label: "Search", icon: Search, y: 573 },
  { id: "theme", label: "Theme", icon: Sun, y: 621 },
  { id: "logout", label: "Log out", icon: LogOut, y: 669 },
] as const;

type Item = (typeof TOP)[number] | (typeof BOTTOM)[number];

const getPathId = (pathname: string): string => {
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/saved")) return "saved";
  if (pathname.startsWith("/videos")) return "videos";
  if (pathname.startsWith("/cloud")) return "cloud";
  if (pathname.startsWith("/chat")) return "chat";
  if (pathname.startsWith("/settings")) return "settings";
  if (pathname.startsWith("/calls")) return "calls";
  return "home";
};

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const { ready } = useIntro();
  const { theme, toggleTheme } = useTheme();
  const { openSearch } = useSearch();

  const root = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Prefetch all route bundles immediately on mount for instantaneous client transitions
  useEffect(() => {
    TOP.forEach((it) => {
      if (it.href) {
        router.prefetch(it.href);
      }
    });
  }, [router]);

  // Auto-fit sidebar height to screen if viewport is compact
  useEffect(() => {
    const updateScale = () => {
      const vh = window.innerHeight;
      const s = Math.min(1, Math.max(0.65, (vh - 36) / 715));
      setScale(s);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // When pathname updates, reset optimistic override seamlessly
  useEffect(() => {
    setSelectedId(null);
  }, [path]);

  const activeId = selectedId ?? getPathId(path);
  const active = TOP.find((t) => t.id === activeId) ?? TOP[2];

  // Staggered icon entrance during the initial intro reveal
  useEffect(() => {
    if (!ready || !root.current) return;
    const items = root.current.querySelectorAll("[data-nav]");
    const tl = gsap.fromTo(
      items,
      { opacity: 0, x: -10, scale: 0.7 },
      { opacity: 1, x: 0, scale: 1, duration: 0.5, stagger: 0.045, ease: "back.out(1.6)", delay: 0.1 }
    );
    return () => {
      tl.kill();
    };
  }, [ready]);

  useEffect(() => {
    if (root.current && !ready) gsap.set(root.current.querySelectorAll("[data-nav]"), { opacity: 0 });
  }, [ready]);

  const go = (it: Item) => {
    if (it.id === "theme") {
      toggleTheme();
      return;
    }
    if (it.id === "search") {
      openSearch();
      return;
    }
    if (it.id === "logout") {
      alert("Hannah Brooks signed out. Click any sidebar navigation item to reconnect instantly.");
      return;
    }

    if (!("href" in it) || !it.href) return;
    if (it.href === path && activeId === it.id) return;

    // Instant, deterministic highlight update - zero delay
    setSelectedId(it.id);
    router.push(it.href);
  };

  const springPhysics = {
    type: "spring" as const,
    stiffness: 440,
    damping: 32,
    mass: 0.72,
  };

  const render = (it: Item) => {
    const isTheme = it.id === "theme";
    const Icon = isTheme ? (theme === "dark" ? Moon : Sun) : it.icon;
    const label = isTheme ? (theme === "dark" ? "Light mode" : "Dark mode") : it.label;
    const on = it.id === activeId;
    const hasHref = "href" in it && Boolean(it.href);

    const buttonContent = (
      <motion.span
        animate={{
          scale: hover === it.id && !on ? 1.15 : 1,
          rotate: isTheme && theme === "dark" ? 360 : 0,
          color: on ? "#06372b" : isTheme && theme === "dark" ? "#b4f0db" : hover === it.id ? "#ffffff" : "#a7d3c5",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className="relative z-10"
      >
        <Icon size={18} strokeWidth={1.7} />
      </motion.span>
    );

    if (hasHref) {
      return (
        <Link
          key={it.id}
          href={it.href!}
          prefetch={true}
          data-nav
          aria-label={label}
          onClick={(e) => {
            if (it.href === path) {
              e.preventDefault();
              return;
            }
            setSelectedId(it.id);
          }}
          onMouseEnter={() => {
            setHover(it.id);
            router.prefetch(it.href!);
          }}
          onMouseLeave={() => setHover(null)}
          className="absolute left-1/2 z-10 flex h-[44px] w-[44px] -translate-x-1/2 items-center justify-center rounded-full outline-none transition-transform active:scale-95"
          style={{ top: it.y - 22 }}
        >
          {buttonContent}
        </Link>
      );
    }

    return (
      <button
        key={it.id}
        data-nav
        aria-label={label}
        onClick={() => go(it)}
        onMouseEnter={() => setHover(it.id)}
        onMouseLeave={() => setHover(null)}
        className="absolute left-1/2 z-10 flex h-[44px] w-[44px] -translate-x-1/2 items-center justify-center rounded-full outline-none transition-transform active:scale-95"
        style={{ top: it.y - 22 }}
      >
        {buttonContent}
      </button>
    );
  };

  return (
    <div
      ref={root}
      className="absolute z-20 transition-transform duration-200"
      style={{
        left: SIDEBAR.x,
        top: SIDEBAR.y,
        width: SIDEBAR.w,
        height: SIDEBAR.h,
        transform: scale < 1 ? `scale(${scale})` : undefined,
        transformOrigin: "0 0",
      }}
    >
      {/* Sidebar background pill */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-300"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(180deg,#0a261f 0%,#061d16 55%,#03140f 100%)"
              : "linear-gradient(180deg,#0f362c 0%,#0a2a22 55%,#071f19 100%)",
          boxShadow:
            theme === "dark"
              ? "0 22px 40px -14px rgba(0,0,0,.75), inset 0 0 0 1px rgba(127,224,192,.15), inset 0 1px 0 rgba(255,255,255,.12)"
              : "0 22px 40px -14px rgba(4,32,24,.55), inset 0 0 0 1px rgba(255,255,255,.06), inset 0 1px 0 rgba(255,255,255,.08)",
        }}
      />

      {/* Top Logo */}
      <div className="absolute left-1/2 text-[#c9f6e8]" style={{ top: 37 - 12, transform: "translateX(-50%)" }}>
        <Logo size={27} />
      </div>

      {/* Sliding mint orb + right-edge notch in lockstep spring physics */}
      <motion.div
        className="pointer-events-none absolute left-1/2 z-[5] -ml-[23px] h-[46px] w-[46px] rounded-full"
        style={{
          top: -23,
          background: "radial-gradient(circle at 35% 28%,#d3fbee 0%,#8ee6c8 55%,#6fd6b4 100%)",
          boxShadow: "0 0 22px rgba(127,224,192,.55), inset 0 1px 0 rgba(255,255,255,.7)",
        }}
        initial={false}
        animate={{ y: active.y }}
        transition={springPhysics}
      />
      <motion.div
        className="pointer-events-none absolute z-[4] h-[24px] w-[14px] rounded-r-[14px] bg-[#071f19] dark:bg-[#03140f] transition-colors"
        style={{ left: SIDEBAR.w - 4, top: -12 }}
        initial={false}
        animate={{ y: active.y }}
        transition={springPhysics}
      />

      {TOP.map(render)}
      {BOTTOM.map(render)}

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hover && (() => {
          const it = [...TOP, ...BOTTOM].find((i) => i.id === hover);
          if (!it) return null;
          const isTheme = it.id === "theme";
          const label = isTheme ? (theme === "dark" ? "Light mode" : "Dark mode") : it.label;
          return (
            <motion.div
              key={hover}
              initial={{ opacity: 0, x: -6, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -4, scale: 0.95 }}
              transition={{ duration: 0.16 }}
              className="pointer-events-none absolute z-30 -translate-y-1/2 whitespace-nowrap rounded-[8px] bg-forest px-[10px] py-[6px] text-[10px] font-medium text-white shadow-[0_8px_20px_-6px_rgba(4,32,24,.5)]"
              style={{ left: SIDEBAR.w + 22, top: it.y }}
            >
              {label}
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
