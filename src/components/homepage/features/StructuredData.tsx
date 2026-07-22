export default function StructuredData() {
  const schema = [
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
        "Bookwex is a platform that helps independent tutors manage bookings, schedules, students, and their tutoring business.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
