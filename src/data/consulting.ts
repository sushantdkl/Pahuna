// =============================================================================
// B2B Consulting Data — Service Definitions, Case Studies, Testimonials
// Structured for the consulting landing page, service detail pages, and CTAs.
// =============================================================================

// Icon names (resolved on the client side via iconMap in service-card.tsx)
export type ConsultingIconName =
  | "Hotel"
  | "Building2"
  | "Coffee"
  | "Globe"
  | "BarChart3"
  | "TrendingUp"
  | "Users";

// ── Service Category ──

export interface ConsultingServiceFeature {
  title: string;
  description: string;
}

export interface ConsultingServiceDeliverable {
  title: string;
  items: string[];
}

export interface ConsultingService {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  shortDesc: string;
  description: string;
  icon: ConsultingIconName;
  color: string; // tailwind color class base e.g. "emerald"
  features: ConsultingServiceFeature[];
  deliverables: ConsultingServiceDeliverable[];
  idealFor: string[];
  startingPrice: string; // e.g. "NPR 50,000"
  duration: string; // "2-4 weeks"
  isFeatured: boolean;
}

export const consultingServices: ConsultingService[] = [
  {
    id: "hotel-setup",
    title: "Hotel Setup & Launch",
    slug: "hotel-setup",
    tagline: "From concept to opening day",
    shortDesc:
      "Complete hotel planning — site evaluation, licensing, interiors, staffing, and launch strategy for new properties.",
    description:
      "Launching a hotel in Nepal requires navigating regulations, finding the right location, designing guest-ready interiors, and building a team from scratch. Our setup consulting covers the entire journey from feasibility study to grand opening. We've helped launch 15+ properties across Karnali Province.",
    icon: "Hotel",
    color: "emerald",
    features: [
      {
        title: "Feasibility & Market Study",
        description:
          "Location analysis, competitor mapping, demand forecasting, and ROI projections before you invest.",
      },
      {
        title: "Licensing & Compliance",
        description:
          "Tourism board registration, municipality permits, fire safety, food safety (DFTQC), and tax setup.",
      },
      {
        title: "Interior Design & Procurement",
        description:
          "Room layouts, furniture procurement, linen sourcing, and amenity standards — budget to luxury.",
      },
      {
        title: "Pre-Opening Staffing",
        description:
          "Recruitment, role design, training calendars, and SOP creation for all departments.",
      },
      {
        title: "Soft Opening & Launch",
        description:
          "Test runs, media/influencer invites, OTA listing, Google Business setup, and launch-day execution.",
      },
    ],
    deliverables: [
      {
        title: "Planning Documents",
        items: [
          "Feasibility report with financials",
          "Business plan & investor deck",
          "Licensing checklist & timeline",
        ],
      },
      {
        title: "Operational Setup",
        items: [
          "SOP manual (50+ procedures)",
          "Staffing plan & org chart",
          "Supplier & vendor directory",
        ],
      },
      {
        title: "Launch Kit",
        items: [
          "Brand identity package",
          "OTA listing setup (Booking.com, Agoda)",
          "Social media launch plan",
        ],
      },
    ],
    idealFor: [
      "First-time hotel owners",
      "Investors entering hospitality",
      "Existing businesses adding accommodation",
      "Homestay operators upgrading to hotel",
    ],
    startingPrice: "NPR 1,50,000",
    duration: "8 – 16 weeks",
    isFeatured: true,
  },
  {
    id: "operations",
    title: "Operations Consulting",
    slug: "operations",
    tagline: "Streamline every department",
    shortDesc:
      "Front desk, housekeeping, F&B, and maintenance — optimize daily operations with SOPs and technology.",
    description:
      "Most hotels lose 15-25% of potential revenue through operational inefficiency. We audit your entire operation — front desk workflows, housekeeping schedules, F&B cost controls, maintenance routines — and implement systems that save time and money. Our SOPs are built specifically for the Nepali hospitality context.",
    icon: "Building2",
    color: "blue",
    features: [
      {
        title: "Operations Audit",
        description:
          "On-site assessment of every department: check-in flow, room turnover time, waste tracking, and guest feedback gaps.",
      },
      {
        title: "SOP Development",
        description:
          "Custom standard operating procedures for front desk, housekeeping, F&B, maintenance, and security — in English and Nepali.",
      },
      {
        title: "Technology Integration",
        description:
          "PMS selection, channel manager setup, POS for F&B, and inventory management tools.",
      },
      {
        title: "Quality Assurance System",
        description:
          "Inspection checklists, mystery guest programs, and KPI dashboards for ongoing monitoring.",
      },
    ],
    deliverables: [
      {
        title: "Audit Report",
        items: [
          "Department-by-department analysis",
          "Efficiency score with benchmarks",
          "Priority action items (quick wins)",
        ],
      },
      {
        title: "Operations Manual",
        items: [
          "SOP handbook (bilingual)",
          "Checklists for daily/weekly/monthly tasks",
          "Emergency response procedures",
        ],
      },
    ],
    idealFor: [
      "Hotels with high staff turnover",
      "Properties with inconsistent service quality",
      "Businesses expanding to multiple locations",
      "Hotels preparing for star rating",
    ],
    startingPrice: "NPR 75,000",
    duration: "4 – 8 weeks",
    isFeatured: true,
  },
  {
    id: "menu-barista",
    title: "Menu & Barista Consulting",
    slug: "menu-barista",
    tagline: "Craft menus that sell",
    shortDesc:
      "Menu engineering, food costing, barista training, and F&B strategy for hotels, cafés, and restaurants.",
    description:
      "Your menu is your most powerful sales tool. We help hotels, cafés, and restaurants design menus that maximize profit per item, reduce waste, and delight guests. From recipe standardization to specialty coffee programs — we build F&B operations that work.",
    icon: "Coffee",
    color: "amber",
    features: [
      {
        title: "Menu Engineering",
        description:
          "Profitability analysis per item, menu layout optimization, pricing psychology, and seasonal menu planning.",
      },
      {
        title: "Food Cost Control",
        description:
          "Recipe standardization, portion control systems, waste reduction, and supplier negotiation strategies.",
      },
      {
        title: "Barista & Coffee Program",
        description:
          "Specialty coffee training, equipment selection, drink menu creation, and local bean sourcing for Nepali cafés.",
      },
      {
        title: "Kitchen Workflow",
        description:
          "Kitchen layout review, prep scheduling, HACCP compliance, and hygiene certification support.",
      },
    ],
    deliverables: [
      {
        title: "Menu Package",
        items: [
          "Engineered menu with costing sheets",
          "Recipe cards with portion specs",
          "Seasonal rotation calendar",
        ],
      },
      {
        title: "Training Materials",
        items: [
          "Barista training handbook",
          "Kitchen SOP manual",
          "Food safety certification prep",
        ],
      },
    ],
    idealFor: [
      "New cafés and restaurants",
      "Hotels upgrading F&B revenue",
      "Chains standardizing across outlets",
      "Properties adding coffee/bar programs",
    ],
    startingPrice: "NPR 50,000",
    duration: "3 – 6 weeks",
    isFeatured: true,
  },
  {
    id: "branding-digital",
    title: "Branding & Digital Presence",
    slug: "branding-digital",
    tagline: "Be found. Be remembered.",
    shortDesc:
      "Logo, brand identity, website, SEO, social media strategy, and OTA optimization for hospitality businesses.",
    description:
      "In Nepal's growing hospitality market, visibility is everything. We build complete brand identities — from logo and visual language to website, Google Business Profile, and social media presence. Our digital strategies are designed for the Nepali market with realistic budgets and measurable results.",
    icon: "Globe",
    color: "violet",
    features: [
      {
        title: "Brand Identity",
        description:
          "Logo design, color palette, typography, brand guidelines, signage, stationery, and visual identity system.",
      },
      {
        title: "Website & SEO",
        description:
          "Mobile-first website, Google ranking optimization, local SEO, and direct booking integration.",
      },
      {
        title: "Social Media Strategy",
        description:
          "Content calendars, photography guidelines, Facebook/Instagram management, and influencer partnership planning.",
      },
      {
        title: "OTA & Listing Optimization",
        description:
          "Booking.com, Agoda, TripAdvisor, and Google Business — profile optimization, review management, and ranking tips.",
      },
    ],
    deliverables: [
      {
        title: "Brand Kit",
        items: [
          "Logo files (all formats)",
          "Brand guidelines document",
          "Print collateral templates",
        ],
      },
      {
        title: "Digital Assets",
        items: [
          "Website (design + development)",
          "SEO audit & action plan",
          "3-month content calendar",
        ],
      },
    ],
    idealFor: [
      "New hotels without branding",
      "Properties rebranding or upgrading",
      "Businesses with no online presence",
      "Hotels looking to increase direct bookings",
    ],
    startingPrice: "NPR 80,000",
    duration: "4 – 10 weeks",
    isFeatured: false,
  },
  {
    id: "revenue-pricing",
    title: "Revenue & Pricing Strategy",
    slug: "revenue-pricing",
    tagline: "Maximize every room night",
    shortDesc:
      "Dynamic pricing, yield management, competitive analysis, and revenue optimization for Nepali hospitality.",
    description:
      "Most hotels in Nepal use flat pricing — leaving significant revenue on the table. We implement dynamic pricing strategies, seasonal rate calendars, and distribution channel optimization that can increase RevPAR by 30-60%. Our approach is calibrated for Nepal's unique market dynamics: festival seasons, trekking peaks, and the growing domestic travel segment.",
    icon: "BarChart3",
    color: "rose",
    features: [
      {
        title: "Pricing Architecture",
        description:
          "Rate tiers, seasonal calendars, package pricing, length-of-stay discounts, and corporate rate structures.",
      },
      {
        title: "Distribution Strategy",
        description:
          "OTA commission optimization, direct booking incentives, channel manager setup, and rate parity management.",
      },
      {
        title: "Revenue Analytics",
        description:
          "KPI dashboards (RevPAR, ADR, occupancy), competitive set tracking, and monthly performance reviews.",
      },
      {
        title: "Upselling & Ancillary Revenue",
        description:
          "Room upgrade flows, F&B upselling programs, experience packages, and add-on revenue strategies.",
      },
    ],
    deliverables: [
      {
        title: "Strategy Package",
        items: [
          "Annual rate calendar",
          "Competitor pricing analysis",
          "Distribution channel plan",
        ],
      },
      {
        title: "Implementation",
        items: [
          "PMS/channel manager configuration",
          "Upselling playbook",
          "Monthly review template",
        ],
      },
    ],
    idealFor: [
      "Hotels with flat or outdated pricing",
      "Properties with low occupancy despite good location",
      "Businesses expanding to OTAs",
      "Chain hotels needing rate consistency",
    ],
    startingPrice: "NPR 60,000",
    duration: "3 – 6 weeks",
    isFeatured: false,
  },
  {
    id: "expansion",
    title: "Expansion Consulting",
    slug: "expansion",
    tagline: "Scale with confidence",
    shortDesc:
      "Multi-property strategy, franchise models, new market entry, and growth planning for hospitality brands.",
    description:
      "Ready to grow beyond your first property? We help hospitality businesses plan and execute expansion — whether it's a second location, a franchise model, or entering a new district. Our expansion playbook covers financial planning, brand consistency, operational replication, and market selection.",
    icon: "TrendingUp",
    color: "teal",
    features: [
      {
        title: "Growth Strategy",
        description:
          "Market opportunity analysis, site selection criteria, financial modeling, and 3-year expansion roadmap.",
      },
      {
        title: "Franchise Development",
        description:
          "Franchise agreement templates, brand standards manual, franchisee selection criteria, and royalty structures.",
      },
      {
        title: "Operational Replication",
        description:
          "Systems and SOPs that scale — centralized purchasing, training programs, quality audits, and tech stack standardization.",
      },
      {
        title: "Investment & Funding",
        description:
          "Investor pitch preparation, bank loan documentation, government tourism incentive applications, and partnership structures.",
      },
    ],
    deliverables: [
      {
        title: "Expansion Plan",
        items: [
          "Market analysis & site shortlist",
          "Financial projections (3-year)",
          "Expansion timeline & milestones",
        ],
      },
      {
        title: "Franchise Package",
        items: [
          "Franchise operations manual",
          "Brand standards guide",
          "Legal agreement templates",
        ],
      },
    ],
    idealFor: [
      "Single-property owners ready to grow",
      "Successful local brands going regional",
      "Investors building hotel portfolios",
      "Tourism operators adding accommodation",
    ],
    startingPrice: "NPR 1,25,000",
    duration: "6 – 12 weeks",
    isFeatured: false,
  },
  {
    id: "training-staff",
    title: "Training & Staff Development",
    slug: "training-staff",
    tagline: "Your team is your brand",
    shortDesc:
      "On-site training programs for service excellence, housekeeping, front desk, leadership, and hospitality certification.",
    description:
      "Great hospitality is built by great people. We deliver on-site training programs customized for your property — from basic service etiquette to advanced leadership development. Our trainers have worked in 4 and 5-star properties and understand how to translate international standards for the Nepali context.",
    icon: "Users",
    color: "indigo",
    features: [
      {
        title: "Service Excellence Training",
        description:
          "Guest interaction, communication skills, complaint handling, upselling techniques, and cultural sensitivity.",
      },
      {
        title: "Department-Specific Programs",
        description:
          "Front desk operations, housekeeping standards, F&B service, kitchen hygiene, and security protocols.",
      },
      {
        title: "Leadership Development",
        description:
          "Supervisory skills, team management, shift planning, performance reviews, and conflict resolution for managers.",
      },
      {
        title: "Certification Support",
        description:
          "NTB hospitality certification prep, food safety certification, first aid training coordination, and fire safety drills.",
      },
    ],
    deliverables: [
      {
        title: "Training Programs",
        items: [
          "Customized training modules",
          "Training calendar (quarterly)",
          "Assessment & certification",
        ],
      },
      {
        title: "Ongoing Support",
        items: [
          "Training materials & handouts",
          "Performance tracking templates",
          "Follow-up refresher sessions",
        ],
      },
    ],
    idealFor: [
      "Hotels with new or untrained staff",
      "Properties preparing for upgrades",
      "Chains needing consistent service",
      "Businesses with high staff turnover",
    ],
    startingPrice: "NPR 40,000",
    duration: "1 – 4 weeks per module",
    isFeatured: true,
  },
];

