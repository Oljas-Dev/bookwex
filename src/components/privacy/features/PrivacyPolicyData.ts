import type { LegalData } from "../../../types/legal";

export const privacyPolicyData: LegalData = [
  {
    type: "metadata",
    title: "Privacy Policy",
    lastUpdated: "August 2, 2026",
  },
  {
    type: "section",
    number: 1,
    heading: "Introduction",
    paragraphs: [
      "Welcome to Bookwex.",
      "Bookwex is a platform that helps tutors create professional profiles, manage their availability, and connect with students.",
      "This Privacy Policy explains how Bookwex collects, uses, and protects your personal data when you use our platform.",
      "By using Bookwex, you acknowledge the practices described in this Privacy Policy.",
    ],
  },
  {
    type: "section",
    number: 2,
    heading: "Data Controller",
    paragraphs: [
      "The person responsible for processing your personal data is:",
    ],
    controller: {
      name: "Olzhas Medetbayev",
      organization: "Bookwex",
      contact: "privacy@bookwex.com",
    },
    paragraphsAfterController: [
      "Bookwex is currently operated as a beta project by an individual. If Bookwex becomes a registered company in the future, this Privacy Policy will be updated accordingly.",
    ],
  },
  {
    type: "section",
    number: 3,
    heading: "Information We Collect",
    intro:
      "Depending on how you use Bookwex, we may collect the following information:",
    subsections: [
      {
        heading: "Account Information",
        paragraphs: ["When you create an account, we may collect:"],
        bullets: [
          "Email address",
          "Name",
          "User role (for example, teacher or student)",
          "Profile information",
        ],
      },
      {
        heading: "Teacher Profile Information",
        paragraphs: ["Teachers may provide additional information, including:"],
        bullets: [
          "Profile photo",
          "Biography",
          "Languages spoken",
          "Subjects taught",
          "Teaching experience",
          "Social links",
          "Introductory video",
          "Availability and lesson preferences",
        ],
        note: "Some teacher profile information may be publicly visible to help students find suitable teachers.",
      },
      {
        heading: "Booking Information",
        paragraphs: ["When students book lessons, we may collect:"],
        bullets: [
          "Booking details",
          "Lesson time and duration",
          "Teacher and student relationship information",
        ],
      },
      {
        heading: "Communication Information",
        paragraphs: [
          "If communication features are used, we may process messages and related information needed to provide the service.",
        ],
      },
      {
        heading: "Technical Information",
        paragraphs: [
          "We may automatically receive limited technical information, such as:",
        ],
        bullets: [
          "Browser type",
          "Device information",
          "Basic security and access information",
        ],
        note: "We do not currently use analytics services or advertising trackers.",
      },
    ],
  },
  {
    type: "section",
    number: 4,
    heading: 'Google Calendar Information',
    intro: "If a teacher connects Google Calendar, Bookwex may access:",
    bullets: [
      'Google Calendar availability information',
      'Calendar events necessary to identify unavailable times',
      'Information required to create and remove Bookwex lesson events',
    ],
    paragraphs: [
      'Google Calendar data is used only to:'
    ],
    paragraphsAfterBullets: [
      'Prevent double bookings',
      "Synchronize Bookwex lessons with the teacher's Google Calendar",
      'Improve scheduling functionality'
    ],
    note: 'Bookwex does not use Google Calendar data for advertising, profiling, or selling purposes.',
  },
  {
    type: "section",
    number: 5,
    heading: 'Google Calendar Integration',
    intro: 'Bookwex uses Google OAuth to allow teachers to connect their Google Calendar. When a teacher authorizes Google Calendar access:',
    bullets: [
      'Bookwex receives authorization tokens required for calendar synchronization.',
      'Access tokens and refresh tokens are stored securely on our servers.',
      'Google Calendar data is accessed only after user authorization.',
    ],
    paragraphs: [
      'Teachers can disconnect Google Calendar at any time from their Bookwex account settings.',
      'When disconnected:'
    ],
    paragraphsAfterBullets: [
      'Stored Google Calendar connection data is removed.',
      'Synchronization stops.',
      'Calendar availability information imported through synchronization is deleted.'
    ],
  },
  {
    type: "section",
    number: 6,
    heading: "How We Use Your Information",
    intro: "We use personal data to:",
    bullets: [
      "Provide and maintain Bookwex services",
      "Create and display teacher profiles",
      "Enable lesson booking functionality",
      "Connect teachers and students",
      "Improve the platform",
      "Protect the security of our users and services",
      "Respond to support requests",
    ],
    paragraphs: [
      "We only process information that is necessary for providing Bookwex services.",
    ],
  },
  {
    type: "section",
    number: 7,
    heading: "Legal Basis for Processing",
    intro: "Depending on the situation, we process personal data based on:",
    bullets: [
      "Performance of a service requested by you (such as creating an account or booking lessons)",
      "Your consent (for example, when you voluntarily provide profile information)",
      "Our legitimate interest in maintaining and improving Bookwex and protecting the platform",
    ],
  },
  {
    type: "section",
    number: 8,
    heading: "Public Teacher Profiles",
    paragraphs: [
      "Teachers can choose to create a public profile.",
      "Information added to a public teacher profile may be visible to visitors, including:",
    ],
    bullets: [
      "Name",
      "Profile photo",
      "Teaching information",
      "Languages and subjects",
      "Biography",
      "Reviews",
      "Availability information",
    ],
    note: "Teachers should only upload information they are comfortable sharing publicly.",
  },
  {
    type: "section",
    number: 9,
    heading: "Data Storage and Service Providers",
    paragraphs: [
      "Bookwex uses third-party services to operate the platform.",
      "Currently, Bookwex uses:",
    ],
    bullets: [
      "Supabase for database hosting, authentication, and file storage",
      'Sensitive authentication information, including Google OAuth tokens, is stored securely and is never exposed to other users.'
    ],
    paragraphsAfterBullets: [
      "These providers process data only as necessary to provide their services and maintain appropriate security measures.",
    ],
  },
  {
    type: "section",
    number: 10,
    heading: "Data Security",
    paragraphs: [
      "We take reasonable measures to protect your personal information from unauthorized access, loss, misuse, or disclosure.",
      "However, no online service can guarantee complete security.",
    ],
  },
  {
    type: "section",
    number: 11,
    heading: "Data Retention",
    paragraphs: [
      "We keep personal information only for as long as necessary to provide Bookwex services and fulfill the purposes described in this Privacy Policy.",
      "You may request deletion of your account and personal information.",
      "Users can disconnect Google Calendar at any time through their account settings."
    ],
  },
  {
    type: "section",
    number: 12,
    heading: "Your Rights",
    paragraphs: [
      "Under applicable data protection laws, including the General Data Protection Regulation (GDPR) where applicable, you may have the right to:",
    ],
    bullets: [
      "Access your personal data",
      "Correct inaccurate information",
      "Request deletion of your data",
      "Restrict processing of your data",
      "Object to certain processing activities",
      "Request a copy of your data",
    ],
    paragraphsAfterBullets: [
      "To exercise your rights, contact us using the information provided above.",
    ],
  },
  {
    type: "section",
    number: 13,
    heading: "Account Deletion",
    paragraphs: [
      "You can request deletion of your Bookwex account by contacting us.",
      "When an account is deleted, we will remove or anonymize personal information where required, unless we are legally required to keep certain information.",
    ],
  },
  {
    type: "section",
    number: 14,
    heading: "Cookies",
    paragraphs: [
      "Bookwex may use essential cookies or similar technologies required for the operation and security of the platform.",
      "We do not currently use advertising cookies or analytics cookies.",
      "If additional tracking technologies are introduced in the future, this Privacy Policy will be updated accordingly.",
    ],
  },
  {
    type: "section",
    number: 15,
    heading: "Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect changes in Bookwex, legal requirements, or our data practices.",
      "The latest version will always be available on this page.",
    ],
  },
  {
    type: "section",
    number: 16,
    heading: "Contact",
    paragraphs: [
      "If you have questions about this Privacy Policy or how your data is handled, please contact:",
      "privacy@bookwex.com",
    ],
  },
];
