import { ReactNode } from "react";

interface MockBrowserProps {
  url?: string;
  children: ReactNode;
  theme?: "light" | "dark";
  className?: string;
}

export function MockBrowser({
  url = "roseyco.com",
  children,
  theme = "light",
  className = "",
}: MockBrowserProps) {
  const chromeBg = theme === "dark" ? "bg-[#2a2a2c]" : "bg-[#e8e8ea]";
  const bodyBg = theme === "dark" ? "bg-[#1d1d1f]" : "bg-white";
  const urlBg = theme === "dark" ? "bg-[#1d1d1f]" : "bg-white";
  const urlText = theme === "dark" ? "text-[#9b9b9f]" : "text-[#6e6e73]";
  return (
    <div className={`w-full rounded-[14px] overflow-hidden shadow-2xl ${className}`}>
      <div className={`flex items-center gap-2 px-4 py-3 ${chromeBg}`}>
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className={`ml-3 flex-1 rounded-md px-3 py-1 text-xs ${urlBg} ${urlText}`}>
          {url}
        </div>
      </div>
      <div className={bodyBg}>{children}</div>
    </div>
  );
}
