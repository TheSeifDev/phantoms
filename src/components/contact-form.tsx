"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, Download } from "lucide-react";
import { useSite } from "@/components/site-provider";

const projectTypes = {
  web: { en: "Website or platform", ar: "موقع أو منصة" },
  apps: { en: "App", ar: "تطبيق" },
  saas: { en: "SaaS product", ar: "منتج SaaS" },
  other: { en: "Something else", ar: "شيء آخر" },
} as const;

type ProjectType = keyof typeof projectTypes;

type BriefResult = { brief: string } | { error: string };

function makeBrief(form: HTMLFormElement, isArabic: boolean): BriefResult {
  if (!form.checkValidity()) {
    form.reportValidity();
    return {
      error: isArabic
        ? "يرجى مراجعة الحقول المطلوبة وإكمال التفاصيل قبل إنشاء المسودة."
        : "Please check the required fields and complete the details before creating a brief.",
    };
  }

  const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
  const emailField = form.elements.namedItem("email") as HTMLInputElement;
  const email = emailField.value.trim();
  const service = (form.elements.namedItem("service") as HTMLSelectElement).value;
  const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

  if (name.length < 2 || name.length > 100 || email.length > 254 || !emailField.validity.valid || message.length < 20 || message.length > 4000 || !(service in projectTypes)) {
    return {
      error: isArabic
        ? "يرجى إدخال اسم صالح وبريد إلكتروني صحيح ووصف من 20 إلى 4000 حرفًا."
        : "Enter a valid name and email, and describe the idea in 20–4,000 characters.",
    };
  }

  const projectType = projectTypes[service as ProjectType][isArabic ? "ar" : "en"];
  const brief = isArabic
    ? [
        "PHANTOMS — موجز مشروع",
        "",
        `الاسم: ${name}`,
        `البريد الإلكتروني: ${email}`,
        `نوع المشروع: ${projectType}`,
        "تفاصيل الفكرة:",
        message,
        "",
        "مسودة للمعاينة فقط. لم تُرسل أو تُحفظ عبر هذا الموقع.",
      ].join("\n")
    : [
        "PHANTOMS — PROJECT BRIEF",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${projectType}`,
        "About the idea:",
        message,
        "",
        "Preview-only brief. Not sent or saved by this site.",
      ].join("\n");

  return { brief };
}

export function ContactForm() {
  const { locale } = useSite();
  const isArabic = locale === "ar";
  const formRef = useRef<HTMLFormElement>(null);
  const [previewShown, setPreviewShown] = useState(false);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActionMessage("");
    const result = makeBrief(event.currentTarget, isArabic);
    if ("error" in result) {
      setError(result.error);
      setPreviewShown(false);
      return;
    }

    setError("");
    setPreviewShown(true);
  }

  function getBrief(): string | null {
    if (!formRef.current) return null;
    const result = makeBrief(formRef.current, isArabic);
    if ("error" in result) {
      setError(result.error);
      setActionMessage("");
      return null;
    }

    setError("");
    return result.brief;
  }

  function handleDownload() {
    const brief = getBrief();
    if (!brief) return;

    const file = new Blob(["\uFEFF", brief], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "phantoms-project-brief.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setActionMessage(isArabic ? "تم تنزيل المسودة إلى جهازك." : "The brief was downloaded to your device.");
  }

  async function handleCopy() {
    const brief = getBrief();
    if (!brief) return;

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(brief);
      setActionMessage(isArabic ? "نُسخت المسودة إلى الحافظة." : "The brief was copied to your clipboard.");
    } catch {
      setActionMessage(isArabic ? "تعذر استخدام الحافظة هنا. يمكنك تنزيل المسودة كملف نصي." : "Clipboard access is unavailable here. You can download the brief as a text file instead.");
    }
  }

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row form-row--two">
        <label className="form-field">
          <span>{isArabic ? "الاسم" : "Your name"}<b>*</b></span>
          <input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder={isArabic ? "الاسم الكامل" : "Jane Smith"} />
        </label>
        <label className="form-field">
          <span>{isArabic ? "البريد الإلكتروني" : "Email address"}<b>*</b></span>
          <input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="you@company.com" />
        </label>
      </div>
      <label className="form-field">
        <span>{isArabic ? "ما الذي تريد بناءه؟" : "What are you looking to build?"}<b>*</b></span>
        <select name="service" required defaultValue="">
          <option value="" disabled>{isArabic ? "اختر نوع المشروع" : "Choose a project type"}</option>
          <option value="web">{isArabic ? projectTypes.web.ar : projectTypes.web.en}</option>
          <option value="apps">{isArabic ? projectTypes.apps.ar : projectTypes.apps.en}</option>
          <option value="saas">{isArabic ? projectTypes.saas.ar : projectTypes.saas.en}</option>
          <option value="other">{isArabic ? projectTypes.other.ar : projectTypes.other.en}</option>
        </select>
      </label>
      <label className="form-field">
        <span>{isArabic ? "احكِ لنا عن الفكرة" : "Tell us about the idea"}<b>*</b></span>
        <textarea name="message" required minLength={20} maxLength={4000} rows={5} placeholder={isArabic ? "المشكلة التي تحاول حلها، من سيستخدم المنتج، وما الذي تتخيله…" : "The problem you’re solving, who it’s for, and what you have in mind…"} />
      </label>
      <div className="form-submit-row">
        <button className="action-link action-link--primary" type="submit">
          <span>{isArabic ? "معاينة التفاصيل فقط" : "Preview details only"}</span>
          <ArrowUpRight size={17} />
        </button>
        <small id="contact-local-note">
          {isArabic
            ? "هذه معاينة محلية فقط. لا يُرسل النموذج التفاصيل ولا يحفظها؛ اختر بنفسك نسخ المسودة أو تنزيلها."
            : "This is a local preview only. The form does not send or save details; choose whether to copy or download the brief."}
        </small>
      </div>
      <div className="form-submit-row">
        <button className="action-link" type="button" onClick={handleDownload}>
          <span>{isArabic ? "تنزيل المسودة (.txt)" : "Download brief (.txt)"}</span>
          <Download size={16} />
        </button>
        <button className="action-link" type="button" onClick={handleCopy}>
          <span>{isArabic ? "نسخ المسودة" : "Copy brief"}</span>
          <Copy size={16} />
        </button>
      </div>
      {previewShown && (
        <div className="form-preview-notice" role="status" aria-live="polite">
          <span className="eyebrow"><i className="eyebrow__dot" />{isArabic ? "للمعاينة فقط" : "PREVIEW ONLY"}</span>
          <p>{isArabic ? "للمعاينة فقط — لم يُرسل استفسارك ولم يُحفظ." : "Preview only—your inquiry has not been sent or saved."}</p>
        </div>
      )}
      {error && <p className="form-error" role="alert">{error}</p>}
      {actionMessage && <p className="form-action-message" role="status" aria-live="polite">{actionMessage}</p>}
    </form>
  );
}
