"use client";

import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/data/site";
import { useSite } from "@/components/site-provider";
import { ProjectMockup } from "@/components/project-mockup";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { t } = useSite();
  return (
    <article className={`project-card project-card--${project.tone}`} data-reveal style={{ "--card-index": index } as CSSProperties}>
      <Link className="project-card__hit" href={`/work/${project.slug}`} aria-label={`${project.name} — ${t(project.category)}`}>
        <div className="project-card__art">
          <ProjectMockup project={project} />
          <span className="project-card__open"><ArrowUpRight size={18} /></span>
        </div>
        <div className="project-card__body">
          <div className="project-card__meta"><span>{t(project.category)}</span><span>{t(project.status)}</span></div>
          <h3>{project.name}<MoveUpRight className="project-card__arrow" size={18} /></h3>
          <p>{t(project.summary)}</p>
          <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      </Link>
    </article>
  );
}
