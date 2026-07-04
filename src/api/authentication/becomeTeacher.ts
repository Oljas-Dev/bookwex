import { supabase } from "../supabase/supabase";

export async function becomeTeacher(userId: string | undefined) {
  const { error } = await supabase
    .from("profiles")
    .update({
      role: "teacher",
      is_public: true,
    })
    .eq("id", userId);

  if (error) throw error;
}
