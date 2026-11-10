"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Cloud,
  Folder,
  FileText,
  FileVideo,
  FileCode,
  Image,
  Archive,
  UploadCloud,
  FolderPlus,
  MoreVertical,
  Download,
  Share2,
  HardDrive,
  Search,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Split from "@/components/ui/Split";
import Avatar from "@/components/ui/Avatar";
import { usePageEntrance } from "@/lib/entrance";

interface FileItem {
  id: string;
  name: string;
  type: "video" | "doc" | "image" | "code" | "archive";
  size: string;
  updated: string;
  sharedWith: string[];
}

const FILES: FileItem[] = [
  {
    id: "f1",
    name: "Neurosurgery_Atlas_2026_v4.pdf",
    type: "doc",
    size: "48.2 MB",
    updated: "Today, 11:20 AM",
    sharedWith: ["Sophia Brown", "Alex Johnson"],
  },
  {
    id: "f2",
    name: "Leica_M530_Raw_Capture_04.mp4",
    type: "video",
    size: "2.4 GB",
    updated: "Yesterday",
    sharedWith: ["Daniel Turner"],
  },
  {
    id: "f3",
    name: "DesignSystem_Components_Export.fig",
    type: "image",
    size: "182 MB",
    updated: "Mar 22",
    sharedWith: ["Hannah Brooks", "Sophia Brown"],
  },
  {
    id: "f4",
    name: "Craniotomy_Electrode_Coordinates.json",
    type: "code",
    size: "4.1 MB",
    updated: "Mar 19",
    sharedWith: ["Alex Johnson"],
  },
  {
    id: "f5",
    name: "DICOM_Brain_Scan_Patient_884.zip",
    type: "archive",
    size: "840 MB",
    updated: "Mar 14",
    sharedWith: ["Sophia Brown", "Daniel Turner", "Hannah Brooks"],
  },
];

const FOLDERS = [
  { name: "Surgical Case Recordings", items: 42, size: "34.2 GB", color: "text-mint-4 dark:text-mint" },
  { name: "Figma Components & UI", items: 128, size: "18.4 GB", color: "text-[#3f86c4]" },
  { name: "Clinical Trial Protocols", items: 19, size: "6.8 GB", color: "text-[#c9583d]" },
  { name: "DICOM Imaging Archives", items: 15, size: "5.4 GB", color: "text-[#5f7a82]" },
];

