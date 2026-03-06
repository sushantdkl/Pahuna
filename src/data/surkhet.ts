// =============================================================================
// Demo / seed data for Surkhet — realistic content for phase 1
// =============================================================================

export const surkhetCity = {
  name: "Surkhet",
  slug: "surkhet",
  tagline: "Gateway to Karnali",
  description:
    "Surkhet, the provincial capital of Karnali Province, is a vibrant valley town surrounded by lush hills, ancient temples, and untouched natural beauty. Located in mid-western Nepal, Birendranagar serves as the administrative hub and a key transit point for travelers heading deeper into the Karnali region. With its pleasant climate, growing hospitality scene, and rich cultural heritage, Surkhet is emerging as a must-visit destination for those seeking authentic Nepali experiences beyond the usual tourist trails.",
  coverImage: "/images/surkhet-valley.jpg",
  latitude: 28.6,
  longitude: 81.6167,
};

export const demoHotels = [
  {
    name: "Hotel Karnali Star",
    slug: "hotel-karnali-star",
    shortDesc:
      "Premium hotel in the heart of Birendranagar with modern amenities and rooftop dining.",
    description:
      "Hotel Karnali Star is a premier accommodation in Birendranagar, offering comfortable rooms, conference facilities, and an in-house restaurant serving both Nepali and continental cuisine. Ideal for business travelers and tourists alike, the hotel features 24/7 room service, free WiFi, and a rooftop terrace with panoramic valley views.",
    propertyType: "HOTEL" as const,
    address: "Main Road, Birendranagar-4, Surkhet",
    phone: "+977-083-521234",
    email: "info@karnalistar.com",
    priceMin: 3500,
    priceMax: 8000,
    starRating: 4,
    isVerified: true,
    isFeatured: true,
    amenities: [
      "WiFi",
      "Parking",
      "Restaurant",
      "Room Service",
      "AC",
      "Hot Water",
      "Conference Hall",
      "Laundry",
    ],
    images: [
      "/images/hotels/karnali-star-1.jpg",
      "/images/hotels/karnali-star-2.jpg",
    ],
  },
  {
    name: "Surkhet Homestay Paradise",
    slug: "surkhet-homestay-paradise",
    shortDesc:
      "Authentic Nepali homestay experience with home-cooked meals and cultural immersion.",
    description:
      "Experience genuine Nepali hospitality in this family-run homestay. Located on the outskirts of Birendranagar, enjoy home-cooked dal bhat, organic garden produce, and stunning hill views. Perfect for travelers seeking cultural immersion and a peaceful retreat from the city.",
    propertyType: "HOMESTAY" as const,
    address: "Latikoili-2, Surkhet",
    phone: "+977-083-525678",
    email: "homestay@surkhet.com",
    priceMin: 1200,
    priceMax: 2500,
    starRating: 3,
    isVerified: true,
    isFeatured: true,
    amenities: [
      "WiFi",
      "Parking",
      "Home-cooked Meals",
      "Garden",
      "Hot Water",
      "Cultural Activities",
    ],
    images: [
      "/images/hotels/homestay-1.jpg",
      "/images/hotels/homestay-2.jpg",
    ],
  },
  {
    name: "Hotel Green Valley",
    slug: "hotel-green-valley",
    shortDesc:
      "Budget-friendly hotel with clean rooms and excellent location near the bus park.",
    description:
      "Hotel Green Valley offers affordable accommodation with clean, comfortable rooms near Birendranagar's main bus park. Perfect for transit travelers and budget-conscious visitors. The hotel features an attached restaurant, travel desk, and free parking.",
    propertyType: "HOTEL" as const,
    address: "Bus Park Road, Birendranagar-6, Surkhet",
    phone: "+977-083-522345",
    email: "greenvalley@surkhet.com",
    priceMin: 1500,
    priceMax: 4000,
    starRating: 2,
    isVerified: true,
    isFeatured: false,
    amenities: [
      "WiFi",
      "Parking",
      "Restaurant",
      "Travel Desk",
      "Hot Water",
      "TV",
    ],
    images: [
      "/images/hotels/green-valley-1.jpg",
      "/images/hotels/green-valley-2.jpg",
    ],
  },
  {
    name: "Karnali Boutique Resort",
    slug: "karnali-boutique-resort",
    shortDesc:
      "Luxury boutique resort with spa, pool, and curated Karnali-inspired design.",
    description:
      "The Karnali Boutique Resort is Surkhet's most upscale property, featuring elegantly designed rooms inspired by Karnali's cultural heritage. Enjoy a swimming pool, in-house spa, fine dining, and guided tours. The resort is set against a backdrop of forested hills, offering serenity and luxury in equal measure.",
    propertyType: "RESORT" as const,
    address: "Mangalgadhi Road, Birendranagar, Surkhet",
    phone: "+977-083-528888",
    email: "reservations@karnaliresort.com",
    priceMin: 8000,
    priceMax: 25000,
    starRating: 5,
    isVerified: true,
    isFeatured: true,
    amenities: [
      "WiFi",
      "Parking",
      "Restaurant",
      "Swimming Pool",
      "Spa",
      "AC",
      "Room Service",
      "Bar",
      "Garden",
      "Gym",
      "Conference Hall",
    ],
    images: [
      "/images/hotels/karnali-resort-1.jpg",
      "/images/hotels/karnali-resort-2.jpg",
    ],
  },
  {
    name: "Birendranagar Lodge",
    slug: "birendranagar-lodge",
    shortDesc:
      "Simple, clean lodge ideal for trekkers and transit travelers at an unbeatable price.",
    description:
      "Birendranagar Lodge offers no-frills accommodation for travelers on the move. Clean rooms, hot showers, and a central location make it a practical choice. The attached café serves breakfast and light snacks.",
    propertyType: "LODGE" as const,
    address: "Mangalsen Road, Birendranagar-3, Surkhet",
    phone: "+977-083-524567",
    email: "lodge@birendranagar.com",
    priceMin: 800,
    priceMax: 1800,
    starRating: 1,
    isVerified: false,
    isFeatured: false,
    amenities: ["WiFi", "Hot Water", "Café", "Parking"],
    images: [
      "/images/hotels/lodge-1.jpg",
      "/images/hotels/lodge-2.jpg",
    ],
  },
  {
    name: "Hotel Himalayan View",
    slug: "hotel-himalayan-view",
    shortDesc:
      "Mid-range hotel offering mountain views, a family restaurant, and warm Nepali hospitality.",
    description:
      "Hotel Himalayan View sits on an elevated plot in Birendranagar, offering stunning views of the surrounding hills. With spacious rooms, a multi-cuisine restaurant, event hall, and attentive service, it's a favorite among domestic travelers and small conferences.",
    propertyType: "HOTEL" as const,
    address: "Itram Road, Birendranagar-5, Surkhet",
    phone: "+977-083-526789",
    email: "info@himalayanview.com",
    priceMin: 2500,
    priceMax: 6000,
    starRating: 3,
    isVerified: true,
    isFeatured: true,
    amenities: [
      "WiFi",
      "Parking",
      "Restaurant",
      "Event Hall",
      "Room Service",
      "AC",
      "Hot Water",
      "TV",
      "Generator Backup",
    ],
    images: [
      "/images/hotels/himalayan-view-1.jpg",
      "/images/hotels/himalayan-view-2.jpg",
    ],
  },
];

