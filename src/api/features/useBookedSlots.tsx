import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/supabase";
import { mapBooking } from "../../mappers/mapBookings";

export function useBookedSlots() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("bookings").select(`
      id,
      slot_id,
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

      return data.map(mapBooking);
    },
  });
}
