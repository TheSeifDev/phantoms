"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { memories } from "@/data/site";
import { useSite } from "@/components/site-provider";
import { SectionHeading } from "@/components/section-heading";
import { TeamProfiles } from "@/components/team-profiles";

export function TeamSection({ showMemories = true, memoryCount = 3 }: { showMemories?: boolean; memoryCount?: number }) {
  const { locale, t } = useSite();
  const isArabic = locale === "ar";
  const visibleMemories = memories.slice(0, memoryCount);

  return (
    <section className="team-section section-wrap" id="team">
      <div className="team-section__intro">
        <SectionHeading
          eyebrow={{ en: "THE PEOPLE BEHIND THE WORK", ar: "الأشخاص وراء العمل" }}
          title={{ en: "More than\na team.", ar: "أكثر من\nمجرد فريق." }}
          description={{ en: "A new chapter, shaped by curious minds and a shared appetite to make things matter.", ar: "فصل جديد يصنعه فضول مشترك ورغبة حقيقية في صنع شيء له قيمة." }}
          number="06"
        />
        <Link className="inline-link" href="/team">{isArabic ? "اكتشف الفريق" : "Meet the team"}<ArrowUpRight size={16} /></Link>
      </div>

      <TeamProfiles />

      {showMemories && (
        <div className="memory-section">
          <div className="memory-section__head" data-reveal>
            <div><span className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "من الأرشيف" : "FROM THE ARCHIVE"}</span><h3>{isArabic ? "لحظات من الفصل الأول." : "Moments from chapter one."}</h3></div>
            <span className="memory-section__count">{String(visibleMemories.length).padStart(2, "0")} / {isArabic ? "ذكريات" : "MEMORIES"}</span>
          </div>
          <div className="memory-grid" data-stagger>
            {visibleMemories.map((memory, index) => (
              <figure className={`memory-card memory-card--${memory.shape}`} key={memory.src}>
                <div className="memory-card__image"><Image src={memory.src} alt={t(memory.alt)} fill sizes="(max-width: 700px) 100vw, 33vw" loading="lazy" /></div>
                <figcaption><span>{t(memory.caption)}</span><span>{String(index + 1).padStart(2, "0")}</span><small>{t(memory.note)}</small></figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
