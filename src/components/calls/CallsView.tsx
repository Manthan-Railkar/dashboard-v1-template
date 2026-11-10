"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  PhoneCall,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Share2,
  PhoneOff,
  Calendar,
  Clock,
  Plus,
  Radio,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Split from "@/components/ui/Split";
import Avatar from "@/components/ui/Avatar";
import { usePageEntrance } from "@/lib/entrance";
import { notify } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";

const PARTICIPANTS = [
  { name: "Hannah Brooks", role: "You (Lead Designer)", speaking: true, muted: false, videoOn: true },
  { name: "Sophia Brown", role: "Design Lead", speaking: false, muted: false, videoOn: true },
  { name: "Alex Johnson", role: "Frontend Dev", speaking: false, muted: true, videoOn: true },
  { name: "Daniel Turner", role: "Video Producer", speaking: true, muted: false, videoOn: false },
];

const UPCOMING_CALLS = [
  {
    id: "c1",
    title: "Weekly Neurosurgical UX Critique",
    time: "2:00 PM - 2:45 PM",
    duration: "45 min",
    attendees: ["Sophia Brown", "Alex Johnson", "Hannah Brooks"],
    tag: "Design Review",
  },
  {
    id: "c2",
    title: "Clinical Trial Protocols 1-on-1",
    time: "4:00 PM - 4:30 PM",
    duration: "30 min",
    attendees: ["Emma Clarke", "Hannah Brooks"],
    tag: "Clinical",
  },
  {
    id: "c3",
    title: "Engineering Architecture & 3D WebGL",
    time: "Tomorrow, 10:00 AM",
    duration: "60 min",
    attendees: ["Alex Johnson", "Daniel Turner", "Hannah Brooks"],
    tag: "Engineering",
  },
];

