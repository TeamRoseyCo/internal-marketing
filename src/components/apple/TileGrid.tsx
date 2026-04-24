import { ReactNode } from "react";

export function TileGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`ac-tile-grid-4 ${className}`}>{children}</div>;
}
