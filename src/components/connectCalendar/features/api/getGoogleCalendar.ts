import { supabase } from "../../../../api/supabase/supabase";

export async function getGoogleCalendar() {
  const {
  data: { user },
} = await supabase.auth.getUser();

const userId = user?.id;

if (!userId) {
  throw new Error("Unauthorized");
}

  const { data, error } = await supabase
    .from("teacher_calendars")
    .select("sync_status, last_synced_at")
    .eq("teacher_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
