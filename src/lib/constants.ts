// =============================================================================
// Site-wide constants for Pahuna — Karnali's Premier Tourism Platform
// =============================================================================

export const SITE_CONFIG = {
  name: "Pahuna",
  tagline: "Karnali Awaits",
  description:
    "Pahuna — Nepal's first integrated tourism platform for Karnali Province. Premium stays, authentic experiences, B2B consulting & hospitality training.",
  url: "https://pahuna.com",
  email: "hello@pahuna.com",
  phone: "+977-083-520000",
  address: "Birendranagar, Surkhet, Karnali Province, Nepal",
  social: {
    facebook: "https://facebook.com/pahunaofficial",
    instagram: "https://instagram.com/pahuna.np",
    twitter: "https://x.com/pahuna_np",
    tiktok: "https://tiktok.com/@pahuna.np",
  },
} as const;

export const CURRENCY = "NPR";

export const PROPERTY_TYPES = [
  { value: "HOTEL", label: "Hotel" },
  { value: "RESORT", label: "Resort" },
  { value: "GUESTHOUSE", label: "Guesthouse" },
  { value: "HOMESTAY", label: "Homestay" },
  { value: "LODGE", label: "Lodge" },
  { value: "HOSTEL", label: "Hostel" },
  { value: "APARTMENT", label: "Apartment" },
  { value: "BOUTIQUE", label: "Boutique" },
] as const;

export const EXPERIENCE_CATEGORIES = [
  { value: "ADVENTURE", label: "Adventure", icon: "Mountain" },
  { value: "CULTURE", label: "Culture", icon: "Landmark" },
  { value: "NATURE", label: "Nature", icon: "TreePine" },
  { value: "FOOD", label: "Food & Dining", icon: "UtensilsCrossed" },
  { value: "WELLNESS", label: "Wellness", icon: "Heart" },
  { value: "RELIGIOUS", label: "Religious & Spiritual", icon: "Church" },
  { value: "SHOPPING", label: "Shopping", icon: "ShoppingBag" },
  { value: "NIGHTLIFE", label: "Nightlife", icon: "Moon" },
  { value: "HERITAGE", label: "Heritage", icon: "Castle" },
  { value: "EVENTS", label: "Events & Festivals", icon: "PartyPopper" },
] as const;

export const TRAINING_CATEGORIES = [
  "Barista Training",
  "Hotel Management",
  "Hospitality Service",
  "Food & Beverage",
  "Front Desk Operations",
  "Housekeeping Excellence",
] as const;

export const CONSULTING_SERVICES = [
  "Hotel Setup & Launch",
  "Operations Consulting",
  "Menu & Barista Consulting",
  "Branding & Digital Presence",
  "Revenue & Pricing Strategy",
  "Expansion Consulting",
  "Training & Staff Development",
] as const;

export const BUSINESS_TYPES = [
  { value: "hotel", label: "Hotel / Resort" },
  { value: "cafe", label: "Café / Coffee Shop" },
  { value: "restaurant", label: "Restaurant / Bar" },
  { value: "tourism_operator", label: "Tourism Operator" },
  { value: "homestay", label: "Homestay / Lodge" },
  { value: "brand", label: "Hospitality Brand" },
] as const;

export const BUSINESS_STAGES = [
  { value: "idea", label: "Idea / Planning Phase" },
  { value: "startup", label: "Startup (< 1 year)" },
  { value: "operating", label: "Operating (1-5 years)" },
  { value: "scaling", label: "Scaling (5+ years)" },
] as const;

export const PROJECT_TIMELINES = [
  { value: "urgent", label: "Urgent (< 1 month)" },
  { value: "1-3 months", label: "1 – 3 Months" },
  { value: "3-6 months", label: "3 – 6 Months" },
  { value: "flexible", label: "Flexible / Ongoing" },
] as const;

export const STAR_RATINGS = [1, 2, 3, 4, 5] as const;

export const PRICE_RANGES = [
  { label: "Budget (Under NPR 2,000)", min: 0, max: 2000 },
  { label: "Mid-Range (NPR 2,000 - 5,000)", min: 2000, max: 5000 },
  { label: "Premium (NPR 5,000 - 10,000)", min: 5000, max: 10000 },
  { label: "Luxury (Above NPR 10,000)", min: 10000, max: 999999 },
] as const;
