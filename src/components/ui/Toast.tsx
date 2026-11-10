"use client";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "error";
}

let toastListener: ((toast: Toast) => void) | null = null;

export function notify(toast: Omit<Toast, "id">) {
  if (toastListener) {
    toastListener({ ...toast, id: "t_" + Date.now() + Math.random().toString(36).slice(2, 6) });
  }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  toastListener = (t) => {
    setToasts((prev) => [...prev, t]);
    setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== t.id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="fixed bottom-[24px] right-[24px] z-50 flex flex-col gap-[8px] pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="pointer-events-auto flex items-center gap-[12px] rounded-[14px] bg-white dark:bg-[#103028] px-[16px] py-[12px] text-ink shadow-[0_16px_36px_-8px_rgba(0,0,0,.25)] border border-black/[.08] dark:border-white/[.12] min-w-[280px]"
          >
            <span className="shrink-0 flex items-center justify-center rounded-full">
              {t.type === "error" ? (
                <AlertCircle size={17} className="text-red-500" />
              ) : t.type === "info" ? (
                <Info size={17} className="text-mint-4 dark:text-mint" />
              ) : (
                <CheckCircle2 size={17} className="text-emerald-500" />
              )}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium leading-tight">{t.title}</p>
              {t.description && (
                <p className="text-[10px] text-muted mt-[3px] leading-tight">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-muted hover:text-ink shrink-0 p-[2px]"
            >
              <X size={13} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

