import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Users,
  Mountain,
  Calendar,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { demoItineraries, getItinerarySlugs } from "@/services";
import { TripMapPanel } from "@/components/itineraries/trip-map-panel";

interface ItineraryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getItinerarySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ItineraryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const itinerary = demoItineraries.find((i) => i.slug === slug);
  if (!itinerary) return { title: "Itinerary Not Found" };
  return {
    title: itinerary.title,
    description: itinerary.shortDesc,
  };
}

export default async function ItineraryDetailPage({
  params,
}: ItineraryDetailPageProps) {
  const { slug } = await params;
  const itinerary = demoItineraries.find((i) => i.slug === slug);

  if (!itinerary) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-linear-to-br from-slate-100/80 via-indigo-50/40 to-background py-16">
        <Container>
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/itineraries" className="hover:text-primary">
              Trip Ideas
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">
              {itinerary.title}
            </span>
          </nav>

          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              {itinerary.difficulty}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {itinerary.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {itinerary.description}
            </p>
          </div>

          {/* Quick Info */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-medium text-sm">{itinerary.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mountain className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Difficulty</p>
                <p className="font-medium text-sm">{itinerary.difficulty}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Est. Cost</p>
                <p className="font-medium text-sm">{itinerary.estimatedCost}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Best Season</p>
                <p className="font-medium text-sm">{itinerary.bestSeason}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Group Size</p>
                <p className="font-medium text-sm">{itinerary.groupSize}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trip Map Panel */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight mb-10">
            Day-by-Day Itinerary
          </h2>

          <TripMapPanel
            days={itinerary.days}
            title={itinerary.title}
            duration={itinerary.duration}
            estimatedCost={itinerary.estimatedCost}
          />

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-primary/5 p-8 text-center">
            <h3 className="text-2xl font-bold">Want to Book This Trip?</h3>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              Submit an inquiry and our team will customize this itinerary to
              your group size, dates, and budget.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/contact">Inquire Now</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
