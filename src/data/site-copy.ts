/**
 * Site-wide copy for Pahuna & Tourism Platform.
 * All user-facing text lives here — headings, descriptions, CTAs, stats,
 * benefits, trust badges, metadata, and section headers.
 *
 * Tone: premium, trustworthy, locally grounded, clear, persuasive, professional.
 * Every line is written for a real hospitality business in Surkhet, Nepal.
 */

// ---------------------------------------------------------------------------
// HOMEPAGE
// ---------------------------------------------------------------------------

export const homeCopy = {
  metadata: {
    title: "Pahuna — Your Gateway to Karnali",
    description:
      "Discover Surkhet — verified hotel bookings, curated tourism experiences, B2B hospitality consulting, and professional training in Nepal's Karnali Province.",
    ogTitle: "Pahuna — Tourism, Stays & Hospitality in Karnali",
    ogDescription:
      "The definitive platform for Surkhet tourism — verified stays, curated experiences, and professional hospitality services in mid-western Nepal.",
  },

  hero: {
    badge: "Tourism · Hospitality · Growth",
    title: "Your Gateway to Karnali",
    description:
      "Pahuna is the first integrated tourism platform for mid-western Nepal — connecting travelers with verified stays, authentic experiences, and local expertise across Karnali Province.",
    stats: [
      { value: "6+", label: "Verified Stays" },
      { value: "15+", label: "Curated Experiences" },
      { value: "500+", label: "Staff Trained" },
      { value: "25+", label: "Industry Partners" },
    ],
    searchPlaceholder: "Where do you want to go in Surkhet?",
    searchButton: "Search",
  },

  exploreCards: [
    {
      title: "Hotels & Stays",
      description:
        "Verified accommodations from riverside resorts to authentic Tharu homestays — transparent pricing, real photos, inquiry-based booking.",
      href: "/hotels",
    },
    {
      title: "Explore Surkhet",
      description:
        "Ancient Buddhist ruins, dense Terai forests, serene lakes, and a valley climate that's perfect year-round. The real Nepal awaits.",
      href: "/explore",
    },
    {
      title: "Trip Ideas",
      description:
        "Curated 2-day to 7-day itineraries designed by locals — heritage walks, adventure treks, cultural immersions, and food trails.",
      href: "/itineraries",
    },
    {
      title: "Trip Cost",
      description:
        "Transparent budget breakdowns for Surkhet travel — accommodation, meals, transport, and activities across budget, mid-range, and premium tiers.",
      href: "/trip-cost",
    },
  ],

  featuredStays: {
    title: "Featured Stays in Surkhet",
    subtitle:
      "Hand-picked accommodations — inspected by our team, verified for quality, and trusted by travelers across Nepal.",
  },

  whyVisit: {
    badge: "Why Surkhet?",
    heading: "Nepal's Best-Kept Secret Is Waiting for You",
    description:
      "While most travelers head to Pokhara and Kathmandu, Surkhet offers something rare — untouched landscapes, Licchavi-era Buddhist ruins, Tharu cultural heritage, and a valley climate that's pleasant year-round. This is the authentic Nepal experience, without the tourist crowds.",
    features: [
      { label: "Panoramic Valley Views" },
      { label: "Ancient Heritage Sites" },
      { label: "Untouched Forests" },
      { label: "Karnali Cuisine" },
      { label: "Warm Hospitality" },
      { label: "Safe & Welcoming" },
    ],
    imageCaption: "Surkhet Valley — Karnali Province",
    floatingCard: {
      value: "5+",
      label: "Destinations",
      sublabel: "Waiting to be explored",
    },
  },

  roadmapTeaser: {
    title: "Your Surkhet Roadmap",
    subtitle:
      "From hidden heritage sites to upcoming hotel launches — see what's ready today and what's coming next for Surkhet tourism.",
    tabs: {
      destinations: {
        title: "Top Destinations",
        subtitle:
          "Curated places that define Surkhet — from ancient pagodas to panoramic hilltops.",
      },
      experiences: {
        title: "Best Experiences",
        subtitle:
          "Sunrise hikes, food trails, cultural evenings, and adventure activities — handpicked by local guides.",
      },
      itineraries: {
        title: "Trip Ideas",
        subtitle:
          "Pre-planned multi-day itineraries that cover the best of Surkhet in 2, 3, or 7 days.",
      },
    },
  },

  tripCostTeaser: {
    heading: "How Much Does a Surkhet Trip Cost?",
    description:
      "Plan confidently with transparent cost breakdowns — we show real pricing from our partner hotels, restaurants, and transport providers so there are no surprises.",
    tiers: [
      {
        tier: "Budget",
        range: "NPR 2,000 – 4,000/day",
        description:
          "Clean lodges, local dal-bhat restaurants, and public buses — ideal for solo backpackers and student travelers.",
      },
      {
        tier: "Mid-Range",
        range: "NPR 4,000 – 8,000/day",
        description:
          "Comfortable hotel rooms, restaurant dining, private jeep transfers — the sweet spot for couples and small groups.",
      },
      {
        tier: "Premium",
        range: "NPR 8,000 – 15,000+/day",
        description:
          "Boutique resorts, multi-course meals, guided private tours, and spa access — for travelers who want the finest Surkhet has to offer.",
      },
    ],
    cta: {
      label: "Build Your Trip Budget",
      href: "/trip-cost",
    },
  },

  consultingTeaser: {
    heading: "Grow Your Hospitality Business",
    description:
      "We're a registered hotel service consultancy helping hotels, cafés, and tourism operators in Nepal build profitable, well-run businesses — from launch day to expansion.",
    services: [
      {
        title: "Hotel Setup & Launch",
        description:
          "Complete setup support — concept, licensing, interior planning, staffing, and soft-launch strategy for new properties.",
      },
      {
        title: "Operations & Revenue",
        description:
          "Optimize daily operations, implement revenue management, improve guest satisfaction scores, and increase occupancy.",
      },
      {
        title: "Branding & Digital",
        description:
          "Professional identity design, photography, OTA listing optimization, social media strategy, and website development.",
      },
      {
        title: "Menu & Barista Consulting",
        description:
          "Recipe development, kitchen workflow, cost-per-plate analysis, barista training, and café concept design.",
      },
    ],
    stats: [
      { value: "25+", label: "Hotels Served" },
      { value: "45%", label: "Avg Revenue Lift" },
    ],
    cta: {
      label: "Explore Consulting",
      href: "/consulting",
    },
  },

  trainingTeaser: {
    title: "Training Academy",
    subtitle:
      "Professional hospitality courses that turn ambition into careers — 500+ graduates trained, 92% placement rate across Nepal's hotel industry.",
    cta: {
      label: "View Courses",
      href: "/training",
    },
  },

  partnerTeaser: {
    heading: "Grow Together With Us",
    description:
      "Whether you run a hotel, restaurant, travel agency, or transport service — joining our partner network means more visibility, more bookings, and expert support to grow your business.",
    benefits: [
      "Free verified business listing with dedicated profile page",
      "Direct access to qualified booking leads and traveler inquiries",
      "Co-marketing campaigns; social media features; blog spotlights",
      "Discounted consulting and staff training through our academy",
    ],
    stats: [
      { value: "25+", label: "Active Partners" },
      { value: "6", label: "Verified Hotels" },
      { value: "500+", label: "Trained Staff" },
      { value: "100%", label: "Free to Join" },
    ],
    cta: {
      label: "Become a Partner",
      href: "/partner",
    },
  },

  testimonials: {
    title: "What People Say",
    subtitle:
      "Real feedback from travelers, hoteliers, and hospitality professionals who've experienced our platform and services.",
  },

  blog: {
    title: "Stories & Insights",
    subtitle:
      "Destination guides, travel tips, hospitality trends, and behind-the-scenes stories from the Surkhet tourism scene.",
    cta: {
      label: "View All Posts",
      href: "/blog",
    },
  },

  ctaFooter: {
    heading: "Ready to Experience Surkhet?",
    description:
      "Whether you're planning your first trip to Karnali or looking for the right hospitality partner — we're here to help.",
    newsletterPrompt:
      "Get curated travel ideas, hotel deals, and Surkhet updates delivered to your inbox — no spam, just useful stuff.",
    buttons: {
      primary: { label: "Browse Hotels", href: "/hotels" },
      secondary: { label: "Explore Surkhet", href: "/explore" },
    },
  },
} as const;

