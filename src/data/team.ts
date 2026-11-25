export type LocalizedText = { en: string; ar: string };

export type TeamProfileLink = {
  label: LocalizedText;
  href: string;
};

export type TeamProfile = {
  id: string;
  number: string;
  name: LocalizedText;
  role: LocalizedText;
  bio: LocalizedText;
  skills: LocalizedText[];
  badge: LocalizedText;
  githubUsername?: string;
  avatarUrl?: string;
  links?: TeamProfileLink[];
  isMockup?: boolean;
};

const profileMockup = (number: string): TeamProfile => ({
  id: `profile-mockup-${number}`,
  number,
  name: { en: `Profile mockup ${number}`, ar: `نموذج ملف شخصي ${number}` },
  role: {
    en: "Anonymous placeholder · no role supplied",
    ar: "نموذج مجهول · لم يُذكر أي منصب",
  },
  bio: {
    en: "Illustrative profile mockup only. This card does not represent a confirmed team member.",
    ar: "نموذج توضيحي لملف شخصي فقط. لا تمثل هذه البطاقة عضوًا مؤكدًا في الفريق.",
  },
  skills: [],
  badge: { en: "Profile mockup", ar: "نموذج ملف شخصي" },
  isMockup: true,
});

export const teamProfiles: TeamProfile[] = [
  {
    id: "seif-ayman",
    number: "01",
    name: { en: "Seif Ayman", ar: "سيف أيمن" },
    role: {
      en: "Full-Stack Software Engineer · Founder, Rafiq",
      ar: "مهندس برمجيات متكامل · مؤسس Rafiq",
    },
    bio: {
      en: "Full-Stack Software Engineer / Founder Rafiq / Building AI Systems, SaaS & IoT Products",
      ar: "مهندس برمجيات متكامل / مؤسس Rafiq / أبني أنظمة الذكاء الاصطناعي ومنتجات SaaS وإنترنت الأشياء",
    },
    skills: [
      { en: "Full-stack engineering", ar: "هندسة البرمجيات المتكاملة" },
      { en: "AI systems", ar: "أنظمة الذكاء الاصطناعي" },
      { en: "SaaS products", ar: "منتجات SaaS" },
      { en: "IoT products", ar: "منتجات إنترنت الأشياء" },
    ],
    badge: { en: "Verified GitHub profile", ar: "ملف GitHub مؤكد" },
    githubUsername: "TheSeifDev",
    avatarUrl: "https://avatars.githubusercontent.com/u/167328383?v=4",
    links: [{ label: { en: "GitHub", ar: "GitHub" }, href: "https://github.com/TheSeifDev" }],
  },
  profileMockup("02"),
  profileMockup("03"),
  profileMockup("04"),
];