// ── Case Studies ──

export interface CaseStudy {
  id: string;
  clientName: string;
  businessType: string;
  location: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  servicesUsed: string[]; // service slugs
  duration: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "case-1",
    clientName: "Hotel Karnali View",
    businessType: "Hotel",
    location: "Birendranagar, Surkhet",
    challenge:
      "A 20-room hotel with flat pricing, no online presence, and declining occupancy at 35%. Staff had no formal training, and guest complaints were increasing.",
    solution:
      "Complete operations audit with SOP implementation, dynamic pricing strategy, Google Business and OTA setup, and a 2-week staff training program covering service excellence and housekeeping.",
    results: [
      { metric: "Occupancy Rate", value: "35% → 62%" },
      { metric: "Revenue Growth", value: "+47% in 6 months" },
      { metric: "Google Rating", value: "3.2 → 4.4 stars" },
      { metric: "Direct Bookings", value: "0 → 25% of total" },
    ],
    testimonial: {
      quote:
        "They didn't just give us a report — they stayed until everything was implemented. Our team now has confidence, and guests actually leave positive reviews.",
      author: "Deepak Bhandari",
      role: "Owner, Hotel Karnali View",
    },
    servicesUsed: ["operations", "revenue-pricing", "branding-digital", "training-staff"],
    duration: "12 weeks",
  },
  {
    id: "case-2",
    clientName: "Bulbule Café",
    businessType: "Café",
    location: "Birendranagar, Surkhet",
    challenge:
      "A new café with great location but inconsistent drinks, high food costs (42%), and no brand identity. Needed a complete F&B overhaul and barista program.",
    solution:
      "Menu engineering reduced food costs to 28%. Developed a specialty coffee program with locally sourced beans. Created full brand identity including logo, signage, and social media presence.",
    results: [
      { metric: "Food Cost", value: "42% → 28%" },
      { metric: "Monthly Revenue", value: "+65% in 4 months" },
      { metric: "Instagram Followers", value: "0 → 2,800" },
      { metric: "Average Ticket Size", value: "+35%" },
    ],
    testimonial: {
      quote:
        "Our coffee menu alone brought in a completely new customer segment. The menu engineering paid for the entire consulting fee within 2 months.",
      author: "Anjali Thapa",
      role: "Founder, Bulbule Café",
    },
    servicesUsed: ["menu-barista", "branding-digital"],
    duration: "6 weeks",
  },
  {
    id: "case-3",
    clientName: "Karnali Heritage Resort",
    businessType: "Resort",
    location: "Surkhet Valley",
    challenge:
      "Planning stage — investor group wanted to build a 40-room heritage resort but had no hospitality experience. Needed end-to-end setup consulting from feasibility to opening.",
    solution:
      "Conducted market feasibility study, secured all licenses, designed operations from scratch, recruited & trained 35 staff, and managed the soft opening including media and OTA partnerships.",
    results: [
      { metric: "Time to Open", value: "14 months (on schedule)" },
      { metric: "Opening Occupancy", value: "48% in Month 1" },
      { metric: "Staff Retention", value: "92% after Year 1" },
      { metric: "TripAdvisor Rating", value: "4.5 at launch" },
    ],
    testimonial: {
      quote:
        "As first-time hotel investors, we would have been lost without their guidance. Every rupee spent on consulting was worth it — we opened on time, on budget, and with a full team.",
      author: "Rajendra Maharjan",
      role: "Managing Director, Karnali Heritage Resort",
    },
    servicesUsed: ["hotel-setup", "operations", "training-staff", "branding-digital"],
    duration: "14 months",
  },
];

