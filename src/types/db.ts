interface Description {
  id: string;
  teacher_id: string;
  title: string;
  content: string;
  created_at: Date;
}

interface LessonType {
  id: string;
  teacher_id: string;
  title: string;
  duration: number;
  goal: string;
  method: string;
  result: string;
  price: number;
}

interface SocialLinks {
  id: string;
  teacher_id: string;
  platform: string;
  url: string;
}

// Table for teachers to be displayed on main page
interface TeacherData {
  teacher_id: string;
  subject: string;
  video_intro: string;
  created_at: Date;
}

// Table for reviews of specific teacher connected to teacher_data table by teacher_id
interface Reviews {
  id: string;
  teacher_id: string;
  student_id: string;
  student_name: string;
  review: string;
  created_at: Date;
}
interface BookingConfirmationRow {
  slot_id: string;
  start_time: string;
  duration: number;

  teacher_id: string;
  teacher_name: string;
  teacher_email: string;
  teacher_timezone: string;
  student_email: string;
  student_timezone: string;
}

export type {
  TeacherData,
  Reviews,
  Description,
  LessonType,
  SocialLinks,
  BookingConfirmationRow,
};