export default function CloudView() {
  const ref = useRef<HTMLDivElement>(null);
  usePageEntrance(ref);
  const [search, setSearch] = useState("");

  const filteredFiles = FILES.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  const getFileIcon = (type: FileItem["type"]) => {
    switch (type) {
      case "video":
        return <FileVideo size={16} className="text-[#3f86c4]" />;
      case "image":
        return <Image size={16} className="text-[#c9583d]" />;
      case "code":
        return <FileCode size={16} className="text-mint-4 dark:text-mint" />;
      case "archive":
        return <Archive size={16} className="text-[#8a2f1f]" />;
      default:
        return <FileText size={16} className="text-forest-2 dark:text-mint" />;
    }
  };

  return (
    <div ref={ref} data-page className="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div className="relative flex flex-col w-full min-h-full" style={{ padding: "24px 32px 32px 110px" }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[16px] w-full">
          <div>
            <h1 className="font-display text-[31px] font-normal leading-none tracking-[-0.8px] text-ink">
              <Split label="Cloud Storage">Cloud Storage</Split>
            </h1>
            <p data-fill className="mt-[10px] text-[11px] text-muted">
              Centralized workspace files, DICOM archives, team assets, and clinical documents.
            </p>
          </div>

          <div data-fill className="flex items-center gap-[10px]">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("New folder created in workspace.")}
              className="flex h-[32px] items-center gap-[6px] rounded-full bg-white/70 dark:bg-white/[.08] px-[14px] text-[11px] font-medium text-ink shadow-[inset_0_0_0_1px_rgba(255,255,255,.7)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]"
            >
              <FolderPlus size={13} />
              <span>New Folder</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("Upload dialog opened: select file to upload.")}
              className="flex h-[32px] items-center gap-[6px] rounded-full bg-forest-2 dark:bg-mint px-[14px] text-[11px] font-medium text-white dark:text-forest shadow-sm"
            >
              <UploadCloud size={13} />
              <span>Upload File</span>
            </motion.button>
          </div>
        </div>

        {/* Storage Bar Card */}
        <Card className="mt-[20px] p-[20px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-[12px]">
            <div className="flex items-center gap-[12px]">
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-mint-2/70 dark:bg-mint-3/20 text-forest-2 dark:text-mint">
                <HardDrive size={20} />
              </div>
              <div>
                <h3 className="text-[13px] font-medium text-ink">Workspace Drive Capacity</h3>
                <p className="text-[11px] text-muted">64.8 GB used of 100.0 GB (35.2 GB available)</p>
              </div>
            </div>
            <div className="flex items-center gap-[16px] text-[10.5px] text-muted">
              <span className="flex items-center gap-[6px]">
                <span className="h-[8px] w-[8px] rounded-full bg-mint-4" /> Videos (52%)
              </span>
              <span className="flex items-center gap-[6px]">
                <span className="h-[8px] w-[8px] rounded-full bg-[#3f86c4]" /> Design (28%)
              </span>
              <span className="flex items-center gap-[6px]">
                <span className="h-[8px] w-[8px] rounded-full bg-[#c9583d]" /> Docs (11%)
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-[16px] h-[8px] w-full overflow-hidden rounded-full bg-black/[.06] dark:bg-white/[.08] flex">
            <div style={{ width: "52%" }} className="bg-mint-4" />
            <div style={{ width: "28%" }} className="bg-[#3f86c4]" />
            <div style={{ width: "11%" }} className="bg-[#c9583d]" />
          </div>
        </Card>

        {/* Folders Row */}
        <div className="mt-[20px]">
          <h2 className="text-[13px] font-medium text-ink mb-[12px]">Workspace Folders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px]">
            {FOLDERS.map((f) => (
              <Card
                key={f.name}
                className="group p-[16px] cursor-pointer hover:border-mint-3/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-black/[.03] dark:bg-white/[.05]">
                    <Folder size={18} className={f.color} />
                  </div>
                  <button className="text-muted group-hover:text-ink transition-colors">
                    <MoreVertical size={14} />
                  </button>
                </div>
                <h4 className="mt-[12px] text-[12.5px] font-medium text-ink truncate">{f.name}</h4>
                <p className="mt-[4px] text-[10px] text-muted">
                  {f.items} items · {f.size}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Files Table */}
        <div className="mt-[24px]">
          <div className="flex items-center justify-between mb-[12px]">
            <h2 className="text-[13px] font-medium text-ink">Recent Files</h2>
            <div className="relative">
              <Search size={12} className="absolute left-[10px] top-[9px] text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search files..."
                className="h-[28px] w-[180px] rounded-full bg-white/70 dark:bg-white/[.08] pl-[28px] pr-[10px] text-[10.5px] text-ink outline-none placeholder:text-muted shadow-[inset_0_0_0_1px_rgba(255,255,255,.6)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]"
              />
            </div>
          </div>

          <Card className="overflow-hidden">
            <div className="divide-y divide-black/[.05] dark:divide-white/[.06]">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between px-[18px] py-[13px] hover:bg-black/[.02] dark:hover:bg-white/[.03] transition-colors"
                >
                  <div className="flex items-center gap-[14px] min-w-0">
                    <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] bg-black/[.03] dark:bg-white/[.06]">
                      {getFileIcon(file.type)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-ink truncate">{file.name}</p>
                      <p className="text-[9.5px] text-muted">{file.size} · Updated {file.updated}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-[16px] shrink-0">
                    <div className="flex -space-x-[6px]">
                      {file.sharedWith.map((name) => (
                        <Avatar key={name} name={name} size={22} className="border-2 border-white dark:border-[#0e2c24]" />
                      ))}
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <button
                        onClick={() => alert(`Downloading ${file.name}`)}
                        className="flex h-[28px] w-[28px] items-center justify-center rounded-full text-muted hover:text-ink hover:bg-black/[.05] dark:hover:bg-white/[.08] transition-colors"
                      >
                        <Download size={13} />
                      </button>
                      <button
                        onClick={() => alert(`Shared link copied for ${file.name}`)}
                        className="flex h-[28px] w-[28px] items-center justify-center rounded-full text-muted hover:text-ink hover:bg-black/[.05] dark:hover:bg-white/[.08] transition-colors"
                      >
                        <Share2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

