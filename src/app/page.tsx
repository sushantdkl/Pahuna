import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";
import { homeCopy } from "@/data/site-copy";
import {
  Search,
  ArrowRight,
  MapPin,
  Star,
  Mountain,
  TreePine,
  UtensilsCrossed,
  Landmark,
  GraduationCap,
  Handshake,
  TrendingUp,
  Users,
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  Globe,
  BarChart3,
  Sparkles,
  Quote,
  BookOpen,
  Compass,
  Hotel,
  Calendar,
  Shield,
  Zap,
  Heart,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { HotelCard } from "@/components/hotels/hotel-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SITE_CONFIG } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import {
  demoHotels,
  demoDestinations,
  demoExperiences,
  demoItineraries,
  demoTrainingCourses,
  demoBlogPosts,
  demoTestimonials,
  tripCostCategories,
  surkhetCity,
} from "@/services";

export const metadata: Metadata = {
  title: homeCopy.metadata.title,
  description: homeCopy.metadata.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeCopy.metadata.ogTitle,
    description: homeCopy.metadata.ogDescription,
  },
};

export default function HomePage() {
  const featuredHotels = demoHotels.filter((h) => h.isFeatured);
  const featuredDestinations = demoDestinations.filter((d) => d.isFeatured);
  const featuredExperiences = demoExperiences.filter((e) => e.isFeatured);

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* ================================================================= */}
      {/* 1. HERO SECTION                                                    */}
      {/* ================================================================= */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Gradient overlay — premium deep navy */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950" />
        {/* Decorative blurs — subtle, organic */}
        <div className="absolute -top-20 right-0 w-[30rem] h-[30rem] bg-white/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-[32rem] h-[32rem] bg-indigo-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] bg-white/[0.02] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <Container className="relative z-10 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-white/[0.12] text-white border-white/20 text-sm px-4 py-1.5 backdrop-blur-sm"
            >
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              Birendranagar, Surkhet — Karnali Province, Nepal
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
              Your Gateway to{" "}
              <span className="text-amber-300">Karnali</span>
            </h1>
            <p className="mt-3 text-2xl sm:text-3xl md:text-4xl font-medium text-white/70 tracking-tight">
              {homeCopy.hero.badge}
            </p>

            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              {homeCopy.hero.description}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold text-base px-8 h-12 shadow-lg shadow-black/10"
              >
                <Link href="/hotels">
                  <Search className="h-4 w-4 mr-2" />
                  Find Your Stay
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 text-white hover:bg-white/10 font-semibold text-base px-8 h-12"
              >
                <Link href="/explore">
                  Explore Surkhet
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Stats row */}
            <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {homeCopy.hero.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/40 mt-1.5 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. SEARCH / EXPLORE BLOCK                                          */}
      {/* ================================================================= */}
      <section className="relative -mt-16 z-20 pb-10">
        <Container>
          <div className="mx-auto max-w-5xl rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/[0.06] border border-white/80 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Hotel,
                  title: "Hotels & Stays",
                  desc: "Browse verified accommodations",
                  href: "/hotels",
                  color: "bg-primary/8 text-primary",
                },
                {
                  icon: Compass,
                  title: "Explore Surkhet",
                  desc: "Destinations & attractions",
                  href: "/explore",
                  color: "bg-info/10 text-info",
                },
                {
                  icon: Calendar,
                  title: "Trip Ideas",
                  desc: "Pre-planned itineraries",
                  href: "/itineraries",
                  color: "bg-warning/10 text-warning",
                },
                {
                  icon: DollarSign,
                  title: "Trip Cost",
                  desc: "Estimate your budget",
                  href: "/trip-cost",
                  color: "bg-accent/10 text-accent",
                },
              ].map(({ icon: Icon, title, desc, href, color }) => (
                <Link
                  key={title}
                  href={href}
                  className="group flex items-center gap-4 rounded-xl border border-transparent p-4 transition-all duration-200 hover:shadow-md hover:border-border hover:bg-white"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 3. FEATURED STAYS IN SURKHET                                       */}
      {/* ================================================================= */}
      <section className="py-24">
        <Container>
          <SectionHeader
            title={homeCopy.featuredStays.title}
            subtitle={homeCopy.featuredStays.subtitle}
            action={{ label: "View All Hotels", href: "/hotels" }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredHotels.map((hotel) => (
              <HotelCard
                key={hotel.slug}
                name={hotel.name}
                slug={hotel.slug}
                shortDesc={hotel.shortDesc}
                propertyType={hotel.propertyType}
                address={hotel.address}
                priceMin={hotel.priceMin}
                priceMax={hotel.priceMax}
                starRating={hotel.starRating}
                isVerified={hotel.isVerified}
                isFeatured={hotel.isFeatured}
                amenities={hotel.amenities}
                coverImage={hotel.images?.[0]}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 4. WHY VISIT SURKHET                                               */}
      {/* ================================================================= */}
      <section className="py-24 bg-muted/30">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — visual */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
                <Image
                  src={surkhetCity.coverImage}
                  alt="Surkhet Valley — Karnali Province"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Floating card: rating */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl shadow-black/[0.06] px-5 py-4 border">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/15">
                    <Star className="h-6 w-6 text-warning fill-warning" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">4.5 / 5</div>
                    <div className="text-xs text-muted-foreground">
                      Traveler Rating
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating card: climate */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl shadow-black/[0.06] px-4 py-3 border hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-info/10">
                    <Zap className="h-4 w-4 text-info" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Pleasant Climate</div>
                    <div className="text-[11px] text-muted-foreground">
                      Year-round
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — copy */}
            <div className="order-1 lg:order-2">
              <Badge variant="outline" className="mb-4">
                Why Surkhet?
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem] mb-6 leading-[1.15]">
                {homeCopy.whyVisit.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {homeCopy.whyVisit.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Mountain, label: "Panoramic Valley Views" },
                  { icon: Landmark, label: "Ancient Heritage Sites" },
                  { icon: TreePine, label: "Untouched Forests" },
                  { icon: UtensilsCrossed, label: "Authentic Karnali Cuisine" },
                  { icon: Heart, label: "Warm Local Hospitality" },
                  { icon: Shield, label: "Safe & Welcoming" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background border transition-all duration-200 hover:shadow-sm hover:border-primary/20"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <Button asChild size="lg">
                <Link href="/explore">
                  Explore Surkhet <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 5. TOURISM ROADMAP HIGHLIGHTS                                      */}
      {/* ================================================================= */}
      <section className="py-24">
        <Container>
          <SectionHeader
            title={homeCopy.roadmapTeaser.title}
            subtitle={homeCopy.roadmapTeaser.subtitle}
          />

          {/* Destinations row */}
          <h3 className="text-xl font-semibold mb-6">
            Top Destinations
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {featuredDestinations.map((dest) => (
              <Card
                key={dest.slug}
                className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent z-10" />
                  <div className="h-full w-full relative transition-transform duration-700 group-hover:scale-110">
                    <Image
                      src={dest.coverImage}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <Badge className="bg-white/20 text-white mb-2 text-xs backdrop-blur-sm border-0">
                      {dest.bestSeason}
                    </Badge>
                    <h4 className="text-lg font-bold text-white leading-tight">
                      {dest.name}
                    </h4>
                    <p className="text-sm text-white/75 line-clamp-2 mt-1">
                      {dest.shortDesc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Experiences row */}
          <h3 className="text-xl font-semibold mb-6">
            Curated Experiences
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {featuredExperiences.map((exp) => (
              <Card
                key={exp.slug}
                className="group overflow-hidden border hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <div className="h-full w-full relative transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src={exp.coverImage}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <Badge className="absolute top-3 left-3 bg-white/90 text-foreground text-xs">
                    {exp.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold leading-tight mb-1 group-hover:text-primary transition-colors">
                    {exp.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {exp.shortDesc}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {exp.priceRange}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trip Ideas row */}
          <h3 className="text-xl font-semibold mb-6">
            Pre-Planned Trip Ideas
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {demoItineraries.map((itin) => (
              <Card
                key={itin.slug}
                className="group overflow-hidden border hover:shadow-lg transition-all"
              >
                <div className="grid sm:grid-cols-5">
                  <div className="sm:col-span-2 relative aspect-square sm:aspect-auto overflow-hidden bg-muted min-h-[200px]">
                    <Image
                      src={itin.coverImage}
                      alt={itin.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="sm:col-span-3 p-6 flex flex-col justify-center">
                    <Badge variant="outline" className="w-fit mb-3">
                      {itin.duration}
                    </Badge>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {itin.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {itin.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {itin.estimatedCost}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {itin.groupSize}
                      </span>
                    </div>
                    <Button asChild variant="outline" size="sm" className="w-fit">
                      <Link href={`/itineraries/${itin.slug}`}>
                        View Day-by-Day Plan
                        <ArrowRight className="h-3.5 w-3.5 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/experiences">
                View All Experiences & Trip Ideas
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 6. ESTIMATED TRIP COST TEASER                                      */}
      {/* ================================================================= */}
      <section className="py-24 bg-linear-to-br from-muted/40 to-muted/15">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                <DollarSign className="mr-1 h-3 w-3" /> Budget Planner
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem] mb-4 leading-[1.15]">
                {homeCopy.tripCostTeaser.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {homeCopy.tripCostTeaser.description}
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    label: "Budget Traveler",
                    range: "NPR 2,500 – 4,000 / day",
                    color: "bg-success",
                    width: "w-1/3",
                  },
                  {
                    label: "Mid-Range Traveler",
                    range: "NPR 5,000 – 10,000 / day",
                    color: "bg-info",
                    width: "w-2/3",
                  },
                  {
                    label: "Luxury Traveler",
                    range: "NPR 15,000 – 30,000 / day",
                    color: "bg-warning",
                    width: "w-full",
                  },
                ].map((tier) => (
                  <div key={tier.label}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-medium">{tier.label}</span>
                      <span className="text-muted-foreground">{tier.range}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${tier.color} ${tier.width}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild>
                <Link href="/trip-cost">
                  View Full Cost Breakdown
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Quick cost preview cards */}
            <div className="grid grid-cols-2 gap-4">
              {tripCostCategories.slice(0, 4).map((cat) => (
                <Card key={cat.category} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="pt-5 pb-4 px-4">
                    <h4 className="font-semibold text-sm mb-3">{cat.category}</h4>
                    <div className="space-y-2">
                      {cat.items.slice(0, 2).map((item) => (
                        <div
                          key={item.name}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-muted-foreground truncate pr-2">
                            {item.name}
                          </span>
                          <span className="font-medium whitespace-nowrap">
                            {item.pricePerDay}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 7. CONSULTING SERVICES TEASER                                      */}
      {/* ================================================================= */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2">
              <Badge variant="outline" className="mb-4">
                <TrendingUp className="mr-1 h-3 w-3" /> B2B Consulting
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem] mb-4 leading-[1.15]">
                {homeCopy.consultingTeaser.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {homeCopy.consultingTeaser.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { stat: "25+", label: "Hotels Served" },
                  { stat: "45%", label: "Avg Revenue Lift" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl bg-primary/5 px-5 py-3 text-center"
                  >
                    <div className="text-2xl font-bold text-primary">{s.stat}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
              <Button asChild>
                <Link href="/consulting">
                  Explore Consulting
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Sparkles,
                  title: "Branding & Identity",
                  desc: "Logo, visual identity, and brand guidelines for your property",
                },
                {
                  icon: Globe,
                  title: "Digital Presence",
                  desc: "Website, SEO, social media, and OTA listing optimization",
                },
                {
                  icon: BarChart3,
                  title: "Revenue Strategy",
                  desc: "Dynamic pricing, yield management, and competitive analysis",
                },
                {
                  icon: Building2,
                  title: "Operations",
                  desc: "SOPs, staff training, and technology integration",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-xl border bg-background p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 8. TRAINING ACADEMY TEASER                                         */}
      {/* ================================================================= */}
      <section className="py-24 bg-primary/[0.03]">
        <Container>
          <SectionHeader
            title={homeCopy.trainingTeaser.title}
            subtitle={homeCopy.trainingTeaser.subtitle}
            action={{ label: homeCopy.trainingTeaser.cta.label, href: homeCopy.trainingTeaser.cta.href }}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {demoTrainingCourses.map((course) => (
              <Card
                key={course.slug}
                className="group overflow-hidden border hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted relative">
                  <div className="h-full w-full relative transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src={course.coverImage}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <Badge className="absolute top-3 left-3 bg-white/90 text-foreground text-xs">
                    {course.category}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {course.shortDesc}
                  </p>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <DollarSign className="h-3.5 w-3.5 text-primary" />
                      {formatPrice(course.fee)}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      Max {course.maxStudents}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      Surkhet
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 9. PARTNER WITH US                                                 */}
      {/* ================================================================= */}
      <section className="py-24">
        <Container>
          <div className="rounded-3xl bg-linear-to-br from-primary/8 via-primary/4 to-transparent border overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left — copy */}
              <div className="p-10 sm:p-14 flex flex-col justify-center">
                <Badge variant="outline" className="w-fit mb-4">
                  <Handshake className="mr-1 h-3 w-3" /> Partner Network
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem] mb-4 leading-[1.15]">
                  {homeCopy.partnerTeaser.heading}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {homeCopy.partnerTeaser.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Free listing with a dedicated business profile",
                    "Access to qualified leads & booking inquiries",
                    "Co-marketing and social media features",
                    "Training discounts for your staff",
                  ].map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="w-fit">
                  <Link href="/partner">
                    Apply to Partner
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Right — visual stats */}
              <div className="bg-primary/5 p-10 sm:p-14 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                  {[
                    { value: "25+", label: "Active Partners", icon: Handshake },
                    { value: "6+", label: "Listed Hotels", icon: Hotel },
                    { value: "500+", label: "Staff Trained", icon: GraduationCap },
                    { value: "45%", label: "Revenue Growth", icon: TrendingUp },
                  ].map(({ value, label, icon: Icon }) => (
                    <div
                      key={label}
                      className="rounded-xl bg-white p-5 text-center shadow-sm border"
                    >
                      <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">{value}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 10. TESTIMONIALS / TRUST                                           */}
      {/* ================================================================= */}
      <section className="py-24 bg-muted/30">
        <Container>
          <SectionHeader
            title={homeCopy.testimonials.title}
            subtitle={homeCopy.testimonials.subtitle}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoTestimonials.map((t) => (
              <Card
                key={t.name}
                className="relative overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="pt-8 pb-6 px-6">
                  <Quote className="h-8 w-8 text-primary/15 absolute top-4 right-4" />
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-5">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <Separator className="mb-4" />
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 11. BLOG / INSIGHTS PREVIEW                                        */}
      {/* ================================================================= */}
      <section className="py-24">
        <Container>
          <SectionHeader
            title={homeCopy.blog.title}
            subtitle={homeCopy.blog.subtitle}
            action={{ label: homeCopy.blog.cta.label, href: homeCopy.blog.cta.href }}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {demoBlogPosts.map((post) => (
              <Card
                key={post.slug}
                className="group overflow-hidden border hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted relative">
                  <div className="h-full w-full relative transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  {post.category && (
                    <Badge className="absolute top-3 left-3 bg-white/90 text-foreground text-xs">
                      {post.category}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.authorName}</span>
                    {post.tags && (
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {post.tags[0]}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* 12. CTA FOOTER BLOCK                                               */}
      {/* ================================================================= */}
      <section className="py-28 bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute -top-10 right-0 w-80 h-80 bg-white/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-[28rem] h-[28rem] bg-indigo-500/10 rounded-full blur-3xl" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-5 leading-[1.1]">
              {homeCopy.ctaFooter.heading}
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
              {homeCopy.ctaFooter.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold h-12 px-8 shadow-lg shadow-black/10"
              >
                <Link href="/hotels">Find Your Stay</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 text-white hover:bg-white/10 font-semibold h-12 px-8"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 text-white hover:bg-white/10 font-semibold h-12 px-8"
              >
                <Link href="/consulting">For Businesses</Link>
              </Button>
            </div>

            <Separator className="bg-white/8 mb-10" />

            {/* Newsletter inline */}
            <div className="max-w-lg mx-auto">
              <p className="text-sm text-white/45 mb-4">
                {homeCopy.ctaFooter.newsletterPrompt}
              </p>
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
