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
  MapPin,
  Utensils,
  Moon,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { demoItineraries, getItinerarySlugs } from "@/services";
import { RouteMapSection } from "@/components/maps/route-map-section";

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

      {/* Day-by-Day Itinerary */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight mb-10">
            Day-by-Day Itinerary
          </h2>

          {/* Route Map */}
          <div className="mb-10">
            <RouteMapSection days={itinerary.days} />
          </div>

          <div className="space-y-8">
            {itinerary.days.map((day) => (
              <Card key={day.dayNumber} className="overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {day.dayNumber}
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground font-normal">
                        Day {day.dayNumber}
                      </p>
                      <p className="text-lg">{day.title}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <p className="text-muted-foreground">{day.description}</p>

                  {/* Activities */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" /> Activities
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {day.activities.map((activity) => (
                        <li
                          key={activity}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div className="flex flex-wrap gap-6 text-sm">
                    {day.meals && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Utensils className="h-4 w-4 text-primary" />
                        <span className="font-medium">Meals:</span>{" "}
                        {day.meals}
                      </div>
                    )}
                    {day.overnight && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Moon className="h-4 w-4 text-primary" />
                        <span className="font-medium">Overnight:</span>{" "}
                        {day.overnight}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
