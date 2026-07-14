import { supabase } from "../../../api/supabase/supabase";
import type { AdminMessages } from "../../../types/db";

export async function getAdminMessages() {
  const { data, error } = await supabase
    .from("admin_messages")
    .select(
      `
      id,
      created_at,
      title,
      message,
      category,
      is_resolved,
      user_id,
      admin_notes,
      status,
      profiles:user_id!inner (
        full_name,
        avatar_url
      )
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data.map((message) => ({
    ...message,
    profile: message.profiles?.[0] ?? null,
  })) as AdminMessages[];

  // return data as AdminMessages[];
}
