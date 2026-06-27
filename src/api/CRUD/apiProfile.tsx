import { supabase } from "../supabase/supabase";

export async function getProfile({
  full_name,
}: {
  full_name: string | undefined;
}) {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("full_name", full_name)
    .eq("role", "teacher")
    .single();

  if (error) {
    console.error(error);
  }

  return profiles;
}

export async function getCurrentUser(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, my_teachers")
    .eq("id", userId);

  if (error) {
    console.error(error);
  }

  return data;
}