// ---------------------------------------------------------------------------
// EXPLORE SURKHET
// ---------------------------------------------------------------------------

export const exploreCopy = {
  metadata: {
    title: "Explore Surkhet — Destinations, Experiences & Travel Guide",
    description:
      "Your complete guide to Surkhet — top destinations, must-try experiences, travel routes, and practical tips for visiting Nepal's Karnali Province.",
    ogTitle: "Explore Surkhet — Nepal's Hidden Gem in Karnali Province",
    ogDescription:
      "Ancient Buddhist ruins, untouched forests, Tharu culture, and valley views — discover the best of Surkhet with curated destination guides.",
  },

  hero: {
    badge: "Explore Surkhet",
    title: "Discover the Heart of",
    highlight: "Karnali",
    subtitle:
      "From Licchavi-era Buddhist ruins to lush hilltop trails — Surkhet is Nepal's most underrated destination. Explore our curated guide to the valley, its culture, its food, and its people.",
  },

  quickFacts: [
    { label: "Best Season", value: "October – March" },
    { label: "Altitude", value: "600 – 720m" },
    { label: "From Kathmandu", value: "~12hr by bus" },
    { label: "Nearest Airport", value: "Nepalgunj (NPL)" },
  ],

  whyVisit: {
    badge: "Why Surkhet?",
    heading: "Nepal's Best-Kept Secret",
    description:
      "While most travelers flock to Pokhara and Kathmandu, Surkhet offers something rare — untouched landscapes, Licchavi-era Buddhist ruins, Tharu cultural heritage, and a valley climate that's pleasant year-round. It's the authentic Nepal experience without the tourist crowds.",
    features: [
      { label: "Panoramic Valley Views" },
      { label: "Ancient Heritage Sites" },
      { label: "Untouched Forests" },
      { label: "Karnali Cuisine" },
      { label: "Warm Hospitality" },
      { label: "Safe & Welcoming" },
    ],
    imageCaption: "Surkhet Valley — Karnali Province",
    floatingCard: {
      value: "5+",
      label: "Destinations",
      sublabel: "Waiting to be explored",
    },
  },

  destinations: {
    title: "Must-Visit Destinations",
    subtitle:
      "From ancient Buddhist ruins to serene lakes — Surkhet has hidden treasures waiting to be explored.",
  },

  experiences: {
    title: "Things to Do in Surkhet",
    subtitle:
      "Curated experiences — from sunrise hikes to food trails and cultural evenings.",
    cta: { label: "View All Experiences", href: "/experiences" },
  },

  gettingThere: {
    title: "Getting to Surkhet",
    subtitle:
      "Multiple transport options connect Surkhet to major Nepali cities.",
    routes: [
      {
        title: "By Bus from Kathmandu",
        details: [
          "Duration: 12 – 14 hours",
          "Cost: NPR 1,500 – 2,500",
          "Route: via Kohalpur / Nepalgunj",
          "Night buses available daily",
        ],
      },
      {
        title: "By Bus from Nepalgunj",
        details: [
          "Duration: 3 – 4 hours",
          "Cost: NPR 500 – 800",
          "Regular local buses",
          "Microbuses and jeeps available",
        ],
      },
      {
        title: "By Flight",
        details: [
          "Fly to Nepalgunj Airport",
          "Then 3 – 4 hour bus to Surkhet",
          "Flight: NPR 8,000 – 15,000",
          "Buddha Air · Yeti Airlines",
        ],
      },
    ],
  },

  cta: {
    heading: "Ready to explore Surkhet?",
    description:
      "Check out our curated itineraries or find the perfect stay for your Karnali adventure.",
    buttons: {
      primary: { label: "Trip Ideas", href: "/itineraries" },
      secondary: { label: "Find a Stay", href: "/hotels" },
    },
  },
} as const;

