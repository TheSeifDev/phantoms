"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { memories } from "@/data/site";
import { useSite } from "@/components/site-provider";
import { TeamProfiles } from "@/components/team-profiles";
import "@/styles/team.css";

type TeamSectionProps = {
  showMemories?: boolean;
  memoryCount?: number;
  heading?: "home" | "none";
  compact?: boolean;
};

export function TeamSection({
  showMemories = true,
  memoryCount = 3,
  heading = "home",
  compact = false,
}: TeamSectionProps) {
  const { locale, t } = useSite();
  const isArabic = locale === "ar";
  const visibleMemories = memories.slice(0, Math.max(0, memoryCount));

  return (
    <section className={`team-feature section-wrap${compact ? " team-feature--compact" : ""}`} id="team">
      {heading === "home" && (
        <header className="team-feature__intro" data-reveal>
          <div className="team-feature__intro-copy">
            <p className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "الأشخاص وراء العمل" : "THE PEOPLE BEHIND THE WORK"}</p>
            <h2>{isArabic ? "فريق يبني\nبنية واضحة." : "People,\nwith intent."}</h2>
            <p className="team-feature__intro-description">
              {isArabic
                ? "ملف مؤكد واحد، وبقية الملفات نماذج مجهولة بوضوح إلى حين تأكيد التفاصيل."
                : "One confirmed profile; other entries remain clearly marked anonymous mockups until verified."}
            </p>
          </div>
          <Link className="inline-link team-feature__link" href="/team">
            {isArabic ? "تعرّف على الفريق" : "Meet the team"}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </header>
      )}

      <TeamProfiles />

      {showMemories && (
        <section className="archive-section" aria-labelledby="archive-title">
          <header className="archive-section__head" data-reveal>
            <div className="archive-section__intro">
              <p className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "من الأرشيف" : "FROM THE ARCHIVE"}</p>
              <h2 id="archive-title">{isArabic ? "الفصل الأول،\nفي الذاكرة." : "The first chapter,\nin memory."}</h2>
              <p className="archive-section__description">
                {isArabic
                  ? "صور الفريق السابق ومواد حملات Phantoms محفوظة هنا كذكريات، وليست صورًا للأعضاء الحاليين."
                  : "Earlier team photos and Phantoms campaign artwork, kept as memories—not presented as current member portraits."}
              </p>
            </div>
            <span className="archive-section__count" dir="ltr">
              {String(visibleMemories.length).padStart(2, "0")} / {String(memories.length).padStart(2, "0")} · {isArabic ? "ذكريات" : "MEMORIES"}
            </span>
          </header>

          <div className="archive-grid" data-stagger>
            {visibleMemories.map((memory, index) => (
              <figure className="archive-card" key={memory.src}>
                <div className="archive-card__media">
                  <Image
                    src={memory.src}
                    alt={t(memory.alt)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 42vw"
                    loading="lazy"
                  />
                </div>
                <figcaption className="archive-card__caption">
                  <span className="archive-card__title">{t(memory.caption)}</span>
                  <span className="archive-card__index" dir="ltr">{String(index + 1).padStart(2, "0")}</span>
                  <span className="archive-card__note">{t(memory.note)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
