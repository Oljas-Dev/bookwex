import type { BookingWithRelations, MapperBooking } from "../types/ui";

export function mapChatBooking(
  booking: BookingWithRelations,
  userId?: string,
): MapperBooking {
  return {
    id: booking.id,
    startTime: booking.start_time,
    duration: booking.duration,
    type: booking.type,
    status: booking.status,
    student_unread_count: booking.student_unread_count,
    teacher_unread_count: booking.teacher_unread_count,
    viewerRole: booking.teacher?.id === userId ? "teacher" : "student",

    teacher: booking.teacher
      ? {
          id: booking.teacher.id,
          name: booking.teacher.full_name,
          avatar: booking.teacher.avatar_url,
        }
      : null,

    student: booking.student
      ? {
          id: booking.student.id,
          name: booking.student.full_name,
          avatar: booking.student.avatar_url,
        }
      : null,
  };
}
