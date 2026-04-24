import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "ghost";

interface PillLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

export function PillButton({ children, variant = "solid", className = "", ...props }: PillLinkProps) {
  const cls = variant === "ghost" ? "ac-pill ac-pill-ghost" : "ac-pill";
  return (
    <Link {...props} className={`${cls} ${className}`}>
      {children}
    </Link>
  );
}
