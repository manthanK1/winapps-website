// Single source of truth for company facts used across the site.
// Only facts supplied by Winapps belong here. Never add invented figures.

export const SITE = {
  name: "Winapps",
  legalName: "Winapps", // TODO: registered legal entity name
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
  // TODO: registered office address (EU buyers expect one). Leave null until supplied.
  address: null as null | { street: string; city: string; region: string; postalCode: string; country: string },
} as const;

export const NAV = [
  { label: "Services", href: "/services/" },
  { label: "Work", href: "/work/" },
  { label: "Industries", href: "/industries/" },
  { label: "How we work", href: "/how-we-work/" },
  { label: "About", href: "/about/" },
] as const;

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
