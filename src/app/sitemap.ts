import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import {
  getHotelSlugs,
  getBlogPostSlugs,
  getPackageSlugs,
  getItinerarySlugs,
  getServiceSlugs,
  getCourseSlugs,
} from "@/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  // ── Static pages with differentiated priorities ──
  const staticEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/hotels`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/explore`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/experiences`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/itineraries`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/packages`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/training`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/consulting`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/trip-cost`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/partner`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/partner/hotels`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/roadmap`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // ── Dynamic routes — hotels, blog, packages, itineraries, consulting, training ──
  const hotelEntries: MetadataRoute.Sitemap = getHotelSlugs().map((slug) => ({
    url: `${baseUrl}/hotels/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = getBlogPostSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const packageEntries: MetadataRoute.Sitemap = getPackageSlugs().map((slug) => ({
    url: `${baseUrl}/packages/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const itineraryEntries: MetadataRoute.Sitemap = getItinerarySlugs().map((slug) => ({
    url: `${baseUrl}/itineraries/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const consultingEntries: MetadataRoute.Sitemap = getServiceSlugs().map((slug) => ({
    url: `${baseUrl}/consulting/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const trainingEntries: MetadataRoute.Sitemap = getCourseSlugs().map((slug) => ({
    url: `${baseUrl}/training/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...hotelEntries,
    ...blogEntries,
    ...packageEntries,
    ...itineraryEntries,
    ...consultingEntries,
    ...trainingEntries,
  ];
}
