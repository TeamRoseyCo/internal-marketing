import { ReactNode } from "react";

interface MockPhoneProps {
  children?: ReactNode;
  className?: string;
  /** When true, renders the phone in landscape orientation. */
  horizontal?: boolean;
}

export function MockPhone({ children, className = "", horizontal = false }: MockPhoneProps) {
  const width = horizontal ? 575 : 280;
  const aspectClass = horizontal ? "aspect-[19.5/9]" : "aspect-[9/19.5]";
  // Notch sits on the left side in landscape, top center in portrait
  const notchClass = horizontal
    ? "absolute left-2 top-1/2 -translate-y-1/2 w-6 h-24 rounded-full bg-black z-10"
    : "absolute top-2 left-1/2 -translate-x-1/2 h-6 w-24 rounded-full bg-black z-10";

  return (
    <div className={`relative mx-auto ${className}`} style={{ width }}>
      <div className="rounded-[48px] bg-[#1d1d1f] p-2 shadow-2xl">
        <div className={`relative rounded-[40px] overflow-hidden bg-black ${aspectClass}`}>
          <div className={notchClass} />
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
