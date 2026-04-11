import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, Lightbulb, Map } from "lucide-react";
import { Container } from "@/components/layout";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { BudgetEstimator } from "@/components/tourism/budget-estimator";
import { TransportTable } from "@/components/tourism/transport-table";
import { TripCostMapSectionClient } from "@/components/trip-cost/trip-cost-map-client";
import { demoHotels, demoDestinations, demoExperiences } from "@/services";
import type { MarkerCategory } from "@/components/maps/map-constants";

export const metadata: Metadata = {
  title: "Trip Cost Estimator — Plan Your Surkhet Budget",
  description:
    "Interactive budget planner for Surkhet, Nepal. Estimate costs for accommodation, food, transport, and activities across budget, standard, and premium tiers.",
  alternates: { canonical: "/trip-cost" },
  openGraph: {
    title: "Trip Cost Estimator — Plan Your Surkhet Budget",
    description: "Estimate costs for accommodation, food, transport, and activities in Surkhet.",
  },
};

export default function TripCostPage() {
  const hotelPlaces = demoHotels.map((h) => ({
    name: h.name,
    slug: h.slug,
    latitude: h.latitude,
    longitude: h.longitude,
    coverImage: h.images?.[0],
    category: "hotel" as MarkerCategory,
    costHint: `NPR ${h.priceMin.toLocaleString()} – ${h.priceMax.toLocaleString()}/night`,
    subtitle: h.propertyType,
    href: `/hotels/${h.slug}`,
  }));

  const destPlaces = demoDestinations.map((d) => ({
    name: d.name,
    slug: d.slug,
    latitude: d.latitude,
    longitude: d.longitude,
    coverImage: d.coverImage,
    category: ((d as { category?: string }).category ?? "destination") as MarkerCategory,
    costHint: d.entryFee === "Free" ? "Free entry" : `Entry: ${d.entryFee}`,
    subtitle: d.bestSeason,
    href: `/explore#${d.slug}`,
  }));

  const expPlaces = demoExperiences.map((e) => ({
    name: e.title,
    slug: e.slug,
    latitude: e.latitude,
    longitude: e.longitude,
    coverImage: e.coverImage,
    category: "experience" as MarkerCategory,
    costHint: e.priceRange,
    subtitle: e.duration,
    href: `/experiences#${e.slug}`,
  }));

  return (
    <>
      {/* ── HERO ── */}
      <PageHero
        badge={{ icon: <Calculator className="h-3 w-3" />, label: "Budget Planner" }}
        title="Estimate Your"
        highlight="Trip Cost"
        subtitle="Select your travel style, set your trip length, and get a realistic cost estimate for your Surkhet adventure. All prices in Nepalese Rupees (NPR)."
      >
        <div className="flex items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 shadow-lg"
          >
            <Link href="/packages">
              <Map className="h-4 w-4 mr-2" />
              View Trip Packages
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 font-semibold px-8"
          >
            <Link href="/itineraries">View Itineraries</Link>
          </Button>
        </div>
      </PageHero>

      {/* ── INTERACTIVE ESTIMATOR ── */}
      <section className="py-16">
        <Container>
          <SectionHeader
            title="Interactive Budget Calculator"
            subtitle="Choose your travel style, adjust days and travelers, and see real-time cost estimates"
          />
          <BudgetEstimator />
        </Container>
      </section>

      {/* ── TRANSPORT ── */}
      <section className="py-16 bg-muted/30">
        <Container>
          <SectionHeader
            title="Transport Costs"
            subtitle="How to get to Surkhet and how to get around once you're there"
          />
          <TransportTable />
        </Container>
      </section>

      {/* ── LOCATION MAP ── */}
      <section className="py-16">
        <Container>
          <SectionHeader
            title="Where Things Are"
            subtitle="Explore hotels, attractions, and experiences on the map — tap any place to see costs and distances"
          />
          <TripCostMapSectionClient
            hotels={hotelPlaces}
            destinations={destPlaces}
            experiences={expPlaces}
          />
        </Container>
      </section>

      {/* ── TIPS ── */}
      <section className="py-16">
        <Container>
          <div className="rounded-2xl bg-primary/5 p-8">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold">Money-Saving Tips</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Eat at local restaurants for authentic, affordable dal bhat (NPR 200–400)",
                "Travel by public bus from Nepalgunj — comfortable and cheap (NPR 500–800)",
                "Stay in homestays for cultural immersion and great value (NPR 1,200–2,500)",
                "Visit free attractions: Bulbule Lake, Deuti Bajai Temple, Valley Viewpoint",
                "Book multi-day packages for 10–20% savings over daily rates",
                "Carry cash — most local businesses don't accept cards yet",
                "Travel in October–March for best weather and lower off-peak rates",
                "Rent a bike for just NPR 500/day — the best way to explore the valley",
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-muted-foreground text-sm"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-56 h-56 bg-white/5 rounded-full blur-3xl" />
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-3">
              Ready to Book Your Trip?
            </h2>
            <p className="text-white/70 mb-6">
              Browse our curated trip packages or send us a custom inquiry
              and we&apos;ll build a personalized cost estimate.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg"
              >
                <Link href="/packages">
                  Browse Packages <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold"
              >
                <Link href="/contact">Custom Estimate</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