export const demoDestinations = [
  {
    name: "Bulbule Tal (Bulbule Lake)",
    slug: "bulbule-tal",
    shortDesc:
      "A serene lake surrounded by hills, perfect for morning walks and picnics.",
    description:
      "Bulbule Tal is a picturesque lake located on the outskirts of Birendranagar. Surrounded by lush green hills, it is a popular spot for locals and visitors alike. The lake area features walking trails, benches, and a peaceful atmosphere ideal for photography and relaxation. Boating facilities are available during certain seasons.",
    coverImage: "/images/destinations/bulbule-tal.jpg",
    bestSeason: "October – March",
    entryFee: "Free",
    latitude: 28.597,
    longitude: 81.63,
    isFeatured: true,
  },
  {
    name: "Deuti Bajai Temple",
    slug: "deuti-bajai-temple",
    shortDesc:
      "An ancient Hindu temple dedicated to the local goddess, rich in cultural significance.",
    description:
      "Deuti Bajai Temple is one of the most revered religious sites in Surkhet. Perched on a hilltop, the temple offers panoramic views of the valley and is especially vibrant during the Dashain and Tihar festivals. The trek to the temple is a short but rewarding experience through forested paths.",
    coverImage: "/images/destinations/deuti-bajai.jpg",
    bestSeason: "Year-round",
    entryFee: "Free",
    latitude: 28.607,
    longitude: 81.622,
    isFeatured: true,
  },
  {
    name: "Kakre Bihar",
    slug: "kakre-bihar",
    shortDesc:
      "Ancient Buddhist monastery ruins dating back to the Licchavi period.",
    description:
      "Kakre Bihar is an archaeological site of immense historical importance, featuring ruins of a Buddhist monastery believed to date from the Licchavi era (4th–9th century). Located about 6 km from Birendranagar, the site includes stone inscriptions, carved pillars, and remnants of stupas. It is a protected heritage site and a fascinating destination for history enthusiasts.",
    coverImage: "/images/destinations/kakre-bihar.jpg",
    bestSeason: "October – April",
    entryFee: "NPR 50",
    latitude: 28.585,
    longitude: 81.648,
    isFeatured: true,
  },
  {
    name: "Kankre Bihar Cave",
    slug: "kankre-bihar-cave",
    shortDesc:
      "Natural limestone caves with historical significance and adventure appeal.",
    description:
      "Located near the Kakre Bihar ruins, these natural caves are believed to have been used by Buddhist monks for meditation centuries ago. The caves offer an adventurous experience with narrow passages and chambers that open into larger spaces. Guided tours are recommended.",
    coverImage: "/images/destinations/kankre-cave.jpg",
    bestSeason: "November – March",
    entryFee: "NPR 30",
    latitude: 28.584,
    longitude: 81.649,
    isFeatured: false,
  },
  {
    name: "Surkhet Valley Viewpoint",
    slug: "surkhet-valley-viewpoint",
    shortDesc:
      "Panoramic viewpoint overlooking the entire Surkhet valley and surrounding hills.",
    description:
      "This popular viewpoint on the northern rim of the Surkhet valley offers breathtaking 360-degree views. Especially stunning at sunrise and sunset, it's a favorite spot for photographers and nature lovers. The short hike from the road makes it accessible for most visitors.",
    coverImage: "/images/destinations/valley-viewpoint.jpg",
    bestSeason: "October – March",
    entryFee: "Free",
    latitude: 28.615,
    longitude: 81.61,
    isFeatured: true,
  },
];

