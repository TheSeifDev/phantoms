"use client";

import { ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/action-link";
import { useSite } from "@/components/site-provider";
import { services } from "@/data/site";
import "@/styles/interior.css";

export function ServicesPageContent() {
  const { locale, t } = useSite();
  const isArabic = locale === "ar";

  return (
    <div className="interior-page interior-services section-wrap">
      <header className="interior-services__head" data-reveal>
        <div>
          <p className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "الخدمات / من الفكرة إلى البناء" : "SERVICES / FROM IDEA TO BUILD"}</p>
          <h1>{isArabic ? "نبني ما\nيحتاجه عملك." : "Build what\nyour work needs."}</h1>
          <p className="interior-services__lede">
            {isArabic
              ? "نساعد على تشكيل الفكرة ثم تصميم وبناء منتج رقمي يناسب المشكلة والأشخاص الذين يستخدمونه."
              : "We help shape the idea, then design and build a digital product around the problem and the people who use it."}
          </p>
        </div>
        <div className="interior-services__index" aria-hidden="true"><span>{isArabic ? "مجالات العمل" : "CAPABILITIES"}</span><span>01—03</span></div>
      </header>

      <section className="interior-services__list" aria-label={isArabic ? "خدماتنا" : "Our services"}>
        {services.map((service) => (
          <article className="interior-services__item" key={service.number} data-line>
            <div className="interior-services__number">{service.number}<span> / 03</span></div>
            <div className="interior-services__copy">
              <h2>{t(service.title)}</h2>
              <p>{t(service.description)}</p>
              <span className="interior-services__tags">{t(service.tags)}</span>
            </div>
            <span className="interior-services__mark" aria-hidden="true">↗</span>
          </article>
        ))}
      </section>

      <section className="interior-services__cta" data-reveal>
        <div>
          <p className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "الخطوة التالية" : "THE NEXT STEP"}</p>
          <h2>{isArabic ? "لنتحدث عن\nما تريد إنجازه." : "Let’s talk about\nwhat you want to make."}</h2>
          <p>{isArabic ? "ابدأ بتحدٍ واضح أو فكرة أولية؛ وسنناقش معك الخطوة المناسبة." : "Start with a clear challenge or an early idea. We’ll talk through a sensible first step."}</p>
        </div>
        <ActionLink href="/contact" className="interior-services__action">
          {isArabic ? "ابدأ موجز المشروع" : "Start a project brief"}
        </ActionLink>
        <ArrowUpRight className="interior-services__cta-mark" aria-hidden="true" size={34} strokeWidth={1} />
      </section>
    </div>
  );
}
