// =============================================================================
// Structured tourism planning data — editable, extensible for multi-city
// =============================================================================

// ── Budget Tiers ──

export type BudgetTier = "budget" | "standard" | "premium";

export interface BudgetTierConfig {
  id: BudgetTier;
  label: string;
  tagline: string;
  emoji: string;
  color: string; // Tailwind color token
  perDayMin: number;
  perDayMax: number;
  description: string;
  includes: string[];
}

export const budgetTiers: BudgetTierConfig[] = [
  {
    id: "budget",
    label: "Budget Traveler",
    tagline: "Smart & simple",
    emoji: "🎒",
    color: "green",
    perDayMin: 2000,
    perDayMax: 4000,
    description:
      "Ideal for backpackers and solo travelers who want to explore affordably. Local transport, budget stays, and authentic street food.",
    includes: [
      "Budget lodge or hostel",
      "Local dal bhat meals",
      "Public bus / shared jeep",
      "Free attractions + 1 paid activity",
    ],
  },
  {
    id: "standard",
    label: "Standard Traveler",
    tagline: "Comfort meets value",
    emoji: "🧳",
    color: "blue",
    perDayMin: 5000,
    perDayMax: 10000,
    description:
      "A balanced experience with comfortable hotels, restaurant meals, and curated activities. Great for couples and families.",
    includes: [
      "Mid-range hotel with AC/WiFi",
      "Restaurant meals (mix of local & international)",
      "Private taxi or hired vehicle",
      "2-3 guided activities per day",
    ],
  },
  {
    id: "premium",
    label: "Premium Traveler",
    tagline: "Best of Surkhet",
    emoji: "✨",
    color: "amber",
    perDayMin: 12000,
    perDayMax: 30000,
    description:
      "Luxury accommodation, private guides, fine dining, and exclusive experiences. For those who want the absolute best.",
    includes: [
      "Premium hotel or boutique resort",
      "Fine dining + curated food experiences",
      "Private vehicle with driver",
      "VIP access to all activities + private guides",
    ],
  },
];

// ── Cost Line Items (numeric, calculable) ──

export interface CostLineItem {
  name: string;
  unit: string; // "per night", "per meal", "one way", "per ride", "per day"
  budget: { min: number; max: number };
  standard: { min: number; max: number };
  premium: { min: number; max: number };
}

export interface CostCategory {
  category: string;
  emoji: string;
  items: CostLineItem[];
}

export const costBreakdown: CostCategory[] = [
  {
    category: "Accommodation",
    emoji: "🏨",
    items: [
      {
        name: "Nightly stay",
        unit: "per night",
        budget: { min: 800, max: 1500 },
        standard: { min: 2500, max: 5000 },
        premium: { min: 8000, max: 25000 },
      },
    ],
  },
  {
    category: "Food & Dining",
    emoji: "🍛",
    items: [
      {
        name: "Breakfast",
        unit: "per meal",
        budget: { min: 100, max: 200 },
        standard: { min: 250, max: 500 },
        premium: { min: 500, max: 1200 },
      },
      {
        name: "Lunch",
        unit: "per meal",
        budget: { min: 200, max: 400 },
        standard: { min: 400, max: 800 },
        premium: { min: 800, max: 2000 },
      },
      {
        name: "Dinner",
        unit: "per meal",
        budget: { min: 200, max: 400 },
        standard: { min: 500, max: 1000 },
        premium: { min: 1000, max: 3000 },
      },
      {
        name: "Snacks & drinks",
        unit: "per day",
        budget: { min: 100, max: 300 },
        standard: { min: 200, max: 500 },
        premium: { min: 400, max: 1000 },
      },
    ],
  },
  {
    category: "Local Transport",
    emoji: "🚗",
    items: [
      {
        name: "Within Birendranagar",
        unit: "per day",
        budget: { min: 100, max: 300 },
        standard: { min: 500, max: 1000 },
        premium: { min: 1500, max: 3000 },
      },
      {
        name: "Day trip to nearby site",
        unit: "per trip",
        budget: { min: 200, max: 500 },
        standard: { min: 800, max: 1500 },
        premium: { min: 2000, max: 4000 },
      },
    ],
  },
  {
    category: "Activities & Experiences",
    emoji: "🥾",
    items: [
      {
        name: "Guided tours / activities",
        unit: "per activity",
        budget: { min: 300, max: 800 },
        standard: { min: 800, max: 2000 },
        premium: { min: 2000, max: 5000 },
      },
      {
        name: "Entry fees / permits",
        unit: "per site",
        budget: { min: 0, max: 100 },
        standard: { min: 50, max: 200 },
        premium: { min: 50, max: 200 },
      },
    ],
  },
  {
    category: "Miscellaneous",
    emoji: "📦",
    items: [
      {
        name: "SIM card + data",
        unit: "one-time",
        budget: { min: 500, max: 800 },
        standard: { min: 500, max: 1000 },
        premium: { min: 500, max: 1000 },
      },
      {
        name: "Tips & donations",
        unit: "per day",
        budget: { min: 100, max: 300 },
        standard: { min: 200, max: 500 },
        premium: { min: 500, max: 1500 },
      },
      {
        name: "Souvenirs",
        unit: "total",
        budget: { min: 300, max: 1000 },
        standard: { min: 500, max: 2000 },
        premium: { min: 1000, max: 5000 },
      },
    ],
  },
];

