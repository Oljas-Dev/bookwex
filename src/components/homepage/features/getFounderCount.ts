import { supabase } from "../../../api/supabase/supabase";

export async function getFounderCount() {
  const { count, error } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("teacher_status", "founder");

  if (error) {
    console.error(error.message);
    throw error;
  }

  return count ?? 0;
}
