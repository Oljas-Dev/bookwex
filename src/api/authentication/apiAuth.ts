import { supabase } from "../supabase/supabase";

export async function signup({
  email,
  password,
  full_name = "",
  avatar_url = "",
  my_teachers,
}: {
  email: string;
  password: string;
  full_name: string;
  avatar_url: string;
  my_teachers: string[];
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://bookwex.com/auth/callback",
      data: {
        full_name,
        avatar_url,
        my_teachers,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function signin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    throw new Error("failed to login, please check your credentials");
  }
  return data;
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  // console.log(data);
  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error.message);
  }
}
