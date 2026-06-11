import { supabase } from "../../../api/supabase/supabase";

interface reviewTypes {
  userId: string;
  student_id: string;
  rating: number;
  review: string;
  bookingId: string;
}

export async function createReview({ review }: { review: reviewTypes }) {
  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", review.bookingId)
    .single();

  if (booking.status !== "completed") {
    throw new Error("Lesson not completed yet");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", review.userId)
    .single();

  if (error) {
    console.error(error?.message);
    throw error;
  }

  // Creating new review
  const { data, error: errorReviews } = await supabase
    .from("teacher_reviews")
    .insert({
      booking_id: booking.id,
      teacher_id: booking.teacher_id,
      student_id: review.student_id,

      reviewer_name: profile.full_name,
      reviewer_avatar: profile.avatar_url,

      rating: review.rating,
      review: review.review,
    });

  if (errorReviews) {
    console.error(errorReviews?.message);
    throw errorReviews;
  }

  return data;
}
