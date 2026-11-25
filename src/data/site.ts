export type Localized = { en: string; ar: string };

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: Localized;
  status: Localized;
  summary: Localized;
  problem: Localized;
  approach: Localized;
  outcome: Localized;
  tags: string[];
  tone: "red" | "paper" | "ink";
  repository?: string;
};

export const navLinks = [
  { href: "/work", en: "Work", ar: "الأعمال" },
  { href: "/services", en: "Services", ar: "الخدمات" },
  { href: "/team", en: "The team", ar: "الفريق" },
];

export const services = [
  {
    number: "01",
    title: { en: "Web experiences", ar: "تجارب الويب" },
    description: {
      en: "Fast, distinctive websites and platforms built around the people who use them.",
      ar: "مواقع ومنصات سريعة ومختلفة، مصممة حول الأشخاص الذين يستخدمونها.",
    },
    tags: { en: "Websites · Platforms · E-commerce", ar: "مواقع · منصات · تجارة إلكترونية" },
  },
  {
    number: "02",
    title: { en: "Apps that feel right", ar: "تطبيقات تستحق الاستخدام" },
    description: {
      en: "Mobile and web apps that make complex things feel simple, useful and human.",
      ar: "تطبيقات موبايل وويب تجعل المهام المعقدة أبسط وأكثر فائدة وإنسانية.",
    },
    tags: { en: "Product thinking · UX · Engineering", ar: "تفكير منتج · تجربة مستخدم · برمجة" },
  },
  {
    number: "03",
    title: { en: "SaaS, built to grow", ar: "أنظمة SaaS قابلة للنمو" },
    description: {
      en: "The workflows, dashboards and software foundations behind better businesses.",
      ar: "أنظمة ولوحات تحكم وأساس برمجي يساعد الأعمال على التوسع بثقة.",
    },
    tags: { en: "SaaS · Internal tools · Integrations", ar: "SaaS · أدوات داخلية · تكاملات" },
  },
];

