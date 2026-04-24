import Link from "next/link";
import { ComponentProps } from "react";

interface CTALinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  children: React.ReactNode;
  className?: string;
}

export function CTALink({ children, className = "", ...props }: CTALinkProps) {
  return (
    <Link {...props} className={`ac-link ${className}`}>
      {children}
    </Link>
  );
}