// ---------------------------------------------------------------------------
// HOTELS & STAYS
// ---------------------------------------------------------------------------

export const hotelsCopy = {
  metadata: {
    title: "Hotels & Stays in Surkhet — Verified Accommodations",
    description:
      "Find the best hotels, resorts, homestays, and lodges in Surkhet, Nepal. Verified listings with transparent pricing and inquiry-based booking.",
    ogTitle: "Hotels & Stays in Surkhet",
    ogDescription:
      "Browse verified accommodations in Surkhet — from boutique resorts to authentic homestays. Inquiry-first booking.",
  },

  hero: {
    badge: "Verified Accommodations",
    title: "Hotels & Stays in",
    highlight: "Surkhet",
    subtitle:
      "Curated, verified accommodations from budget lodges to premium resorts. Browse, filter, and send a booking inquiry — we'll handle the rest.",
  },

  assistance: {
    heading: "Can't find what you're looking for?",
    description:
      "Tell us your requirements — dates, budget, group size — and we'll find the perfect stay for you. Our team knows every property in Surkhet.",
    buttons: {
      primary: { label: "Request Assistance", href: "/contact" },
      secondary: { label: "Estimate Trip Cost", href: "/trip-cost" },
    },
  },

  newsletter: {
    heading: "Get Exclusive Deals",
    description:
      "New hotel listings, seasonal offers, and travel tips delivered to your inbox.",
  },
} as const;