export const demoExperiences = [
  {
    title: "Sunrise Hike to Deuti Bajai",
    slug: "sunrise-hike-deuti-bajai",
    shortDesc:
      "Start your day with a sunrise trek to the hilltop temple for breathtaking valley views.",
    description:
      "Join an early morning guided hike to Deuti Bajai Temple. Watch the sun rise over the Surkhet valley, visit the sacred temple, and descend through local villages. Includes tea and light breakfast. Suitable for all fitness levels.",
    category: "ADVENTURE" as const,
    duration: "3 hours",
    difficulty: "Easy",
    priceRange: "NPR 500 - 1,000",
    bestSeason: "October – March",
    coverImage: "/images/experiences/sunrise-hike.jpg",
    isFeatured: true,
  },
  {
    title: "Traditional Tharu Cultural Evening",
    slug: "tharu-cultural-evening",
    shortDesc:
      "Experience Tharu dance, music, and traditional cuisine in an authentic village setting.",
    description:
      "Immerse yourself in the rich culture of the Tharu community with a curated cultural evening. Enjoy traditional dances, musical performances, and a feast of authentic Tharu dishes prepared with local ingredients.",
    category: "CULTURE" as const,
    duration: "4 hours",
    difficulty: "Easy",
    priceRange: "NPR 1,500 - 2,500",
    bestSeason: "Year-round",
    coverImage: "/images/experiences/tharu-culture.jpg",
    isFeatured: true,
  },
  {
    title: "Bulbule Lake Birdwatching",
    slug: "bulbule-lake-birdwatching",
    shortDesc:
      "Spot migratory and local bird species at Surkhet's tranquil lake.",
    description:
      "Bulbule Tal is home to diverse bird species, especially during winter migration. This guided birdwatching walk covers the lake perimeter and surrounding wetlands. Binoculars and field guides provided.",
    category: "NATURE" as const,
    duration: "2.5 hours",
    difficulty: "Easy",
    priceRange: "NPR 800 - 1,200",
    bestSeason: "November – February",
    coverImage: "/images/experiences/birdwatching.jpg",
    isFeatured: true,
  },
  {
    title: "Surkhet Food Trail",
    slug: "surkhet-food-trail",
    shortDesc:
      "Taste the flavors of Surkhet — from street momos to traditional dal bhat thali.",
    description:
      "A guided food walk through Birendranagar's best eateries. Sample local specialties including sel roti, gundruk, dhido, and freshly prepared momos. Learn about Karnali cuisine and cooking traditions.",
    category: "FOOD" as const,
    duration: "3 hours",
    difficulty: "Easy",
    priceRange: "NPR 1,000 - 2,000",
    bestSeason: "Year-round",
    coverImage: "/images/experiences/food-trail.jpg",
    isFeatured: true,
  },
  {
    title: "Kakre Bihar Heritage Walk",
    slug: "kakre-bihar-heritage-walk",
    shortDesc:
      "Explore ancient Buddhist ruins with an expert guide and learn Surkhet's deep history.",
    description:
      "Walk through the ancient ruins of Kakre Bihar, a Licchavi-era Buddhist monastery. An expert guide explains the archaeological significance, historical context, and ongoing preservation efforts. Includes transport from Birendranagar.",
    category: "HERITAGE" as const,
    duration: "Half day",
    difficulty: "Easy",
    priceRange: "NPR 500 - 1,500",
    bestSeason: "October – April",
    coverImage: "/images/experiences/kakre-bihar-walk.jpg",
    isFeatured: false,
  },
];

