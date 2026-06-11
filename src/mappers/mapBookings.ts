import type { BookingWithRelations, MapperBooking } from "../types/ui";

export function mapBooking(booking: BookingWithRelations): MapperBooking {
  return {
    id: booking.id,
    slot_id: booking.slot_id,
    startTime: booking.start_time,
    duration: booking.duration,
    type: booking.type,

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
