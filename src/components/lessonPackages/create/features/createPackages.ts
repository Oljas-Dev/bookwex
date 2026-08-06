import { supabase } from "../../../../api/supabase/supabase";


export async function createLessonPackages(packages: {
  lesson_id: string | undefined;
  teacher_id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  lessons_count: number | undefined;
  price: number | undefined;
}[]) {
  const { data, error } = await supabase
    .from("lesson_packages")
    .insert(packages)
    .select();

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
}