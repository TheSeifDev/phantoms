"use client";

import { ArrowDownRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { useSite } from "@/components/site-provider";
import "@/styles/interior.css";

export function ContactPageContent() {
  const { locale } = useSite();
  const isArabic = locale === "ar";

  return (
    <div className="interior-page interior-contact section-wrap">
      <header className="interior-contact__head" data-reveal>
        <div>
          <p className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "تواصل / موجز مشروع" : "CONTACT / PROJECT BRIEF"}</p>
          <h1>{isArabic ? "لنبدأ من\nالمشكلة." : "Start with\nthe problem."}</h1>
          <p className="interior-contact__lede">
            {isArabic
              ? "صف الفكرة بإيجاز لتكوين مسودة موجز يمكنك مراجعتها. هذه معاينة محلية فقط؛ لا تُرسل التفاصيل ولا تُحفظ."
              : "Describe the idea to shape a brief you can review. This is a local demo only: your details are not sent or saved."}
          </p>
        </div>
        <a className="interior-contact__jump" href="#project-form">
          {isArabic ? "انتقل إلى النموذج" : "Go to the brief form"}
          <ArrowDownRight aria-hidden="true" size={16} />
        </a>
      </header>

      <section className="interior-contact__form-wrap" id="project-form" aria-labelledby="interior-contact-form-title">
        <div className="interior-contact__form-intro">
          <p className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "معاينة محلية / دون إرسال" : "LOCAL PREVIEW / NO SUBMISSION"}</p>
          <h2 id="interior-contact-form-title">{isArabic ? "ما الذي تريد\nأن يصبح ممكنًا؟" : "What do you want\nto make possible?"}</h2>
          <p>
            {isArabic
              ? "اختر نوع المشروع، واشرح المشكلة التي تريد حلها. يمكنك مراجعة الموجز ثم نسخه أو تنزيله بنفسك."
              : "Choose a project type and describe the problem you want to solve. Review the brief, then copy or download it yourself."}
          </p>
          <p className="interior-contact__local-note">
            {isArabic
              ? "لا يوجد إرسال أو تخزين خلف هذا النموذج. لا تغلق الصفحة قبل نسخ المسودة أو تنزيلها إذا أردت الاحتفاظ بها."
              : "There is no submission or storage behind this form. Copy or download the draft before leaving if you want to keep it."}
          </p>
        </div>
        <div className="interior-contact__form">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