// ── Transport Routes (getting to/from Surkhet) ──

export interface TransportRoute {
  from: string;
  to: string;
  mode: string;
  durationHours: string;
  costMin: number;
  costMax: number;
  frequency: string;
  notes?: string;
}

export const transportRoutes: TransportRoute[] = [
  {
    from: "Kathmandu",
    to: "Surkhet",
    mode: "Bus (Night)",
    durationHours: "12-14",
    costMin: 1500,
    costMax: 2500,
    frequency: "Daily, multiple departures",
    notes: "Deluxe buses available with reclining seats",
  },
  {
    from: "Kathmandu",
    to: "Nepalgunj",
    mode: "Flight",
    durationHours: "0.75",
    costMin: 6000,
    costMax: 12000,
    frequency: "2-3 flights daily",
    notes: "Buddha Air, Yeti Airlines",
  },
  {
    from: "Nepalgunj",
    to: "Surkhet",
    mode: "Bus / Jeep",
    durationHours: "3-4",
    costMin: 500,
    costMax: 1200,
    frequency: "Frequent (every 30 min)",
  },
  {
    from: "Kathmandu",
    to: "Surkhet",
    mode: "Flight (via Nepalgunj)",
    durationHours: "4-5 (total)",
    costMin: 7000,
    costMax: 14000,
    frequency: "Daily",
    notes: "Flight + connecting bus/jeep",
  },
  {
    from: "Surkhet",
    to: "Surkhet",
    mode: "Local taxi / auto",
    durationHours: "—",
    costMin: 150,
    costMax: 500,
    frequency: "On demand",
    notes: "Within Birendranagar",
  },
  {
    from: "Surkhet",
    to: "Surkhet",
    mode: "Bike / scooter rental",
    durationHours: "—",
    costMin: 500,
    costMax: 1200,
    frequency: "Per day",
    notes: "Available at select shops in Birendranagar",
  },
];

// ── Trip Packages (structured, tiered) ──

export interface PackageDay {
  dayNumber: number;
  title: string;
  highlights: string[];
  meals: string;
  overnight: string;
  latitude?: number;
  longitude?: number;
}

export interface TripPackage {
  id: string;
  title: string;
  slug: string;
  tier: BudgetTier;
  duration: string;
  totalDays: number;
  totalNights: number;
  shortDesc: string;
  description: string;
  pricePerPerson: { min: number; max: number };
  groupSize: string;
  bestSeason: string;
  highlights: string[];
  costSplit: {
    accommodation: number; // percentage
    food: number;
    transport: number;
    activities: number;
    misc: number;
  };
  days: PackageDay[];
  isFeatured: boolean;
}

