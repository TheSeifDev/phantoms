"use client";

import { useSite } from "@/components/site-provider";

const phrases = ["PEOPLE", "IDEAS", "IMPACT", "TECH BEYOND THE ORDINARY", "IDEAS INTO REALITY"];

export function MarqueeStrip() {
  const { locale } = useSite();
  const items = locale === "ar" ? ["الناس", "الأفكار", "الأثر", "تقنية تتجاوز المعتاد", "أفكار تتحول إلى واقع"] : phrases;
  const loop = [...items, ...items];
  return (
    <div className="marquee-strip" aria-label={locale === "ar" ? "الناس، الأفكار، الأثر" : "People, ideas, impact"}>
      <div className="marquee-strip__track" aria-hidden="true">
        {loop.map((phrase, index) => <span className="marquee-strip__item" key={`${phrase}-${index}`}>{phrase}<i /></span>)}
      </div>
    </div>
  );
}
