"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useSite } from "@/components/site-provider";
import { teamProfiles, type TeamProfile } from "@/data/team";
import "@/styles/team.css";

function ProfilePortrait({ member }: { member: TeamProfile }) {
  const [imageFailed, setImageFailed] = useState(false);
  const avatarSrc = member.avatarUrl ?? (member.githubUsername
    ? `https://github.com/${encodeURIComponent(member.githubUsername)}.png?size=600`
    : undefined);

  return (
    <div className={`team-profile__portrait${member.isMockup ? " team-profile__portrait--mockup" : ""}`}>
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
          <i />
          <i />
          <i />
        </span>
      )}
      <span className={`team-profile__badge${member.isMockup ? " team-profile__badge--mockup" : ""}`}>
        {member.badge.en === "Profile mockup" ? <MockupBadge member={member} /> : <ProfileBadge member={member} />}
      </span>
    </div>
  );
}

function MockupBadge({ member }: { member: TeamProfile }) {
  const { t } = useSite();
  return <>{t(member.badge)}</>;
}

function ProfileBadge({ member }: { member: TeamProfile }) {
  const { t } = useSite();
  return <>{t(member.badge)}</>;
}

export function TeamProfiles() {
  const { locale, t } = useSite();
  const isArabic = locale === "ar";
  const [selectedProfile, setSelectedProfile] = useState<TeamProfile | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedProfile) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

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
      );
      if (!focusable.length) {
        event.preventDefault();
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
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [selectedProfile]);

  return (
    <>
      <div className="team-profile-grid" data-stagger>
        {teamProfiles.map((member) => (
          <article className={`team-profile${member.isMockup ? " team-profile--mockup" : ""}`} key={member.id}>
            <button
              className="team-profile__open"
              type="button"
              aria-haspopup="dialog"
              aria-label={isArabic ? `عرض ${t(member.name)}` : `View ${t(member.name)}`}
              onClick={() => setSelectedProfile(member)}
            >
              <ProfilePortrait member={member} />
              <span className="team-profile__content">
                <span className="team-profile__index">{member.number} <span>/ 04</span></span>
                <span className="team-profile__name">{t(member.name)}</span>
                <span className="team-profile__role">{t(member.role)}</span>
                <span className="team-profile__bio">{t(member.bio)}</span>
                {!member.isMockup && member.skills.length > 0 && (
                  <span className="team-profile__skills" aria-label={isArabic ? "المهارات" : "Skills"}>
                    {member.skills.slice(0, 3).map((skill) => <span key={skill.en}>{t(skill)}</span>)}
                  </span>
                )}
                <span className="team-profile__action">
                  {member.isMockup
                    ? (isArabic ? "عرض نموذج الملف" : "View profile mockup")
                    : (isArabic ? "عرض الملف الكامل" : "View full profile")}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </span>
            </button>
          </article>
        ))}
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
            aria-labelledby="team-profile-dialog-title"
            aria-describedby="team-profile-dialog-description"
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
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="team-profile-dialog__identity">
              <div className="team-profile-dialog__portrait"><ProfilePortrait member={selectedProfile} /></div>
              <div>
                <span className="team-profile-dialog__number">{selectedProfile.number} / 04</span>
                <h2 id="team-profile-dialog-title">{t(selectedProfile.name)}</h2>
                <p className="team-profile-dialog__role">{t(selectedProfile.role)}</p>
              </div>
            </div>
            <p className="team-profile-dialog__description" id="team-profile-dialog-description">
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
                    {t(link.label)} <ArrowUpRight size={16} aria-hidden="true" />
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
