import type { bookedSlots } from "../../contexts/BookingContextData";
import { supabase } from "../supabase/supabase";

export async function apiGetBookings() {
  const { data, error } = await supabase.from("bookings").select(`
      id,
      start_time,
      duration,
      type,

      teacher:teacher_id (
        id,
        full_name,
        avatar_url
      ),

      student:student_id (
        id,
        full_name,
        avatar_url
      )
    `);

  if (error) throw error;

  return data;
}

export async function updateBookedSlots({
  slot_id,
  teacher_id,
  student_id,
  start_time,
  duration,
  type,
}: bookedSlots) {
  const { data, error } = await supabase.from("bookings").insert({
    slot_id,
    teacher_id,
    student_id,
    start_time,
    duration,
    type,
  });

  if (error) {
    console.error(error.message);
  }

  return data;
}
