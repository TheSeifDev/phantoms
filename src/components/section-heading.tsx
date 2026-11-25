"use client";

import type { ReactNode } from "react";
import type { Localized } from "@/data/site";
import { useSite } from "@/components/site-provider";

export function Eyebrow({ children, number }: { children: ReactNode; number?: string }) {
  return <p className="eyebrow"><span className="eyebrow__dot" />{number && <span className="eyebrow__number">{number}</span>}{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  number,
  className = "",
}: {
  eyebrow?: Localized;
  title: Localized;
  description?: Localized;
  number?: string;
  className?: string;
}) {
  const { t } = useSite();
  return (
    <div className={`section-heading ${className}`} data-reveal>
      {eyebrow && <Eyebrow number={number}>{t(eyebrow)}</Eyebrow>}
      <h2>{t(title)}</h2>
      {description && <p className="section-heading__description">{t(description)}</p>}
    </div>
  );
}