// ---------------------------------------------------------------------------
// TOURISM ROADMAP
// ---------------------------------------------------------------------------

export const roadmapCopy = {
  metadata: {
    title: "Tourism Roadmap — Surkhet Platform Vision",
    description:
      "From Surkhet discovery to a national tourism platform. See our development roadmap, milestones, and vision for Nepal tourism.",
    ogTitle: "Tourism Roadmap — Surkhet Platform Vision",
    ogDescription:
      "Our development roadmap, milestones, and vision for Nepal tourism.",
  },

  hero: {
    badge: "Platform Roadmap",
    title: "Surkhet to",
    highlight: "Nepal",
    subtitle:
      "Our vision — from a single city to a national tourism platform. See what's built, what's in progress, and where we're headed.",
  },

  stats: [
    { value: "5", label: "Development Phases" },
    { value: "30+", label: "Planned Features" },
    { value: "7", label: "Provinces to Cover" },
    { value: "2026", label: "National Launch Target" },
  ],

  cta: {
    heading: "Build Nepal's Tourism Future With Us",
    description:
      "Whether you're a hotel owner, travel guide, or tourism enthusiast — join us in building the platform that Surkhet and Nepal deserve.",
    buttons: {
      primary: { label: "Become a Partner", href: "/partner" },
      secondary: { label: "Get In Touch", href: "/contact" },
    },
  },
} as const;

// ---------------------------------------------------------------------------
// B2B CONSULTING
// ---------------------------------------------------------------------------