export const tripPackages: TripPackage[] = [
  // ── BUDGET ──
  {
    id: "budget-3d",
    title: "Surkhet on a Shoestring — 3 Days",
    slug: "surkhet-shoestring-3-days",
    tier: "budget",
    duration: "3 Days 2 Nights",
    totalDays: 3,
    totalNights: 2,
    shortDesc:
      "Maximum Surkhet experience at minimum cost. Local stays, dal bhat, and free attractions.",
    description:
      "Perfect for backpackers and budget-conscious travelers. Stay in clean budget lodges, eat delicious local food, walk to free attractions, and experience the real Surkhet without breaking the bank.",
    pricePerPerson: { min: 5000, max: 9000 },
    groupSize: "1 - 10",
    bestSeason: "October – March",
    highlights: [
      "Bulbule Lake walking tour",
      "Deuti Bajai Temple sunrise hike",
      "Local market exploration",
      "Authentic dal bhat experience",
    ],
    costSplit: { accommodation: 35, food: 30, transport: 10, activities: 15, misc: 10 },
    days: [
      {
        dayNumber: 1,
        title: "Arrival & Lake Walk",
        highlights: ["Check into budget lodge", "Walking tour of Birendranagar", "Bulbule Lake sunset stroll"],
        meals: "Lunch, Dinner (dal bhat)",
        overnight: "Budget lodge, Birendranagar",
        latitude: 28.597,
        longitude: 81.630,
      },
      {
        dayNumber: 2,
        title: "Heritage & Food",
        highlights: ["Kakre Bihar ruins (free entry area)", "Local market walk", "Street food tasting"],
        meals: "Breakfast, Lunch, Dinner",
        overnight: "Budget lodge, Birendranagar",
        latitude: 28.585,
        longitude: 81.648,
      },
      {
        dayNumber: 3,
        title: "Sunrise & Departure",
        highlights: ["Early morning Deuti Bajai hike", "Local breakfast", "Departure"],
        meals: "Breakfast",
        overnight: "—",
        latitude: 28.607,
        longitude: 81.622,
      },
    ],
    isFeatured: true,
  },
  {
    id: "budget-5d",
    title: "Backpacker's Karnali — 5 Days",
    slug: "backpackers-karnali-5-days",
    tier: "budget",
    duration: "5 Days 4 Nights",
    totalDays: 5,
    totalNights: 4,
    shortDesc:
      "Five days of local immersion at backpacker prices. Homestays, village walks, and nature.",
    description:
      "Extend your stay to experience village life, homestay hospitality, and deeper nature exploration. The extra days let you slow down and truly connect with the Karnali region.",
    pricePerPerson: { min: 8000, max: 16000 },
    groupSize: "1 - 8",
    bestSeason: "October – April",
    highlights: [
      "Homestay with local family",
      "Community forest walk",
      "Village cooking class",
      "Full heritage + nature circuit",
    ],
    costSplit: { accommodation: 30, food: 30, transport: 15, activities: 15, misc: 10 },
    days: [
      { dayNumber: 1, title: "Arrival & City Walk", highlights: ["Check in", "Birendranagar orientation", "Sunset at Bulbule Lake"], meals: "Dinner", overnight: "Budget lodge" },
      { dayNumber: 2, title: "Heritage Day", highlights: ["Kakre Bihar", "Cave exploration", "Local lunch"], meals: "B, L, D", overnight: "Budget lodge" },
      { dayNumber: 3, title: "Nature & Village", highlights: ["Birdwatching at Bulbule", "Community forest", "Village tea house"], meals: "B, L, D", overnight: "Homestay" },
      { dayNumber: 4, title: "Village Immersion", highlights: ["Cooking class", "Farm walk", "Cultural evening"], meals: "B, L, D", overnight: "Homestay" },
      { dayNumber: 5, title: "Viewpoint & Departure", highlights: ["Valley viewpoint sunrise", "Farewell breakfast", "Departure"], meals: "B", overnight: "—" },
    ],
    isFeatured: false,
  },

  // ── STANDARD ──
  {
    id: "standard-3d",
    title: "Surkhet Highlights — 3 Days",
    slug: "surkhet-highlights-3-days",
    tier: "standard",
    duration: "3 Days 2 Nights",
    totalDays: 3,
    totalNights: 2,
    shortDesc:
      "Comfortable hotels, guided activities, and all the top sights in three well-planned days.",
    description:
      "A curated 3-day experience designed for comfort. Stay in quality hotels, enjoy restaurant meals, get guided tours of every major site, and end each day relaxed. Ideal for couples and families.",
    pricePerPerson: { min: 14000, max: 25000 },
    groupSize: "2 - 8",
    bestSeason: "October – March",
    highlights: [
      "Professional guided heritage tour",
      "Surkhet Food Trail",
      "Sunrise hike with breakfast",
      "Cultural evening with Tharu dance",
    ],
    costSplit: { accommodation: 35, food: 25, transport: 15, activities: 20, misc: 5 },
    days: [
      {
        dayNumber: 1,
        title: "Arrival & City Discovery",
        highlights: ["Hotel check-in (AC room)", "Guided city tour", "Bulbule Lake boat ride", "Restaurant welcome dinner"],
        meals: "Lunch, Dinner",
        overnight: "Mid-range hotel",
        latitude: 28.597,
        longitude: 81.630,
      },
      {
        dayNumber: 2,
        title: "Heritage & Culture",
        highlights: ["Kakre Bihar guided tour", "Cave entry", "Surkhet Food Trail", "Tharu cultural evening"],
        meals: "Breakfast, Lunch, Dinner",
        overnight: "Mid-range hotel",
        latitude: 28.585,
        longitude: 81.648,
      },
      {
        dayNumber: 3,
        title: "Sunrise & Departure",
        highlights: ["Deuti Bajai sunrise hike", "Hotel breakfast", "Souvenir shopping", "Departure transfer"],
        meals: "Breakfast",
        overnight: "—",
        latitude: 28.607,
        longitude: 81.622,
      },
    ],
    isFeatured: true,
  },
  {
    id: "standard-5d",
    title: "Complete Surkhet — 5 Days",
    slug: "complete-surkhet-5-days",
    tier: "standard",
    duration: "5 Days 4 Nights",
    totalDays: 5,
    totalNights: 4,
    shortDesc:
      "Five days of comfort with every major experience — heritage, nature, culture, and food.",
    description:
      "The definitive Surkhet trip. Combines comfortable accommodation with comprehensive sightseeing, guided tours, nature excursions, and cultural immersion activities.",
    pricePerPerson: { min: 22000, max: 42000 },
    groupSize: "2 - 6",
    bestSeason: "October – April",
    highlights: [
      "Full heritage circuit with guide",
      "Birdwatching + nature walks",
      "Homestay night for cultural immersion",
      "Cooking class + food trails",
    ],
    costSplit: { accommodation: 30, food: 25, transport: 15, activities: 25, misc: 5 },
    days: [
      { dayNumber: 1, title: "Arrival & Orientation", highlights: ["Hotel check-in", "City tour", "Lake sunset", "Welcome dinner"], meals: "L, D", overnight: "Hotel" },
      { dayNumber: 2, title: "Heritage Circuit", highlights: ["Kakre Bihar", "Cave exploration", "Museum visit", "Guided lunch"], meals: "B, L, D", overnight: "Hotel" },
      { dayNumber: 3, title: "Nature Day", highlights: ["Birdwatching", "Community forest hike", "Village visit"], meals: "B, L, D", overnight: "Homestay" },
      { dayNumber: 4, title: "Culture & Food", highlights: ["Cooking class", "Food trail", "Handicraft workshop", "Cultural evening"], meals: "B, L, D", overnight: "Hotel" },
      { dayNumber: 5, title: "Viewpoint & Departure", highlights: ["Valley viewpoint sunrise", "Farewell breakfast", "Souvenir shopping", "Departure"], meals: "B, L", overnight: "—" },
    ],
    isFeatured: false,
  },

  // ── PREMIUM ──
  {
    id: "premium-3d",
    title: "Luxury Surkhet Escape — 3 Days",
    slug: "luxury-surkhet-escape-3-days",
    tier: "premium",
    duration: "3 Days 2 Nights",
    totalDays: 3,
    totalNights: 2,
    shortDesc:
      "Resort living, private guides, and fine dining — the VIP Surkhet experience.",
    description:
      "Experience Surkhet in luxury. Stay at Karnali Boutique Resort, enjoy private guided tours, dine at the best restaurants, and have a vehicle and driver at your disposal throughout.",
    pricePerPerson: { min: 30000, max: 55000 },
    groupSize: "2 - 4",
    bestSeason: "October – March",
    highlights: [
      "Boutique resort accommodation",
      "Private vehicle with driver",
      "Personal guide for all activities",
      "Fine dining experiences",
    ],
    costSplit: { accommodation: 40, food: 20, transport: 15, activities: 20, misc: 5 },
    days: [
      {
        dayNumber: 1,
        title: "Arrival in Style",
        highlights: ["Resort check-in with welcome drink", "Private city tour", "Spa treatment", "Multi-course welcome dinner"],
        meals: "Lunch, Dinner",
        overnight: "Karnali Boutique Resort",
        latitude: 28.609,
        longitude: 81.612,
      },
      {
        dayNumber: 2,
        title: "Private Heritage & Culture",
        highlights: ["Private Kakre Bihar tour with archaeologist", "Exclusive cave visit", "Chef's table lunch", "Private Tharu cultural performance"],
        meals: "Breakfast, Lunch, Dinner",
        overnight: "Karnali Boutique Resort",
        latitude: 28.585,
        longitude: 81.648,
      },
      {
        dayNumber: 3,
        title: "Sunrise & Departure",
        highlights: ["Private sunrise hike", "Resort spa checkout", "Premium souvenir shopping", "Airport/bus transfer"],
        meals: "Breakfast, Brunch",
        overnight: "—",
        latitude: 28.607,
        longitude: 81.622,
      },
    ],
    isFeatured: true,
  },
  {
    id: "premium-5d",
    title: "Royal Karnali — 5 Days",
    slug: "royal-karnali-5-days",
    tier: "premium",
    duration: "5 Days 4 Nights",
    totalDays: 5,
    totalNights: 4,
    shortDesc:
      "The ultimate Karnali experience — resort, private tours, exclusive activities, and full luxury.",
    description:
      "Five days of uncompromising luxury across Surkhet. Multiple resort properties, exclusive access to heritage sites, private helicopter tours (optional), and a dedicated concierge.",
    pricePerPerson: { min: 55000, max: 100000 },
    groupSize: "2 - 4",
    bestSeason: "October – April",
    highlights: [
      "Multi-property luxury experience",
      "Private archaeological guide",
      "Exclusive cooking masterclass",
      "Full spa day included",
    ],
    costSplit: { accommodation: 40, food: 20, transport: 15, activities: 20, misc: 5 },
    days: [
      { dayNumber: 1, title: "Grand Arrival", highlights: ["VIP airport transfer", "Resort check-in", "Spa welcome treatment", "Sunset cocktails"], meals: "L, D", overnight: "Boutique Resort" },
      { dayNumber: 2, title: "Private Heritage", highlights: ["Private Kakre Bihar tour", "Cave expedition", "Gourmet picnic lunch", "Sunset cruise at Bulbule Lake"], meals: "B, L, D", overnight: "Resort" },
      { dayNumber: 3, title: "Nature & Wellness", highlights: ["Luxury glamping picnic", "Guided birding", "Yoga session", "Full spa day"], meals: "B, L, D", overnight: "Resort" },
      { dayNumber: 4, title: "Culture & Cuisine", highlights: ["Private cooking masterclass", "Village visit with guide", "Artisan workshop", "Farewell gala dinner"], meals: "B, L, D", overnight: "Resort" },
      { dayNumber: 5, title: "Departure", highlights: ["Sunrise viewpoint", "Export coffee tasting", "VIP transfer"], meals: "B, Brunch", overnight: "—" },
    ],
    isFeatured: false,
  },
];

