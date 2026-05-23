import { supabase } from "../../../api/supabase/supabase";
import type { Profile } from "../../../contexts/AuthContextData";

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (error) throw error;
}
