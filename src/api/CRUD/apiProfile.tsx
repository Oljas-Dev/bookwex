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

export async function getStudent(userId: string) {
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // console.log(user);

  const { data: student, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    // .eq("role", "student")
    .single();

  if (error) {
    console.error(error);
  }

  return student;
}