// ── B2B Testimonials ──

export interface ConsultingTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  service: string; // service slug
}

export const consultingTestimonials: ConsultingTestimonial[] = [
  {
    id: "t-1",
    quote:
      "Their operations audit found 15 efficiency gaps we didn't even know existed. Within 3 months, our housekeeping costs dropped 20% and guest satisfaction scores went up.",
    author: "Sarita Basnet",
    role: "General Manager",
    company: "Hotel Himalayan Surkhet",
    service: "operations",
  },
  {
    id: "t-2",
    quote:
      "The revenue strategy alone increased our ADR by NPR 1,200 per room. The dynamic pricing calendar they built is something we now use every day.",
    author: "Bishal Khatri",
    role: "Owner",
    company: "Mountain Lodge Birendranagar",
    service: "revenue-pricing",
  },
  {
    id: "t-3",
    quote:
      "We went from zero online presence to getting 40% of our bookings through Google and Booking.com. The branding package made us look like a completely different property.",
    author: "Nirmala Shrestha",
    role: "Director",
    company: "Surkhet Boutique Hotel",
    service: "branding-digital",
  },
  {
    id: "t-4",
    quote:
      "Their barista training transformed our café. We now serve specialty coffee that keeps customers coming back. The menu engineering alone paid for the consulting within weeks.",
    author: "Roshan Gc",
    role: "Owner",
    company: "Rapti River Café",
    service: "menu-barista",
  },
];

