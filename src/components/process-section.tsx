"use client";

import { useSite } from "@/components/site-provider";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  { number: "01", title: { en: "Discover", ar: "نكتشف" }, detail: { en: "Understand the people, the problem and the opportunity.", ar: "نفهم الناس والمشكلة والفرصة الحقيقية." } },
  { number: "02", title: { en: "Design", ar: "نصمّم" }, detail: { en: "Shape a clear direction before committing to the build.", ar: "نحدد اتجاهًا واضحًا قبل الدخول في التنفيذ." } },
  { number: "03", title: { en: "Build", ar: "نبني" }, detail: { en: "Turn the chosen path into a considered, working product.", ar: "نحوّل الاتجاه المختار إلى منتج متقن وقابل للاستخدام." } },
  { number: "04", title: { en: "Ship", ar: "نطلق" }, detail: { en: "Put it in people’s hands, learn and keep improving.", ar: "نوصله للناس، نتعلم من استخدامه، ونواصل تحسينه." } },
];

export function ProcessSection() {
  const { t } = useSite();
  return (
    <section className="process-section">
      <div className="section-wrap process-section__inner">
        <SectionHeading
          eyebrow={{ en: "A CLEAR WAY FORWARD", ar: "خطوة واضحة إلى الأمام" }}
          title={{ en: "Make the hard\nparts feel simple.", ar: "نجعل الطريق\nأوضح وأسهل." }}
          description={{ en: "Small, deliberate steps. Real progress at every one.", ar: "خطوات صغيرة ومدروسة، وتقدم حقيقي في كل واحدة." }}
          number="05"
        />
        <div className="process-track" data-stagger>
          <span className="process-track__line" aria-hidden="true" />
          {steps.map((step) => (
            <article className="process-step" key={step.number}>
              <span className="process-step__number">{step.number}</span>
              <span className="process-step__node" aria-hidden="true" />
              <h3>{t(step.title)}</h3>
              <p>{t(step.detail)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
