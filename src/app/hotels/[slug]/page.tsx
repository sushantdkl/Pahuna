import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  ArrowLeft,
  Bed,
  Shield,
  Clock,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/shared/section-header";
import { HotelCard } from "@/components/hotels/hotel-card";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { CallbackForm } from "@/components/forms/callback-form";
import { demoHotels, getHotelSlugs, demoDestinations, demoExperiences } from "@/services";
import { formatPrice } from "@/lib/utils";
import { HotelDetailMap } from "@/components/maps/hotel-detail-map";
import { findNearbyPlaces } from "@/lib/geo-utils";
import type { MarkerCategory } from "@/components/maps/map-constants";

interface HotelDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getHotelSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: HotelDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hotel = demoHotels.find((h) => h.slug === slug);
  if (!hotel) return { title: "Hotel Not Found" };
  return {
    title: `${hotel.name} — Pahuna`,
    description: hotel.shortDesc,
    openGraph: {
      title: hotel.name,
      description: hotel.shortDesc,
    },
  };
}

export default async function HotelDetailPage({
  params,
}: HotelDetailPageProps) {
  const { slug } = await params;
  const hotel = demoHotels.find((h) => h.slug === slug);
  if (!hotel) notFound();

  const relatedHotels = demoHotels.filter((h) => h.slug !== slug).slice(0, 3);

  // Compute nearby attractions + experiences
  const nearbyPlaces =
    hotel.latitude && hotel.longitude
      ? findNearbyPlaces(hotel.latitude, hotel.longitude, [
          ...demoDestinations.map((d) => ({
            name: d.name,
            slug: d.slug,
            latitude: d.latitude,
            longitude: d.longitude,
            category: "destination" as const,
            coverImage: d.coverImage,
            subtitle: d.bestSeason ? `Best: ${d.bestSeason}` : undefined,
            href: `/explore#${d.slug}`,
          })),
          ...demoExperiences.map((e) => ({
            name: e.title,
            slug: e.slug,
            latitude: e.latitude,
            longitude: e.longitude,
            category: "experience" as const,
            coverImage: e.coverImage,
            subtitle: e.category,
            href: `/experiences#${e.slug}`,
          })),
        ]).map((p) => ({ ...p, category: p.category as MarkerCategory }))
      : [];

  return (
    <>
      {/* ── BREADCRUMB ── */}
      <section className="bg-muted/30 py-4 border-b">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/hotels"
              className="hover:text-foreground flex items-center gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Hotels
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{hotel.name}</span>
          </div>
        </Container>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-12">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">
            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery Placeholder */}
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-4 sm:col-span-3 aspect-video rounded-xl overflow-hidden relative">
                  <Image
                    src={hotel.images[0]}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 75vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="hidden sm:grid col-span-1 gap-3">
                  {hotel.images.slice(1, 3).map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden relative">
                      <Image
                        src={img}
                        alt={`${hotel.name} - ${i + 2}`}
                        fill
                        sizes="25vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge variant="outline">{hotel.propertyType}</Badge>
                  {hotel.isVerified && (
                    <Badge className="bg-green-600 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  )}
                  {hotel.isFeatured && <Badge>Featured</Badge>}
                </div>
                <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{hotel.address}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < hotel.starRating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Quick Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Bed, label: "Type", value: hotel.propertyType },
                  {
                    icon: Star,
                    label: "Rating",
                    value: `${hotel.starRating} Star`,
                  },
                  {
                    icon: Shield,
                    label: "Status",
                    value: hotel.isVerified ? "Verified" : "Pending",
                  },
                  { icon: Clock, label: "Check-in", value: "2:00 PM" },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border p-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground">
                        {label}
                      </div>
                      <div className="text-sm font-medium">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">
                  About This Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {hotel.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Amenities &amp; Facilities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {hotel.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/50 border"
                    >
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Contact */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                <div className="space-y-3">
                  {hotel.phone && (
                    <a
                      href={`tel:${hotel.phone}`}
                      className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" /> {hotel.phone}
                    </a>
                  )}
                  {hotel.email && (
                    <a
                      href={`mailto:${hotel.email}`}
                      className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" /> {hotel.email}
                    </a>
                  )}
                </div>
              </div>

              {/* Location Map + Nearby */}
              {hotel.latitude && hotel.longitude && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Location{nearbyPlaces.length > 0 ? " & Nearby" : ""}
                  </h2>
                  <HotelDetailMap
                    lat={hotel.latitude}
                    lng={hotel.longitude}
                    name={hotel.name}
                    address={hotel.address}
                    nearbyPlaces={nearbyPlaces}
                  />
                </div>
              )}

              {/* Policies */}
              <div className="rounded-2xl bg-primary/5 p-6">
                <h3 className="font-semibold mb-4">Property Policies</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">
                      Check-in:
                    </span>{" "}
                    2:00 PM onwards
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      Check-out:
                    </span>{" "}
                    12:00 PM
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      Cancellation:
                    </span>{" "}
                    Free up to 24 hours before
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      Children:
                    </span>{" "}
                    Allowed (extra bed available)
                  </div>
                </div>
              </div>

              {/* How Booking Works */}
              <div className="rounded-2xl border p-6">
                <h3 className="font-semibold mb-4">How Booking Works</h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Send Inquiry",
                      desc: "Fill out the booking inquiry form with your dates and requirements.",
                    },
                    {
                      step: "2",
                      title: "Get Confirmation",
                      desc: "Our team verifies availability and sends you a confirmed offer.",
                    },
                    {
                      step: "3",
                      title: "Book & Pay",
                      desc: "Confirm your booking. Pay on arrival or via bank transfer.",
                    },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold mx-auto mb-3">
                        {step}
                      </div>
                      <h4 className="font-medium text-sm mb-1">{title}</h4>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground">
                      Price Range
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(hotel.priceMin)} —{" "}
                      {formatPrice(hotel.priceMax)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      per night
                    </div>
                  </div>

                  <Separator className="mb-4" />

                  {/* Tabbed: Inquiry / Callback */}
                  <Tabs defaultValue="inquiry" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="inquiry" className="text-xs">
                        Book Now
                      </TabsTrigger>
                      <TabsTrigger value="callback" className="text-xs">
                        Call Me Back
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="inquiry">
                      <InquiryForm
                        hotelId={hotel.slug}
                        hotelName={hotel.name}
                      />
                    </TabsContent>
                    <TabsContent value="callback">
                      <CallbackForm
                        hotelId={hotel.slug}
                        hotelName={hotel.name}
                        compact
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* ── RELATED HOTELS ── */}
      {relatedHotels.length > 0 && (
        <section className="py-16 bg-muted/30">
          <Container>
            <SectionHeader
              title="You Might Also Like"
              subtitle="Other great stays in Surkhet"
              action={{ label: "View All Hotels", href: "/hotels" }}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedHotels.map((h) => (
                <HotelCard
                  key={h.slug}
                  name={h.name}
                  slug={h.slug}
                  shortDesc={h.shortDesc}
                  propertyType={h.propertyType}
                  address={h.address}
                  priceMin={h.priceMin}
                  priceMax={h.priceMax}
                  starRating={h.starRating}
                  isVerified={h.isVerified}
                  isFeatured={h.isFeatured}
                  amenities={h.amenities}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
