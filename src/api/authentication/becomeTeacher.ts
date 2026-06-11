import { supabase } from "../supabase/supabase";

export async function becomeTeacher(userId: string | undefined) {
  const { error } = await supabase
    .from("profiles")
    .update({
      role: "teacher",
    })
    .eq("id", userId);

  if (error) throw error;
}
