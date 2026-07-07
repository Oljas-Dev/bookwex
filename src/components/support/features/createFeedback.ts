import { supabase } from "../../../api/supabase/supabase";
import type { AdminCategory } from "../../../types/db";

interface CreateFeedback {
  user_id: string;
  title: string;
  message: string;
  category: AdminCategory;
}

export async function createFeedback(payload: CreateFeedback) {
  const { data, error } = await supabase
    .from("admin_messages")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