// ── Tourism Roadmap ──

export interface RoadmapPhase {
  phase: number;
  title: string;
  timeline: string;
  status: "completed" | "in-progress" | "upcoming" | "planned";
  description: string;
  deliverables: string[];
}

export const tourismRoadmap: RoadmapPhase[] = [
  {
    phase: 1,
    title: "Foundation — Surkhet Discovery",
    timeline: "Q1 2025",
    status: "completed",
    description:
      "Launch the platform with Surkhet as the first focus city. Build hotel listings, tourism content, and the inquiry-based booking system.",
    deliverables: [
      "Hotel listings with inquiry forms",
      "Destination & experience guides",
      "Trip cost estimator",
      "Pre-planned itineraries",
      "Partner onboarding system",
      "Training academy launch",
    ],
  },
  {
    phase: 2,
    title: "Booking & Payments",
    timeline: "Q2-Q3 2025",
    status: "in-progress",
    description:
      "Enable direct room bookings with real-time availability, integrate Nepali payment gateways (eSewa, Khalti, ConnectIPS), and introduce a review system.",
    deliverables: [
      "Real-time room availability calendar",
      "Direct online booking with confirmation",
      "eSewa, Khalti, ConnectIPS integration",
      "Guest review & rating system",
      "Partner dashboard with analytics",
      "Commission tracking for platform",
    ],
  },
  {
    phase: 3,
    title: "Dynamic Packages & Itineraries",
    timeline: "Q4 2025",
    status: "upcoming",
    description:
      "Launch a package builder that lets travelers customize itineraries with real-time pricing. Hotels, activities, and transport bundled into dynamic packages.",
    deliverables: [
      "Interactive itinerary builder",
      "Dynamic pricing engine",
      "Activity + hotel bundling",
      "Group booking discounts",
      "Seasonal offers and flash deals",
      "Package comparison tool",
    ],
  },
  {
    phase: 4,
    title: "Karnali Province Expansion",
    timeline: "Q1 2026",
    status: "upcoming",
    description:
      "Expand beyond Surkhet to cover Jumla, Dolpa, Kalikot, Dailekh, and other Karnali Province destinations. Multi-city trip planning.",
    deliverables: [
      "Jumla, Dolpa, Kalikot listings",
      "Inter-city route planner",
      "Province-wide trip packages",
      "Regional transport guide",
      "Trekking route integration",
      "Multi-city booking support",
    ],
  },
  {
    phase: 5,
    title: "National Platform",
    timeline: "Q3 2026 onwards",
    status: "planned",
    description:
      "Scale to a national tourism platform covering all 7 provinces. Multi-language support, API ecosystem for travel agents, and mobile app launch.",
    deliverables: [
      "All 7 provinces covered",
      "Multi-language (Nepali, English, Hindi)",
      "Travel agent API & B2B portal",
      "Mobile app (iOS & Android)",
      "AI-powered trip recommendations",
      "Government tourism board integration",
    ],
  },
];

// ── Daily Cost Calculator Helper ──

export function calculateDailyCost(tier: BudgetTier): { min: number; max: number } {
  const config = budgetTiers.find((t) => t.id === tier);
  if (!config) return { min: 0, max: 0 };
  return { min: config.perDayMin, max: config.perDayMax };
}

export function calculateTripCost(
  tier: BudgetTier,
  days: number
): { min: number; max: number } {
  const daily = calculateDailyCost(tier);
  return { min: daily.min * days, max: daily.max * days };
}

export function getTierPackages(tier: BudgetTier): TripPackage[] {
  return tripPackages.filter((p) => p.tier === tier);
}

export function getFeaturedPackages(): TripPackage[] {
  return tripPackages.filter((p) => p.isFeatured);
}
