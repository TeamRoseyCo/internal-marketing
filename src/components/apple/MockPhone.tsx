import { ReactNode } from "react";

export function MockPhone({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: 280 }}>
      <div className="rounded-[48px] bg-[#1d1d1f] p-2 shadow-2xl">
        <div className="relative rounded-[40px] overflow-hidden bg-black aspect-[9/19.5]">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 h-6 w-24 rounded-full bg-black z-10" />
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
