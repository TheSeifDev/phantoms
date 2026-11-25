"use client";

import { HeroSection } from "@/components/hero-section";
import { StudioIntro } from "@/components/studio-intro";
import { MarqueeStrip } from "@/components/marquee-strip";
import { ProjectsSection } from "@/components/projects-section";
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-section";
import { TeamSection } from "@/components/team-section";
import { ActionLink } from "@/components/action-link";
import { useSite } from "@/components/site-provider";

export function HomePage() {
  const { locale } = useSite();
  const isArabic = locale === "ar";
  return (
    <>
      <HeroSection />
      <StudioIntro />
      <MarqueeStrip />
      <ProjectsSection featuredOnly />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <TeamSection />
      <section className="last-call section-wrap" data-reveal>
        <span className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "من الفكرة إلى أول خطوة" : "FROM IDEA TO THE FIRST MOVE"}</span>
        <h2>{isArabic ? <>لو عندك فكرة،<br /><em>خلّينا نبدأ.</em></> : <>If you have the idea,<br /><em>we’ll make the next move.</em></>}</h2>
        <ActionLink href="/contact">{isArabic ? "ابدأ مشروعًا" : "Start a project"}</ActionLink>
      </section>
    </>
  );
}
