import { supabase } from "../../../../api/supabase/supabase";

type SignupTeacherData = {
  fullName: string;
  email: string;
  password: string;
  tutorType: boolean;
};

export async function signupTeacher({
  fullName,
  email,
  password,
  tutorType
}: SignupTeacherData) {

  console.log(tutorType);
  

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: "teacher",
        wants_founder: tutorType,
      },
    },
  });

  if (error) throw new Error(error.message);

  if (!data.user) {
    throw new Error("Could not create user");
  }

  // this updates the role
  //   const { error: profileError } = await supabase
  //     .from("profiles")
  //     .update({
  //       role: "teacher",
  //     })
  //     .eq("id", data.user.id);

  //   if (profileError) throw new Error(profileError.message);

  return data.user;
}