export const projects: Project[] = [
  {
    slug: "rafiq",
    number: "01",
    name: "Rafiq",
    category: { en: "Health technology · Flagship", ar: "تقنية صحية · مشروع رئيسي" },
    status: { en: "Flagship project", ar: "مشروع رئيسي" },
    summary: {
      en: "An intelligent companion designed to support people living with Alzheimer’s and the people who care for them.",
      ar: "مرافق ذكي صُمم لدعم مرضى ألزهايمر والأشخاص الذين يعتنون بهم.",
    },
    problem: {
      en: "Memory changes can make everyday routines harder for a person and their care circle.",
      ar: "تغيّرات الذاكرة قد تجعل تفاصيل الحياة اليومية أصعب على الشخص وعلى دائرة رعايته.",
    },
    approach: {
      en: "Rafiq explores a calmer, more human way to bring companionship and practical support into daily life.",
      ar: "يستكشف رفيق طريقة أهدأ وأكثر إنسانية لإضافة الرفقة والدعم العملي للحياة اليومية.",
    },
    outcome: {
      en: "A flagship health-tech product with its own dedicated experience. No clinical or impact metrics are claimed here.",
      ar: "منتج صحي تقني رئيسي له تجربة مستقلة. لا ندّعي هنا أرقامًا سريرية أو أثرًا مقاسًا.",
    },
    tags: ["Health tech", "AI", "Arabic-first"],
    tone: "paper",
    repository: "https://github.com/TheSeifDev/rafiq-saas",
  },
  {
    slug: "dashboard-phantoms",
    number: "02",
    name: "Phantoms Dashboard",
    category: { en: "SaaS · Internal platform", ar: "SaaS · منصة داخلية" },
    status: { en: "In use by the team", ar: "منصة للفريق" },
    summary: {
      en: "A connected operations workspace for the people, projects and workflows that keep a growing team moving.",
      ar: "مساحة تشغيل مترابطة للأشخاص والمشاريع وسير العمل الذي يحرك الفريق.",
    },
    problem: {
      en: "Team coordination becomes fragmented when everyday work lives in too many places.",
      ar: "يتشتت تنسيق الفريق عندما تتوزع تفاصيل العمل اليومي في أماكن كثيرة.",
    },
    approach: {
      en: "A shared dashboard brings member tools, tasks and internal workflows into one team-facing product.",
      ar: "تجمع لوحة مشتركة أدوات الأعضاء والمهام ومسارات العمل الداخلية في منتج واحد للفريق.",
    },
    outcome: {
      en: "A living internal platform that is being developed alongside the team’s real operating needs.",
      ar: "منصة داخلية تتطور بالتوازي مع احتياجات الفريق الفعلية.",
    },
    tags: ["SaaS", "Operations", "Team tools"],
    tone: "ink",
    repository: "https://github.com/TheSeifDev/dashboard-phantoms",
  },
  {
    slug: "omni",
    number: "03",
    name: "OMNI",
    category: { en: "Robotics · Flagship exploration", ar: "روبوتات · مشروع استكشافي" },
    status: { en: "In development", ar: "قيد التطوير" },
    summary: {
      en: "A microbots concept inspired by Big Hero 6, exploring how small connected machines can act as one.",
      ar: "فكرة روبوتات دقيقة مستوحاة من Big Hero 6، تستكشف كيف تتحرك وحدات صغيرة مترابطة كأنها كيان واحد.",
    },
    problem: {
      en: "A swarm is only compelling when the individual parts can become a coordinated whole.",
      ar: "لا تصبح فكرة السرب مقنعة إلا عندما تتحول الأجزاء الصغيرة إلى منظومة متناسقة.",
    },
    approach: {
      en: "OMNI is an early-stage exploration of microbots, coordination and responsive systems.",
      ar: "مشروع OMNI استكشاف في مرحلته الأولى للروبوتات الدقيقة والتنسيق والأنظمة المستجيبة.",
    },
    outcome: {
      en: "The concept is in development. Detailed engineering results will be shared when they are ready.",
      ar: "الفكرة قيد التطوير، وستُشارك التفاصيل والنتائج الهندسية عند جاهزيتها.",
    },
    tags: ["Robotics", "Microbots", "Research"],
    tone: "red",
  },
];

export const memories = [
  {
    src: "/images/memory-team-steps.webp",
    alt: { en: "The earlier Phantoms team gathered outside the campus building", ar: "لقطة للفريق القديم أمام مبنى الجامعة" },
    caption: { en: "The first chapter", ar: "الفصل الأول" },
    note: { en: "A team, a shared direction", ar: "فريق ورؤية واحدة" },
    shape: "wide",
  },
  {
    src: "/images/memory-team-stage.webp",
    alt: { en: "The earlier Phantoms team together at a campus event", ar: "الفريق القديم في لقاء جامعي" },
    caption: { en: "In the room together", ar: "معًا في المكان" },
    note: { en: "Ideas become real when people build together", ar: "الأفكار تصبح واقعًا حين يبنيها الناس معًا" },
    shape: "landscape",
  },
  {
    src: "/images/memory-knowledge-campaign.webp",
    alt: { en: "Phantoms campaign artwork about knowledge and impact", ar: "تصميم حملة Phantoms عن المعرفة والأثر" },
    caption: { en: "Ideas worth sharing", ar: "أفكار تستحق المشاركة" },
    note: { en: "People · Ideas · Impact", ar: "الناس · الأفكار · الأثر" },
    shape: "square",
  },
  {
    src: "/images/memory-linkedin-campaign.webp",
    alt: { en: "Phantoms announcement artwork introducing its LinkedIn page", ar: "ملصق الإعلان عن صفحة Phantoms على LinkedIn" },
    caption: { en: "A signal from the shadows", ar: "إشارة من الظلال" },
    note: { en: "Design from the shadow", ar: "تصميم من قلب الظلال" },
    shape: "portrait",
  },
] as const;

// Add only confirmed current members and their real portraits here.
export const teamMembers: Array<{
  name: string;
  role: Localized;
  image: string;
  bio: Localized;
}> = [];
