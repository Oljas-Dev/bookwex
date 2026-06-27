import { supabase } from "../../../api/supabase/supabase";
import { mapReview } from "../../../mappers/mapReview";
import type { PaginatedTeacherReviews } from "../../../types/reviews";

export async function getTeacherReviews(teacherId: string) {
  const { data, error } = await supabase
    .from("teacher_reviews")
    .select("*")
    .eq("teacher_id", teacherId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data.map(mapReview);
}

export async function getPaginatedReviews(
  teacherId: string,
  page = 1,
  pageSize = 3,
): Promise<PaginatedTeacherReviews> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("teacher_reviews")
    .select("*", { count: "exact" })
    .eq("teacher_id", teacherId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error(error.message);
    throw error;
  }

  return {
    reviews: data.map(mapReview),
    count: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}
