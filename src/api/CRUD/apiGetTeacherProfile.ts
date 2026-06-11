import { supabase } from "../supabase/supabase";

export async function getTeacherProfile(teacherId: string) {
  const { data, error } = await supabase
    .from("teacher_data")
    .select(
      `
    *,
    
    profile:profiles!teacher_data_teacher_id_fkey (
      id,
      full_name,
      avatar_url
    ),

    teacher_descriptions (
      *
    ),

    teacher_lessons (
      *
    ),

    teacher_social_links (
      *
    ),

    teacher_reviews (
      review,
      reviewer_name,
      reviewer_avatar,
      rating,
      created_at
    ),

    teacher_experience (
      *
    )
  `,
    )
    .eq("teacher_id", teacherId)
    .single();

  if (error) throw error;

  return data;
}