export const consultingCopy = {
  metadata: {
    title: "B2B Hospitality Consulting — Pahuna",
    description:
      "Registered hotel service consultants — hotel setup, operations, branding, revenue strategy, menu consulting, and staff training for hospitality businesses in Nepal.",
    ogTitle: "B2B Hospitality Consulting — Pahuna",
    ogDescription:
      "Hotel setup, operations, branding, revenue strategy, and staff training for hospitality businesses in Nepal.",
    keywords: [
      "hotel consulting Nepal",
      "hospitality consulting",
      "hotel setup Nepal",
      "restaurant consulting",
    ],
  },

  hero: {
    badge: "Registered Hotel Service Consultants",
    heading: "Grow Your Hospitality Business",
    description:
      "Expert consulting for hotels, cafés, restaurants, and tourism operators in Nepal. From setup to expansion — we build hospitality businesses that thrive.",
    ctaPrimary: "Book Free Consultation",
    ctaSecondary: "Call Now",
  },

  trustBadges: [
    {
      label: "Registered Consultancy",
      description: "Government-registered hotel service consulting firm",
    },
    {
      label: "Industry Experts",
      description: "Team with 4–5 star hotel operations experience",
    },
    {
      label: "Results-Driven",
      description: "We implement — not just recommend",
    },
  ],

  serveList: [
    "Hotels & Resorts",
    "Cafés & Coffee Shops",
    "Restaurants & Bars",
    "Tourism Operators",
    "Homestays & Lodges",
    "Hospitality Brands",
  ],

  services: {
    title: "Our Consulting Services",
    subtitle:
      "Seven specialized service lines covering every aspect of hospitality business growth.",
    moreServicesLabel: "More Services",
  },

  caseStudies: {
    title: "Case Studies",
    subtitle:
      "Real results from real businesses. See how we've helped Nepali hospitality brands grow.",
  },

  testimonials: {
    title: "What Our Clients Say",
    subtitle: "Trusted by hospitality businesses across Karnali Province.",
  },

  whyUs: {
    heading: "Why Businesses Choose Us",
    reasons: [
      {
        title: "Nepal-First Expertise",
        description:
          "We understand Nepali hospitality — licensing, guest behavior, local pricing, and market dynamics. No generic playbooks.",
      },
      {
        title: "Implementation, Not Just Advice",
        description:
          "We don't hand you a report and leave. Our team stays until every recommendation is implemented and working.",
      },
      {
        title: "Measurable Results",
        description:
          "We set clear KPIs upfront — occupancy, RevPAR, guest ratings, staff retention — and track them monthly.",
      },
      {
        title: "End-to-End Coverage",
        description:
          "From setup to training, branding to pricing — one partner for every aspect of your hospitality business.",
      },
      {
        title: "Technology-Forward",
        description:
          "We integrate PMS, channel managers, POS systems, and analytics — giving you a competitive edge in a traditional market.",
      },
    ],
  },

  discoveryCall: {
    heading: "Free Discovery Call",
    description:
      "30 minutes with a senior consultant. We'll review your challenges, identify quick wins, and outline a growth path — completely free.",
    ctaPrimary: "Book Your Free Call",
    ctaSecondary: "Call Now",
    socialProof:
      '"The best consulting investment we ever made" — 92% of our clients',
  },

  inquiryForm: {
    badge: "Consulting Inquiry",
    heading: "Tell Us About Your Business",
    description:
      "Fill in the details below and our consulting team will respond within 24 hours with a tailored plan.",
  },
} as const;

// ---------------------------------------------------------------------------
// TRAINING ACADEMY
// ---------------------------------------------------------------------------

export const trainingCopy = {
  metadata: {
    title:
      "Training Academy — Professional Hospitality Courses | Pahuna",
    description:
      "Launch your hospitality career with professional training in barista arts, hotel management, front office, housekeeping, and service excellence. 500+ graduates, 92% placement rate.",
    ogTitle: "Training Academy — Professional Hospitality Courses",
    ogDescription:
      "500+ graduates, 92% placement rate. Professional hospitality training in Surkhet.",
    keywords: [
      "hospitality training Nepal",
      "barista training Surkhet",
      "hotel management course",
      "hospitality career Nepal",
    ],
  },

  hero: {
    badge: "Pahuna Training Academy",
    heading: "Launch Your Hospitality Career",
    description:
      "Professional courses in barista arts, hotel management, front office, housekeeping, and service excellence — designed for Nepal's growing tourism industry. Train in Surkhet, work anywhere.",
    ctaPrimary: "View Courses",
    ctaSecondary: "Enroll Now",
  },

  trustBadges: [
    {
      label: "Certified Programs",
      description:
        "Industry-recognized certificates accepted by hotels across Nepal",
    },
    {
      label: "92% Placement",
      description:
        "Our graduates get hired — backed by 25+ industry partners",
    },
    {
      label: "Hands-On Training",
      description: "Real equipment, real scenarios, supervised internships",
    },
  ],

  whyTrainWithUs: {
    title: "Why Train With Us?",
    subtitle:
      "We don't just teach theory — we prepare you for the real world of hospitality.",
    reasons: [
      {
        title: "Industry-Certified Instructors",
        description:
          "Learn from professionals with 10+ years at top hotels in Nepal and abroad.",
      },
      {
        title: "Job Placement Assistance",
        description:
          "92% of our graduates get placed within 3 months through our 25+ partner hotels.",
      },
      {
        title: "Hands-On Practical Training",
        description:
          "Real equipment, real scenarios, and supervised internships — not just classroom lectures.",
      },
      {
        title: "Recognized Certificates",
        description:
          "Our certificates are accepted by hotel chains and hospitality businesses across Nepal.",
      },
      {
        title: "Small Batch Sizes",
        description:
          "15–25 students per batch ensures personalized attention and better learning outcomes.",
      },
      {
        title: "Affordable & Flexible",
        description:
          "Competitive fees with installment options. Morning and afternoon batches for working students.",
      },
    ],
  },

  featuredPrograms: {
    title: "Featured Programs",
    subtitle:
      "Our most popular courses — designed for career starters and working professionals.",
  },

  morePrograms: {
    title: "More Programs",
    subtitle: "Specialized courses for every area of hospitality.",
  },

  enrollment: {
    title: "How Enrollment Works",
    subtitle:
      "From application to graduation — a clear, simple process.",
    quickFacts: {
      heading: "Quick Facts",
      items: [
        ["Courses Available", "8 programs"],
        ["Batch Sizes", "15 – 25 students"],
        ["Duration", "2 weeks – 3 months"],
        ["Fees", "NPR 12,000 – 65,000"],
        ["Location", "Birendranagar, Surkhet"],
        ["Payment", "Installments available"],
        ["Certificate", "Industry-recognized"],
        ["Placement", "92% within 3 months"],
      ] as [string, string][],
    },
  },

  studentStories: {
    title: "Student Success Stories",
    subtitle:
      "Hear from graduates who launched their careers through our programs.",
  },

  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Common questions about our training programs.",
  },

  enrollForm: {
    title: "Enroll in a Course",
    subtitle:
      "Fill out the form below and our team will contact you within 24 hours with next steps and payment details.",
  },
} as const;

