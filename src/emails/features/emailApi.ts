import { supabase } from "../../api/supabase/supabase";
import { mapBookingConfirmation } from "../../mappers/mapBookingConfirmation";

export async function getBookingConfirmationData(bookingId: string) {
  const { data, error } = await supabase
    .from("booking_confirmation_view")
    .select("*")
    .eq("slot_id", bookingId)
    .single();

  if (error) throw error;

  return mapBookingConfirmation(data);
}