export const demoItineraries = [
  {
    title: "Surkhet Essentials — 3 Days",
    slug: "surkhet-essentials-3-days",
    shortDesc:
      "The perfect introduction to Surkhet covering temples, lakes, heritage sites, and local cuisine.",
    description:
      "This 3-day itinerary covers the must-see highlights of Surkhet and Birendranagar. From ancient temples and Buddhist ruins to lakeside walks and food trails, experience the best of this emerging Karnali gateway.",
    duration: "3 Days 2 Nights",
    totalDays: 3,
    difficulty: "Easy",
    estimatedCost: "NPR 8,000 - 15,000 per person",
    bestSeason: "October – March",
    groupSize: "2 - 8 people",
    coverImage: "/images/itineraries/surkhet-essentials.jpg",
    isFeatured: true,
    days: [
      {
        dayNumber: 1,
        title: "Arrival & City Exploration",
        description:
          "Arrive in Birendranagar. Check into your hotel and freshen up. Explore the local market, visit the Birendranagar Clock Tower, and enjoy lunch at a local restaurant. In the evening, take a stroll around Bulbule Lake and watch the sunset.",
        activities: [
          "Hotel check-in",
          "Birendranagar city walk",
          "Bulbule Lake sunset",
          "Local dinner",
        ],
        meals: "Lunch, Dinner",
        overnight: "Hotel in Birendranagar",
      },
      {
        dayNumber: 2,
        title: "Heritage & Culture Day",
        description:
          "Start early with a visit to Kakre Bihar archaeological site. Explore the ancient ruins and learn about the Licchavi-era history. Return for lunch and join a Surkhet Food Trail in the afternoon. Evening cultural program at your hotel.",
        activities: [
          "Kakre Bihar visit",
          "Archaeological exploration",
          "Surkhet Food Trail",
          "Cultural evening",
        ],
        meals: "Breakfast, Lunch, Dinner",
        overnight: "Hotel in Birendranagar",
      },
      {
        dayNumber: 3,
        title: "Temples & Departure",
        description:
          "Wake up early for a sunrise hike to Deuti Bajai Temple. Enjoy panoramic views of the valley. Return for breakfast, visit the local handicraft shops for souvenirs, and depart.",
        activities: [
          "Sunrise hike to Deuti Bajai",
          "Temple visit",
          "Souvenir shopping",
          "Departure",
        ],
        meals: "Breakfast",
        overnight: "N/A",
      },
    ],
  },
  {
    title: "Karnali Gateway — 5 Days",
    slug: "karnali-gateway-5-days",
    shortDesc:
      "Extended exploration of Surkhet and surrounding areas with deeper cultural and nature immersion.",
    description:
      "A 5-day journey that uses Surkhet as a base to explore the surrounding natural and cultural treasures of the Karnali region. Includes all Surkhet highlights plus excursions to nearby villages, forests, and lesser-known heritage sites.",
    duration: "5 Days 4 Nights",
    totalDays: 5,
    difficulty: "Moderate",
    estimatedCost: "NPR 15,000 - 30,000 per person",
    bestSeason: "October – April",
    groupSize: "2 - 6 people",
    coverImage: "/images/itineraries/karnali-gateway.jpg",
    isFeatured: true,
    days: [
      {
        dayNumber: 1,
        title: "Arrival in Surkhet",
        description:
          "Arrive via Nepalgunj or direct bus. Settle into your hotel. Evening orientation walk through Birendranagar.",
        activities: [
          "Airport/bus arrival",
          "Hotel check-in",
          "Orientation city walk",
          "Welcome dinner",
        ],
        meals: "Dinner",
        overnight: "Hotel in Birendranagar",
      },
      {
        dayNumber: 2,
        title: "Heritage Circuit",
        description:
          "Full day dedicated to Surkhet's historical sites. Visit Kakre Bihar, Kankre Bihar caves, and local museums.",
        activities: [
          "Kakre Bihar ruins",
          "Cave exploration",
          "Historical museum visit",
          "Traditional lunch",
        ],
        meals: "Breakfast, Lunch, Dinner",
        overnight: "Hotel in Birendranagar",
      },
      {
        dayNumber: 3,
        title: "Nature & Wildlife",
        description:
          "Morning birdwatching at Bulbule Lake. Afternoon nature walk through community forests. Evening bonfire and storytelling.",
        activities: [
          "Birdwatching at Bulbule Tal",
          "Community forest walk",
          "Nature photography",
          "Evening bonfire",
        ],
        meals: "Breakfast, Lunch, Dinner",
        overnight: "Homestay in Latikoili",
      },
      {
        dayNumber: 4,
        title: "Cultural Immersion",
        description:
          "Spend the day with a local Tharu family. Learn traditional cooking, weaving, and farming practices. Participate in a cultural dance evening.",
        activities: [
          "Traditional cooking class",
          "Village walk",
          "Handicraft workshop",
          "Tharu cultural evening",
        ],
        meals: "Breakfast, Lunch, Dinner",
        overnight: "Homestay",
      },
      {
        dayNumber: 5,
        title: "Valley Views & Departure",
        description:
          "Early morning hike to the Valley Viewpoint for sunrise. Breakfast and souvenir shopping. Transfer to bus/airport.",
        activities: [
          "Sunrise from Valley Viewpoint",
          "Souvenir shopping",
          "Farewell lunch",
          "Departure",
        ],
        meals: "Breakfast, Lunch",
        overnight: "N/A",
      },
    ],
  },
];