// ── Statistics ──

export const consultingStats = [
  { value: "40+", label: "Businesses Served" },
  { value: "45%", label: "Avg Revenue Growth" },
  { value: "500+", label: "Staff Trained" },
  { value: "92%", label: "Client Retention" },
  { value: "7", label: "Service Categories" },
  { value: "Karnali", label: "Province Focus" },
] as const;

// ── Process Steps ──

export const consultingProcess = [
  {
    step: 1,
    title: "Discovery Call",
    description:
      "Free 30-minute call to understand your business, challenges, and goals. No commitment required.",
    duration: "30 min",
  },
  {
    step: 2,
    title: "On-Site Assessment",
    description:
      "We visit your property, audit operations, review financials, and identify opportunities.",
    duration: "1-2 days",
  },
  {
    step: 3,
    title: "Custom Proposal",
    description:
      "Detailed proposal with scope, timeline, deliverables, and transparent pricing.",
    duration: "3-5 days",
  },
  {
    step: 4,
    title: "Implementation",
    description:
      "We don't just advise — we work alongside your team to implement every recommendation.",
    duration: "Variable",
  },
  {
    step: 5,
    title: "Results & Review",
    description:
      "Monthly check-ins, KPI tracking, and ongoing support until targets are met.",
    duration: "Ongoing",
  },
] as const;

// ── Helper Functions ──

export function getServiceBySlug(slug: string): ConsultingService | undefined {
  return consultingServices.find((s) => s.slug === slug);
}

export function getFeaturedServices(): ConsultingService[] {
  return consultingServices.filter((s) => s.isFeatured);
}

export function getCaseStudiesForService(serviceSlug: string): CaseStudy[] {
  return caseStudies.filter((c) => c.servicesUsed.includes(serviceSlug));
}

export function getTestimonialsForService(
  serviceSlug: string
): ConsultingTestimonial[] {
  return consultingTestimonials.filter((t) => t.service === serviceSlug);
}
