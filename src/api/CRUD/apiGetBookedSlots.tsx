import { supabase } from "../supabase/supabase";

export async function apiGetBookedSlots() {
  const { data: bookings, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.error(error.message);
  }

  return bookings;
}

export async function updateBookedSlots({
  slot_id,
  full_name,
  booked_by,
  start_time,
  duration,
  type,
}) {
  const { data, error } = await supabase.from("bookings").insert({
    full_name,
    slot_id,
    booked_by,
    start_time,
    duration,
    type,
  });

  if (error) {
    console.error(error.message);
  }

  return data;
}
