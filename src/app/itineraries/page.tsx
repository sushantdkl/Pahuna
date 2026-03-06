import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, DollarSign, Users, Mountain, Map, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { EmptyState } from "@/components/shared/empty-state";
import { demoItineraries } from "@/services";

export const metadata: Metadata = {
  title: "Trip Ideas & Itineraries — Surkhet",
  description:
    "Pre-planned itineraries for Surkhet, Nepal. Choose from curated 3-day or 5-day trips with estimated costs and detailed day-by-day plans.",
  alternates: { canonical: "/itineraries" },
  openGraph: {
    title: "Trip Ideas & Itineraries — Surkhet",
    description: "Pre-planned travel itineraries for your Surkhet adventure.",
  },
};

export default function ItinerariesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <PageHero
        badge={{ icon: <Map className="h-3 w-3" />, label: "Tourism Roadmap" }}
        title="Trip Ideas &"
        highlight="Itineraries"
        subtitle="Pre-planned journeys to help you make the most of your time in Surkhet. Pick a plan, customize it, and go."
      >
        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 shadow-lg">
            <Link href="/trip-cost"><DollarSign className="h-4 w-4 mr-2" />Estimate Trip Cost</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8">
            <Link href="/experiences">View Experiences</Link>
          </Button>
        </div>
      </PageHero>

      {/* ── ITINERARIES LIST ── */}
      <section className="py-16">
        <Container>
          {demoItineraries.length > 0 ? (
            <div className="space-y-8">
              {demoItineraries.map((itin) => (
                <Card key={itin.slug} className="overflow-hidden border hover:shadow-lg transition-all">
                  <div className="grid md:grid-cols-3">
                    <div className="md:col-span-1 relative aspect-video md:aspect-auto overflow-hidden bg-muted min-h-[250px]">
                      <Image
                        src={itin.coverImage}
                        alt={itin.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      {itin.isFeatured && (
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">Popular</Badge>
                      )}
                    </div>
                    <CardContent className="md:col-span-2 p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant="outline">{itin.duration}</Badge>
                        <Badge variant="outline">{itin.difficulty}</Badge>
                      </div>
                      <h2 className="text-2xl font-bold mb-3">{itin.title}</h2>
                      <p className="text-muted-foreground mb-6">{itin.shortDesc}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <div>
                            <div className="text-xs text-muted-foreground">Duration</div>
                            <div className="font-medium">{itin.totalDays} Days</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <div>
                            <div className="text-xs text-muted-foreground">Est. Cost</div>
                            <div className="font-medium">{itin.estimatedCost}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-primary" />
                          <div>
                            <div className="text-xs text-muted-foreground">Group Size</div>
                            <div className="font-medium">{itin.groupSize}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mountain className="h-4 w-4 text-primary" />
                          <div>
                            <div className="text-xs text-muted-foreground">Best Season</div>
                            <div className="font-medium">{itin.bestSeason}</div>
                          </div>
                        </div>
                      </div>
                      <Button asChild>
                        <Link href={`/itineraries/${itin.slug}`}>View Day-by-Day Plan <ArrowRight className="h-4 w-4 ml-2" /></Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Compass className="h-14 w-14" />}
              title="No itineraries available"
              description="We're building curated trip ideas for Surkhet. Check back soon!"
              action={{ label: "Explore Surkhet", href: "/explore" }}
            />
          )}
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-muted/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold mb-3">Need a Custom Itinerary?</h2>
            <p className="text-muted-foreground mb-6">
              Want something tailored to your group, dates, and budget? Contact our team and we&apos;ll build a personalized trip plan for you.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Request Custom Trip <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
