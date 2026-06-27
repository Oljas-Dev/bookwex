import { supabase } from "../../../api/supabase/supabase";
import type { viewerRoleType } from "../../../types/ui";

export async function updateLessonOutcome({
  bookingId,
  role,
  outcome,
}: {
  bookingId: string;
  role: viewerRoleType;
  outcome: "completed" | "no_show" | "pending";
}) {
  const column = role === "teacher" ? "teacher_outcome" : "student_outcome";

  const { error } = await supabase
    .from("bookings")
    .update({
      [column]: outcome,
    })
    .eq("id", bookingId)
    .select();

  if (error) {
    console.error("Supabase update error:", error.message);
    throw error;
  }
}