export const demoTrainingCourses = [
  {
    title: "Professional Barista Training",
    slug: "professional-barista-training",
    shortDesc:
      "Master the art of coffee — from bean to cup. SCAE-aligned curriculum.",
    description:
      "This intensive barista training program covers everything from coffee origins and roasting to espresso extraction, latte art, and café management. Students graduate ready to work in any professional café or start their own coffee venture.",
    category: "Barista Training",
    duration: "4 Weeks",
    fee: 25000,
    maxStudents: 15,
    instructor: "Certified SCAE trainer",
    prerequisites: "None — open to all above 18",
    schedule: "Mon - Fri, 10:00 AM - 1:00 PM",
    location: "Pahuna Training Center, Birendranagar",
    coverImage: "/images/training/barista.jpg",
  },
  {
    title: "Hotel Management Fundamentals",
    slug: "hotel-management-fundamentals",
    shortDesc:
      "Comprehensive 3-month program covering front desk, housekeeping, F&B, and guest relations.",
    description:
      "A foundational course in hotel management designed for aspiring hoteliers and current staff seeking professional development. Covers front desk operations, housekeeping standards, food & beverage service, guest relationship management, and basic revenue management.",
    category: "Hotel Management",
    duration: "3 Months",
    fee: 45000,
    maxStudents: 20,
    instructor: "Industry professionals with 10+ years experience",
    prerequisites: "SLC/SEE or equivalent",
    schedule: "Mon - Fri, 7:00 AM - 10:00 AM",
    location: "Pahuna Training Center, Birendranagar",
    coverImage: "/images/training/hotel-management.jpg",
  },
  {
    title: "Hospitality Service Excellence",
    slug: "hospitality-service-excellence",
    shortDesc:
      "Elevate your service skills — communication, grooming, problem-solving, and guest delight.",
    description:
      "This short course focuses on the soft skills that separate good service from excellent service. Learn professional communication, personal grooming, conflict resolution, upselling techniques, and the art of anticipating guest needs.",
    category: "Hospitality Service",
    duration: "2 Weeks",
    fee: 12000,
    maxStudents: 25,
    instructor: "Hospitality service trainer",
    prerequisites: "None",
    schedule: "Mon - Sat, 2:00 PM - 5:00 PM",
    location: "Pahuna Training Center, Birendranagar",
    coverImage: "/images/training/service-excellence.jpg",
  },
];

