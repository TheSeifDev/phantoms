"use client";

import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/site";
import { useSite } from "@/components/site-provider";
import { SectionHeading } from "@/components/section-heading";
import { ActionLink } from "@/components/action-link";

export function ServicesPageContent() {
  const { locale, t } = useSite();
  const isArabic = locale === "ar";
  return (
    <div className="inner-page services-page section-wrap">
      <SectionHeading eyebrow={{ en: "SERVICES / 01—03", ar: "الخدمات / 01—03" }} title={{ en: "Build the next\nversion of your idea.", ar: "ابنِ النسخة التالية\nمن فكرتك." }} description={{ en: "Bring us a clear challenge or a rough sketch. We’ll help you find the right first step.", ar: "أخبرنا بتحدٍ واضح أو فكرة أولية، وسنساعدك على تحديد الخطوة المناسبة." }} number="01" />
      <div className="service-page-list" data-stagger>
        {services.map((service) => (
          <article className="service-detail-row" key={service.number}>
            <span className="service-detail-row__number">{service.number} / 03</span>
            <div><h2>{t(service.title)}</h2><p>{t(service.description)}</p><span className="service-detail-row__tags">{t(service.tags)}</span></div>
            <ArrowUpRight size={20} />
          </article>
        ))}
      </div>
      <div className="inner-page__cta"><span>{isArabic ? "هل تريد مناقشة مشروع؟" : "Have a project in mind?"}</span><ActionLink href="/contact">{isArabic ? "ابدأ محادثة" : "Start a conversation"}</ActionLink></div>
    </div>
  );
}
