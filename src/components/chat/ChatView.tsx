"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  MessageCircle,
  Send,
  Smile,
  Paperclip,
  Hash,
  Phone,
  Video,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Split from "@/components/ui/Split";
import Avatar from "@/components/ui/Avatar";
import { usePageEntrance } from "@/lib/entrance";
import { notify } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";

interface Message {
  id: string;
  sender: string;
  time: string;
  text: string;
  isMe?: boolean;
  reaction?: string;
}

const CHANNELS = [
  { id: "c1", name: "design-systems", unread: 2 },
  { id: "c2", name: "surgical-reviews", unread: 0 },
  { id: "c3", name: "general", unread: 0 },
  { id: "c4", name: "releases", unread: 5 },
];

const DIRECT_MESSAGES = [
  { name: "Sophia Brown", role: "Design Lead", online: true },
  { name: "Alex Johnson", role: "Frontend Dev", online: true },
  { name: "Daniel Turner", role: "Video Producer", online: false },
  { name: "Emma Clarke", role: "Clinical Director", online: true },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    sender: "Sophia Brown",
    time: "10:14 AM",
    text: "Hannah, just reviewed the craniotomy mapping timeline. The high-contrast color scheme for arterial overlays is looking exceptional!",
    reaction: "❤️ 2",
  },
  {
    id: "m2",
    sender: "Alex Johnson",
    time: "10:22 AM",
    text: "I plugged in the subthalamic nucleus 3D coordinates into our WebGL loader. Zero frame drops at 60fps on M-series chips.",
    reaction: "🚀 3",
  },
  {
    id: "m3",
    sender: "Hannah Brooks",
    time: "10:28 AM",
    text: "Awesome work Alex! Let's make sure the scrub bar is responsive to touch scrubbing on the clinical tablets as well.",
    isMe: true,
  },
  {
    id: "m4",
    sender: "Sophia Brown",
    time: "10:31 AM",
    text: "Agreed. I am updating the touch target guidelines in our Design System spec now.",
  },
];

