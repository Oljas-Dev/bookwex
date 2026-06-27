import { supabase } from "../../../api/supabase/supabase";

export async function upsertRating({
  bookingId,
  teacherId,
  rating,
  review,
}: {
  bookingId: string | undefined;
  teacherId: string | undefined;
  rating: number;
  review: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(bookingId, teacherId, rating);

  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase.from("teacher_reviews").upsert(
    {
      booking_id: bookingId,
      teacher_id: teacherId,
      student_id: user.id,
      rating,
      review,
    },
    {
      onConflict: "booking_id",
    },
  );

  if (error) {
    console.error(error);
    throw error;
  }
}
