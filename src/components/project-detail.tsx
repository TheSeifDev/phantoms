"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/site";
import { useSite } from "@/components/site-provider";
import { ActionLink } from "@/components/action-link";

export function ProjectDetail({ project }: { project: Project }) {
  const { locale, t } = useSite();
  const isArabic = locale === "ar";
  const story = [
    { title: isArabic ? "التحدي" : "The problem", content: project.problem },
    { title: isArabic ? "النهج" : "The approach", content: project.approach },
    { title: isArabic ? "أين وصلنا" : "Where it stands", content: project.outcome },
  ];

  return (
    <article className={`project-detail project-detail--${project.tone}`}>
      <div className="project-detail__hero section-wrap">
        <Link href="/work" className="back-link"><ArrowLeft size={15} />{isArabic ? "كل الأعمال" : "All work"}</Link>
        <span className="project-detail__counter">{project.number} / 03 — {isArabic ? "دراسة حالة" : "CASE STUDY"}</span>
        <div className="project-detail__title" data-reveal>
          <span className="eyebrow"><i className="eyebrow__dot" />{t(project.category)}</span>
          <h1>{project.name}</h1>
          <p>{t(project.summary)}</p>
        </div>
        <div className="project-detail__visual" aria-hidden="true"><span className="visual-orbit visual-orbit--a" /><span className="visual-orbit visual-orbit--b" /><span className="visual-core">{project.name.slice(0, 1)}</span><span className="visual-caption">PHANTOMS / {project.number}</span></div>
        <div className="project-detail__tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <section className="project-story section-wrap">
        {story.map((part, index) => (
          <div className="project-story__row" key={part.title} data-reveal>
            <span className="project-story__number">0{index + 1}</span>
            <h2>{part.title}</h2>
            <p>{t(part.content)}</p>
          </div>
        ))}
      </section>
      <section className="project-detail__end section-wrap">
        <p>{isArabic ? "هل تعمل على فكرة لها أثر؟" : "Working on an idea with real potential?"}</p>
        <ActionLink href="/contact">{isArabic ? "ابدأ محادثة" : "Start a conversation"}</ActionLink>
        {project.repository && <a className="inline-link" href={project.repository} target="_blank" rel="noreferrer">{isArabic ? "عرض المستودع" : "View the repository"}<ArrowUpRight size={16} /></a>}
      </section>
    </article>
  );
}
