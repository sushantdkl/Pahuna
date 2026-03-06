// =============================================================================
// Blog Content Service
// Phase 1: Passthrough from static data
// Phase 2: Swap internals to Prisma queries (same API)
// =============================================================================

import { demoBlogPosts } from "@/data/surkhet";

// Re-export raw array for backward compat
export { demoBlogPosts } from "@/data/surkhet";

export type { BlogPostContent } from "@/lib/types/content";

export function getBlogPosts() {
  return demoBlogPosts.filter((p) => p.isPublished);
}

export function getBlogPostBySlug(slug: string) {
  return demoBlogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string) {
  return demoBlogPosts.filter((p) => p.category === category && p.isPublished);
}

export function getRelatedBlogPosts(currentSlug: string, limit = 3) {
  const current = demoBlogPosts.find((p) => p.slug === currentSlug);
  if (!current) return demoBlogPosts.slice(0, limit);
  return demoBlogPosts
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}

export function getBlogPostSlugs(): string[] {
  return demoBlogPosts.map((p) => p.slug);
}
