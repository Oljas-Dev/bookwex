import { supabase } from "../../../api/supabase/supabase";

export async function clearUnreadCount({
  bookingId,
  role,
}: {
  bookingId: string | undefined;
  role: "teacher" | "student";
}) {
  const column =
    role === "teacher" ? "teacher_unread_count" : "student_unread_count";

  const { error } = await supabase
    .from("bookings")
    .update({
      [column]: 0,
    })
    .eq("id", bookingId);

  if (error) throw error;
}
