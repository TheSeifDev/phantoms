"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useSite } from "@/components/site-provider";
import { Eyebrow } from "@/components/section-heading";

export function HeroSection() {
  const { locale } = useSite();
  const isArabic = locale === "ar";

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-section__image" aria-hidden="true" />
      <div className="hero-section__grid" aria-hidden="true" />
      <div className="hero-section__content">
        <Eyebrow number="EST. 2026">{isArabic ? "فريق منتج وتقنية مستقل" : "INDEPENDENT PRODUCT & TECHNOLOGY TEAM"}</Eyebrow>
        <h1 id="hero-title" data-reveal>
          {isArabic ? <>أفكار جريئة.<br /><em>أثر حقيقي.</em></> : <>Bold ideas.<br /><em>Real-world impact.</em></>}
        </h1>
        <p className="hero-section__intro" data-reveal>
          {isArabic
            ? "نحوّل الأفكار الطموحة إلى مواقع وتطبيقات ومنتجات رقمية يستحق الناس استخدامها."
            : "We turn ambitious ideas into websites, apps and digital products people want to use."}
        </p>
        <div className="hero-section__actions" data-reveal>
          <Link className="action-link action-link--primary" href="/contact"><span>{isArabic ? "ابدأ مشروعًا" : "Start a project"}</span><ArrowUpRight size={17} /></Link>
          <Link className="hero-text-link" href="/work">{isArabic ? "استكشف أعمالنا" : "Explore our work"}<ArrowDown size={15} /></Link>
        </div>
      </div>
      <div className="hero-section__aside" aria-hidden="true">
        <span>01 — 03</span>
        <span className="hero-section__aside-line" />
        <span>PEOPLE<br />IDEAS<br />IMPACT</span>
      </div>
      <div className="hero-section__bottom">
        <span>{isArabic ? "تقنية تتجاوز المعتاد" : "TECH BEYOND THE ORDINARY"}</span>
        <span className="hero-section__scroll">{isArabic ? "انزل لاكتشاف المزيد" : "SCROLL TO EXPLORE"}<ArrowDown size={14} /></span>
        <span>30° 02′ N&nbsp;&nbsp; 31° 14′ E</span>
      </div>
    </section>
  );
}
