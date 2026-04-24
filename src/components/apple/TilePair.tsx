import { ReactNode } from "react";

export function TilePair({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`ac-tile-pair ${className}`}>{children}</div>;
}
