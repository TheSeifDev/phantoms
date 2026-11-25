"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/site";
import { projects } from "@/data/site";
import { ActionLink } from "@/components/action-link";
import { useSite } from "@/components/site-provider";
import { ProjectMockup } from "@/components/project-mockup";
import "@/styles/interior.css";

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

export function ProjectDetail({ project }: { project: Project }) {
  const { locale, t } = useSite();
  const isArabic = locale === "ar";
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1 + projects.length) % projects.length];
  const story = [
    { title: isArabic ? "المشكلة" : "The problem", content: project.problem },
    { title: isArabic ? "النهج" : "The approach", content: project.approach },
    { title: isArabic ? "أين يقف المشروع" : "Where it stands", content: project.outcome },
  ];

  return (
    <article className="interior-project-detail">
      <header className="interior-project-detail__hero section-wrap">
        <div className="interior-project-detail__topline">
          <Link href="/work" className="back-link"><ArrowLeft aria-hidden="true" size={15} />{isArabic ? "كل الأعمال" : "All work"}</Link>
          <span className="interior-project-detail__counter">{project.number} / 03 <i /> {isArabic ? "دراسة مشروع" : "PROJECT STUDY"}</span>
        </div>
        <div className="interior-project-detail__title" data-reveal>
          <p className="eyebrow"><span className="eyebrow__dot" />{t(project.category)}</p>
          <h1>{project.name}</h1>
          <p className="interior-project-detail__summary">{t(project.summary)}</p>
          <div className="interior-project-detail__status">
            <span>{isArabic ? "الحالة" : "STATUS"}</span><strong>{t(project.status)}</strong>
          </div>
        </div>
        <div className="interior-project-detail__visual">
          <ProjectMockup project={project} large />
        </div>
        <div className="interior-project-detail__tags" aria-label={isArabic ? "موضوعات المشروع" : "Project topics"}>
          {project.tags.map((tag) => <span key={tag}>{isArabic ? localizedTags[tag] ?? tag : tag}</span>)}
        </div>
      </header>

      <section className="interior-project-detail__story section-wrap" aria-label={isArabic ? "تفاصيل المشروع" : "Project details"}>
        {story.map((part, index) => (
          <div className="interior-project-detail__story-row" key={part.title} data-line>
            <span className="interior-project-detail__story-index">0{index + 1}</span>
            <h2>{part.title}</h2>
            <p>{t(part.content)}</p>
          </div>
        ))}
      </section>

      <section className="interior-project-detail__end section-wrap" data-reveal>
        <div className="interior-project-detail__contact">
          <p className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "تواصل" : "GET IN TOUCH"}</p>
          <h2>{isArabic ? "لديك فكرة\nتستحق البناء؟" : "Have an idea\nworth building?"}</h2>
          <ActionLink href="/contact">{isArabic ? "ابدأ موجز المشروع" : "Start a project brief"}</ActionLink>
        </div>
        <div className="interior-project-detail__links">
          {project.repository && (
            <a className="inline-link" href={project.repository} target="_blank" rel="noopener noreferrer">
              {isArabic ? "عرض المستودع" : "View source repository"}<ArrowUpRight aria-hidden="true" size={16} />
            </a>
          )}
          <Link className="interior-project-detail__next" href={`/work/${nextProject.slug}`}>
            <span className="interior-project-detail__next-label">{isArabic ? "المشروع التالي" : "NEXT PROJECT"} <ArrowRight aria-hidden="true" size={14} /></span>
            <strong>{nextProject.name}</strong>
            <span>{t(nextProject.category)}</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
