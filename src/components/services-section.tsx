"use client";

import Link from "next/link";
import { ArrowDownRight, MoveUpRight } from "lucide-react";
import { services } from "@/data/site";
import { useSite } from "@/components/site-provider";
import { SectionHeading } from "@/components/section-heading";

export function ServicesSection() {
  const { locale, t } = useSite();
  const isArabic = locale === "ar";

  return (
    <section className="services-section section-wrap" id="services">
      <div className="services-section__top">
        <SectionHeading
          eyebrow={{ en: "WHAT WE BUILD", ar: "ما الذي نبنيه" }}
          title={{ en: "Good ideas deserve\ngreat execution.", ar: "الأفكار الجيدة تستحق\nتنفيذًا استثنائيًا." }}
          description={{ en: "One close-knit team, from the first sketch to the final hand-off.", ar: "فريق واحد متكامل، من أول رسم حتى التسليم." }}
          number="03"
        />
        <Link href="/services" className="round-arrow" aria-label={isArabic ? "كل الخدمات" : "All services"}><MoveUpRight size={19} /></Link>
      </div>
      <div className="service-list" data-stagger>
        {services.map((service) => (
          <article className="service-row" key={service.number}>
            <span className="service-row__number">{service.number}</span>
            <div className="service-row__title"><h3>{t(service.title)}</h3><span>{t(service.tags)}</span></div>
            <p>{t(service.description)}</p>
            <ArrowDownRight className="service-row__arrow" size={22} strokeWidth={1.3} />
          </article>
        ))}
      </div>
    </section>
  );
}
