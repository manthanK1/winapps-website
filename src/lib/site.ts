// Single source of truth for company facts used across the site.
// Only facts supplied by Winapps belong here. Never add invented figures.

export const SITE = {
  name: "Winapps",
  legalName: "Winapps Software Solutions Pvt. Ltd.",
  tagline: "Senior engineers for software that has to work.",
  description:
    "Winapps is a software engineering partner to companies in India, the US, the UK and Europe since 2013: AI & machine learning, web and mobile products, cloud, modernization and dedicated teams.",
  founded: 2013,
  country: "India",
  email: "sales@winapps.co.in",
  phone: "+91 70157 96830", // non-breaking spaces keep the number on one line
  phoneHref: "tel:+917015796830",
  whatsappHref: "https://wa.me/917015796830",
  linkedin: "https://www.linkedin.com/company/winapps.co.in/",
  instagram: "https://www.instagram.com/winapps_software/",
  facebook: "https://www.facebook.com/profile.php?id=100063887836935",
  // TODO: registered office address (EU buyers expect one). Leave null until supplied.
  address: null as null | { street: string; city: string; region: string; postalCode: string; country: string },
} as const;

// Primary navigation. Items with `menu` open a dropdown in the header (built
// from the content collections); `href` is where the item itself leads.
export const NAV = [
  { label: "What we do", href: "/services/", menu: "what-we-do" },
  { label: "Training", href: "/training/", menu: "training" },
  { label: "Work", href: "/work/" },
  { label: "How we work", href: "/how-we-work/" },
  { label: "Insights", href: "/blog/", menu: "insights" },
  { label: "About", href: "/about/" },
] as const;

export const INSIGHTS = [
  { label: "Blog", href: "/blog/", text: "Guides on costs, AI and logistics software." },
  { label: "News", href: "/news/", text: "Short updates on where the industry is heading." },
] as const;

// "What do you need?" options on the contact form, keyed to the practice they
// belong to. Links like /contact/?interest=AI%20%2F%20ML pre-select one.
export const NEEDS = [
  { label: "AI / ML", service: "ai-ml" },
  { label: "Web or mobile product", service: "product-engineering" },
  { label: "Cloud", service: "cloud-platform" },
  { label: "Modernization", service: "legacy-modernization" },
  { label: "Data & analytics", service: "data-analytics" },
  { label: "Dedicated team", service: "dedicated-teams" },
] as const;

export const BUDGETS = ["Not sure yet", "$5,000 – $10,000", "$10,000 – $25,000", "$25,000 – $50,000", "$50,000+"] as const;

/** WhatsApp chat link with the first message already typed. */
export function whatsappFor(message: string): string {
  return `${SITE.whatsappHref}?text=${encodeURIComponent(message)}`;
}

/** Contact page link that pre-selects the need for a practice. */
export function contactFor(serviceId: string): string {
  const need = NEEDS.find((n) => n.service === serviceId);
  return need ? `/contact/?interest=${encodeURIComponent(need.label)}` : "/contact/";
}

export const PROMISES = [
  { icon: "calendar", label: "Est. 2013" },
  { icon: "file-lock", label: "NDA before the first call" },
  { icon: "clock", label: "Reply within 1 business day" },
  { icon: "key-round", label: "Your IP from day one" },
] as const;

export const STACK = {
  Languages: ["Python", "TypeScript", "Go", "Swift", "Kotlin"],
  "Web & mobile": ["React", "Next.js", "Node.js", "Flutter"],
  "AI & data": ["PyTorch", "LangGraph", "PostgreSQL", "Kafka"],
  "Cloud & platform": ["AWS", "Azure", "GCP", "Kubernetes", "Terraform"],
} as const;