// ---------------------------------------------------------------------------
// ABOUT
// ---------------------------------------------------------------------------

export const aboutCopy = {
  metadata: {
    title: "About Us — Pahuna",
    description:
      "Learn about Pahuna — our mission to put Surkhet and the Karnali region on the global tourism map.",
    ogTitle: "About Pahuna",
    ogDescription:
      "Our mission to put Surkhet and the Karnali region on the global tourism map.",
  },

  hero: {
    badge: "Our Story",
    heading: "Putting Surkhet on the Map",
    description:
      "Pahuna is more than a booking platform. We're building the tourism ecosystem for Karnali Province — one hotel listing, one training course, and one unforgettable experience at a time.",
  },

  mission: {
    heading: "Our Mission",
    description:
      "To make Surkhet the hospitality hub of mid-western Nepal by providing world-class digital tools, training, and consulting to local tourism businesses — while giving travelers a curated, trustworthy platform to discover the region.",
  },

  vision: {
    heading: "Our Vision",
    description:
      "A future where every traveler to Nepal knows Surkhet as a must-visit destination, every hotel in the region operates at international standards, and every young Nepali has access to quality hospitality training — right here in Karnali.",
  },

  values: {
    title: "What We Stand For",
    subtitle:
      "Our core values guide everything we build and every partnership we form.",
    items: [
      {
        title: "Surkhet-First",
        description:
          "Everything we build starts with our home city. We believe Surkhet deserves world-class tourism infrastructure.",
      },
      {
        title: "Authentic Hospitality",
        description:
          "We promote genuine Nepali warmth, culture, and cuisine — not a diluted version for tourists.",
      },
      {
        title: "Community Impact",
        description:
          "We empower local businesses, create jobs, and invest in training that elevates the entire hospitality ecosystem.",
      },
      {
        title: "Quality Standards",
        description:
          "Every hotel we list, every course we offer, and every experience we curate meets our rigorous quality bar.",
      },
    ],
  },

  journey: {
    title: "Our Journey",
    subtitle:
      "From idea to platform — building the future of Surkhet tourism.",
    milestones: [
      {
        year: "2024",
        event: "Idea conceived — Surkhet needs a tourism platform",
      },
      {
        year: "2025",
        event:
          "Platform development begins with hotel listings and tourism content",
      },
      {
        year: "2026",
        event:
          "Training Academy launched, first B2B consulting clients onboarded",
      },
      {
        year: "2027",
        event:
          "Expansion to other Karnali cities planned — Jumla, Dailekh, Kalikot",
      },
    ],
  },

  contact: {
    heading: "Get in Touch",
    description:
      "Have questions or want to collaborate? We'd love to hear from you.",
  },
} as const;

