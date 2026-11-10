"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Settings,
  User,
  Moon,
  Sun,
  Bell,
  ShieldCheck,
  Check,
  Globe,
  Laptop,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Split from "@/components/ui/Split";
import Avatar from "@/components/ui/Avatar";
import { usePageEntrance } from "@/lib/entrance";
import { useTheme } from "@/lib/theme-context";
import { notify } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";

export default function SettingsView() {
  const ref = useRef<HTMLDivElement>(null);
  usePageEntrance(ref);
  const { theme, toggleTheme } = useTheme();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [desktopPush, setDesktopPush] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);

  const handleSave = () => {
    notify({
      title: "Settings synchronized",
      description: "Preferences saved to workspace profile.",
      type: "success",
    });
  };

  return (
    <div ref={ref} data-page className="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div className="relative flex flex-col w-full min-h-full" style={{ padding: "24px 32px 32px 110px" }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[16px] w-full">
          <div>
            <h1 className="font-display text-[31px] font-normal leading-none tracking-[-0.8px] text-ink">
              <Split label="Workspace Settings">Workspace Settings</Split>
            </h1>
            <p data-fill className="mt-[10px] text-[11px] text-muted">
              Configure your workspace preferences, visual themes, notifications, and team permissions.
            </p>
          </div>

          <div data-fill className="flex items-center gap-[10px]">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex h-[32px] items-center gap-[6px] rounded-full bg-forest-2 dark:bg-mint px-[16px] text-[11px] font-medium text-white dark:text-forest shadow-sm"
            >
              <Check size={13} />
              <span>Save Changes</span>
            </motion.button>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="mt-[20px] grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
          {/* Section 1: Appearance & Theme */}
          <Card className="p-[20px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-[10px] mb-[14px]">
                <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-mint-2/70 dark:bg-mint-3/20 text-forest-2 dark:text-mint">
                  <Sun size={16} />
                </span>
                <div>
                  <h3 className="text-[13.5px] font-medium text-ink">Appearance & Theme</h3>
                  <p className="text-[10px] text-muted">Choose your preferred visual aesthetic</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[12px] mt-[16px]">
                {/* Light Mode Option */}
                <button
                  onClick={() => {
                    if (theme === "dark") {
                      toggleTheme();
                      notify({ title: "Light mode enabled", type: "info" });
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center gap-[10px] rounded-[14px] p-[16px] border text-center transition-all",
                    theme === "light"
                      ? "border-forest-2 dark:border-mint bg-mint-2/30 shadow-sm"
                      : "border-black/[.08] dark:border-white/[.1] hover:bg-black/[.02]"
                  )}
                >
                  <Sun size={24} className={theme === "light" ? "text-forest" : "text-muted"} />
                  <div>
                    <p className="text-[12px] font-medium text-ink">Light Mode</p>
                    <p className="text-[9.5px] text-muted">Crisp mint & paper white</p>
                  </div>
                  {theme === "light" && (
                    <span className="h-[6px] w-[6px] rounded-full bg-forest-2" />
                  )}
                </button>

                {/* Dark Mode Option */}
                <button
                  onClick={() => {
                    if (theme === "light") {
                      toggleTheme();
                      notify({ title: "Dark mode enabled", type: "info" });
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center gap-[10px] rounded-[14px] p-[16px] border text-center transition-all",
                    theme === "dark"
                      ? "border-mint bg-mint-3/15 shadow-sm"
                      : "border-black/[.08] dark:border-white/[.1] hover:bg-white/[.04]"
                  )}
                >
                  <Moon size={24} className={theme === "dark" ? "text-mint" : "text-muted"} />
                  <div>
                    <p className="text-[12px] font-medium text-ink">Dark Mode</p>
                    <p className="text-[9.5px] text-muted">Deep emerald & forest glow</p>
                  </div>
                  {theme === "dark" && (
                    <span className="h-[6px] w-[6px] rounded-full bg-mint" />
                  )}
                </button>
              </div>
            </div>

            <p className="mt-[18px] text-[10.5px] text-muted">
              Theme can also be toggled instantly with the sun/moon icon in the left sidebar or the search palette.
            </p>
          </Card>

          {/* Section 2: Account Profile */}
          <Card className="p-[20px]">
            <div className="flex items-center gap-[10px] mb-[16px]">
              <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-mint-2/70 dark:bg-mint-3/20 text-forest-2 dark:text-mint">
                <User size={16} />
              </span>
              <div>
                <h3 className="text-[13.5px] font-medium text-ink">Profile Details</h3>
                <p className="text-[10px] text-muted">Your identity across the surgical workspace</p>
              </div>
            </div>

            <div className="flex items-center gap-[14px] p-[12px] rounded-[12px] bg-black/[.03] dark:bg-white/[.05] mb-[16px]">
              <Avatar name="Hannah Brooks" size={46} />
              <div>
                <h4 className="text-[13px] font-medium text-ink">Hannah Brooks</h4>
                <p className="text-[10.5px] text-muted">Lead Product Designer · Workspace Studio</p>
                <p className="text-[10px] text-muted">hannah@workspace.studio</p>
              </div>
            </div>

            <div className="space-y-[10px]">
              <div>
                <label className="text-[10.5px] font-medium text-muted">Display Name</label>
                <input
                  defaultValue="Hannah Brooks"
                  className="mt-[4px] w-full rounded-[10px] bg-white/70 dark:bg-white/[.08] px-[12px] py-[8px] text-[11.5px] text-ink outline-none border border-black/[.08] dark:border-white/[.1]"
                />
              </div>
              <div>
                <label className="text-[10.5px] font-medium text-muted">Role & Department</label>
                <input
                  defaultValue="Lead Product Designer · Neurosurgery UX"
                  className="mt-[4px] w-full rounded-[10px] bg-white/70 dark:bg-white/[.08] px-[12px] py-[8px] text-[11.5px] text-ink outline-none border border-black/[.08] dark:border-white/[.1]"
                />
              </div>
            </div>
          </Card>

          {/* Section 3: Notification Toggles */}
          <Card className="p-[20px]">
            <div className="flex items-center gap-[10px] mb-[16px]">
              <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-mint-2/70 dark:bg-mint-3/20 text-forest-2 dark:text-mint">
                <Bell size={16} />
              </span>
              <div>
                <h3 className="text-[13.5px] font-medium text-ink">Notification Center</h3>
                <p className="text-[10px] text-muted">Manage activity and message alerts</p>
              </div>
            </div>

            <div className="space-y-[14px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-medium text-ink">Desktop Push Notifications</p>
                  <p className="text-[10px] text-muted">Receive live notifications for call invites and mentions</p>
                </div>
                <button
                  onClick={() => {
                    setDesktopPush(!desktopPush);
                    notify({ title: desktopPush ? "Push alerts disabled" : "Push alerts enabled", type: "info" });
                  }}
                  className={cn(
                    "relative h-[22px] w-[40px] rounded-full transition-colors",
                    desktopPush ? "bg-forest-2 dark:bg-mint" : "bg-black/[.15] dark:bg-white/[.2]"
                  )}
                >
                  <motion.div
                    animate={{ x: desktopPush ? 20 : 2 }}
                    className="h-[18px] w-[18px] rounded-full bg-white shadow-sm"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-medium text-ink">Email Daily Digest</p>
                  <p className="text-[10px] text-muted">Summary of video reviews and team activity at 9:00 AM</p>
                </div>
                <button
                  onClick={() => {
                    setEmailAlerts(!emailAlerts);
                    notify({ title: emailAlerts ? "Email digest disabled" : "Email digest enabled", type: "info" });
                  }}
                  className={cn(
                    "relative h-[22px] w-[40px] rounded-full transition-colors",
                    emailAlerts ? "bg-forest-2 dark:bg-mint" : "bg-black/[.15] dark:bg-white/[.2]"
                  )}
                >
                  <motion.div
                    animate={{ x: emailAlerts ? 20 : 2 }}
                    className="h-[18px] w-[18px] rounded-full bg-white shadow-sm"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-medium text-ink">Audio Cue Feedback</p>
                  <p className="text-[10px] text-muted">Subtle sound chimes on message receipts and huddle joins</p>
                </div>
                <button
                  onClick={() => {
                    setSoundEffects(!soundEffects);
                    notify({ title: soundEffects ? "Audio cues muted" : "Audio cues active", type: "info" });
                  }}
                  className={cn(
                    "relative h-[22px] w-[40px] rounded-full transition-colors",
                    soundEffects ? "bg-forest-2 dark:bg-mint" : "bg-black/[.15] dark:bg-white/[.2]"
                  )}
                >
                  <motion.div
                    animate={{ x: soundEffects ? 20 : 2 }}
                    className="h-[18px] w-[18px] rounded-full bg-white shadow-sm"
                  />
                </button>
              </div>
            </div>
          </Card>

          {/* Section 4: Security & Environment */}
          <Card className="p-[20px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-[10px] mb-[16px]">
                <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-mint-2/70 dark:bg-mint-3/20 text-forest-2 dark:text-mint">
                  <ShieldCheck size={16} />
                </span>
                <div>
                  <h3 className="text-[13.5px] font-medium text-ink">Security & Hardware</h3>
                  <p className="text-[10px] text-muted">Two-factor auth and active device sessions</p>
                </div>
              </div>

              <div className="space-y-[10px]">
                <div className="flex items-center justify-between p-[12px] rounded-[10px] bg-black/[.03] dark:bg-white/[.05]">
                  <div className="flex items-center gap-[10px]">
                    <Laptop size={16} className="text-muted" />
                    <div>
                      <p className="text-[11.5px] font-medium text-ink">MacBook Pro (Lisbon, Portugal)</p>
                      <p className="text-[9.5px] text-emerald-600 dark:text-emerald-400">Current Session · Chrome 128</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-[8px] py-[3px] text-[9.5px] font-medium text-emerald-600 dark:text-emerald-400">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between p-[12px] rounded-[10px] bg-black/[.03] dark:bg-white/[.05]">
                  <div className="flex items-center gap-[10px]">
                    <Globe size={16} className="text-muted" />
                    <div>
                      <p className="text-[11.5px] font-medium text-ink">Clinical iPad Pro (Hospital Studio)</p>
                      <p className="text-[9.5px] text-muted">Last active 3 hours ago</p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      notify({
                        title: "Device session revoked",
                        description: "Clinical iPad Pro logged out.",
                        type: "info",
                      })
                    }
                    className="text-[10px] text-muted hover:text-ink cursor-pointer"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-[18px] flex items-center justify-between border-t border-black/[.06] dark:border-white/[.08] pt-[14px]">
              <span className="text-[11px] text-muted">Two-Factor Authentication (2FA)</span>
              <span className="rounded-full bg-emerald-500/20 px-[8px] py-[3px] text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                Enabled (Hardware Key)
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
