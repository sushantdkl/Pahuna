import { SITE_CONFIG } from "@/lib/constants";

// =============================================================================
// JSON-LD Structured Data for SEO
// Use these in page components: <script type="application/ld+json" .../>
// =============================================================================

/** Organization schema — used on homepage */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/icon.svg`,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Birendranagar",
      addressLocality: "Surkhet",
      addressRegion: "Karnali Province",
      addressCountry: "NP",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      contactType: "customer service",
      email: SITE_CONFIG.email,
      availableLanguage: ["English", "Nepali"],
    },
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.tiktok,
    ],
  };
}

/** WebSite schema with search action — used on homepage */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/hotels?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** LocalBusiness schema — used on contact/about pages */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/og-image.jpg`,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Birendranagar",
      addressLocality: "Surkhet",
      addressRegion: "Karnali Province",
      postalCode: "21700",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6,
      longitude: 81.62,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "NPR 1,000 – NPR 15,000",
  };
}

/** FAQPage schema — used on FAQ page */
export function faqPageJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** BreadcrumbList schema */
export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Course schema — for training course detail pages */
export function courseJsonLd(course: {
  title: string;
  shortDesc: string;
  fee: number;
  duration: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.shortDesc,
    provider: {
      "@type": "Organization",
      name: `${SITE_CONFIG.name} Training Academy`,
      url: `${SITE_CONFIG.url}/training`,
    },
    url: `${SITE_CONFIG.url}/training/${course.slug}`,
    offers: {
      "@type": "Offer",
      price: course.fee,
      priceCurrency: "NPR",
      availability: "https://schema.org/InStock",
    },
    timeRequired: course.duration,
  };
}

/** Hotel/LodgingBusiness schema — for hotel detail pages */
export function hotelJsonLd(hotel: {
  name: string;
  shortDesc: string;
  starRating: number;
  pricePerNight: number;
  slug: string;
  location: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: hotel.name,
    description: hotel.shortDesc,
    url: `${SITE_CONFIG.url}/hotels/${hotel.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: hotel.location,
      addressRegion: "Karnali Province",
      addressCountry: "NP",
    },
    starRating: {
      "@type": "Rating",
      ratingValue: hotel.starRating,
    },
    priceRange: `NPR ${hotel.pricePerNight}`,
  };
}

/** Article/BlogPosting schema — for blog post detail pages */
export function blogPostJsonLd(post: {
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  publishedAt: string;
  coverImage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    datePublished: post.publishedAt,
    ...(post.coverImage && { image: post.coverImage }),
  };
}

/** Helper to render JSON-LD as a script tag string */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
