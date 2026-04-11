import { Metadata } from "next";
import Link from "next/link";
import { Hotel, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { HotelsExplorerClient } from "@/components/hotels/hotels-explorer-client";
import { demoHotels } from "@/services";
import { hotelsCopy } from "@/data/site-copy";

export const metadata: Metadata = {
  title: hotelsCopy.metadata.title,
  description: hotelsCopy.metadata.description,
  alternates: { canonical: "/hotels" },
  openGraph: {
    title: hotelsCopy.metadata.ogTitle,
    description: hotelsCopy.metadata.ogDescription,
  },
};

export default function HotelsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <PageHero
        badge={{ icon: <Hotel className="h-3 w-3" />, label: hotelsCopy.hero.badge }}
        title={hotelsCopy.hero.title}
        highlight={hotelsCopy.hero.highlight}
        subtitle={hotelsCopy.hero.subtitle}
      />

      {/* ── LISTING + MAP EXPLORER ── */}
      <section className="py-14">
        <Container>
          <HotelsExplorerClient hotels={demoHotels} />
        </Container>
      </section>

      {/* ── ASSISTED BOOKING CTA ── */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold mb-3 tracking-tight">
              {hotelsCopy.assistance.heading}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {hotelsCopy.assistance.description}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Request Assistance</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/trip-cost">
                  Estimate Trip Cost{" "}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-20 bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute -top-10 right-0 w-72 h-72 bg-white/[0.04] rounded-full blur-3xl" />
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight">{hotelsCopy.newsletter.heading}</h2>
              <p className="text-white/60 text-sm">
                {hotelsCopy.newsletter.description}
              </p>
            </div>
            <NewsletterForm />
          </div>
        </Container>
      </section>
    </>
  );
}
