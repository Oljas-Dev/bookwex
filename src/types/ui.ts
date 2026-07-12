// Types for user's Profile's LessonSection

import type { Subjects } from "../components/onboardingTeacher/Subjects";
import type { Languages } from "../components/onboardingTeacher/TeacherLanguages";
import type { Platform } from "../helpers/features";

// Student lessons
export interface LessonCard {
  lessonId: string;
  slotId: string | undefined;
  teacherId: string | undefined;
  teacherName: string | undefined;
  teacherAvatar: string | undefined;
  studentName?: string | undefined;
  viewerRole: viewerRoleType;
  status?: bookingStatus;
  conferenceLink: string | undefined;

  startTime: string;
  endTime?: string;
  duration: number;
  studentOutcome: "pending" | "completed" | "no_show" | undefined;

  hasUnreadMessages?: boolean;
  teacherOutcome: "pending" | "completed" | "no_show" | undefined;
}

export type viewerRoleType = "teacher" | "student";

// Teacher lessons
export interface BookedCard {
  lessonId: string;
  slotId: string | undefined;
  teacherId: string | undefined;
  studentName: string | undefined;
  teacherName: string | undefined;
  studentsAvatar: string | undefined;
  viewerRole: viewerRoleType;
  rating?: number;
  conferenceLink?: string;

  startTime: string;
  endTime?: string;
  duration: number;

  hasUnreadMessages: boolean;

  status?: bookingStatus;
  teacherOutcome: "pending" | "completed" | "no_show" | undefined;
  studentOutcome: "pending" | "completed" | "no_show" | undefined;
}

export interface ratingCalc {
  average_rating: number;

  review_count: number;
}

// Types for Teacher's main dashboard(main page types)
// Main page teacher profile type
export interface TeacherProfile {
  id: string;
  full_name: string;
  avatar_url: string | undefined;

  subject: string;
  video_intro: string | null;

  descriptions: TeacherDescription;

  lessons: TeacherLesson[] | undefined;

  socialLinks: TeacherSocialLink[];

  reviews: TeacherReview[];

  experience: TeacherExperience;

  rating_calc: ratingCalc;
}

// description type
export interface TeacherDescription {
  id: string;
  title: string;
  content: string;
}

// Teacher lessons types type
export interface TeacherLesson {
  id: string;

  title: string;
  // duration: number;

  goal: string;
  method: string;
  result: string;

  price: string;
}

// Teacher social links type
export interface TeacherSocialLink {
  id: string;
  platform: Platform;
  url: string;
}

// Teacher reviews type
export interface TeacherReview {
  id?: string;
  teacher_id?: string;

  studentId?: string;
  review: string;
  country?: string;

  student: {
    full_name: string;
    avatar_url?: string | null;
    country?: string | null;
  };

  created_at: string;
}

export interface TeacherExperience {
  id: string;
  teacher_id: string;

  start_year: number;
  languages: Languages[];
  subjects: Subjects[];
  hours: number;
}

export interface HeroSectionFormData {
  start_year: number;
  languages: string[];
  hours: number;

  title: string;
  content: string;

  social_links: SocialLink[] | [];
}

export interface SocialLink {
  id: string;
  platform: Platform;
  url: string;
}

export type BookingPerson = {
  id: string;
  full_name: string;
  avatar_url: string | undefined;
  conference_link?: string | undefined;
};

export type BookingRow = {
  id: string;
  slot_id?: string;
  start_time: string;
  duration: number;
  type: string;
  status: bookingStatus;
  teacher_outcome?: "pending" | "completed" | "no_show";
  student_outcome?: "pending" | "completed" | "no_show";
  rating: number;

  teacher: BookingPerson | null;
  student: BookingPerson | null;
};

export type BookingWithRelations = BookingRow & {
  teacher_unread_count: number;
  student_unread_count: number;
  last_message: string | null;
  last_message_at: string | null;
};

export type MapperBooking = {
  id: string;
  slot_id?: string;
  startTime: string;
  duration: number;
  type: string;
  status: bookingStatus;
  teacher_outcome?: "pending" | "completed" | "no_show";
  student_outcome?: "pending" | "completed" | "no_show";
  student_unread_count?: number;
  teacher_unread_count?: number;
  viewerRole: viewerRoleType;
  rating?: number;

  teacher: {
    id: string;
    name: string;
    avatar: string | undefined;
    conferenceLink?: string | undefined;
  } | null;

  student: {
    id: string;
    name: string;
    avatar: string | undefined;
  } | null;
};

// Review types

// bookings statuses
export type bookingStatus =
  | "booked"
  | "awaiting_confirmation"
  | "completed"
  | "cancelled"
  | "disputed";

export type LessonOutcome = "completed" | "no_show" | "pending";

export type BookingUIState =
  | "upcoming"
  | "starting_soon"
  | "in_progress"
  | "awaiting_confirmation"
  | "completed"
  | "disputed"
  | "cancelled";

export type ValidationResult =
  | {
      valid: true;
      hoursNumber: number;
    }
  | {
      valid: false;
      message: string;
    };
