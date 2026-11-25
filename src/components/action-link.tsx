import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ActionLink({
  href,
  children,
  variant = "primary",
  direction = "up",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  direction?: "up" | "down";
  className?: string;
}) {
  const Icon = direction === "down" ? ArrowDownRight : ArrowUpRight;
  return (
    <Link className={`action-link action-link--${variant} ${className}`} href={href}>
      <span>{children}</span><Icon size={17} strokeWidth={1.8} />
    </Link>
  );
}
