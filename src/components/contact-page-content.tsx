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
        <SectionHeading eyebrow={{ en: "CONTACT / START A PROJECT", ar: "تواصل / ابدأ مشروعًا" }} title={{ en: "Tell us what\nyou’re imagining.", ar: "احكِ لنا عمّا\nتتخيله." }} description={{ en: "A little context is enough to get the conversation moving. No deck required.", ar: "قليل من التفاصيل يكفي لبدء حوار مفيد. لا حاجة لعرض تقديمي." }} number="07" />
        <a className="contact-page__jump" href="#project-form">{isArabic ? "انتقل إلى النموذج" : "Jump to the form"}<ArrowDownRight size={16} /></a>
      </div>
      <div className="contact-page__form-wrap" id="project-form">
        <div className="contact-page__form-intro"><span className="eyebrow"><i className="eyebrow__dot" />{isArabic ? "رسالة قصيرة تكفي" : "A SHORT NOTE IS ENOUGH"}</span><h2>{isArabic ? "ما الذي تحاول\nأن تحققه؟" : "What are you\ntrying to make possible?"}</h2><p>{isArabic ? "اختر نوع المشروع، وأخبرنا بالمشكلة التي تريد حلها." : "Choose a project type, then tell us what you’re trying to solve."}</p></div>
        <ContactForm />
      </div>
    </div>
  );
}
