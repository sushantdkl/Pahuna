// =============================================================================
// Navigation structure
// =============================================================================

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    title: "Explore Surkhet",
    href: "/explore",
    description: "Discover the beauty of Surkhet",
  },
  {
    title: "Hotels & Stays",
    href: "/hotels",
    description: "Find your perfect stay in Surkhet",
  },
  {
    title: "Things to Do",
    href: "/experiences",
    description: "Activities and experiences",
  },
  {
    title: "Trip Ideas",
    href: "/itineraries",
    description: "Curated itineraries",
  },
  {
    title: "Trip Cost",
    href: "/trip-cost",
    description: "Estimate your trip budget",
  },
  {
    title: "Services",
    href: "#",
    children: [
      {
        title: "B2B Consulting",
        href: "/consulting",
        description: "Grow your hospitality business",
      },
      {
        title: "Training Academy",
        href: "/training",
        description: "Professional hospitality courses",
      },
      {
        title: "Partner With Us",
        href: "/partner",
        description: "Join our network",
      },
    ],
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Insights and destination guides",
  },
];

export const footerNavigation = {
  discover: [
    { title: "Explore Surkhet", href: "/explore" },
    { title: "Hotels & Stays", href: "/hotels" },
    { title: "Things to Do", href: "/experiences" },
    { title: "Trip Ideas", href: "/itineraries" },
    { title: "Estimate Trip Cost", href: "/trip-cost" },
    { title: "Blog & Guides", href: "/blog" },
  ],
  services: [
    { title: "B2B Consulting", href: "/consulting" },
    { title: "Training Academy", href: "/training" },
    { title: "Partner With Us", href: "/partner" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "FAQ", href: "/faq" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms & Conditions", href: "/terms" },
  ],
};
