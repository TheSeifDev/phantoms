"use client";

import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/site";
import { useSite } from "@/components/site-provider";

export function WorkPageContent() {
  const { locale } = useSite();
  return (
    <div className="inner-page work-page section-wrap">
      <SectionHeading eyebrow={{ en: "WORK / SELECTED PROJECTS", ar: "الأعمال / مشاريع مختارة" }} title={{ en: "Ideas, made\nvisible.", ar: "أفكار أصبحت\nمرئية." }} description={{ en: "A growing body of work across product, technology and the things still taking shape.", ar: "أعمال تتوسع بين المنتجات والتقنية والأفكار التي ما زالت تتشكل." }} number="04" />
      <div className="project-grid" data-stagger>
        {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}
      </div>
      <p className="work-page__note">{locale === "ar" ? "لا نشارك أرقام نتائج لم تُقَس بعد." : "We don’t publish outcome numbers that haven’t been measured."}</p>
    </div>
  );
}