export const demoBlogPosts = [
  {
    title: "Why Surkhet Should Be Your Next Travel Destination",
    slug: "why-surkhet-next-destination",
    excerpt:
      "Forget Pokhara and Chitwan for a moment. Here's why Surkhet — the gateway to Karnali — deserves a spot on every traveler's Nepal itinerary.",
    content:
      "Surkhet may not be on most tourists' radar yet, but that's exactly what makes it special. This vibrant valley town in mid-western Nepal offers everything a discerning traveler seeks: ancient history, natural beauty, authentic culture, and genuine hospitality — all without the crowds. From the Licchavi-era ruins of Kakre Bihar to the serene waters of Bulbule Lake, Surkhet delivers experiences that feel both timeless and refreshingly undiscovered...",
    category: "Destination Guide",
    tags: ["Surkhet", "Karnali", "Hidden Gems", "Nepal Travel"],
    authorName: "Pahuna Team",
    isPublished: true,
    coverImage: "/images/blog/surkhet-destination.jpg",
  },
  {
    title: "10 Things to Do in Birendranagar",
    slug: "10-things-to-do-birendranagar",
    excerpt:
      "Your complete activity guide to Surkhet's capital — from heritage walks to food trails.",
    content:
      "Birendranagar, the bustling capital of Surkhet district and Karnali Province, has more to offer than meets the eye. Whether you're spending a day or a week, here are the top 10 things to experience in this welcoming town...",
    category: "Travel Tips",
    tags: ["Birendranagar", "Activities", "Things to Do", "City Guide"],
    authorName: "Pahuna Team",
    isPublished: true,
    coverImage: "/images/blog/birendranagar-guide.jpg",
  },
  {
    title: "A Complete Guide to Karnali Province for First-Time Visitors",
    slug: "karnali-province-guide",
    excerpt:
      "Everything you need to know before visiting Nepal's most remote and beautiful province.",
    content:
      "Karnali Province, Nepal's largest by area yet least visited, is a frontier of unspoiled nature, deep-rooted culture, and adventure. With Surkhet as the gateway, this guide covers transport, accommodation, must-see destinations, and practical tips for making the most of your Karnali journey...",
    category: "Destination Guide",
    tags: ["Karnali Province", "Travel Guide", "Nepal", "First Time Visitors"],
    authorName: "Pahuna Team",
    isPublished: true,
    coverImage: "/images/blog/karnali-guide.jpg",
  },
];

export const tripCostCategories = [
  {
    category: "Accommodation",
    items: [
      { name: "Budget Lodge / Hostel", pricePerDay: "NPR 800 - 1,500" },
      { name: "Mid-range Hotel", pricePerDay: "NPR 2,500 - 5,000" },
      { name: "Premium Hotel / Resort", pricePerDay: "NPR 5,000 - 15,000" },
      { name: "Homestay", pricePerDay: "NPR 1,200 - 2,500" },
    ],
  },
  {
    category: "Food & Dining",
    items: [
      { name: "Local dal bhat set", pricePerDay: "NPR 200 - 400" },
      { name: "Restaurant meal", pricePerDay: "NPR 400 - 1,000" },
      { name: "Street food / snacks", pricePerDay: "NPR 100 - 300" },
      { name: "Café / coffee", pricePerDay: "NPR 150 - 400" },
    ],
  },
  {
    category: "Transport",
    items: [
      {
        name: "Kathmandu → Surkhet (bus)",
        pricePerDay: "NPR 1,500 - 2,500 one way",
      },
      {
        name: "Nepalgunj → Surkhet (bus)",
        pricePerDay: "NPR 500 - 800 one way",
      },
      {
        name: "Kathmandu → Surkhet (flight via Nepalgunj)",
        pricePerDay: "NPR 8,000 - 15,000 one way",
      },
      { name: "Local taxi / auto", pricePerDay: "NPR 200 - 500 per ride" },
      { name: "Bike rental", pricePerDay: "NPR 500 - 1,000 per day" },
    ],
  },
  {
    category: "Activities & Experiences",
    items: [
      { name: "Guided heritage walk", pricePerDay: "NPR 500 - 1,500" },
      { name: "Cultural evening", pricePerDay: "NPR 1,500 - 2,500" },
      { name: "Birdwatching tour", pricePerDay: "NPR 800 - 1,200" },
      { name: "Food trail", pricePerDay: "NPR 1,000 - 2,000" },
    ],
  },
  {
    category: "Miscellaneous",
    items: [
      { name: "SIM card + data", pricePerDay: "NPR 500 - 1,000" },
      { name: "Souvenirs", pricePerDay: "NPR 500 - 2,000" },
      { name: "Tips and donations", pricePerDay: "NPR 200 - 500 per day" },
    ],
  },
];

