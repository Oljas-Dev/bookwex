import { supabase } from "../../../api/supabase/supabase";
import type { TeacherData } from "../../../types/db";

export async function updateTeacherData(
  userId: string,
  updates: Partial<TeacherData>,
) {
  const { data, error } = await supabase
    .from("teacher_data")
    .update(updates)
    .eq("teacher_id", userId);

  if (error) throw error;

  return data;
}
