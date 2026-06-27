import type { Message, MessageRow } from "../types/chats";

export function mapMessage(row: MessageRow): Message {
  return {
    id: row.id,
    bookingId: row.booking_id,
    senderId: row.sender_id,
    text: row.text,
    createdAt: row.created_at,
    isRead: row.is_read,
  };
}
