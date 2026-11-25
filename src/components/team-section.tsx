"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { memories, teamMembers } from "@/data/site";
import { useSite } from "@/components/site-provider";
import { SectionHeading } from "@/components/section-heading";

export function TeamSection({ showMemories = true }: { showMemories?: boolean }) {
  const { locale, t } = useSite();
  const isArabic = locale === "ar";

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
      {teamMembers.length > 0 ? (
        <div className="team-grid" data-stagger>
          {teamMembers.map((member) => (
            <article className="member-card" key={member.name}>
              <div className="member-card__portrait"><Image src={member.image} alt={member.name} fill sizes="(max-width: 700px) 100vw, 25vw" /></div>
              <h3>{member.name}</h3><p>{t(member.role)}</p><span>{t(member.bio)}</span>
            </article>
          ))}
        </div>
      ) : (
        <div className="team-open-card" data-reveal>
          <div className="team-open-card__symbol"><Plus size={26} strokeWidth={1.25} /></div>
          <div className="team-open-card__text">
            <span className="eyebrow__number">NEXT GENERATION / 2026</span>
            <h3>{isArabic ? "وجوه جديدة. فصل جديد." : "New faces. A new chapter."}</h3>
            <p>{isArabic ? "مساحة الفريق الجديد جاهزة — نضيف الصور والأسماء الحقيقية عند توفرها." : "The new-team gallery is ready for the real portraits and names when they’re available."}</p>
          </div>
          <span className="team-open-card__edge">{isArabic ? "الصورة التالية تبدأ هنا" : "THE NEXT PORTRAIT STARTS HERE"}</span>
        </div>
      )}

      {showMemories && (
        <div className="memory-section">
          <div className="memory-section__head" data-reveal>
            <div><span className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "من الأرشيف" : "FROM THE ARCHIVE"}</span><h3>{isArabic ? "لحظات من الفصل الأول." : "Moments from chapter one."}</h3></div>
            <span className="memory-section__count">04 / MEMORIES</span>
          </div>
          <div className="memory-grid" data-stagger>
            {memories.slice(0, 3).map((memory, index) => (
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
