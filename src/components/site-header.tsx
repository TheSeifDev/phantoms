"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Moon, Sun, Plus, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { useSite } from "@/components/site-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, theme, setLocale, toggleTheme } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ar = locale === "ar";

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButtonRef.current?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">{ar ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="site-header__inner">
        <Link className="brand" href="/" onClick={closeMenu} aria-label={ar ? "فانتومز — الرئيسية" : "Phantoms home"}>
          <Image src="/images/phantoms-mark.png" alt="" width={33} height={33} priority /><span>PHANTOMS<span className="brand__suffix">/</span></span>
        </Link>
        <nav className={`site-nav${menuOpen ? " is-open" : ""}`} ref={navRef} id="main-navigation" aria-label={ar ? "التنقل الرئيسي" : "Main navigation"}>
          {navLinks.map((item, index) => <Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined} className={`site-nav__link${pathname.startsWith(item.href) ? " is-active" : ""}`} onClick={closeMenu}><span className="site-nav__index">0{index + 1}</span><span>{ar ? item.ar : item.en}</span><ArrowUpRight size={14} /></Link>)}
          <Link className="site-nav__mobile-contact" href="/contact" onClick={closeMenu}>{ar ? "ابدأ مشروعًا" : "Start a project"}<ArrowUpRight size={20} /></Link>
          <span className="site-nav__note">PHANTOMS / IDEAS INTO REALITY</span>
        </nav>
        <div className="site-header__actions">
          <button type="button" className="locale-control" onClick={() => setLocale(ar ? "en" : "ar")} aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}>{ar ? "EN" : "عربي"}</button>
          <button type="button" className="icon-button" onClick={toggleTheme} aria-label={theme === "dark" ? (ar ? "الوضع الفاتح" : "Switch to light mode") : (ar ? "الوضع الداكن" : "Switch to dark mode")}>{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button>
          <Link className="header-cta" href="/contact" onClick={closeMenu}>{ar ? "ابدأ مشروعًا" : "LET’S TALK"}<ArrowUpRight size={17} /></Link>
          <button ref={menuButtonRef} type="button" className="menu-button icon-button" aria-label={menuOpen ? (ar ? "إغلاق القائمة" : "Close navigation") : (ar ? "فتح القائمة" : "Open navigation")} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={23} /> : <Plus size={23} />}</button>
        </div>
      </div>
    </header>
  );
}
