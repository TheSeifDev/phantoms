"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useSite } from "@/components/site-provider";

export function ContactForm() {
  const { locale } = useSite();
  const isArabic = locale === "ar";
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || (isArabic ? "تعذر حفظ الرسالة الآن." : "We couldn’t save your note right now."));
      setSent(true);
      form.reset();
    } catch (error) {
      const fallback = isArabic ? "تعذر حفظ الاستفسار الآن. جرّب مرة أخرى بعد قليل." : "We couldn’t save your inquiry right now. Please try again shortly.";
      setMessage(error instanceof Error && !isArabic ? error.message : fallback);
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="form-success" role="status">
        <span className="form-success__index">01 / RECEIVED</span>
        <h3>{isArabic ? "وصلتنا رسالتك." : "Your note has landed."}</h3>
        <p>{isArabic ? "تم حفظ استفسارك في قائمة المشاريع." : "Your inquiry has been saved to the project queue."}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
          <option value="web">{isArabic ? "موقع أو منصة" : "Website or platform"}</option>
          <option value="apps">{isArabic ? "تطبيق" : "App"}</option>
          <option value="saas">{isArabic ? "منتج SaaS" : "SaaS product"}</option>
          <option value="other">{isArabic ? "شيء آخر" : "Something else"}</option>
        </select>
      </label>
      <label className="form-field">
        <span>{isArabic ? "احكِ لنا عن الفكرة" : "Tell us about the idea"}<b>*</b></span>
        <textarea name="message" required minLength={20} maxLength={4000} rows={5} placeholder={isArabic ? "المشكلة التي تحاول حلها، من سيستخدم المنتج، وما الذي تتخيله…" : "The problem you’re solving, who it’s for, and what you have in mind…"} />
      </label>
      <label className="form-field form-field--trap" aria-hidden="true">
        <span>Website</span><input tabIndex={-1} autoComplete="off" name="website" />
      </label>
      <div className="form-submit-row">
        <button className="action-link action-link--primary" type="submit" disabled={pending}>
          <span>{pending ? (isArabic ? "جارٍ الإرسال" : "Sending") : (isArabic ? "أرسل تفاصيل المشروع" : "Send project details")}</span>
          {pending ? <LoaderCircle className="spin" size={17} /> : <ArrowUpRight size={17} />}
        </button>
        <small>{isArabic ? "نستخدم بياناتك للرد على استفسارك فقط." : "Your details are used only to follow up on this inquiry."}</small>
      </div>
      {message && <p className="form-error" role="alert">{message}</p>}
    </form>
  );
}
