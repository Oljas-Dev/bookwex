import type { viewerRoleType } from "./ui";

// messages
export interface MessageRow {
  id: string;
  booking_id: string;
  sender_id: string;
  text: string;
  created_at: string;
  is_read: boolean;
}

export interface BookingChatInfo {
  id: string;
  teacher_id: string;
  student_id: string;
  teacher_unread_count: number;
  student_unread_count: number;
}

export interface ChatParticipant {
  id: string;
  full_name: string;
  avatar_url: string | undefined;
}

export interface ChatBooking {
  id: string;
  teacher_unread_count: number;
  student_unread_count: number;
  start_time: string;
  duration: number;

  teacher: ChatParticipant;
  student: ChatParticipant;
}

export type ChatRoomBookingQuery = {
  booking_id: string;
  teacher_unread_count: number;
  student_unread_count: number;
  start_time: string;
  duration: number;

  teacher: {
    id: string;
    full_name: string;
    avatar_url: string | undefined;
  };

  student: {
    id: string;
    full_name: string;
    avatar_url: string | undefined;
  };
};

export interface ChatRoomData {
  booking: ChatBooking;
  messages: Message[];
}

export interface Message {
  id: string;
  bookingId: string;
  senderId?: string;
  text: string | undefined;
  createdAt: string;
  isRead?: boolean;
}

// conversations
export interface Conversation {
  bookingId: string;
  startTime?: string;
  duration?: number;

  unreadCount: number;

  participant: {
    id: string | undefined;
    name: string | undefined;
    avatar: string | undefined;
  } | null;

  teacherName?: string | undefined;
  viewerRole: viewerRoleType;

  lastMessage: string | null;
  lastMessageAt: string | null;
}

export interface ConversationRow {
  booking_id: string;

  teacher_unread_count: number;
  student_unread_count: number;

  last_message: string | null;
  last_message_at: string | null;
  start_time?: string;
  duration?: number;

  teacher: {
    id: string;
    full_name: string;
    avatar_url: string | undefined;
  } | null;

  student: {
    id: string;
    full_name: string;
    avatar_url: string | undefined;
  } | null;
}