export default function ChatView() {
  const ref = useRef<HTMLDivElement>(null);
  usePageEntrance(ref);

  const [activeChannel, setActiveChannel] = useState("design-systems");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: "m_" + Date.now(),
      sender: "Hannah Brooks",
      time: "Just now",
      text: inputText.trim(),
      isMe: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  return (
    <div ref={ref} data-page className="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div className="relative flex flex-col w-full h-full min-h-[640px]" style={{ padding: "24px 32px 32px 110px" }}>
        {/* Header */}
        <div className="flex items-center justify-between gap-[16px] w-full shrink-0">
          <div>
            <h1 className="font-display text-[31px] font-normal leading-none tracking-[-0.8px] text-ink">
              <Split label="Team Messages">Team Messages</Split>
            </h1>
            <p data-fill className="mt-[8px] text-[11px] text-muted">
              Real-time collaboration across surgical workflows, design specs, and engineering reviews.
            </p>
          </div>
        </div>

        {/* Main Chat Layout Container */}
        <div className="mt-[18px] flex-1 flex flex-col md:flex-row gap-[16px] min-h-0">
          {/* Left Chat Sidebar (Channels & Teammates) */}
          <Card className="w-full md:w-[260px] shrink-0 p-[14px] flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Channels */}
              <div className="mb-[18px]">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted px-[8px]">Channels</span>
                <div className="mt-[8px] space-y-[2px]">
                  {CHANNELS.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setActiveChannel(ch.name)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-[8px] px-[10px] py-[7px] text-[12px] font-medium transition-colors",
                        activeChannel === ch.name
                          ? "bg-forest-2 text-white dark:bg-mint dark:text-forest"
                          : "text-ink/80 hover:bg-black/[.04] dark:hover:bg-white/[.06]"
                      )}
                    >
                      <span className="flex items-center gap-[6px]">
                        <Hash size={13} className="opacity-70" />
                        <span>{ch.name}</span>
                      </span>
                      {ch.unread > 0 && (
                        <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-mint-4 text-[9px] font-bold text-white px-[5px]">
                          {ch.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Messages */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted px-[8px]">Teammates</span>
                <div className="mt-[8px] space-y-[3px]">
                  {DIRECT_MESSAGES.map((u) => (
                    <div
                      key={u.name}
                      onClick={() =>
                        notify({
                          title: `Chat with ${u.name}`,
                          description: `${u.role} · ${u.online ? "Online" : "Offline"}`,
                          type: "info",
                        })
                      }
                      className="flex items-center justify-between rounded-[8px] px-[8px] py-[6px] hover:bg-black/[.03] dark:hover:bg-white/[.04] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-[9px]">
                        <div className="relative">
                          <Avatar name={u.name} size={24} />
                          {u.online && (
                            <span className="absolute -bottom-[1px] -right-[1px] h-[7px] w-[7px] rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0f2e26]" />
                          )}
                        </div>
                        <div>
                          <p className="text-[11.5px] font-medium text-ink leading-none">{u.name}</p>
                          <p className="text-[9px] text-muted mt-[3px]">{u.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Current User Tile */}
            <div className="border-t border-black/[.06] dark:border-white/[.08] pt-[12px] flex items-center gap-[10px]">
              <Avatar name="Hannah Brooks" size={28} />
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-ink truncate">Hannah Brooks</p>
                <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">● Available</p>
              </div>
            </div>
          </Card>

          {/* Chat Window Area */}
          <Card className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Thread Header */}
            <div className="flex items-center justify-between border-b border-black/[.06] dark:border-white/[.08] px-[20px] py-[14px] shrink-0">
              <div className="flex items-center gap-[10px]">
                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-mint-2/70 dark:bg-mint-3/20 text-forest-2 dark:text-mint">
                  <Hash size={16} />
                </div>
                <div>
                  <h3 className="text-[13.5px] font-medium text-ink leading-none">#{activeChannel}</h3>
                  <p className="text-[10px] text-muted mt-[3px]">Workspace discussion, specs, and design reviews</p>
                </div>
              </div>

              <div className="flex items-center gap-[8px]">
                <button
                  onClick={() =>
                    notify({
                      title: `Audio huddle initiated in #${activeChannel}`,
                      description: "Broadcasting room link to participants.",
                      type: "info",
                    })
                  }
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-muted hover:text-ink hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-colors"
                  title="Start audio call"
                >
                  <Phone size={14} />
                </button>
                <button
                  onClick={() =>
                    notify({
                      title: `Video call launched in #${activeChannel}`,
                      description: "Connecting 4 participants...",
                      type: "success",
                    })
                  }
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-muted hover:text-ink hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-colors"
                  title="Start video huddle"
                >
                  <Video size={14} />
                </button>
              </div>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-[20px] space-y-[16px]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn("flex gap-[12px] max-w-[80%]", m.isMe ? "ml-auto flex-row-reverse" : "")}
                >
                  <Avatar name={m.sender} size={28} className="shrink-0 mt-[2px]" />
                  <div>
                    <div className={cn("flex items-baseline gap-[6px] mb-[4px]", m.isMe ? "justify-end" : "")}>
                      <span className="text-[11px] font-medium text-ink">{m.sender}</span>
                      <span className="text-[9px] text-muted">{m.time}</span>
                    </div>

                    <div
                      className={cn(
                        "rounded-[16px] px-[14px] py-[10px] text-[12px] leading-relaxed",
                        m.isMe
                          ? "bg-forest-2 text-white dark:bg-mint dark:text-forest rounded-tr-[4px]"
                          : "bg-black/[.04] dark:bg-white/[.07] text-ink rounded-tl-[4px]"
                      )}
                    >
                      {m.text}
                    </div>

                    {m.reaction && (
                      <div className="mt-[4px] inline-flex items-center rounded-full bg-white dark:bg-white/[.1] border border-black/[.08] dark:border-white/[.1] px-[6px] py-[1px] text-[10px]">
                        {m.reaction}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="border-t border-black/[.06] dark:border-white/[.08] p-[14px] shrink-0">
              <div className="flex items-center gap-[10px] rounded-[16px] bg-black/[.03] dark:bg-white/[.06] px-[14px] py-[10px] border border-black/[.06] dark:border-white/[.08]">
                <button
                  onClick={() =>
                    notify({
                      title: "Attachment selector",
                      description: "Attach DICOM zip, video recording, or PDF.",
                      type: "info",
                    })
                  }
                  className="text-muted hover:text-ink transition-colors"
                  title="Attach file"
                >
                  <Paperclip size={16} />
                </button>
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder={`Message #${activeChannel}... (press Enter to send)`}
                  className="flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-muted"
                />
                <button
                  onClick={() =>
                    notify({
                      title: "Reaction palette",
                      description: "Emoji reactions ready.",
                      type: "info",
                    })
                  }
                  className="text-muted hover:text-ink transition-colors"
                  title="Add emoji"
                >
                  <Smile size={16} />
                </button>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={handleSend}
                  className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-forest-2 dark:bg-mint text-white dark:text-forest transition-colors shadow-sm"
                  title="Send message"
                >
                  <Send size={12} className="translate-x-[1px]" />
                </motion.button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
