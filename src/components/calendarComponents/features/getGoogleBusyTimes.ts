import { supabase } from "../../../api/supabase/supabase";


export async function getGoogleBusyTimes(
  teacherId: string,
) {
  const { data, error } = await supabase
    .from("calendar_busy_times")
    .select("*")
    .eq("teacher_id", teacherId)
    .eq("source", "google");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}