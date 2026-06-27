import type { Conversation, ConversationRow } from "../types/chats";

export function mapConversation(
  booking: ConversationRow,
  currentUserId: string,
): Conversation {
  const isTeacher = booking.teacher?.id === currentUserId;

  const participant = isTeacher ? booking.student : booking.teacher;

  return {
    bookingId: booking.id,
    startTime: booking.start_time,
    duration: booking.duration,

    unreadCount: isTeacher
      ? booking.teacher_unread_count
      : booking.student_unread_count,

    participant: {
      id: participant?.id ?? "",
      name: participant?.full_name ?? "Unknown user",
      avatar: participant?.avatar_url ?? null,
    },
    teacherName: booking.teacher?.full_name,
    viewerRole: booking.teacher?.id === currentUserId ? "teacher" : "student",

    lastMessage: booking.last_message,
    lastMessageAt: booking.last_message_at,
  };
}
