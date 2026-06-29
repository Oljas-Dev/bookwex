import type { Conversation, ConversationRow } from "../types/chats";

export function mapConversation(
  row: ConversationRow,
  userId: string,
): Conversation {
  const isTeacher = row.teacher?.id === userId;
  const participant = isTeacher ? row.student : row.teacher;

  return {
    bookingId: row.booking_id,

    lastMessage: row.last_message,
    lastMessageAt: row.last_message_at,

    unreadCount: isTeacher
      ? row.teacher_unread_count
      : row.student_unread_count,

    viewerRole: isTeacher ? "teacher" : "student",

    participant: {
      id: participant?.id,
      name: participant?.full_name,
      avatar: participant?.avatar_url,
    },
  };
}

// export function mapConversation(
//   booking: ConversationRow,
//   currentUserId: string,
// ): Conversation {
//   const isTeacher = booking.teacher?.id === currentUserId;

//   const participant = isTeacher ? booking.student : booking.teacher;

//   return {
//     bookingId: booking.id,
//     startTime: booking.start_time,
//     duration: booking.duration,

//     unreadCount: isTeacher
//       ? booking.teacher_unread_count
//       : booking.student_unread_count,

//     participant: {
//       id: participant?.id ?? "",
//       name: participant?.full_name ?? "Unknown user",
//       avatar: participant?.avatar_url ?? undefined,
//     },
//     teacherName: booking.teacher?.full_name,
//     viewerRole: booking.teacher?.id === currentUserId ? "teacher" : "student",

//     lastMessage: booking.last_message,
//     lastMessageAt: booking.last_message_at,
//   };
// }
