import { supabase } from "./../../../api/supabase/supabase";

export async function updateLessonOutcome({
  bookingId,
  role,
  outcome,
}: {
  bookingId: string;
  role: "teacher" | "student";
  outcome: "completed" | "no_show";
}) {
  const column = role === "teacher" ? "teacher_outcome" : "student_outcome";

  const { error } = await supabase
    .from("bookings")
    .update({
      [column]: outcome,
    })
    .eq("id", bookingId);

  if (error) throw error;
}

export async function getReviewableBookings(studentId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      teacher_id,
      status,
      teacher_reviews!left(id)
    `,
    )
    .eq("student_id", studentId)
    .eq("status", "completed");

  if (error) throw error;

  return data?.filter((booking) => booking.teacher_reviews.length === 0);
}
