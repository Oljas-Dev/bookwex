import { supabase } from "../supabase/supabase";

export async function bookLesson({ lessonId }: { lessonId: string }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  // 1. Get slot details (IMPORTANT)
  const { data: slot, error: slotError } = await supabase
    .from("slots")
    .select("*")
    .eq("id", lessonId)
    .single();

  if (slotError) throw slotError;

  // 2. Create booking (SOURCE OF TRUTH)
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      slot_id: lessonId,
      teacher_id: slot.user_id,
      student_id: user.id,
      start_time: slot.start_time,
      duration: slot.duration ?? 30,
      type: "lesson",
    })
    .select()
    .single();

  if (bookingError) throw bookingError;

  // 3. Mark slot as booked
  const { error: updateError } = await supabase
    .from("slots")
    .update({ status: "booked", booked_by: user.id })
    .eq("id", lessonId);

  if (updateError) throw updateError;

  return booking;
}

// import { supabase } from "../supabase/supabase";

// export async function bookLesson({ lessonId }: { lessonId: string }) {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) throw new Error("User not authenticated");

//   const { data, error } = await supabase
//     .from("slots")
//     .update({ status: "booked", booked_by: user?.id })
//     .eq("id", lessonId)
//     .eq("status", "available")
//     .select();

//   if (error) {
//     console.error(error.message);
//   }

//   return data;
// }
