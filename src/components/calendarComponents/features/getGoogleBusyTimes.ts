import { supabase } from "../../../api/supabase/supabase";


export async function getGoogleBusyTimes(
  teacherId: string,
) {
  const { data, error } = await supabase
    .from("teacher_busy_times")
    .select("*")
    .eq("teacher_id", teacherId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}