export default function CallsView() {
  const ref = useRef<HTMLDivElement>(null);
  usePageEntrance(ref);

  const [inCall, setInCall] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  const toggleMic = () => {
    setMicActive(!micActive);
    notify({
      title: micActive ? "Microphone muted" : "Microphone unmuted",
      type: "info",
    });
  };

  const toggleVideo = () => {
    setVideoActive(!videoActive);
    notify({
      title: videoActive ? "Camera turned off" : "Camera turned on",
      type: "info",
    });
  };

  const toggleScreen = () => {
    setScreenSharing(!screenSharing);
    notify({
      title: screenSharing ? "Screen sharing stopped" : "Broadcasting screen stream",
      type: screenSharing ? "info" : "success",
    });
  };

  const leaveCall = () => {
    setInCall(false);
    notify({
      title: "Left #design-systems huddle",
      description: "Call audio disconnected.",
      type: "info",
    });
  };

  const joinCall = () => {
    setInCall(true);
    notify({
      title: "Joined #design-systems huddle",
      description: "HD audio connected.",
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
              <Split label="Calls & Huddles">Calls & Huddles</Split>
            </h1>
            <p data-fill className="mt-[10px] text-[11px] text-muted">
              Live workspace audio huddles, video syncs, and surgical procedure walk-throughs.
            </p>
          </div>

          <div data-fill className="flex items-center gap-[10px]">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                notify({
                  title: "Meeting Scheduler",
                  description: "Calendar invite sent for review.",
                  type: "info",
                })
              }
              className="flex h-[32px] items-center gap-[6px] rounded-full bg-white/70 dark:bg-white/[.08] px-[14px] text-[11px] font-medium text-ink shadow-[inset_0_0_0_1px_rgba(255,255,255,.7)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]"
            >
              <Calendar size={13} />
              <span>Schedule Call</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={joinCall}
              className="flex h-[32px] items-center gap-[6px] rounded-full bg-forest-2 dark:bg-mint px-[14px] text-[11px] font-medium text-white dark:text-forest shadow-sm"
            >
              <Plus size={13} />
              <span>Start Instant Huddle</span>
            </motion.button>
          </div>
        </div>

        {/* Active Huddle Stage */}
        {inCall ? (
          <div className="mt-[20px]">
            <Card className="overflow-hidden p-[20px] bg-gradient-to-b from-white/90 to-white/60 dark:from-[#0a261f]/90 dark:to-[#061d16]/90 border border-mint/20 shadow-lg">
              {/* Call Top Bar */}
              <div className="flex items-center justify-between pb-[16px] border-b border-black/[.06] dark:border-white/[.08]">
                <div className="flex items-center gap-[10px]">
                  <span className="flex h-[10px] w-[10px] relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-emerald-500" />
                  </span>
                  <div>
                    <h3 className="text-[13.5px] font-medium text-ink">Active Huddle: #design-systems</h3>
                    <p className="text-[10px] text-muted">4 team members present · 24:18 elapsed</p>
                  </div>
                </div>

                <div className="flex items-center gap-[8px]">
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-[10px] py-[3px] text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-[4px]">
                    <Radio size={11} className="animate-pulse" /> HD Audio Active
                  </span>
                </div>
              </div>

              {/* Participants Grid */}
              <div className="mt-[20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px]">
                {PARTICIPANTS.map((p) => {
                  const isSpeaking = p.speaking && (p.name !== "Hannah Brooks" || micActive);
                  return (
                    <div
                      key={p.name}
                      className={cn(
                        "relative flex flex-col items-center justify-center p-[20px] rounded-[18px] transition-all duration-300",
                        isSpeaking
                          ? "bg-mint-2/40 dark:bg-mint-3/15 ring-2 ring-forest-2/30 dark:ring-mint/50 shadow-md"
                          : "bg-black/[.02] dark:bg-white/[.04] border border-black/[.05] dark:border-white/[.08]"
                      )}
                    >
                      <div className="relative">
                        <Avatar name={p.name} size={64} />
                        {isSpeaking && (
                          <span className="absolute -bottom-[2px] right-[4px] flex h-[16px] w-[16px] items-center justify-center rounded-full bg-emerald-500 text-white shadow">
                            <Radio size={9} className="animate-spin" />
                          </span>
                        )}
                      </div>

                      <h4 className="mt-[12px] text-[12.5px] font-medium text-ink">{p.name}</h4>
                      <p className="text-[10px] text-muted">{p.role}</p>

                      {/* Speaking waveform animation */}
                      {isSpeaking ? (
                        <div className="mt-[10px] flex items-center gap-[3px] h-[16px]">
                          {[0.4, 0.9, 0.6, 1, 0.5, 0.8, 0.3].map((h, i) => (
                            <motion.span
                              key={i}
                              animate={{ scaleY: [h, 0.2, h] }}
                              transition={{ repeat: Infinity, duration: 0.6 + i * 0.1, ease: "easeInOut" }}
                              className="w-[2.5px] h-[12px] rounded-full bg-forest-2 dark:bg-mint"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="mt-[10px] h-[16px] text-[9.5px] text-muted flex items-center">
                          {p.muted ? "Muted" : "Listening"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* In-Call Controls Bar */}
              <div className="mt-[24px] flex items-center justify-center gap-[12px]">
                <button
                  onClick={toggleMic}
                  className={cn(
                    "flex h-[40px] w-[40px] items-center justify-center rounded-full transition-colors",
                    micActive
                      ? "bg-forest-2 dark:bg-mint text-white dark:text-forest"
                      : "bg-red-500 text-white"
                  )}
                  title={micActive ? "Mute Microphone" : "Unmute Microphone"}
                >
                  {micActive ? <Mic size={17} /> : <MicOff size={17} />}
                </button>

                <button
                  onClick={toggleVideo}
                  className={cn(
                    "flex h-[40px] w-[40px] items-center justify-center rounded-full transition-colors",
                    videoActive
                      ? "bg-forest-2 dark:bg-mint text-white dark:text-forest"
                      : "bg-red-500 text-white"
                  )}
                  title={videoActive ? "Turn off camera" : "Turn on camera"}
                >
                  {videoActive ? <Video size={17} /> : <VideoOff size={17} />}
                </button>

                <button
                  onClick={toggleScreen}
                  className={cn(
                    "flex h-[40px] w-[40px] items-center justify-center rounded-full transition-colors",
                    screenSharing
                      ? "bg-emerald-500 text-white"
                      : "bg-black/[.08] dark:bg-white/[.1] text-ink hover:bg-black/[.15]"
                  )}
                  title="Share Screen"
                >
                  <Share2 size={17} />
                </button>

                <button
                  onClick={leaveCall}
                  className="flex h-[40px] px-[18px] items-center gap-[6px] rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors font-medium text-[11px] shadow-sm"
                  title="Leave Huddle"
                >
                  <PhoneOff size={15} />
                  <span>Leave</span>
                </button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="mt-[20px]">
            <Card className="p-[28px] text-center flex flex-col items-center justify-center">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-mint-2/70 dark:bg-mint-3/20 text-forest-2 dark:text-mint mb-[14px]">
                <PhoneCall size={24} />
              </div>
              <h3 className="text-[15px] font-medium text-ink">No active call in session</h3>
              <p className="mt-[6px] text-[11.5px] text-muted max-w-[380px]">
                You are currently offline. Join an existing team room or launch an instant huddle.
              </p>
              <button
                onClick={joinCall}
                className="mt-[16px] rounded-full bg-forest-2 dark:bg-mint text-white dark:text-forest px-[20px] py-[9px] text-[11.5px] font-medium shadow-sm hover:brightness-105 transition-all"
              >
                Join #design-systems Huddle
              </button>
            </Card>
          </div>
        )}

        {/* Upcoming Scheduled Calls */}
        <div className="mt-[24px]">
          <h2 className="text-[13px] font-medium text-ink mb-[12px]">Scheduled Meetings Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
            {UPCOMING_CALLS.map((call) => (
              <Card key={call.id} className="p-[16px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-[8px]">
                    <span className="rounded-full bg-black/[.04] dark:bg-white/[.06] px-[8px] py-[3px] text-[9.5px] font-medium text-forest-2 dark:text-mint">
                      {call.tag}
                    </span>
                    <span className="text-[10px] text-muted flex items-center gap-[4px]">
                      <Clock size={11} /> {call.duration}
                    </span>
                  </div>

                  <h3 className="text-[13px] font-medium text-ink leading-snug">{call.title}</h3>
                  <p className="mt-[6px] text-[10.5px] text-muted">{call.time}</p>
                </div>

                <div className="mt-[16px] flex items-center justify-between border-t border-black/[.05] dark:border-white/[.06] pt-[12px]">
                  <div className="flex -space-x-[6px]">
                    {call.attendees.map((name) => (
                      <Avatar key={name} name={name} size={22} className="border-2 border-white dark:border-[#0e2c24]" />
                    ))}
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setInCall(true);
                      notify({
                        title: `Connecting to ${call.title}`,
                        type: "success",
                      });
                    }}
                    className="flex h-[26px] items-center gap-[4px] rounded-full bg-mint-2 dark:bg-mint-3/20 text-forest-2 dark:text-mint px-[10px] text-[10px] font-medium hover:bg-mint-3/40 transition-colors"
                  >
                    <Video size={11} />
                    <span>Join</span>
                  </motion.button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
