"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/site";
import { useSite } from "@/components/site-provider";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";

export function ProjectsSection({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const { locale } = useSite();
  const isArabic = locale === "ar";
  const selected = featuredOnly ? projects.filter((project) => project.slug === "rafiq" || project.slug === "omni") : projects;

  return (
    <section className="projects-section section-wrap" id="work">
      <div className="projects-section__heading">
        <SectionHeading
          eyebrow={{ en: featuredOnly ? "FLAGSHIP PROJECTS" : "SELECTED WORK", ar: featuredOnly ? "مشاريعنا الرئيسية" : "أعمال مختارة" }}
          title={{ en: featuredOnly ? "Big ideas.\nBuilt for people." : "From the shadow\ninto the world.", ar: featuredOnly ? "أفكار كبيرة.\nمبنية للناس." : "من الظلال\nإلى العالم." }}
          description={{ en: "We show the thinking behind the work — not just the final screen.", ar: "نشارك طريقة التفكير وراء العمل، لا الشاشة الأخيرة فقط." }}
          number={featuredOnly ? "02" : "04"}
        />
        {!featuredOnly && <Link className="inline-link projects-section__all" href="/work">{isArabic ? "كل الأعمال" : "All work"}<ArrowUpRight size={16} /></Link>}
      </div>
      <div className={`project-grid${featuredOnly ? " project-grid--two" : ""}`} data-stagger>
        {selected.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </div>
    </section>
  );
}
