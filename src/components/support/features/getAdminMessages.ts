import { supabase } from "../../../api/supabase/supabase";
import type { AdminMessages } from "../../../types/db";

export async function getAdminMessages() {
  const { data, error } = await supabase
    .from("admin_messages")
    .select(
      "id, created_at, title, message, category, is_resolved, user_id, admin_notes, status",
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data as AdminMessages[];
}
