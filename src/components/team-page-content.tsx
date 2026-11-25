"use client";

import { useSite } from "@/components/site-provider";
import { TeamSection } from "@/components/team-section";

export function TeamPageContent() {
  const { locale, t } = useSite();
  const isArabic = locale === "ar";

  return (
    <div className="team-page">
      <header className="team-page__hero section-wrap" data-reveal>
        <p className="eyebrow"><span className="eyebrow__dot" />{isArabic ? "فانتومز / الأشخاص" : "PHANTOMS / PEOPLE"}</p>
        <div className="team-page__hero-row">
          <div className="team-page__headline">
            <h1 className="team-page__title">{t({ en: "The people\nbehind the work.", ar: "الأشخاص\nوراء العمل." })}</h1>
            <p className="team-page__description">
              {isArabic
                ? "ملف عضو مؤكد واحد؛ وثلاثة نماذج مجهولة بوضوح إلى أن تتأكد بياناتها. وتبقى صور الفصل السابق ضمن أرشيف مستقل."
                : "One confirmed member profile; three anonymous mockups remain clearly labeled until their details are verified. Photos from the earlier chapter stay in a separate archive."}
            </p>
          </div>
          <div className="team-page__index" aria-label={isArabic ? "أربعة ملفات شخصية" : "Four profile cards"}>
            <span className="team-page__index-value" dir="ltr">04</span>
            <span>{isArabic ? "ملفات شخصية" : "PROFILE CARDS"}</span>
            <span>{isArabic ? "واحد مؤكد" : "ONE CONFIRMED"}</span>
          </div>
        </div>
      </header>

      <TeamSection heading="none" compact showMemories memoryCount={4} />
    </div>
  );
}
