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
  Clock,
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
import { EmptyState } from "@/components/shared/empty-state";
import { surkhetCity, demoDestinations, demoExperiences } from "@/services";
import { exploreCopy } from "@/data/site-copy";

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
  const featuredDestinations = demoDestinations.filter((d) => d.isFeatured);
  const otherDestinations = demoDestinations.filter((d) => !d.isFeatured);
  const featuredExperiences = demoExperiences.filter((e) => e.isFeatured);

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

      {/* ── MUST-VISIT DESTINATIONS ── */}
      <section className="py-20">
        <Container>
          <SectionHeader title={exploreCopy.destinations.title} subtitle={exploreCopy.destinations.subtitle} />

          {featuredDestinations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredDestinations.map((dest) => (
                <Card key={dest.slug} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent z-10" />
                    <div className="h-full w-full relative transition-transform duration-700 group-hover:scale-110">
                      <Image
                        src={dest.coverImage}
                        alt={dest.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute top-3 right-3 z-20">
                      <Badge className="bg-white/90 text-foreground text-xs">{dest.entryFee}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <Badge className="bg-white/20 text-white mb-2 text-xs backdrop-blur-sm border-0">{dest.bestSeason}</Badge>
                      <h3 className="text-lg font-bold text-white leading-tight">{dest.name}</h3>
                      <p className="text-sm text-white/75 line-clamp-2 mt-1">{dest.shortDesc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState title="No destinations yet" description="We're adding new destinations regularly. Check back soon!" action={{ label: "Go Home", href: "/" }} />
          )}

          {otherDestinations.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mt-14 mb-6">More Places to Explore</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherDestinations.map((dest) => (
                  <Card key={dest.slug} className="overflow-hidden border hover:shadow-lg transition-all group">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <div className="h-full w-full relative transition-transform duration-500 group-hover:scale-105">
                        <Image
                          src={dest.coverImage}
                          alt={dest.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-white/90 text-foreground text-xs">{dest.entryFee}</Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{dest.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{dest.shortDesc}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" /> Best: {dest.bestSeason}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      {/* ── THINGS TO DO PREVIEW ── */}
      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeader title={exploreCopy.experiences.title} subtitle={exploreCopy.experiences.subtitle} action={{ label: exploreCopy.experiences.cta.label, href: exploreCopy.experiences.cta.href }} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredExperiences.map((exp) => (
              <Card key={exp.slug} className="group overflow-hidden border hover:shadow-lg transition-all">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <div className="h-full w-full relative transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={exp.coverImage}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <Badge className="absolute top-3 left-3 bg-white/90 text-foreground text-xs">{exp.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold leading-tight mb-1 group-hover:text-primary transition-colors">{exp.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{exp.shortDesc}</p>
                  <div className="text-xs text-muted-foreground">{exp.duration} · {exp.priceRange}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

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
