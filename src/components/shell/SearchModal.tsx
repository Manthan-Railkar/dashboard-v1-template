"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Video, User, Home, Bookmark, Cloud, MessageCircle, Settings, PhoneCall, Moon, Sun, ArrowRight } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { useSearch } from "@/lib/search-context";

export default function SearchModal() {
  const { isOpen, closeSearch, toggleSearch } = useSearch();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");

  const items = [
    { label: "Home Workspace", category: "Navigation", href: "/", icon: Home },
    { label: "Hannah Brooks Profile", category: "Navigation", href: "/profile", icon: User },
    { label: "Saved for Later", category: "Navigation", href: "/saved", icon: Bookmark },
    { label: "Published Videos", category: "Navigation", href: "/videos", icon: Video },
    { label: "Cloud Drive & Files", category: "Navigation", href: "/cloud", icon: Cloud },
    { label: "Team Messages & Chat", category: "Navigation", href: "/chat", icon: MessageCircle },
    { label: "Calls & Team Huddle", category: "Navigation", href: "/calls", icon: PhoneCall },
    { label: "Workspace Settings", category: "Navigation", href: "/settings", icon: Settings },
    { label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode", category: "Action", action: toggleTheme, icon: theme === "dark" ? Sun : Moon },
  ];

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleSearch();
        setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSearch, toggleSearch]);

  const selectItem = (item: (typeof items)[0]) => {
    if (item.action) {
      item.action();
    } else if (item.href) {
      router.push(item.href);
    }
    closeSearch();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="relative w-full max-w-[560px] overflow-hidden rounded-[20px] bg-white dark:bg-[#0f2e26] shadow-[0_24px_50px_-12px_rgba(0,0,0,.5)] border border-black/[.08] dark:border-white/[.12]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-[12px] border-b border-black/[.08] dark:border-white/[.1] px-[18px] py-[14px]">
              <Search size={18} className="text-muted shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search workspace, pages, actions... (or press Esc to exit)"
                className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted hover:text-ink">
                  <X size={15} />
                </button>
              )}
              <span className="rounded-[6px] bg-black/[.05] dark:bg-white/[.08] px-[7px] py-[3px] text-[10px] font-medium text-muted">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-[340px] overflow-y-auto p-[10px]">
              {filtered.length === 0 ? (
                <div className="py-[36px] text-center text-[12px] text-muted">
                  No matches found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => selectItem(item)}
                      className="group flex w-full items-center justify-between rounded-[12px] px-[14px] py-[10px] text-left transition-colors hover:bg-black/[.05] dark:hover:bg-white/[.08]"
                    >
                      <div className="flex items-center gap-[12px]">
                        <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-mint-2/70 dark:bg-mint-3/20 text-mint-4 dark:text-mint">
                          <Icon size={16} />
                        </span>
                        <div>
                          <p className="text-[12.5px] font-medium text-ink">{item.label}</p>
                          <p className="text-[9.5px] text-muted">{item.category}</p>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