// ---------------------------------------------------------------------------
// CONTACT
// ---------------------------------------------------------------------------

export const contactCopy = {
  metadata: {
    title: "Contact Us — Pahuna",
    description:
      "Get in touch with the Pahuna team — inquiries, partnerships, feedback, or just to say hello.",
    ogTitle: "Contact Pahuna",
    ogDescription:
      "Get in touch — inquiries, partnerships, feedback, or just to say hello.",
  },

  hero: {
    heading: "Contact Us",
    description:
      "Have a question, feedback, or business inquiry? We'd love to hear from you. Fill out the form below or reach us directly.",
  },

  contactCards: {
    visit: { title: "Visit Us" },
    call: { title: "Call Us" },
    email: { title: "Email Us" },
    hours: {
      title: "Office Hours",
      description: "Sun – Fri: 9:00 AM – 6:00 PM (Nepal Time)",
    },
  },

  form: {
    title: "Send Us a Message",
    subtitle: "We typically respond within 24 hours.",
  },

  map: {
    placeholder: "Map Integration",
    description:
      "Google Maps embed will be added here with Surkhet location",
  },
} as const;

// ---------------------------------------------------------------------------
// PARTNER WITH US
// ---------------------------------------------------------------------------

export const partnerCopy = {
  metadata: {
    title: "Partner With Us — Pahuna",
    description:
      "Join our partner network — list your hotel, resort, restaurant, or travel business on Pahuna and grow together.",
    ogTitle: "Partner With Us — Pahuna",
    ogDescription:
      "List your hotel, resort, or travel business on Pahuna and grow together.",
  },

  hero: {
    badge: "Partner Network",
    heading: "Grow Together With Us",
    description:
      "Join Pahuna's partner network and connect with travelers exploring Nepal's Karnali region. Whether you run a hotel, restaurant, or travel agency — there's a place for you.",
    cta: "Apply Now",
  },

  partnerTypes: {
    title: "Who Can Partner?",
    subtitle:
      "We welcome all hospitality and tourism businesses in the region.",
    types: [
      {
        title: "Hotels & Resorts",
        description:
          "Get listed, boost bookings, and access our guest network.",
      },
      {
        title: "Restaurants & Cafés",
        description:
          "Feature your dining experience to tourists visiting Surkhet.",
      },
      {
        title: "Travel Agencies",
        description:
          "Collaborate on curated tour packages and itineraries.",
      },
      {
        title: "Transport Providers",
        description:
          "Offer reliable transportation to our platform's guests.",
      },
    ],
  },

  benefits: {
    title: "Partner Benefits",
    subtitle: "Here's what you get when you join our network.",
    items: [
      "Free listing on our platform with dedicated business profile",
      "Access to qualified leads and booking inquiries",
      "Co-marketing opportunities and social media features",
      "Consulting support for branding and operations",
      "Training discounts for your staff through our academy",
      "Priority placement for verified and featured partners",
    ],
  },

  form: {
    title: "Apply to Become a Partner",
    subtitle:
      "Fill out the form below and our team will review your application within 48 hours.",
  },
} as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faqCopy = {
  metadata: {
    title: "Frequently Asked Questions — Pahuna",
    description:
      "Common questions about visiting Surkhet, booking hotels, training programs, and partnering with us.",
    ogTitle: "FAQ — Pahuna",
    ogDescription:
      "Common questions about visiting Surkhet, booking hotels, training programs, and partnering with us.",
  },

  hero: {
    badge: "FAQ",
    heading: "Frequently Asked Questions",
    description:
      "Find answers to common questions about Surkhet, our services, bookings, and partnerships.",
  },

  fallback:
    "Can't find what you're looking for? <a href=\"/contact\" class=\"text-primary font-semibold hover:underline underline-offset-4\">Contact us</a> and we'll be happy to help.",
} as const;
