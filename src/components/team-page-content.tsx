"use client";

import { SectionHeading } from "@/components/section-heading";
import { TeamSection } from "@/components/team-section";

export function TeamPageContent() {
  return (
    <div className="inner-page team-page section-wrap">
      <SectionHeading eyebrow={{ en: "THE PHANTOMS / PEOPLE", ar: "فانتومز / الأشخاص" }} title={{ en: "One vision.\nMany ways to make it real.", ar: "رؤية واحدة.\nوطرق كثيرة لتحقيقها." }} description={{ en: "The people behind our products, and a few moments from the team that came before.", ar: "الأشخاص وراء منتجاتنا، وبعض اللحظات من الفريق الذي سبقهم." }} number="06" />
      <TeamSection showMemories memoryCount={4} />
    </div>
  );
}
