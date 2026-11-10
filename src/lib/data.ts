import type { ThumbTone } from "@/components/ui/Thumb";

export const members = ["Sophia Brown", "Alex Johnson", "Daniel Turner", "Emma Clarke", "Noah Kim", "Lena Fischer"];
export const bannerFaces = ["Sophia Brown", "Alex Johnson", "Daniel Turner", "Lena Fischer"];

export const days = [
  { d: "Mon", n: 2, dots: 0 }, { d: "Tue", n: 3, dots: 2 }, { d: "Wed", n: 4, dots: 1 },
  { d: "Thu", n: 5, dots: 1 }, { d: "Fri", n: 6, dots: 0 }, { d: "Sat", n: 7, dots: 3, active: true },
];

export const lastVideos: { title: string; date: string; views: number; comments: number; len: string; tone: ThumbTone }[] = [
  { title: "Brain Aneurysm Clipping with the Leica M530 OH6 Neurosurgical", date: "Mar 2", views: 3, comments: 15, len: "4 min", tone: "teal" },
  { title: "About the National Hospital for Neurology and Neurosurgery", date: "Mar 30", views: 5, comments: 12, len: "8 min", tone: "blue" },
  { title: "Video Neurosurgery New Techniques in Telemedicine", date: "Apr 4", views: 9, comments: 21, len: "6 min", tone: "slate" },
  { title: "Awake Craniotomy: Language Mapping", date: "Apr 12", views: 14, comments: 6, len: "11 min", tone: "red" },
];

export const notifications = [
  { who: "Jennifer Campbell", text: "Jennifer Campbell Invites You to a Call: ‘Personal Development Strategies’", tag: "Invite", time: "30 min ago" },
  { who: "Sarah Thompson", text: "Sarah Thompson Left a Comment on Your Video: ‘Mastering the Art of Photography’", tag: "Comment", time: "1 hour ago" },
  { who: "Daniel Turner", text: "Daniel Turner Watched Your Video: ‘Cooking with Passion’", tag: "Viewing", time: "1 day ago" },
  { who: "Olivia Chen", text: "Olivia Chen Shared ‘Q2 Design Review’ With You", tag: "Shared", time: "2 days ago" },
];

export type SavedItem = { id: string; kind: "Video" | "Doc" | "Link"; title: string; source: string; saved: string; tone?: ThumbTone; tint: string };
export const saved: SavedItem[] = [
  { id: "s1", kind: "Video", title: "Brain Aneurysm Clipping with the Leica M530", source: "Last videos", saved: "Saved Mar 3", tone: "teal", tint: "#eef2f0" },
  { id: "s2", kind: "Doc", title: "Q2 Design Review — Findings & Next Steps", source: "Workspace Studio", saved: "Saved Mar 18", tint: "#a8efd2" },
  { id: "s3", kind: "Link", title: "Material motion guidelines", source: "m3.material.io", saved: "Saved Mar 22", tint: "#fbd6c3" },
  { id: "s4", kind: "Video", title: "Awake Craniotomy: Language Mapping", source: "Library", saved: "Saved Mar 14", tone: "red", tint: "#eef0ee" },
  { id: "s5", kind: "Doc", title: "Onboarding checklist for new teammates", source: "People Ops", saved: "Saved Mar 12", tint: "#d3efc4" },
  { id: "s6", kind: "Link", title: "Inclusive design patterns cheat sheet", source: "a11yproject.com", saved: "Saved Mar 12", tint: "#cfe4f2" },
  { id: "s7", kind: "Video", title: "Endoscopic Pituitary Surgery Walkthrough", source: "Library", saved: "Saved Mar 10", tone: "teal", tint: "#eef2f0" },
];

export const collections = [
  { name: "Neurosurgery reference", items: 24, pct: 82, tone: "dark" },
  { name: "Design inspiration", items: 41, pct: 94, tone: "mint" },
  { name: "Team onboarding", items: 8, pct: 38, tone: "peach" },
  { name: "Read later", items: 17, pct: 52, tone: "mint" },
] as const;
