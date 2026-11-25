"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, ArrowRight, Code2, Layers3, Smartphone } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { ProjectMockup } from "@/components/project-mockup";
import { TeamSection } from "@/components/team-section";
import { useSite } from "@/components/site-provider";
import { projects, services } from "@/data/site";

const approach = [
  { en: "Understand", ar: "نفهم", title: { en: "The right questions first.", ar: "الأسئلة الصحيحة أولًا." }, copy: { en: "We get close to your idea, your audience, and the problem worth solving. A clear direction before a line of code.", ar: "نقترب من فكرتك وجمهورك والمشكلة التي تستحق الحل. اتجاه واضح قبل أول سطر كود." } },
  { en: "Explore", ar: "نستكشف", title: { en: "Make the possibilities tangible.", ar: "نحوّل الاحتمالات إلى شيء ملموس." }, copy: { en: "We map the experience, challenge assumptions, and turn the strongest direction into something you can see and use.", ar: "نرسم التجربة ونراجع الافتراضات ونحوّل الاتجاه الأنسب إلى شيء يمكنك رؤيته واستخدامه." } },
  { en: "Engineer", ar: "نبني", title: { en: "Details make the difference.", ar: "التفاصيل تصنع الفرق." }, copy: { en: "Design and engineering work as one. We build thoughtfully, iterate together, and care about the parts most people never see.", ar: "التصميم والهندسة يعملان معًا. نبني بعناية ونطوّر التجربة معك ونهتم بالتفاصيل التي لا يراها معظم الناس." } },
  { en: "Evolve", ar: "نطوّر", title: { en: "A beginning, not a finish line.", ar: "بداية، وليست نهاية الطريق." }, copy: { en: "We refine the product, prepare it for the real world, and give the next chapter a strong foundation.", ar: "نحسّن المنتج ونجهّزه للعالم الحقيقي ونمنح الفصل التالي أساسًا قويًا." } },
];

