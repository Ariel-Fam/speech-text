// components/DownloadButton.tsx
import { MouseEvent } from "react";

interface DownloadButtonProps {
  src: string;       // e.g. "https://cdn.example.com/videos/123.mp4"
  filename?: string; // optional download name
}

export function DownloadButton({ src, filename }: DownloadButtonProps) {
  const handleDownload = async (e: MouseEvent) => {
    e.preventDefault();
    // 1. Fetch as blob
    const res = await fetch(src, { mode: "cors" });
    if (!res.ok) throw new Error("Network response was not ok");
    const blob = await res.blob();

    // 2. Create object URL & trigger download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || src.split("/").pop() || "video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <button className="bg-blue-500 p-4 rounded-2xl" onClick={handleDownload}>
      Download Audio
    </button>
  );
}