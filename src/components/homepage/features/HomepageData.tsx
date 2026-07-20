import type { LegalData } from "../../../types/legal";

export const benefitsArray = [
  {
    id: "001",
    title: "More students",
    text: "Share one professional page instead of sending multiple links.",
  },
  {
    id: "002",
    title: "Less administration",
    text: "Students book available times automatically.",
  },
  {
    id: "003",
    title: "Stay organized",
    text: "Keep your schedule, bookings, and profile in one place.",
  },
];

export const accordionFAQ = [
  {
    id: "001",
    question: "Who is Bookwex for?",
    answer:
      "Bookwex is designed for independent tutors who want to grow and manage their tutoring business.",
  },
  // {
  //   id: "002",
  //   question: "Can I teach online?",
  //   answer:
  //     "Yes. You can offer online lessons and share your booking page with students.",
  // },
  // {
  //   id: "003",
  //   question: "Can I teach several subjects?",
  //   answer:
  //     "Yes. Add multiple subjects and customize your profile accordingly.",
  // },
  {
    id: "004",
    question: "Can students book automatically?",
    answer:
      "Yes. Students can book available time slots directly from your profile.",
  },
  {
    id: "005",
    question: "Can I choose my own availability?",
    answer:
      "Absolutely. Set your own schedule and update it whenever you like.",
  },
  {
    id: "006",
    question: "Is Bookwex free?",
    answer: "Yes. Bookwex is completely free during the beta period.",
  },
  {
    id: "007",
    question: "Will more features be added?",
    answer:
      "Yes. We're continuously improving Bookwex based on feedback from our community.",
  },
];

export const foundingTutorBenefits = [
  {
    id: "001",
    text: "✨ Free access for your first year after launch",
  },
  {
    id: "002",
    text: "🚀 Early access to new features",
  },
  {
    id: "003",
    text: "💎 25% off your subscription for life",
  },
  // {
  //   id: "004",
  //   text: "💬 Direct communication with the founder",
  // },
  {
    id: "005",
    text: "🗺️ Help shape the product roadmap",
  },
  {
    id: "006",
    text: "🏅 Founding Tutor badge on their profile ('Founding Tutor #07')",
  },
  {
    id: "007",
    text: "✅ Lifetime recognition on a 'Bookwex Roadmap' page (if you're happy to be listed)",
  },
];

export const footerLinks = [
  {
    id: "001",
    section: "Platform",
    links: [{ text: "Become a Teacher", href: "/signup-teacher" }],
  },
  {
    id: "002",
    section: "Company",
    links: [
      { text: "About", href: "/about" },
      { text: "Contact", href: "/contact" },
    ],
  },
  {
    id: "003",
    section: "Legal",
    links: [
      { text: "Privacy Policy", href: "/privacy" },
      { text: "Terms of Service", href: "/terms" },
    ],
  },
  {
    id: "004",
    section: "Support",
    links: [
      { text: "Help Center", href: "/help-center" },
      { text: "Report a Problem", href: "/report-problem" },
    ],
  },
];

export const aboutData: LegalData = [
  {
    type: "metadata",
    title: "About Bookwex",
    lastUpdated: "July 19, 2026",
  },

  {
    type: "section",
    number: 1,
    heading: "Our Mission",
    paragraphs: [
      "Bookwex exists to help independent tutors spend less time managing their business and more time doing what they love—teaching.",
    ],
  },

  {
    type: "section",
    number: 2,
    heading: "Why Bookwex?",
    paragraphs: [
      "Many tutors use separate tools for scheduling, communication, video calls, and managing their students. Bookwex helps bring these pieces together into one professional experience for both tutors and students. You will find there features like:",
    ],
    bullets: [
      "Booking management",
      "Professional teacher profiles",
      "Availability calendar",
      "Student reviews",
      "Personal booking page",
      "Links to your preferred video meeting platform",
    ],
  },

  {
    type: "section",
    number: 3,
    heading: "Built with Tutors",
    paragraphs: [
      "Bookwex is developed together with tutors.",
      "Every feature is inspired by real feedback from teachers and designed to solve everyday challenges faced by independent educators.",
    ],
  },

  {
    type: "section",
    number: 4,
    heading: "Beta",
    paragraphs: [
      "Bookwex is currently in beta.",
      "We're working closely with our first users to improve the platform before its official launch. Features may evolve as we continue building a better experience.",
    ],
  },

  {
    type: "section",
    number: 5,
    heading: "Founding Tutors",
    paragraphs: [
      "We're inviting our first 20 Founding Tutors to help shape the future of Bookwex.",
      "As early supporters, they'll receive exclusive benefits, early access to new features, and the opportunity to influence the platform's development.",
    ],
  },

  {
    type: "section",
    number: 6,
    heading: "Meet the Founder",
    paragraphs: [
      "Hi, I'm Oljas, the creator of Bookwex.",
      "I built Bookwex because I believe tutors deserve modern tools that help them run their business professionally without unnecessary complexity.",
      "My goal is to create a platform that gives tutors more time to focus on teaching while making it easier for students to discover and book lessons.",
      "Bookwex is an independent project, and every piece of feedback helps shape what comes next.",
      "Thank you for being part of this journey.",
    ],
  },

  {
    type: "section",
    number: 7,
    heading: "Contact",
    paragraphs: [
      "Have a question, suggestion, or just want to say hello?",
      "hello@bookwex.com",
    ],
  },
];