function StudioStatement() {
  const { locale } = useSite();
  const ar = locale === "ar";
  return (
    <section className="studio-statement light-section">
      <div className="section-wrap studio-statement__inner">
        <div className="studio-statement__label"><span className="eyebrow">[ 01 / {ar ? "عن فانتومز" : "THE COLLECTIVE"} ]</span><span className="kanji-stamp" lang="ja" aria-hidden="true">幻<br />影</span></div>
        <div className="studio-statement__main">
          <h2 data-reveal>{ar ? <>فريق صغير.<br /><span>تفكير بلا حدود.</span></> : <>SMALL TEAM.<br /><span>UNCOMMON THINKING.</span></>}</h2>
          <div className="studio-statement__copy" data-reveal><p>{ar ? "نحن Phantoms. مجموعة من المصممين والمطوّرين وأصحاب الأفكار، تجمعنا رغبة في بناء ما هو أفضل. من أول تصور إلى منتج متكامل، نجمع بين التفكير الإبداعي والدقة الهندسية." : "We are Phantoms. Designers, developers, and thinkers brought together by a shared instinct to build better. From the first sketch to a working product, we connect creative thinking with engineering precision."}</p><Link href="/team" className="inline-link">{ar ? "الأشخاص وراء الأفكار" : "THE PEOPLE BEHIND THE IDEAS"}<ArrowUpRight size={18} /></Link></div>
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  const { locale, t } = useSite();
  const ar = locale === "ar";
  const ordered = projects;
  return (
    <section className="selected-work section-wrap" id="selected-work">
      <div className="selected-work__sidebar">
        <span className="eyebrow">[ 02 / {ar ? "أعمال مختارة" : "SELECTED WORK"} ]</span>
        <h2 data-reveal>{ar ? <>أفكار.<br /><span>أصبحت واقعًا.</span></> : <>IDEAS.<br /><span>MADE REAL.</span></>}</h2>
        <p>{ar ? "بين البرمجيات والأنظمة والتجارب الجديدة. هذه بعض الأفكار التي نعمل عليها." : "Across software, systems, and new possibilities. A look at the things we are building."}</p>
        <Link href="/work" className="inline-link">{ar ? "كل المشاريع" : "EXPLORE ALL WORK"}<ArrowUpRight size={17} /></Link>
        <div className="selected-work__index" aria-hidden="true"><span>01 — 03</span><i /><span>PH / LAB</span></div>
      </div>
      <div className="selected-work__projects">
        {ordered.map((project, index) => (
          <article className={`work-exhibit work-exhibit--${project.slug}`} key={project.slug} data-reveal>
            <div className="work-exhibit__top"><span>0{index + 1} / PHANTOMS</span><span>{t(project.status)}</span></div>
            <Link href={`/work/${project.slug}`} className="work-exhibit__media" aria-label={ar ? `اكتشف ${project.name}` : `Explore ${project.name}`}>
              <div className="work-exhibit__image" data-parallax><ProjectMockup project={project} large /></div>
              <span className="work-exhibit__open"><ArrowUpRight size={25} /></span>
            </Link>
            <div className="work-exhibit__info"><div><span className="eyebrow">{t(project.category)}</span><h3><Link href={`/work/${project.slug}`}>{project.name}</Link></h3></div><p>{t(project.summary)}</p></div>
            <div className="work-exhibit__tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Capabilities() {
  const { locale, t } = useSite();
  const ar = locale === "ar";
  const icons = [Code2, Smartphone, Layers3];
  const labels = [{ en: "Digital experiences", ar: "تجارب رقمية" }, { en: "Purpose-built applications", ar: "تطبيقات لهدف واضح" }, { en: "Systems that scale", ar: "أنظمة قابلة للنمو" }];
  return (
    <section className="capabilities light-section">
      <div className="section-wrap">
        <div className="capabilities__head"><span className="eyebrow">[ 03 / {ar ? "قدراتنا" : "WHAT WE DO"} ]</span><h2 data-reveal>{ar ? <>من أول فكرة.<br />إلى آخر تفصيلة.</> : <>FROM FIRST IDEA.<br />TO FINAL DETAIL.</>}</h2><Link href="/services" className="inline-link">{ar ? "اكتشف الخدمات" : "OUR CAPABILITIES"}<ArrowUpRight size={18} /></Link></div>
        <div className="capability-list">
          {services.map((service, index) => {
            const Icon = icons[index];
            return <details className="capability" key={service.number} open={index === 0}>
              <summary><span className="capability__number">/{service.number}</span><h3>{t(labels[index])}</h3><Icon className="capability__icon" size={25} strokeWidth={1.3} /><Plus className="capability__toggle" size={24} strokeWidth={1.3} /></summary>
              <div className="capability__body"><span className="eyebrow">{t(service.title)}</span><div><p>{t(service.description)}</p><span className="capability__tags">{t(service.tags)}</span><Link className="inline-link" href="/contact">{ar ? "ابدأ من هنا" : "LET’S BUILD THIS"}<ArrowUpRight size={16} /></Link></div></div>
            </details>;
          })}
        </div>
      </div>
    </section>
  );
}

function BuildProcess() {
  const { locale, t } = useSite();
  const ar = locale === "ar";
  const [selected, setSelected] = useState(0);
  return (
    <section className="build-process section-wrap">
      <div className="build-process__heading"><span className="eyebrow">[ 04 / {ar ? "طريقتنا" : "HOW WE BUILD"} ]</span><h2 data-reveal>{ar ? <>تفكير واضح.<br /><span>صناعة أفضل.</span></> : <>THINK CLEAR.<br /><span>BUILD BETTER.</span></>}</h2><p>{ar ? "طريق واضح من السؤال الأول إلى الخطوة التالية." : "A considered path from the first question to what comes next."}</p></div>
      <div className="build-process__console" data-reveal>
        <div className="process-selector" aria-label={ar ? "اختر مرحلة العمل" : "Select a process stage"}>
          {approach.map((step, index) => <button type="button" className={selected === index ? "is-active" : ""} key={step.en} aria-pressed={selected === index} onClick={() => setSelected(index)}><span>0{index + 1}</span>{ar ? step.ar : step.en}<ArrowRight size={16} /></button>)}
        </div>
        <div className="process-output" key={selected} aria-live="polite"><span className="process-output__counter" aria-hidden="true">0{selected + 1}</span><span className="eyebrow">PH / {ar ? "مرحلة" : "STAGE"} 0{selected + 1}</span><h3>{t(approach[selected].title)}</h3><p>{t(approach[selected].copy)}</p><div className="process-output__progress" aria-hidden="true">{approach.map((step, index) => <i className={index <= selected ? "is-active" : ""} key={step.en} />)}</div></div>
      </div>
    </section>
  );
}

export function HomePage() {
  return <><HeroSection /><StudioStatement /><SelectedWork /><Capabilities /><BuildProcess /><TeamSection /></>;
}
