"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ProjectMockup } from "@/components/project-mockup";
import { useSite } from "@/components/site-provider";
import { projects } from "@/data/site";
import "@/styles/interior.css";

type WorkFilter = "all" | "software" | "explorations";

const filters: Array<{ id: WorkFilter; en: string; ar: string }> = [
  { id: "all", en: "All", ar: "الكل" },
  { id: "software", en: "Software", ar: "البرمجيات" },
  { id: "explorations", en: "Explorations", ar: "استكشافات" },
];

const localizedTags: Record<string, string> = {
  "Health tech": "تقنية صحية",
  AI: "الذكاء الاصطناعي",
  "Arabic-first": "العربية أولًا",
  Operations: "العمليات",
  "Team tools": "أدوات الفريق",
  Robotics: "الروبوتات",
  Microbots: "روبوتات دقيقة",
  Research: "البحث",
};

function isExploration(slug: string) {
  return slug === "omni";
}

export function WorkPageContent() {
  const { locale, t } = useSite();
  const isArabic = locale === "ar";
  const [filter, setFilter] = useState<WorkFilter>("all");
  const visibleProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return filter === "explorations" ? isExploration(project.slug) : !isExploration(project.slug);
  });

  return (
    <div className="interior-page interior-work section-wrap">
      <header className="interior-work__head" data-reveal>
        <div className="interior-work__intro">
          <p className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "الأعمال / مشاريع مختارة" : "WORK / SELECTED PROJECTS"}</p>
          <h1>{isArabic ? "أفكار تتحول\nإلى منتجات." : "Ideas, made\ninto products."}</h1>
          <p className="interior-work__lede">
            {isArabic
              ? "ثلاثة مشاريع بين تقنية الصحة والمنصات الداخلية والاستكشافات الناشئة. لكل مشروع مرحلته وقصته الحالية."
              : "Three projects across health technology, internal platforms and early explorations—each shown at its actual stage."}
          </p>
        </div>
        <div className="interior-work__index" aria-hidden="true">
          <span>{isArabic ? "الأعمال / PH" : "PH / WORK"}</span><span>01—03</span><i />
        </div>
      </header>

      <div className="interior-work__filters" role="group" aria-label={isArabic ? "تصفية المشاريع" : "Filter projects"}>
        {filters.map((item) => (
          <button
            className="interior-work__filter"
            type="button"
            key={item.id}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            <span>{isArabic ? item.ar : item.en}</span>
            {filter === item.id && <i aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div className="interior-work__list">
        {visibleProjects.map((project) => (
          <article className="interior-work__row" key={project.slug} data-line>
            <Link
              className="interior-work__link"
              href={`/work/${project.slug}`}
              aria-label={isArabic ? `عرض مشروع ${project.name}` : `View ${project.name} project`}
            >
              <div className="interior-work__visual">
                <ProjectMockup project={project} />
              </div>
              <div className="interior-work__body">
                <div className="interior-work__meta">
                  <span>{project.number} / 03</span>
                  <span>{t(project.status)}</span>
                </div>
                <p className="interior-work__category">{t(project.category)}</p>
                <h2>{project.name}<ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.5} /></h2>
                <p className="interior-work__summary">{t(project.summary)}</p>
                <div className="interior-work__tags" aria-label={isArabic ? "موضوعات المشروع" : "Project topics"}>
                  {project.tags.map((tag) => (
                    <span key={tag}>{isArabic ? localizedTags[tag] ?? tag : tag}</span>
                  ))}
                </div>
                <span className="interior-work__open">{isArabic ? "استكشف المشروع" : "Explore project"}<ArrowUpRight aria-hidden="true" size={15} /></span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <p className="interior-work__note" data-reveal>
        {isArabic
          ? "التصورات المرئية نماذج توضيحية، وليست لقطات لمنتجات فعلية. وصف كل مشروع يعكس حالته الحالية دون ادعاء نتائج غير مقاسة."
          : "Visuals are concept mockups, not product screenshots. Each description reflects the current project status; no unmeasured outcomes are claimed."}
      </p>
    </div>
  );
}
