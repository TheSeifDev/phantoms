"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { useSite } from "@/components/site-provider";

export function SiteFooter() {
  const { locale } = useSite();
  const ar = locale === "ar";
  return (
    <footer className="site-footer">
      <div className="section-wrap">
        <div className="footer-prelude"><span className="eyebrow">[ {ar ? "الفصل التالي" : "THE NEXT CHAPTER"} ]</span><span>{ar ? "يبدأ بفكرة." : "IT STARTS WITH AN IDEA."}</span></div>
        <Link href="/contact" className="footer-call" aria-label={ar ? "ابدأ مشروعًا مع فانتومز" : "Start a project with Phantoms"}><span data-reveal>{ar ? <>خلّينا<br />نبني.</> : <>LET’S<br />BUILD.</>}</span><span className="footer-call__arrow" data-magnetic><ArrowUpRight strokeWidth={1} /></span></Link>
        <div className="footer-meta"><div><Link href="/" className="footer-wordmark">PHANTOMS<span>/</span></Link><p>{ar ? "الناس · الأفكار · الأثر" : "PEOPLE. IDEAS. IMPACT."}</p></div><div className="footer-links"><Link href="/work">{ar ? "الأعمال" : "Work"}</Link><Link href="/services">{ar ? "الخدمات" : "Services"}</Link><Link href="/team">{ar ? "الفريق" : "Team"}</Link><Link href="/contact">{ar ? "موجز مشروع" : "Project brief"}</Link></div><div className="footer-source"><a href="https://github.com/TheSeifDev/phantoms" target="_blank" rel="noreferrer">GITHUB<ArrowUpRight size={14} /></a><span lang="ja" aria-hidden="true">幻影 — 創造と技術</span></div></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} PHANTOMS</span><span>{ar ? "تفكير إبداعي. دقة هندسية." : "CREATIVE THINKING. ENGINEERING PRECISION."}</span><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>{ar ? "للأعلى" : "BACK TO TOP"}<ArrowUp size={14} /></button></div>
      </div>
    </footer>
  );
}
