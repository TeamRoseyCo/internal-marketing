import { ReactNode } from "react";

export function TileStack({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`ac-tile-stack ${className}`}>{children}</div>;
}