export const demoTestimonials = [
  {
    name: "Rajesh Thapa",
    role: "Travel Blogger, Kathmandu",
    quote:
      "I expected a simple stopover, but Surkhet blew me away. The Kakre Bihar ruins alone are worth the trip. Pahuna made the entire experience seamless — from booking to cultural tours.",
    rating: 5,
    avatar: "/images/avatars/rajesh.jpg",
  },
  {
    name: "Sarah Mitchell",
    role: "Solo Traveler, Australia",
    quote:
      "Staying at a homestay in Latikoili was the highlight of my Nepal trip. The home-cooked meals, the valley views, and the warmth of the family — it felt like home. Surkhet is Nepal's best-kept secret.",
    rating: 5,
    avatar: "/images/avatars/sarah.jpg",
  },
  {
    name: "Deepak Bhandari",
    role: "Hotel Owner, Birendranagar",
    quote:
      "The consulting team helped us rebrand our property and boost our online presence. Our bookings are up 40% since partnering with Pahuna. They truly understand the local market.",
    rating: 5,
    avatar: "/images/avatars/deepak.jpg",
  },
  {
    name: "Anita Karki",
    role: "Barista Training Graduate",
    quote:
      "The barista training program changed my life. I went from zero coffee knowledge to running my own café in Birendranagar. The instructors were world-class and the curriculum was hands-on.",
    rating: 5,
    avatar: "/images/avatars/anita.jpg",
  },
];

export const faqItems = [
  {
    question: "How do I get to Surkhet?",
    answer:
      "You can reach Surkhet by bus from Kathmandu (approx 12-14 hours via Kohalpur), by bus from Nepalgunj (approx 3-4 hours), or by flying to Nepalgunj and taking a connecting bus. Direct flight services to Surkhet (Birendranagar Airport) are also available on select days.",
  },
  {
    question: "What is the best time to visit Surkhet?",
    answer:
      "October to March is the ideal time to visit Surkhet. The weather is pleasant with clear skies, making it perfect for sightseeing and outdoor activities. The monsoon season (June-September) brings heavy rainfall.",
  },
  {
    question: "Is Surkhet safe for tourists?",
    answer:
      "Yes, Surkhet is very safe for tourists. The local community is welcoming and hospitable. As with any travel, exercise normal precautions and respect local customs.",
  },
  {
    question: "Can I book hotels directly through this website?",
    answer:
      "Currently, we offer an inquiry-based booking system. Submit your stay request, and our team will confirm availability and help you book the best option. We're building a direct booking system for Phase 2.",
  },
  {
    question: "Do you offer group tour packages?",
    answer:
      "Yes! You can use our itineraries as a starting point and submit a custom trip inquiry. We'll tailor a group package based on your requirements, budget, and group size.",
  },
  {
    question: "What consulting services do you offer?",
    answer:
      "We provide B2B consulting for hotels and tourism businesses including branding, digital presence, pricing strategy, operations optimization, staff training, and expansion consulting. Visit our Consulting page for details.",
  },
  {
    question: "How do I enroll in a training course?",
    answer:
      "Visit our Training Academy page, choose a course, and fill out the enrollment form. Our team will contact you with next steps, payment details, and schedule confirmation.",
  },
  {
    question: "Can I partner my hotel or business with you?",
    answer:
      "Absolutely! We welcome hotel owners, resort operators, restaurants, travel agencies, and transport providers. Visit our Partner With Us page to submit your application.",
  },
];
