// =============================================================================
// FAQ Content Service
// Phase 1: reads from static data → Phase 2: swap to Prisma queries
// =============================================================================

import type { FAQItemContent } from "@/lib/types/content";
import { faqItems } from "@/data/surkhet";

// Re-export raw array for backward compat
export { faqItems } from "@/data/surkhet";

const faqs: FAQItemContent[] = faqItems.map((f, idx) => ({
  id: `faq-${idx + 1}`,
  slug: `faq-${idx + 1}`,
  question: f.question,
  answer: f.answer,
  category: "General",
  sortOrder: idx,
  isPublished: true,
}));

export function getFAQs(category?: string): FAQItemContent[] {
  if (category) {
    return faqs.filter((f) => f.category === category && f.isPublished);
  }
  return faqs.filter((f) => f.isPublished);
}

export function getFAQsByCategory(): Record<string, FAQItemContent[]> {
  const grouped: Record<string, FAQItemContent[]> = {};
  for (const faq of faqs) {
    const cat = faq.category || "General";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(faq);
  }
  return grouped;
}
