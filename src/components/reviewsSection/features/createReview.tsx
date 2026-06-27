import { supabase } from "../../../api/supabase/supabase";

interface reviewTypes {
  userId: string | undefined;
  rating: number;
  review: string;
  bookingId: string | undefined;
}

export async function createReview({ review }: { review: reviewTypes }) {
  // const { data: existingReview } = await supabase
  //   .from("teacher_reviews")
  //   .select("id")
  //   .eq("booking_id", review.bookingId)
  //   .maybeSingle();

  // if (existingReview) {
  //   throw new Error("Review already exists");
  // }

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", review.bookingId)
    .single();

  if (booking.status !== "completed") {
    throw new Error("Lesson not completed yet");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    .upsert(
      {
        booking_id: booking.id,
        teacher_id: booking.teacher_id,
        student_id: user?.id,

        reviewer_name: profile.full_name,
        reviewer_avatar: profile.avatar_url,

        rating: review.rating,
        review: review.review,
      },
      {
        onConflict: "booking_id",
      },
    );

  if (errorReviews) {
    console.error(errorReviews?.message);
    throw errorReviews;
  }

  return data;
}
