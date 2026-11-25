"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useSite } from "@/components/site-provider";

export function HeroSection() {
  const { locale } = useSite();
  const ar = locale === "ar";
  return (
    <section className="signal-hero" aria-labelledby="hero-title">
      <div className="signal-hero__art" data-hero-art aria-hidden="true"><Image src="/manus-storage/async-images/r6bfqbclDYhfD7A0g9gHFl/image-1.webp" alt="" fill sizes="100vw" priority unoptimized /></div>
      <div className="signal-hero__frame" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="signal-hero__top section-wrap"><span className="eyebrow"><i className="status-dot" />{ar ? "فريق منتجات وهندسة مستقل" : "INDEPENDENT PRODUCT & ENGINEERING COLLECTIVE"}</span><span className="signal-hero__edition">PH — 001 / <span lang="ja" aria-hidden="true">幻影</span></span></div>
      <div className="signal-hero__content section-wrap">
        <h1 id="hero-title" className="signal-hero__title"><span className="line-mask"><span data-hero-line>{ar ? "نبني خارج" : "BUILD BEYOND"}</span></span><span className="line-mask"><span data-hero-line className="signal-hero__outline">{ar ? "المألوف." : "THE ORDINARY."}</span></span></h1>
        <div className="signal-hero__lower"><div className="signal-hero__summary" data-hero-copy><p>{ar ? "أفكار طموحة. تنفيذ دقيق. نطوّر المواقع والتطبيقات والمنتجات التي تدفعك إلى الأمام." : "Ambitious ideas. Precise execution. We build websites, apps, and digital products that move you forward."}</p><Link className="signal-button" href="/contact" data-magnetic><span>{ar ? "ابدأ مشروعًا" : "START A PROJECT"}</span><ArrowUpRight size={20} /></Link></div><div className="signal-hero__signature" aria-hidden="true"><span>PHANTOMS</span><span lang="ja">創造と技術</span><span>IDEAS INTO REALITY</span></div></div>
      </div>
      <div className="signal-hero__bottom section-wrap"><a href="#selected-work" className="scroll-cue"><span className="scroll-cue__icon"><ArrowDown size={16} /></span>{ar ? "اكتشف أعمالنا" : "SCROLL TO DISCOVER"}</a><span>{ar ? "الناس · الأفكار · الأثر" : "PEOPLE / IDEAS / IMPACT"}</span><span className="signal-hero__system"><i /> PH / CREATIVE TECHNOLOGY</span></div>
    </section>
  );
}
