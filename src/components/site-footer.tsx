"use client";

import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { useSite } from "@/components/site-provider";

export function SiteFooter() {
  const { locale } = useSite();
  const isArabic = locale === "ar";

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-top__copy">
          <p className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "الفصل التالي يبدأ بفكرة" : "THE NEXT CHAPTER STARTS WITH AN IDEA"}</p>
          <h2>{isArabic ? <>عندك فكرة؟<br /><em>خلّينا نبنيها.</em></> : <>Have an idea?<br /><em>Let’s make it real.</em></>}</h2>
        </div>
        <Link className="footer-big-cta" href="/contact" aria-label={isArabic ? "ابدأ مشروعًا" : "Start a project"}>
          <span>{isArabic ? "ابدأ مشروعًا" : "Start a project"}</span><ArrowUpRight size={25} />
        </Link>
      </div>
      <div className="footer-bottom">
        <Link className="footer-wordmark" href="/" aria-label="Phantoms home">PHANTOMS<span>®</span></Link>
        <p>{isArabic ? "فريق يحوّل الأفكار إلى أثر حقيقي." : "People · Ideas · Impact."}</p>
        <div className="footer-links">
          <Link href="/work">{isArabic ? "الأعمال" : "Work"}</Link>
          <Link href="/services">{isArabic ? "الخدمات" : "Services"}</Link>
          <Link href="/team">{isArabic ? "الفريق" : "Team"}</Link>
          <Link href="/contact">{isArabic ? "تواصل" : "Contact"}<MoveUpRight size={13} /></Link>
        </div>
        <span className="footer-copy">© {new Date().getFullYear()} PHANTOMS</span>
      </div>
    </footer>
  );
}
