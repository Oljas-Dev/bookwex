export interface LessonCard {
  lessonId: string;
  slotId: string;
  teacherId: string;
  studentName?: string;

  startTime: string;
  endTime?: string;
  duration: number;

  hasUnreadMessages?: boolean;

  status?: "available" | "booked";
}

export interface BookedCard {
  lessonId: string;
  slotId: string;
  teacherId: string;
  studentName: string;
  studentsAvatar: string;

  startTime: string;
  endTime?: string;
  duration: number;

  hasUnreadMessages: boolean;

  status?: "available" | "booked";
}
