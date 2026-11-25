"use client";

import Image from "next/image";
import type { Project } from "@/data/site";
import { useSite } from "@/components/site-provider";
import "@/styles/project-mockup.css";

const covers: Record<string, string> = {
  rafiq: "/manus-storage/async-images/pCU54vaKASzJRXak3ifnU9/image-1.webp",
  omni: "/manus-storage/async-images/pCU54vaKASzJRXak3ifnU9/image-2.webp",
  "dashboard-phantoms": "/manus-storage/async-images/pCU54vaKASzJRXak3ifnU9/image-3.webp",
};

export function ProjectMockup({ project, large = false }: { project: Project; large?: boolean }) {
  const { locale } = useSite();
  const isArabic = locale === "ar";
  return (
    <div className={`project-mockup project-mockup--${project.slug}${large ? " project-mockup--large" : ""}`}>
      <Image src={covers[project.slug]} alt={isArabic ? `تصور بصري لمشروع ${project.name}، وليس صورة فعلية للمنتج` : `${project.name} concept mockup, not an actual product screenshot`} fill sizes={large ? "(max-width: 800px) 100vw, 85vw" : "(max-width: 700px) 100vw, 50vw"} unoptimized />
      <span className="project-mockup__label">{isArabic ? "تصور بصري / MOCKUP" : "CONCEPT MOCKUP"}</span>
      <span className="project-mockup__number">PH / {project.number}</span>
    </div>
  );
}
