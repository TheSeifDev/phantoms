"use client";

import { ArrowDownRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { useSite } from "@/components/site-provider";

export function ContactPageContent() {
  const { locale } = useSite();
  const isArabic = locale === "ar";
  return (
    <div className="inner-page contact-page section-wrap">
      <div className="contact-page__heading">
        <SectionHeading
          eyebrow={{ en: "CONTACT / START A PROJECT", ar: "تواصل / ابدأ مشروعًا" }}
          title={{ en: "Tell us what\nyou’re imagining.", ar: "احكِ لنا عمّا\nتتخيله." }}
          description={{
            en: "Shape a short project brief here. This local preview does not send or save your details.",
            ar: "أنشئ موجزًا قصيرًا لمشروعك هنا. هذه المعاينة المحلية لا ترسل تفاصيلك ولا تحفظها.",
          }}
          number="07"
        />
        <a className="contact-page__jump" href="#project-form">
          {isArabic ? "انتقل إلى النموذج" : "Jump to the form"}
          <ArrowDownRight size={16} />
        </a>
      </div>
      <div className="contact-page__form-wrap" id="project-form">
        <div className="contact-page__form-intro">
          <span className="eyebrow"><i className="eyebrow__dot" />{isArabic ? "معاينة محلية / دون إرسال" : "LOCAL PREVIEW / NO SUBMISSION"}</span>
          <h2>{isArabic ? "ما الذي تحاول\nأن تحققه؟" : "What are you\ntrying to make possible?"}</h2>
          <p>
            {isArabic
              ? "اختر نوع المشروع، وأخبرنا بالمشكلة التي تريد حلها. يمكنك نسخ الموجز أو تنزيله بنفسك."
              : "Choose a project type and describe the problem you want to solve. You can copy or download the brief yourself."}
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
