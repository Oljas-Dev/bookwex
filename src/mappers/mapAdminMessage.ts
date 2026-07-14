import type { AdminMessage } from "../types/admins";
import type { AdminMessages } from "../types/db";

export function mapAdminMessage(message: AdminMessages): AdminMessage {
  return {
    id: message.id,
    createdAt: new Date(message.created_at),
    title: message.title,
    message: message.message,
    category: message.category,
    isResolved: message.is_resolved,
    userId: message.user_id,
    adminMessage: message.admin_notes,

    profiles: message.profiles,
  };
}
