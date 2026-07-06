import type { BookingConfirmationRow } from "../types/db";

export function mapBookingConfirmation(row: BookingConfirmationRow) {
  return {
    bookingId: row.slot_id,
    startTime: row.start_time,
    duration: row.duration,
    teacherName: row.teacher_name,
    teacherEmail: row.teacher_email,
    teacherId: row.teacher_id,
    teacherTimezone: row.teacher_timezone,
    studentEmail: row.student_email,
    studentTimezone: row.student_timezone,
  };
}
