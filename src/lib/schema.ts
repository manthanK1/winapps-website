// schema.org JSON-LD builders. Only facts from src/lib/site.ts.
import { SITE } from "./site";
import { absolute } from "./url";

export function organization(site: URL | undefined, logoUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absolute("/", site) + "#organization",
    name: SITE.name,
    url: absolute("/", site),
    logo: logoUrl,
    description: SITE.description,
    foundingDate: String(SITE.founded),
    email: SITE.email,
    telephone: SITE.phone.replace(/\s/g, ""),
    address: SITE.address
      ? { "@type": "PostalAddress", ...SITE.address }
      : { "@type": "PostalAddress", addressCountry: "IN" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        telephone: SITE.phone.replace(/\s/g, ""),
        availableLanguage: ["English"],
      },
    ],
    sameAs: [SITE.linkedin, SITE.instagram, SITE.facebook],
  };
}

export function article(
  site: URL | undefined,
  a: { type: "BlogPosting" | "NewsArticle"; headline: string; description: string; path: string; date: Date; author?: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": a.type,
    headline: a.headline,
    description: a.description,
    url: absolute(a.path, site),
    mainEntityOfPage: absolute(a.path, site),
    datePublished: a.date.toISOString().slice(0, 10),
    dateModified: a.date.toISOString().slice(0, 10),
    author: a.author ? { "@type": "Person", name: a.author } : { "@id": absolute("/", site) + "#organization" },
    publisher: { "@id": absolute("/", site) + "#organization" },
  };
}

export function breadcrumbs(site: URL | undefined, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path, site),
    })),
  };
}

export function faqPage(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function service(site: URL | undefined, s: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: absolute(s.path, site),
    provider: { "@id": absolute("/", site) + "#organization" },
    areaServed: ["IN", "US", "GB", "EU"],
  };
}
