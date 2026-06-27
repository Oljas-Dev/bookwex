import type { ChatBooking, ChatRoomBookingQuery } from "../types/chats";

export function mapChatRoom(booking: ChatRoomBookingQuery): ChatBooking {
  return {
    id: booking.id,
    teacher_unread_count: booking.teacher_unread_count,
    student_unread_count: booking.student_unread_count,
    start_time: booking.start_time,
    duration: booking.duration,

    teacher: {
      id: booking.teacher.id,
      full_name: booking.teacher.full_name,
      avatar_url: booking.teacher.avatar_url,
    },

    student: {
      id: booking.student.id,
      full_name: booking.student.full_name,
      avatar_url: booking.student.avatar_url,
    },
  };
}
