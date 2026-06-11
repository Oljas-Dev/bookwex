// Types for user's Profile's LessonSection
// Student lessons
export interface LessonCard {
  lessonId: string;
  slotId: string;
  teacherId: string | undefined;
  studentName?: string | undefined;

  startTime: string;
  endTime?: string;
  duration: number;

  hasUnreadMessages?: boolean;

  status?: "available" | "booked";
}

// Teacher lessons
export interface BookedCard {
  lessonId: string;
  slotId: string;
  teacherId: string | undefined;
  studentName: string | undefined;
  studentsAvatar: string | null | undefined;

  startTime: string;
  endTime?: string;
  duration: number;

  hasUnreadMessages: boolean;

  status?: "available" | "booked";
}

// Types for Teacher's main dashboard(main page types)
// Main page teacher profile type
export interface TeacherProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;

  subject: string;
  video_intro: string | null;

  descriptions: TeacherDescription;

  lessons: TeacherLesson[] | undefined;

  socialLinks: TeacherSocialLink[];

  reviews: TeacherReview[];

  experience: TeacherExperience;
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
  duration: number;

  goal: string;
  method: string;
  result: string;

  price: number;
}

// Teacher social links type
export interface TeacherSocialLink {
  id: string;
  platform: string;
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
  languages: string[];
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
  platform: string;
  url: string;
}

type BookingPerson = {
  id: string;
  full_name: string;
  avatar_url: string | null;
};

export type BookingWithRelations = {
  id: string;
  slot_id: string;
  start_time: string;
  duration: number;
  type: string;

  teacher: BookingPerson | null;
  student: BookingPerson | null;
};

export type MapperBooking = {
  id: string;
  slot_id: string;
  startTime: string;
  duration: number;
  type: string;

  teacher: {
    id: string;
    name: string;
    avatar: string | null;
  } | null;

  student: {
    id: string;
    name: string;
    avatar: string | null;
  } | null;
};
