"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useSite } from "@/components/site-provider";
import { Eyebrow } from "@/components/section-heading";

export function StudioIntro() {
  const { locale } = useSite();
  const isArabic = locale === "ar";

  return (
    <section className="studio-intro section-wrap">
      <div className="studio-intro__index" aria-hidden="true">01</div>
      <div className="studio-intro__label" data-reveal><Eyebrow>{isArabic ? "من الفكرة إلى الإطلاق" : "FROM FIRST THOUGHT TO SHIPPED PRODUCT"}</Eyebrow></div>
      <div className="studio-intro__main" data-reveal>
        <h2>{isArabic ? <>لسنا فريقًا يكتفي<br />بـ <em>التفكير الكبير.</em></> : <>More than a team.<br /><em>A team that ships.</em></>}</h2>
        <div className="studio-intro__bottom">
          <p>{isArabic
            ? "نجمع المنتج والتصميم والهندسة في مكان واحد — لنصنع تجارب واضحة، ونبنيها بعناية، ونوصلها إلى الناس."
            : "We bring product thinking, design and engineering into one room — to make the idea clear, build it with care, and put it in people’s hands."}</p>
          <Link href="/services" className="inline-link">{isArabic ? "كيف نعمل" : "How we work"}<ArrowUpRight size={16} /></Link>
        </div>
      </div>
      <div className="studio-intro__stamp" aria-hidden="true"><span>BUILD</span><span>LEARN</span><span>SHARE</span><span>GROW</span></div>
    </section>
  );
}
