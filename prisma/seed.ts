import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";
import {
  surkhetCity,
  demoHotels,
  demoDestinations,
  demoExperiences,
  demoItineraries,
  demoBlogPosts,
  faqItems,
  demoTestimonials,
} from "../src/data/surkhet";
import {
  consultingServices,
  caseStudies,
  consultingTestimonials,
} from "../src/data/consulting";
import {
  trainingCourses,
  studentTestimonials,
  generalFAQs,
} from "../src/data/training";
import {
  tripPackages,
  transportRoutes,
} from "../src/data/tourism";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. GEOGRAPHY — Country → Region → City
  // ═══════════════════════════════════════════════════════════════════════════

  const nepal = await prisma.country.upsert({
    where: { code: "NP" },
    update: {},
    create: {
      name: "Nepal",
      slug: "nepal",
      code: "NP",
      currency: "NPR",
    },
  });

  const karnali = await prisma.region.upsert({
    where: { slug: "karnali-province" },
    update: {},
    create: {
      name: "Karnali Province",
      slug: "karnali-province",
      countryId: nepal.id,
    },
  });

  const city = await prisma.city.upsert({
    where: { slug: surkhetCity.slug },
    update: {},
    create: {
      name: surkhetCity.name,
      slug: surkhetCity.slug,
      tagline: surkhetCity.tagline,
      description: surkhetCity.description,
      coverImage: surkhetCity.coverImage,
      latitude: surkhetCity.latitude,
      longitude: surkhetCity.longitude,
      regionId: karnali.id,
      isFeatured: true,
    },
  });

  console.log(`✅ Geography: ${nepal.name} → ${karnali.name} → ${city.name}`);

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. HOTELS (6)
  // ═══════════════════════════════════════════════════════════════════════════

  for (const hotel of demoHotels) {
    const created = await prisma.hotel.upsert({
      where: { slug: hotel.slug },
      update: {},
      create: {
        name: hotel.name,
        slug: hotel.slug,
        description: hotel.description,
        shortDesc: hotel.shortDesc,
        propertyType: hotel.propertyType,
        status: "PUBLISHED",
        address: hotel.address,
        cityId: city.id,
        phone: hotel.phone,
        email: hotel.email,
        priceMin: hotel.priceMin,
        priceMax: hotel.priceMax,
        starRating: hotel.starRating,
        isVerified: hotel.isVerified,
        isFeatured: hotel.isFeatured,
        metaTitle: `${hotel.name} — Book Now | Surkhet Hotel`,
        metaDesc: hotel.shortDesc,
        images: {
          create: hotel.images.map((url, idx) => ({
            url,
            alt: `${hotel.name} - Image ${idx + 1}`,
            isPrimary: idx === 0,
            sortOrder: idx,
          })),
        },
        amenities: {
          create: hotel.amenities.map((name) => ({ name })),
        },
      },
    });
    console.log(`  🏨 Hotel: ${created.name}`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. DESTINATIONS (5)
  // ═══════════════════════════════════════════════════════════════════════════

  for (const dest of demoDestinations) {
    const created = await prisma.destination.upsert({
      where: { slug: dest.slug },
      update: {},
      create: {
        name: dest.name,
        slug: dest.slug,
        description: dest.description,
        shortDesc: dest.shortDesc,
        coverImage: dest.coverImage,
        bestSeason: dest.bestSeason,
        entryFee: dest.entryFee,
        latitude: dest.latitude,
        longitude: dest.longitude,
        cityId: city.id,
        isFeatured: dest.isFeatured,
        metaTitle: `${dest.name} — Explore Surkhet`,
        metaDesc: dest.shortDesc,
      },
    });
    console.log(`  📍 Destination: ${created.name}`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. EXPERIENCES (5)
  // ═══════════════════════════════════════════════════════════════════════════

  for (const exp of demoExperiences) {
    const created = await prisma.experience.upsert({
      where: { slug: exp.slug },
      update: {},
      create: {
        title: exp.title,
        slug: exp.slug,
        description: exp.description,
        shortDesc: exp.shortDesc,
        coverImage: exp.coverImage,
        category: exp.category,
        duration: exp.duration,
        difficulty: exp.difficulty,
        priceRange: exp.priceRange,
        bestSeason: exp.bestSeason,
        cityId: city.id,
        isFeatured: exp.isFeatured,
        metaTitle: `${exp.title} — Surkhet Experiences`,
        metaDesc: exp.shortDesc,
      },
    });
    console.log(`  🎯 Experience: ${created.title}`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. ITINERARIES (2)
  // ═══════════════════════════════════════════════════════════════════════════

  for (const itin of demoItineraries) {
    const created = await prisma.itinerary.upsert({
      where: { slug: itin.slug },
      update: {},
      create: {
        title: itin.title,
        slug: itin.slug,
        description: itin.description,
        shortDesc: itin.shortDesc,
        coverImage: itin.coverImage,
        duration: itin.duration,
        totalDays: itin.totalDays,
        difficulty: itin.difficulty,
        estimatedCost: itin.estimatedCost,
        bestSeason: itin.bestSeason,
        groupSize: itin.groupSize,
        cityId: city.id,
        isFeatured: itin.isFeatured,
        metaTitle: `${itin.title} — Surkhet Itineraries`,
        metaDesc: itin.shortDesc,
        days: {
          create: itin.days.map((day) => ({
            dayNumber: day.dayNumber,
            title: day.title,
            description: day.description,
            activities: day.activities,
            meals: day.meals,
            overnight: day.overnight,
          })),
        },
      },
    });
    console.log(`  🗺️ Itinerary: ${created.title}`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. TRAINING COURSES (6 rich courses from training.ts)
  // ═══════════════════════════════════════════════════════════════════════════

  for (const course of trainingCourses) {
    const created = await prisma.trainingCourse.upsert({
      where: { slug: course.slug },
      update: {},
      create: {
        title: course.title,
        slug: course.slug,
        tagline: course.tagline,
        description: course.description,
        shortDesc: course.shortDesc,
        icon: course.icon,
        color: course.color,
        category: course.category,
        duration: course.duration,
        fee: course.fee,
        maxStudents: course.maxStudents,
        instructor: course.instructor.name,
        instructorData: JSON.stringify(course.instructor),
        prerequisites: course.prerequisites,
        level: course.level,
        mode: course.mode,
        modules: JSON.stringify(course.modules),
        faqs: JSON.stringify(course.faqs),
        certification: course.certification,
        careerOutcomes: JSON.stringify(course.careerOutcomes),
        schedule: course.schedule,
        location: course.location,
        batchInfo: course.batchInfo,
        status: course.isUpcoming ? "UPCOMING" : "OPEN",
        isFeatured: course.isFeatured,
        isUpcoming: course.isUpcoming,
        metaTitle: `${course.title} — Surkhet Hotel Academy`,
        metaDesc: course.shortDesc,
      },
    });
    console.log(`  🎓 Course: ${created.title}`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. BLOG POSTS (3)
  // ═══════════════════════════════════════════════════════════════════════════

  for (const post of demoBlogPosts) {
    const created = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        authorName: post.authorName,
        isPublished: post.isPublished,
        publishedAt: new Date(),
        coverImage: post.coverImage,
        cityId: city.id,
        readTime: Math.ceil(post.content.length / 1000),
        metaTitle: `${post.title} — Surkhet Hotel Blog`,
        metaDesc: post.excerpt,
      },
    });
    console.log(`  📝 Blog: ${created.title}`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. CONSULTING SERVICES (7)
  // ═══════════════════════════════════════════════════════════════════════════

  const serviceRecords: Record<string, string> = {};

  for (const svc of consultingServices) {
    const created = await prisma.consultingService.upsert({
      where: { slug: svc.slug },
      update: {},
      create: {
        title: svc.title,
        slug: svc.slug,
        tagline: svc.tagline,
        shortDesc: svc.shortDesc,
        description: svc.description,
        icon: svc.icon,
        color: svc.color,
        features: JSON.stringify(svc.features),
        deliverables: JSON.stringify(svc.deliverables),
        idealFor: svc.idealFor,
        startingPrice: svc.startingPrice,
        duration: svc.duration,
        isFeatured: svc.isFeatured,
        metaTitle: `${svc.title} — Surkhet Hotel Consulting`,
        metaDesc: svc.shortDesc,
      },
    });
    serviceRecords[svc.slug] = created.id;
    console.log(`  💼 Service: ${created.title}`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. CASE STUDIES (3 with service links)
  // ═══════════════════════════════════════════════════════════════════════════

  for (const cs of caseStudies) {
    const created = await prisma.caseStudy.upsert({
      where: { slug: cs.id },
      update: {},
      create: {
        slug: cs.id,
        clientName: cs.clientName,
        businessType: cs.businessType,
        location: cs.location,
        challenge: cs.challenge,
        solution: cs.solution,
        results: JSON.stringify(cs.results),
        testimonialData: cs.testimonial ? JSON.stringify(cs.testimonial) : null,
        duration: cs.duration,
        isFeatured: true,
        services: {
          create: cs.servicesUsed
            .filter((slug) => serviceRecords[slug])
            .map((slug) => ({
              consultingServiceId: serviceRecords[slug],
            })),
        },
      },
    });
    console.log(`  📊 Case Study: ${created.clientName}`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 10. TRIP PACKAGES (6)
  // ═══════════════════════════════════════════════════════════════════════════

  for (const pkg of tripPackages) {
    const created = await prisma.tripPackage.upsert({
      where: { slug: pkg.slug },
      update: {},
      create: {
        title: pkg.title,
        slug: pkg.slug,
        tier: pkg.tier,
        duration: pkg.duration,
        totalDays: pkg.totalDays,
        totalNights: pkg.totalNights,
        shortDesc: pkg.shortDesc,
        description: pkg.description,
        priceMin: pkg.pricePerPerson.min,
        priceMax: pkg.pricePerPerson.max,
        groupSize: pkg.groupSize,
        bestSeason: pkg.bestSeason,
        highlights: pkg.highlights,
        costSplit: JSON.stringify(pkg.costSplit),
        days: JSON.stringify(pkg.days),
        isFeatured: pkg.isFeatured,
        metaTitle: `${pkg.title} — Surkhet Trip Package`,
        metaDesc: pkg.shortDesc,
      },
    });
    console.log(`  📦 Package: ${created.title}`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 11. TRANSPORT ROUTES (6)
  // ═══════════════════════════════════════════════════════════════════════════

  for (const route of transportRoutes) {
    await prisma.transportRoute.create({
      data: {
        fromLocation: route.from,
        toLocation: route.to,
        mode: route.mode,
        durationHours: route.durationHours,
        costMin: route.costMin,
        costMax: route.costMax,
        frequency: route.frequency,
        notes: route.notes,
      },
    });
    console.log(`  🚌 Route: ${route.from} → ${route.to} (${route.mode})`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 12. FAQs (8 general + 7 training)
  // ═══════════════════════════════════════════════════════════════════════════

  for (const [idx, faq] of faqItems.entries()) {
    await prisma.fAQ.create({
      data: {
        question: faq.question,
        answer: faq.answer,
        category: "General",
        sortOrder: idx,
      },
    });
  }
  console.log(`  ❓ General FAQs: ${faqItems.length}`);

  for (const [idx, faq] of generalFAQs.entries()) {
    await prisma.fAQ.create({
      data: {
        question: faq.question,
        answer: faq.answer,
        category: "Training",
        sortOrder: idx,
      },
    });
  }
  console.log(`  ❓ Training FAQs: ${generalFAQs.length}`);

  // ═══════════════════════════════════════════════════════════════════════════
  // 13. TESTIMONIALS (4 general + 4 consulting + 4 training)
  // ═══════════════════════════════════════════════════════════════════════════

  for (const t of demoTestimonials) {
    await prisma.testimonial.create({
      data: {
        name: t.name,
        role: t.role,
        quote: t.quote,
        rating: t.rating,
        avatar: t.avatar,
        category: "General",
      },
    });
  }
  console.log(`  ⭐ General Testimonials: ${demoTestimonials.length}`);

  for (const t of consultingTestimonials) {
    await prisma.testimonial.create({
      data: {
        name: t.author,
        role: t.role,
        company: t.company,
        quote: t.quote,
        rating: 5,
        category: "Consulting",
        serviceSlug: t.service,
      },
    });
  }
  console.log(`  ⭐ Consulting Testimonials: ${consultingTestimonials.length}`);

  for (const t of studentTestimonials) {
    await prisma.testimonial.create({
      data: {
        name: t.name,
        role: t.currentRole,
        company: t.company,
        quote: t.quote,
        rating: 5,
        category: "Training",
        serviceSlug: t.courseSlug,
      },
    });
  }
  console.log(`  ⭐ Training Testimonials: ${studentTestimonials.length}`);

  // ═══════════════════════════════════════════════════════════════════════════
  // 14. DASHBOARD USERS (all roles)
  // ═══════════════════════════════════════════════════════════════════════════

  const defaultPassword = hashSync("password123", 10);

  const seedUsers = [
    { name: "Admin User", email: "admin@surkhethotel.com", role: "ADMIN" as const },
    { name: "Content Editor", email: "editor@surkhethotel.com", role: "EDITOR" as const },
    { name: "Hotel Partner", email: "partner@surkhethotel.com", role: "HOTEL_PARTNER" as const },
    { name: "Training Manager", email: "training@surkhethotel.com", role: "TRAINING_MANAGER" as const },
    { name: "Consulting Manager", email: "consulting@surkhethotel.com", role: "CONSULTING_MANAGER" as const },
  ];

  for (const u of seedUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { role: u.role, hashedPassword: defaultPassword },
      create: {
        name: u.name,
        email: u.email,
        role: u.role,
        hashedPassword: defaultPassword,
      },
    });
  }
  console.log(`  👤 ${seedUsers.length} dashboard users created (password: password123)`);

  // ═══════════════════════════════════════════════════════════════════════════
  console.log("\n✅ Seeding complete! All verticals populated.");
  console.log("   Hotels: 6 | Destinations: 5 | Experiences: 5 | Itineraries: 2");
  console.log("   Training Courses: 6 | Blog Posts: 3 | Consulting Services: 7");
  console.log("   Case Studies: 3 | Trip Packages: 6 | Transport Routes: 6");
  console.log("   FAQs: 15 | Testimonials: 12 | Users: 5");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
