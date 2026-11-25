"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { useSite } from "@/components/site-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, theme, setLocale, toggleTheme } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const isArabic = locale === "ar";
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="Phantoms home" onClick={closeMenu}>
          <span className="brand__mark"><Image src="/images/phantoms-mark.png" alt="" width={34} height={34} priority /></span>
          <span className="brand__word">PHANTOMS<span>®</span></span>
        </Link>

        <nav className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label={isArabic ? "التنقل الرئيسي" : "Main navigation"}>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav__link${pathname.startsWith(item.href) ? " is-active" : ""}`}
              onClick={closeMenu}
            >
              {isArabic ? item.ar : item.en}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <button className="icon-button language-button" type="button" onClick={() => setLocale(isArabic ? "en" : "ar")} aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}>
            <span>{isArabic ? "EN" : "ع"}</span>
          </button>
          <button className="icon-button theme-button" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? (isArabic ? "تفعيل الوضع الفاتح" : "Switch to light mode") : (isArabic ? "تفعيل الوضع الداكن" : "Switch to dark mode")}>
            {theme === "dark" ? <Sun size={17} strokeWidth={1.7} /> : <Moon size={17} strokeWidth={1.7} />}
          </button>
          <Link href="/contact" className="header-cta" onClick={closeMenu}>
            <span>{isArabic ? "ابدأ مشروعًا" : "Start a project"}</span>
            <ArrowUpRight size={15} strokeWidth={1.7} />
          </Link>
          <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? (isArabic ? "إغلاق القائمة" : "Close menu") : (isArabic ? "فتح القائمة" : "Open menu")} aria-expanded={menuOpen}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      <div className="site-header__rule" />
    </header>
  );
}
