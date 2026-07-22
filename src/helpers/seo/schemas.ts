export const homepageSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bookwex",
    url: "https://bookwex.com",
    logo: "https://bookwex.com/logo.png",
    description:
      "Bookwex helps independent tutors manage their tutoring business with scheduling, bookings, and professional profiles.",
  },

  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bookwex",
    url: "https://bookwex.com",
  },

  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Bookwex",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://bookwex.com",
    description:
      "A platform that helps independent tutors manage bookings, schedules, students, and their tutoring business.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  },
];

export const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Bookwex",
  url: "https://bookwex.com/about",
};

export const privacySchema = {
  "@context": "https://schema.org",
  "@type": "PrivacyPage",
  name: "Privacy Policy on Bookwex",
  url: "https://bookwex.com/privacy",
};

export const termsSchema = {
  "@context": "https://schema.org",
  "@type": "TermsPage",
  name: "Terms of Service on Bookwex",
  url: "https://bookwex.com/terms",
};

type TeacherSchemaProps = {
  name: string | undefined;
  slug: string | undefined;
  subject?: string;
  avatar?: string;
  bio?: string;
};

export function teacherSchema({
  name,
  slug,
  subject,
  avatar,
  bio,
}: TeacherSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",

    name: name,

    jobTitle: subject ? `${subject} Tutor` : "Tutor",

    url: `https://bookwex.com/teacher/${slug}`,

    ...(avatar && {
      image: avatar,
    }),

    ...(bio && {
      description: bio,
    }),
  };
}
