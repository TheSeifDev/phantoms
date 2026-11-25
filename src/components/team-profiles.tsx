"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useSite } from "@/components/site-provider";
import { teamProfiles, type TeamProfile } from "@/data/team";

function ProfilePortrait({ member }: { member: TeamProfile }) {
  const { t } = useSite();
  const [imageFailed, setImageFailed] = useState(false);
  const avatarSrc = member.avatarUrl ?? (member.githubUsername
    ? `https://github.com/${encodeURIComponent(member.githubUsername)}.png?size=600`
    : undefined);

  return (
    <span className={`team-profile__portrait${member.isMockup ? " team-profile__portrait--mockup" : ""}`}>
      {avatarSrc && !imageFailed ? (
        <Image
          className="team-profile__photo"
          src={avatarSrc}
          alt=""
          aria-hidden="true"
          width={600}
          height={600}
          unoptimized
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="team-profile__abstract" aria-hidden="true">
          <span className="team-profile__abstract-ring" />
          <span className="team-profile__abstract-line" />
          <span className="team-profile__abstract-line team-profile__abstract-line--short" />
          <span className="team-profile__abstract-point" />
        </span>
      )}
      <span className={`team-profile__badge${member.isMockup ? " team-profile__badge--mockup" : ""}`}>
        {t(member.badge)}
      </span>
    </span>
  );
}

export function TeamProfiles() {
  const { locale, t } = useSite();
  const isArabic = locale === "ar";
  const [selectedProfile, setSelectedProfile] = useState<TeamProfile | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!selectedProfile) return;

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedProfile(null);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true");

      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
    };
  }, [selectedProfile]);

  return (
    <>
      <div className="team-profile-grid" data-stagger>
        {teamProfiles.map((member) => {
          const actionLabel = member.isMockup
            ? (isArabic ? `عرض نموذج الملف ${member.number}` : `View profile mockup ${member.number}`)
            : (isArabic ? `عرض الملف المؤكد لـ ${t(member.name)}` : `View verified profile for ${t(member.name)}`);

          return (
            <article className={`team-profile${member.isMockup ? " team-profile--mockup" : ""}`} key={member.id}>
              <button
                className="team-profile__open"
                type="button"
                aria-haspopup="dialog"
                aria-label={actionLabel}
                onClick={() => setSelectedProfile(member)}
              >
                <ProfilePortrait member={member} />
                <span className="team-profile__content">
                  <span className="team-profile__index" dir="ltr">
                    {member.number}<span> / {String(teamProfiles.length).padStart(2, "0")}</span>
                  </span>
                  <span className="team-profile__name">{t(member.name)}</span>
                  <span className="team-profile__role">{t(member.role)}</span>
                  <span className="team-profile__bio">{t(member.bio)}</span>
                  {!member.isMockup && member.skills.length > 0 && (
                    <ul className="team-profile__skills" aria-label={isArabic ? "مجالات العمل" : "Areas of work"}>
                      {member.skills.slice(0, 3).map((skill) => <li key={skill.en}>{t(skill)}</li>)}
                    </ul>
                  )}
                  <span className="team-profile__action">
                    <span>{member.isMockup
                      ? (isArabic ? "نموذج توضيحي فقط" : "Illustrative mockup only")
                      : (isArabic ? "عرض الملف" : "Open profile")}</span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </span>
              </button>
            </article>
          );
        })}
      </div>

      {selectedProfile && (
        <div
          className="team-profile-dialog-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProfile(null);
          }}
        >
          <div
            className="team-profile-dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <div className="team-profile-dialog__topline">
              <span>{selectedProfile.isMockup
                ? (isArabic ? "نموذج ملف شخصي · توضيحي" : "PROFILE MOCKUP · ILLUSTRATIVE")
                : (isArabic ? "ملف GitHub مؤكد" : "CONFIRMED GITHUB PROFILE")}</span>
              <button
                className="team-profile-dialog__close"
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedProfile(null)}
                aria-label={isArabic ? "إغلاق الملف الشخصي" : "Close profile"}
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>
            <div className="team-profile-dialog__identity">
              <div className="team-profile-dialog__portrait"><ProfilePortrait member={selectedProfile} /></div>
              <div className="team-profile-dialog__identity-copy">
                <span className="team-profile-dialog__number" dir="ltr">
                  {selectedProfile.number} / {String(teamProfiles.length).padStart(2, "0")}
                </span>
                <h2 id={titleId}>{t(selectedProfile.name)}</h2>
                <p className="team-profile-dialog__role">{t(selectedProfile.role)}</p>
              </div>
            </div>
            <p className="team-profile-dialog__description" id={descriptionId}>
              {t(selectedProfile.bio)}
            </p>
            {selectedProfile.skills.length > 0 && (
              <div className="team-profile-dialog__skills">
                <h3>{isArabic ? "مجالات العمل" : "Areas of work"}</h3>
                <ul>
                  {selectedProfile.skills.map((skill) => <li key={skill.en}>{t(skill)}</li>)}
                </ul>
              </div>
            )}
            {selectedProfile.links && selectedProfile.links.length > 0 && (
              <div className="team-profile-dialog__links">
                {selectedProfile.links.map((link) => (
                  <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                    {t(link.label)} <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
