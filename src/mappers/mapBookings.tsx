import type { BookingWithRelations, MapperBooking } from "../types/ui";

export function mapBooking(
  booking: BookingWithRelations,
  userId?: string,
): MapperBooking {
  return {
    id: booking.id,
    slot_id: booking.slot_id,
    startTime: booking.start_time,
    duration: booking.duration,
    type: booking.type,
    status: booking.status,
    student_outcome: booking.student_outcome,
    teacher_outcome: booking.teacher_outcome,
    viewerRole: booking.teacher?.id === userId ? "teacher" : "student",
    rating: booking.rating,

    teacher: booking.teacher
      ? {
          id: booking.teacher.id,
          name: booking.teacher.full_name,
          avatar: booking.teacher.avatar_url,
          conferenceLink: booking.teacher.conference_link,
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
