// =============================================================================
// Training Academy Data — Courses, Instructors, FAQs, Career Outcomes
// Structured for the training listing page, detail pages, and enrollment forms.
// =============================================================================

// Icon names (resolved on the client side via iconMap in components)
export type TrainingIconName =
  | "Coffee"
  | "Hotel"
  | "ConciergeBell"
  | "SprayCan"
  | "HeartHandshake"
  | "Sparkles"
  | "GraduationCap"
  | "Users";

// ── Course Interfaces ──

export interface CourseModule {
  title: string;
  topics: string[];
}

export interface CourseInstructor {
  name: string;
  title: string;
  bio: string;
  experience: string;
  specialties: string[];
  image?: string;
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface CareerOutcome {
  role: string;
  salary: string;
  description: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  shortDesc: string;
  description: string;
  icon: TrainingIconName;
  color: string;
  category: string;

  // Details
  duration: string;
  fee: number;
  maxStudents: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  mode: "In-Person" | "Online" | "Hybrid";
  prerequisites: string;
  schedule: string;
  location: string;
  batchInfo: string;

  // Curriculum
  modules: CourseModule[];

  // Instructor
  instructor: CourseInstructor;

  // Certification & outcomes
  certification: string;
  careerOutcomes: CareerOutcome[];

  // FAQ
  faqs: CourseFAQ[];

  // Meta
  isFeatured: boolean;
  isUpcoming: boolean;
}

// ── Training Stats ──

export const trainingStats = [
  { label: "Graduates", value: "500+", suffix: "" },
  { label: "Job Placement Rate", value: "92", suffix: "%" },
  { label: "Course Programs", value: "6", suffix: "+" },
  { label: "Industry Partners", value: "25", suffix: "+" },
  { label: "Years of Training", value: "5", suffix: "+" },
  { label: "Student Satisfaction", value: "4.8", suffix: "/5" },
];

// ── Training Process Steps ──

export const enrollmentProcess = [
  {
    step: 1,
    title: "Choose Your Course",
    description:
      "Browse our programs and select the course that matches your career goals and schedule.",
    icon: "GraduationCap" as TrainingIconName,
  },
  {
    step: 2,
    title: "Submit Enrollment",
    description:
      "Fill out the enrollment form with your details. Our team reviews applications within 24 hours.",
    icon: "Users" as TrainingIconName,
  },
  {
    step: 3,
    title: "Confirm & Pay",
    description:
      "Receive your offer letter, confirm your seat, and complete payment (installment options available).",
    icon: "Sparkles" as TrainingIconName,
  },
  {
    step: 4,
    title: "Start Training",
    description:
      "Join your batch, receive course materials, and begin your hands-on training journey.",
    icon: "Coffee" as TrainingIconName,
  },
  {
    step: 5,
    title: "Graduate & Get Placed",
    description:
      "Complete the program, earn your certificate, and access our job placement network across Nepal.",
    icon: "GraduationCap" as TrainingIconName,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// TRAINING COURSES — 6 Programs
// ═══════════════════════════════════════════════════════════════════════════════

export const trainingCourses: TrainingCourse[] = [
  // ─── 1. Professional Barista Training ──────────────────────────────────────
  {
    id: "barista",
    title: "Professional Barista Training",
    slug: "professional-barista-training",
    tagline: "From bean to cup — master the art of coffee",
    shortDesc:
      "Master espresso extraction, latte art, brewing methods, and café management in this SCAE-aligned intensive program.",
    description:
      "This intensive barista training program covers everything from coffee origins and roasting to espresso extraction, latte art, and café management. Students graduate ready to work in any professional café or start their own coffee venture. Our curriculum follows SCAE (Specialty Coffee Association of Europe) standards adapted for the Nepali market.",
    icon: "Coffee",
    color: "amber",
    category: "Barista Training",

    duration: "4 Weeks",
    fee: 25000,
    maxStudents: 15,
    level: "Beginner",
    mode: "In-Person",
    prerequisites: "None — open to all above 18 years",
    schedule: "Mon — Fri, 10:00 AM – 1:00 PM",
    location: "Pahuna Training Center, Birendranagar",
    batchInfo: "Batch 6 — Starts February 2025",

    modules: [
      {
        title: "Coffee Fundamentals",
        topics: [
          "History and origins of coffee",
          "Coffee bean varieties (Arabica vs Robusta)",
          "Roasting profiles and their impact on flavor",
          "Coffee tasting and cupping techniques",
        ],
      },
      {
        title: "Espresso Mastery",
        topics: [
          "Espresso machine operation and maintenance",
          "Grind size, dose, and extraction timing",
          "Pulling the perfect shot — troubleshooting",
          "Milk steaming and texturing techniques",
        ],
      },
      {
        title: "Latte Art & Specialty Drinks",
        topics: [
          "Free-pour latte art (heart, rosetta, tulip)",
          "Popular specialty drinks and recipes",
          "Cold brew and iced coffee methods",
          "Seasonal and signature drink creation",
        ],
      },
      {
        title: "Café Operations",
        topics: [
          "Workflow and station management",
          "Menu design and pricing strategy",
          "Customer service excellence",
          "Hygiene, safety, and food handling",
        ],
      },
    ],

    instructor: {
      name: "Rajesh Shrestha",
      title: "Head Barista Trainer",
      bio: "Rajesh trained in specialty coffee in Kathmandu and Dubai before returning to Surkhet to build the region's first professional barista program.",
      experience: "8 years in specialty coffee",
      specialties: [
        "Espresso extraction",
        "Latte art",
        "Café startup consulting",
      ],
    },

    certification: "Pahuna Academy — Professional Barista Certificate",
    careerOutcomes: [
      {
        role: "Barista",
        salary: "NPR 18,000 – 30,000/month",
        description:
          "Work in cafés, restaurants, and hotels across Nepal and abroad.",
      },
      {
        role: "Head Barista / Shift Lead",
        salary: "NPR 25,000 – 40,000/month",
        description:
          "Lead a café team, manage quality standards, and train new baristas.",
      },
      {
        role: "Café Owner / Entrepreneur",
        salary: "Variable",
        description:
          "Start your own coffee shop with the skills and business knowledge gained.",
      },
    ],

    faqs: [
      {
        question: "Do I need any prior experience with coffee?",
        answer:
          "No — this course starts from the basics. Whether you're a complete beginner or a home coffee enthusiast, you'll benefit from the structured curriculum.",
      },
      {
        question: "What equipment will I train on?",
        answer:
          "We use commercial-grade espresso machines, professional grinders, and pour-over equipment — the same tools you'll find in top cafés.",
      },
      {
        question: "Will I get help finding a job after the course?",
        answer:
          "Yes! We have partnerships with 25+ cafés and hotels across Nepal. Our placement team actively connects graduates with employers.",
      },
      {
        question: "Can I pay in installments?",
        answer:
          "Yes — we offer a 2-installment plan: 60% at enrollment, 40% by the start of week 2.",
      },
    ],

    isFeatured: true,
    isUpcoming: true,
  },

  // ─── 2. Hotel Management Fundamentals ──────────────────────────────────────
  {
    id: "hotel-management",
    title: "Hotel Management Fundamentals",
    slug: "hotel-management-fundamentals",
    tagline: "Build a career in hotel operations",
    shortDesc:
      "Comprehensive 3-month program covering front desk, housekeeping, F&B, guest relations, and revenue basics.",
    description:
      "A foundational course in hotel management designed for aspiring hoteliers and current staff seeking professional development. Covers front desk operations, housekeeping standards, food & beverage service, guest relationship management, and basic revenue management. This is the most comprehensive hospitality program in Karnali Province.",
    icon: "Hotel",
    color: "blue",
    category: "Hotel Management",

    duration: "3 Months",
    fee: 45000,
    maxStudents: 20,
    level: "Beginner",
    mode: "In-Person",
    prerequisites: "SLC/SEE or equivalent",
    schedule: "Mon — Fri, 7:00 AM – 10:00 AM",
    location: "Pahuna Training Center, Birendranagar",
    batchInfo: "Batch 4 — Starts March 2025",

    modules: [
      {
        title: "Introduction to Hospitality",
        topics: [
          "History of hotels and tourism in Nepal",
          "Hotel classification and star ratings",
          "Hospitality industry career paths",
          "Tourism trends and Nepal's potential",
        ],
      },
      {
        title: "Front Desk & Reception",
        topics: [
          "Check-in and check-out procedures",
          "Reservation systems and OTA management",
          "Guest communication and phone etiquette",
          "Cash handling and billing basics",
        ],
      },
      {
        title: "Housekeeping & Maintenance",
        topics: [
          "Room cleaning standards and checklists",
          "Linen management and laundry operations",
          "Public area maintenance",
          "Lost & found procedures",
        ],
      },
      {
        title: "Food & Beverage Service",
        topics: [
          "Table setting and service styles",
          "Menu knowledge and upselling",
          "Banquet and event service",
          "Food safety fundamentals (DFTQC)",
        ],
      },
      {
        title: "Revenue & Guest Relations",
        topics: [
          "Basic revenue management concepts",
          "Pricing strategies for seasonal markets",
          "Guest feedback and complaint resolution",
          "Building repeat guests and loyalty",
        ],
      },
    ],

    instructor: {
      name: "Suman KC",
      title: "Hotel Management Director",
      bio: "Suman has managed 4-star hotels in Kathmandu and Pokhara for over 12 years before establishing the training program in Surkhet.",
      experience: "15 years in hotel management",
      specialties: [
        "Hotel operations",
        "Revenue management",
        "Staff development",
      ],
    },

    certification:
      "Pahuna Academy — Hotel Management Foundations Certificate",
    careerOutcomes: [
      {
        role: "Front Desk Agent",
        salary: "NPR 20,000 – 35,000/month",
        description:
          "Handle guest check-ins, reservations, and front office operations.",
      },
      {
        role: "Housekeeping Supervisor",
        salary: "NPR 18,000 – 30,000/month",
        description:
          "Oversee room readiness, cleaning schedules, and quality standards.",
      },
      {
        role: "F&B Service Staff",
        salary: "NPR 18,000 – 28,000/month",
        description:
          "Serve in restaurants, banquets, and room service operations.",
      },
      {
        role: "Guest Relations Executive",
        salary: "NPR 25,000 – 40,000/month",
        description:
          "Manage VIP guests, resolve complaints, and drive satisfaction.",
      },
    ],

    faqs: [
      {
        question: "Is this recognised by hotels outside Surkhet?",
        answer:
          "Yes — our certificate is recognized by hotel chains and properties across Nepal. Our graduates work in Kathmandu, Pokhara, Chitwan, and even internationally.",
      },
      {
        question: "Can working professionals join?",
        answer:
          "Yes — our morning schedule (7-10 AM) is designed so working professionals can attend before their shifts.",
      },
      {
        question: "Is there a practical component?",
        answer:
          "Absolutely. Each module includes hands-on sessions in our training hotel. The final month is a supervised internship at a partner property.",
      },
      {
        question: "What's included in the fee?",
        answer:
          "Course materials, uniform, certificate, internship placement, and job placement assistance. Meals and accommodation are not included.",
      },
    ],

    isFeatured: true,
    isUpcoming: true,
  },

  // ─── 3. Front Office & Reception ───────────────────────────────────────────
  {
    id: "front-office",
    title: "Front Office & Reception Mastery",
    slug: "front-office-reception",
    tagline: "Be the face of hospitality",
    shortDesc:
      "Specialized 6-week course in front desk operations, reservations, guest handling, and hotel software.",
    description:
      "The front desk is the nerve center of any hotel. This specialized course trains you to manage reservations, handle check-ins and check-outs, operate property management systems, and deliver exceptional first impressions. Includes real PMS software training and role-play scenarios.",
    icon: "ConciergeBell",
    color: "violet",
    category: "Front Desk Operations",

    duration: "6 Weeks",
    fee: 30000,
    maxStudents: 15,
    level: "Beginner",
    mode: "In-Person",
    prerequisites: "Basic English and computer skills",
    schedule: "Mon — Fri, 11:00 AM – 2:00 PM",
    location: "Pahuna Training Center, Birendranagar",
    batchInfo: "Batch 3 — Starts April 2025",

    modules: [
      {
        title: "Front Desk Fundamentals",
        topics: [
          "Role of the front desk in hotel operations",
          "Professional appearance and grooming standards",
          "Phone etiquette and call handling",
          "Guest registration procedures",
        ],
      },
      {
        title: "Reservations & OTA Management",
        topics: [
          "Handling direct bookings and walk-ins",
          "OTA platforms (Booking.com, Agoda, MakeMyTrip)",
          "Rate management and availability control",
          "Overbooking prevention strategies",
        ],
      },
      {
        title: "Property Management Systems",
        topics: [
          "Introduction to hotel PMS software",
          "Room assignment and status management",
          "Guest profiles and history tracking",
          "Night audit and daily reporting",
        ],
      },
      {
        title: "Guest Services & Upselling",
        topics: [
          "Handling VIP and special requests",
          "Upselling rooms and services",
          "Complaint handling and service recovery",
          "Local area knowledge and concierge skills",
        ],
      },
    ],

    instructor: {
      name: "Anita Bhandari",
      title: "Front Office Training Lead",
      bio: "Anita managed front offices at multiple properties in Pokhara and Lumbini before joining the academy to share her passion for guest service.",
      experience: "10 years in front office operations",
      specialties: [
        "Guest experience",
        "PMS systems",
        "Revenue management",
      ],
    },

    certification:
      "Pahuna Academy — Front Office Professional Certificate",
    careerOutcomes: [
      {
        role: "Receptionist",
        salary: "NPR 18,000 – 28,000/month",
        description:
          "Handle guest arrivals, departures, and all front desk tasks.",
      },
      {
        role: "Reservations Agent",
        salary: "NPR 20,000 – 32,000/month",
        description:
          "Manage bookings across direct channels and OTAs.",
      },
      {
        role: "Front Desk Supervisor",
        salary: "NPR 28,000 – 42,000/month",
        description:
          "Lead the front desk team and ensure smooth operations.",
      },
    ],

    faqs: [
      {
        question: "Do I need hotel experience to join?",
        answer:
          "No — this is a beginner-friendly course. We start from the basics and build up. Basic English and computer proficiency are the only requirements.",
      },
      {
        question: "Which PMS software will I learn?",
        answer:
          "We train on ezee Frontdesk and Cloudbeds — two of the most popular systems used by hotels in Nepal and South Asia.",
      },
      {
        question: "Is there a practical internship?",
        answer:
          "Yes — the final 2 weeks include a supervised internship at a partner hotel where you'll work actual front desk shifts.",
      },
    ],

    isFeatured: true,
    isUpcoming: true,
  },

  // ─── 4. Housekeeping & Service Standards ───────────────────────────────────
  {
    id: "housekeeping",
    title: "Housekeeping & Service Standards",
    slug: "housekeeping-service-standards",
    tagline: "The backbone of guest satisfaction",
    shortDesc:
      "Learn room preparation, cleaning protocols, laundry operations, and quality inspections to hotel standards.",
    description:
      "Great housekeeping is invisible — when done right, guests simply feel at home. This course covers room cleaning to international standards, linen management, public area maintenance, minibar operations, and quality inspection techniques. You'll graduate knowing how to maintain any property from budget inn to 5-star resort.",
    icon: "SprayCan",
    color: "teal",
    category: "Housekeeping Excellence",

    duration: "4 Weeks",
    fee: 18000,
    maxStudents: 20,
    level: "Beginner",
    mode: "In-Person",
    prerequisites: "None — open to all above 16 years",
    schedule: "Mon — Sat, 7:00 AM – 10:00 AM",
    location: "Pahuna Training Center, Birendranagar",
    batchInfo: "Batch 5 — Starts February 2025",

    modules: [
      {
        title: "Room Cleaning Standards",
        topics: [
          "Step-by-step room cleaning procedure",
          "Bed making techniques (hospital corners, tri-fold)",
          "Bathroom cleaning and sanitization",
          "Turndown service execution",
        ],
      },
      {
        title: "Linen & Laundry",
        topics: [
          "Linen inventory management",
          "Stain removal techniques",
          "Commercial laundry operations",
          "Linen lifecycle planning",
        ],
      },
      {
        title: "Public Area & Specializations",
        topics: [
          "Lobby, corridor, and restaurant cleaning",
          "Minibar setup and restocking",
          "Lost & found procedures",
          "Pest control awareness",
        ],
      },
      {
        title: "Quality Control",
        topics: [
          "Room inspection checklists",
          "Quality scoring systems",
          "Guest feedback integration",
          "Safety and chemical handling",
        ],
      },
    ],

    instructor: {
      name: "Maya Tamang",
      title: "Housekeeping Training Lead",
      bio: "Maya supervised housekeeping departments at premium Kathmandu hotels for 8 years, including a stint at a Marriott-affiliated property.",
      experience: "11 years in housekeeping management",
      specialties: [
        "Room standards",
        "Quality inspection",
        "Laundry operations",
      ],
    },

    certification:
      "Pahuna Academy — Housekeeping Professional Certificate",
    careerOutcomes: [
      {
        role: "Room Attendant",
        salary: "NPR 15,000 – 22,000/month",
        description:
          "Clean and prepare guest rooms to established standards.",
      },
      {
        role: "Housekeeping Supervisor",
        salary: "NPR 22,000 – 35,000/month",
        description:
          "Lead the housekeeping team and conduct quality inspections.",
      },
      {
        role: "Executive Housekeeper",
        salary: "NPR 35,000 – 55,000/month",
        description:
          "Manage the entire housekeeping department, budgets, and procurement.",
      },
    ],

    faqs: [
      {
        question: "Is this just about cleaning rooms?",
        answer:
          "Not at all. You'll learn professional standards, quality management, team supervision, safety protocols, and operational efficiency — skills that lead to supervisor and management roles.",
      },
      {
        question: "What career growth is possible?",
        answer:
          "Housekeeping offers one of the fastest career ladders in hospitality. Many General Managers started in housekeeping. Our graduates have risen to supervisory roles within 6-12 months.",
      },
      {
        question: "Will I get a uniform and supplies during training?",
        answer:
          "Yes — training uniforms, cleaning supplies, and all materials are included in the course fee.",
      },
    ],

    isFeatured: false,
    isUpcoming: true,
  },

  // ─── 5. Hospitality Soft Skills ────────────────────────────────────────────
  {
    id: "soft-skills",
    title: "Hospitality Soft Skills & Service Excellence",
    slug: "hospitality-soft-skills",
    tagline: "The human side of hospitality",
    shortDesc:
      "Elevate your communication, grooming, problem-solving, and guest delight skills for any hospitality role.",
    description:
      "Technical skills get you hired — soft skills get you promoted. This short course focuses on professional communication, personal grooming, conflict resolution, upselling, body language, cultural sensitivity, and the art of anticipating guest needs. Essential for anyone already working in or entering hospitality.",
    icon: "HeartHandshake",
    color: "rose",
    category: "Hospitality Service",

    duration: "2 Weeks",
    fee: 12000,
    maxStudents: 25,
    level: "Beginner",
    mode: "In-Person",
    prerequisites: "None",
    schedule: "Mon — Sat, 2:00 PM – 5:00 PM",
    location: "Pahuna Training Center, Birendranagar",
    batchInfo: "Rolling admissions — new batch every month",

    modules: [
      {
        title: "Professional Communication",
        topics: [
          "Verbal and written communication skills",
          "Active listening and empathy",
          "Phone and email etiquette",
          "Communicating across cultures",
        ],
      },
      {
        title: "Personal Presentation",
        topics: [
          "Grooming standards for hospitality",
          "Body language and posture",
          "Uniform and personal hygiene",
          "First impressions and confidence building",
        ],
      },
      {
        title: "Guest Handling & Service Recovery",
        topics: [
          "Understanding guest expectations",
          "Handling complaints professionally",
          "Service recovery — turning problems into loyalty",
          "Upselling and suggestive selling techniques",
        ],
      },
      {
        title: "Teamwork & Professionalism",
        topics: [
          "Working effectively in teams",
          "Time management in hospitality",
          "Stress management and work-life balance",
          "Career planning and goal setting",
        ],
      },
    ],

    instructor: {
      name: "Priya Sharma",
      title: "Service Excellence Coach",
      bio: "Priya is a certified hospitality trainer who has conducted workshops for major hotel chains across Nepal and India, specializing in guest psychology and service design.",
      experience: "9 years in hospitality training",
      specialties: [
        "Guest psychology",
        "Service design",
        "Communication skills",
      ],
    },

    certification:
      "Pahuna Academy — Service Excellence Certificate",
    careerOutcomes: [
      {
        role: "Any Hospitality Role",
        salary: "Varies by position",
        description:
          "Soft skills are universally valued — this course enhances your employability in any hospitality position.",
      },
      {
        role: "Guest Relations Executive",
        salary: "NPR 25,000 – 40,000/month",
        description:
          "Manage VIP guests and drive overall guest satisfaction scores.",
      },
      {
        role: "Training Coordinator",
        salary: "NPR 28,000 – 45,000/month",
        description:
          "Train new staff in customer service and hospitality standards.",
      },
    ],

    faqs: [
      {
        question: "Is this useful for people already working in hospitality?",
        answer:
          "Absolutely — this course is especially valuable for working professionals who want to improve their promotability and service delivery. Many of our students are current hotel staff.",
      },
      {
        question: "Can employers send their teams for group training?",
        answer:
          "Yes — we offer group rates for hotels and businesses sending 5+ staff. Contact us for corporate training packages.",
      },
      {
        question: "How is this different from the Hotel Management course?",
        answer:
          "Hotel Management covers operational skills (front desk, housekeeping, F&B). This course focuses purely on interpersonal skills, communication, and service mindset — it's a great complement.",
      },
    ],

    isFeatured: true,
    isUpcoming: false,
  },

  // ─── 6. Advanced Hospitality Leadership (Upcoming) ─────────────────────────
  {
    id: "advanced-leadership",
    title: "Advanced Hospitality Leadership",
    slug: "advanced-hospitality-leadership",
    tagline: "Lead, manage, and scale hospitality businesses",
    shortDesc:
      "Coming soon — an advanced program for supervisors and managers covering leadership, revenue strategy, and multi-property operations.",
    description:
      "Designed for hospitality professionals with 2+ years of experience, this advanced program covers leadership development, revenue management, marketing strategy, financial management, and multi-property operations. Ideal for those ready to move into management and ownership roles. Launching in 2025.",
    icon: "Sparkles",
    color: "indigo",
    category: "Hotel Management",

    duration: "3 Months",
    fee: 65000,
    maxStudents: 15,
    level: "Advanced",
    mode: "Hybrid",
    prerequisites: "2+ years of hospitality experience or Hotel Management certificate",
    schedule: "Weekends + online modules",
    location: "Pahuna Training Center + Online",
    batchInfo: "Batch 1 — Coming Q3 2025",

    modules: [
      {
        title: "Hospitality Leadership",
        topics: [
          "Leadership styles in hospitality",
          "Team building and motivation",
          "Performance management and KPIs",
          "Change management in hotel operations",
        ],
      },
      {
        title: "Revenue & Financial Management",
        topics: [
          "Advanced revenue management strategies",
          "P&L analysis for hotel managers",
          "Budgeting and cost control",
          "Yield management and dynamic pricing",
        ],
      },
      {
        title: "Marketing & Digital Strategy",
        topics: [
          "Digital marketing for hotels",
          "Social media and reputation management",
          "OTA optimization and direct booking strategy",
          "Brand building and positioning",
        ],
      },
      {
        title: "Operations at Scale",
        topics: [
          "Multi-property management",
          "Franchise and chain operations",
          "Quality standard systems",
          "Crisis management and business continuity",
        ],
      },
    ],

    instructor: {
      name: "Suman KC",
      title: "Hotel Management Director",
      bio: "Suman has managed 4-star hotels in Kathmandu and Pokhara for over 12 years and leads the academy's advanced programs.",
      experience: "15 years in hotel management",
      specialties: [
        "Revenue management",
        "Multi-property operations",
        "Strategic planning",
      ],
    },

    certification:
      "Pahuna Academy — Advanced Hospitality Leadership Diploma",
    careerOutcomes: [
      {
        role: "Hotel Manager",
        salary: "NPR 50,000 – 80,000/month",
        description:
          "Oversee all departments and drive profitability for a hotel property.",
      },
      {
        role: "Revenue Manager",
        salary: "NPR 45,000 – 70,000/month",
        description:
          "Optimize pricing, distribution, and yield across all channels.",
      },
      {
        role: "Hotel Owner / Entrepreneur",
        salary: "Variable",
        description:
          "Apply strategic knowledge to launch and manage your own property.",
      },
    ],

    faqs: [
      {
        question: "When will this program start?",
        answer:
          "We're planning to launch Batch 1 in Q3 2025. Register your interest now and we'll notify you as soon as enrollment opens.",
      },
      {
        question: "Is online participation possible?",
        answer:
          "Yes — this is a hybrid program. Weekend sessions are in-person, and weekday modules are delivered online so working professionals can participate.",
      },
      {
        question: "Who should take this course?",
        answer:
          "This is designed for hotel supervisors, department heads, and experienced staff looking to move into management or ownership roles.",
      },
    ],

    isFeatured: false,
    isUpcoming: true,
  },
];

// ── Student Success Stories ──

export interface StudentTestimonial {
  id: string;
  name: string;
  course: string;
  courseSlug: string;
  currentRole: string;
  company: string;
  quote: string;
  image?: string;
}

export const studentTestimonials: StudentTestimonial[] = [
  {
    id: "t1",
    name: "Anu Gurung",
    course: "Professional Barista Training",
    courseSlug: "professional-barista-training",
    currentRole: "Head Barista",
    company: "Himalayan Coffee House, Kathmandu",
    quote:
      "The barista course at Pahuna Academy gave me hands-on skills I couldn't learn anywhere else in Karnali. Within 3 months of graduating, I was hired as Head Barista at one of Kathmandu's top cafés.",
  },
  {
    id: "t2",
    name: "Bikash Thapa",
    course: "Hotel Management Fundamentals",
    courseSlug: "hotel-management-fundamentals",
    currentRole: "Front Desk Supervisor",
    company: "Hotel Barahi, Pokhara",
    quote:
      "I came from a completely non-hospitality background. The 3-month hotel management program gave me the foundation and confidence to start my career. The internship was invaluable.",
  },
  {
    id: "t3",
    name: "Sita Bista",
    course: "Housekeeping & Service Standards",
    courseSlug: "housekeeping-service-standards",
    currentRole: "Housekeeping Supervisor",
    company: "Pahuna",
    quote:
      "I started as a room attendant after the training. Within 8 months, I was promoted to supervisor. The quality inspection skills I learned set me apart from other candidates.",
  },
  {
    id: "t4",
    name: "Rajan Malla",
    course: "Hospitality Soft Skills",
    courseSlug: "hospitality-soft-skills",
    currentRole: "Guest Relations Executive",
    company: "Landmark Resort, Chitwan",
    quote:
      "The soft skills course changed how I interact with guests. My manager noticed the difference immediately. Within 2 months, I was moved to Guest Relations — a role I love.",
  },
];

// ── General Training FAQs ──

export const generalFAQs: CourseFAQ[] = [
  {
    question: "Where is the training center located?",
    answer:
      "Our training center is located inside the Pahuna premises in Birendranagar, Surkhet. We're easily accessible from the main highway and bus park.",
  },
  {
    question: "Are there age restrictions for enrollment?",
    answer:
      "Most courses are open to anyone above 16-18 years of age. There's no upper age limit — we welcome career changers and lifelong learners.",
  },
  {
    question: "Do you offer accommodation for students from outside Surkhet?",
    answer:
      "We don't provide accommodation directly, but we can help arrange affordable stays near the training center. Many students share rooms in the area.",
  },
  {
    question: "Is the certificate internationally recognized?",
    answer:
      "Our certificates are recognized across Nepal's hospitality industry. For international employment, our program serves as a strong foundation, and we can provide recommendation letters.",
  },
  {
    question: "Can fees be paid in installments?",
    answer:
      "Yes — all courses offer a 2-installment payment plan. For the Advanced Leadership program, we offer up to 3 installments. Contact us for details.",
  },
  {
    question: "What if I can't complete the course?",
    answer:
      "If you need to leave before completion, you can join the next batch at no additional cost (within 6 months). Refunds are available within the first week.",
  },
  {
    question: "Do you offer corporate/group training for hotel teams?",
    answer:
      "Absolutely. We offer customized on-site training packages for hotels and hospitality businesses. Contact our consulting team for group rates.",
  },
];

// ── Helper Functions ──

export function getCourseBySlug(slug: string): TrainingCourse | undefined {
  return trainingCourses.find((c) => c.slug === slug);
}

export function getFeaturedCourses(): TrainingCourse[] {
  return trainingCourses.filter((c) => c.isFeatured);
}

export function getRelatedCourses(
  currentSlug: string,
  limit = 3
): TrainingCourse[] {
  return trainingCourses
    .filter((c) => c.slug !== currentSlug)
    .slice(0, limit);
}

export function getTestimonialsForCourse(
  courseSlug: string
): StudentTestimonial[] {
  return studentTestimonials.filter((t) => t.courseSlug === courseSlug);
}

export function getAllCourseCategories(): string[] {
  return [...new Set(trainingCourses.map((c) => c.category))];
}
