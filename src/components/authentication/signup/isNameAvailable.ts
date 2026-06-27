import { supabase } from "../../../api/supabase/supabase";

export async function isNameAvailable(name: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("full_name", name.toLowerCase())
    .maybeSingle();

  if (error) throw error;

  return !data;
}

export async function isEmailAvailable(email: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (error) throw error;

  return data === null;
}
