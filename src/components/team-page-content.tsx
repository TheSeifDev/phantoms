"use client";

import { SectionHeading } from "@/components/section-heading";
import { TeamSection } from "@/components/team-section";
import { useSite } from "@/components/site-provider";

export function TeamPageContent() {
  const { locale } = useSite();
  return (
    <div className="inner-page team-page section-wrap">
      <SectionHeading eyebrow={{ en: "THE PHANTOMS / PEOPLE", ar: "فانتومز / الأشخاص" }} title={{ en: "One vision.\nMany ways to make it real.", ar: "رؤية واحدة.\nوطرق كثيرة لتحقيقها." }} description={{ en: "The people behind our products, and a few moments from the team that came before.", ar: "الأشخاص وراء منتجاتنا، وبعض اللحظات من الفريق الذي سبقهم." }} number="06" />
      <TeamSection showMemories />
      <p className="team-page__note">{locale === "ar" ? "الأسماء والصور الجديدة ستضاف بعد استلام المواد المعتمدة." : "New member names and portraits will be added once the approved assets are shared."}</p>
    </div>
  );
}
