"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Sidebar from "./Sidebar";
import SearchModal from "./SearchModal";
import { ToastContainer } from "@/components/ui/Toast";
import { SearchProvider } from "@/lib/search-context";

/** Full-screen dashboard canvas + floating sidebar + routed page area. */
export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SearchProvider>
      <div className="shell-bg fixed inset-0 overflow-hidden">
        <Sidebar />
        <main className="absolute inset-0" id="page-root">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="h-full w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <SearchModal />
        <ToastContainer />
      </div>
    </SearchProvider>
  );
}
