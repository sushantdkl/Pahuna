import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mountain,
  TreePine,
  Landmark,
  UtensilsCrossed,
  Sun,
  Bus,
  Plane,
  ArrowRight,
  Camera,
  Heart,
  Shield,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { PageHero } from "@/components/shared/page-hero";
import { surkhetCity, demoDestinations, demoExperiences } from "@/services";
import { exploreCopy } from "@/data/site-copy";
import { ExploreExplorerClient } from "@/components/explore/explore-explorer-client";

export const metadata: Metadata = {
  title: exploreCopy.metadata.title,
  description: exploreCopy.metadata.description,
  alternates: { canonical: "/explore" },
  openGraph: {
    title: exploreCopy.metadata.ogTitle,
    description: exploreCopy.metadata.ogDescription,
  },
};

export default function ExplorePage() {
  return (
    <>
      {/* ── HERO ── */}
      <PageHero
        badge={{ icon: <MapPin className="h-3 w-3" />, label: exploreCopy.hero.badge }}
        title={exploreCopy.hero.title}
        highlight={exploreCopy.hero.highlight}
        subtitle={exploreCopy.hero.subtitle}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 shadow-lg">
            <Link href="/itineraries"><Compass className="h-4 w-4 mr-2" />View Trip Ideas</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8">
            <Link href="/hotels">Find a Stay</Link>
          </Button>
        </div>
      </PageHero>

      {/* ── QUICK FACTS ── */}
      <section className="py-14">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { icon: Sun, label: "Best Season", value: "Oct – March", color: "bg-amber-50 text-amber-700" },
              { icon: Mountain, label: "Altitude", value: "600 – 720 m", color: "bg-emerald-50 text-emerald-700" },
              { icon: Bus, label: "From Kathmandu", value: "~12 hr bus", color: "bg-blue-50 text-blue-700" },
              { icon: Plane, label: "Nearest Airport", value: "Nepalgunj", color: "bg-purple-50 text-purple-700" },
            ].map(({ icon: Icon, label, value, color }) => (
              <Card key={label} className="border hover:shadow-md transition-shadow">
                <CardContent className="p-5 text-center">
                  <div className={`flex h-12 w-12 mx-auto items-center justify-center rounded-xl ${color} mb-3`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
                  <div className="font-bold text-lg mt-0.5">{value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── WHY SURKHET ── */}
      <section className="py-20 bg-muted/40">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Why Surkhet?</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">{exploreCopy.whyVisit.heading}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {exploreCopy.whyVisit.description}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Mountain, label: "Panoramic Valley Views" },
                  { icon: Landmark, label: "Ancient Heritage Sites" },
                  { icon: TreePine, label: "Untouched Forests" },
                  { icon: UtensilsCrossed, label: "Karnali Cuisine" },
                  { icon: Heart, label: "Warm Hospitality" },
                  { icon: Shield, label: "Safe & Welcoming" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 rounded-xl bg-background border p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-inner">
                <Image
                  src={surkhetCity.coverImage}
                  alt="Surkhet Valley — Karnali Province"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-5 py-3 border">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-bold text-sm">5+ Destinations</div>
                    <div className="text-[11px] text-muted-foreground">Waiting to be explored</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── EXPLORE DESTINATIONS & EXPERIENCES ── */}
      <ExploreExplorerClient destinations={demoDestinations} experiences={demoExperiences} />

      {/* ── HOW TO GET THERE ── */}
      <section className="py-20">
        <Container>
          <SectionHeader title={exploreCopy.gettingThere.title} subtitle={exploreCopy.gettingThere.subtitle} />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Bus, title: "By Bus from Kathmandu", color: "bg-blue-50 text-blue-700", details: ["Duration: 12 – 14 hours", "Cost: NPR 1,500 – 2,500", "Route: via Kohalpur/Nepalgunj", "Night buses available daily"] },
              { icon: Bus, title: "By Bus from Nepalgunj", color: "bg-emerald-50 text-emerald-700", details: ["Duration: 3 – 4 hours", "Cost: NPR 500 – 800", "Regular local buses", "Microbuses and jeeps available"] },
              { icon: Plane, title: "By Flight", color: "bg-purple-50 text-purple-700", details: ["Fly to Nepalgunj Airport", "Then 3 – 4 hour bus to Surkhet", "Flight: NPR 8,000 – 15,000", "Buddha Air · Yeti Airlines"] },
            ].map(({ icon: Icon, title, color, details }) => (
              <Card key={title} className="p-6 border hover:shadow-md transition-shadow">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{title}</h3>
                <ul className="space-y-2">
                  {details.map((detail) => (
                    <li key={detail} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-56 h-56 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl" />
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">{exploreCopy.cta.heading}</h2>
              <p className="text-white/70 max-w-md">{exploreCopy.cta.description}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">
                <Link href="/itineraries">Trip Ideas <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold">
                <Link href="/hotels">Find a Stay</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
