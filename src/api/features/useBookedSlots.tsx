import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/supabase";
import { mapBooking } from "../../mappers/mapBookings";
import { useAuth } from "../../contexts/useAuth";

export function useBookedSlots() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["bookings", user?.id],
    enabled: !!user,

    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings_view")
        .select("*")
        .or(`teacher_id.eq.${user!.id},student_id.eq.${user!.id}`);

      if (error) throw error;

      // console.log(data);

      return data.map((b) => mapBooking(b, user!.id));
    },
  });
}

// export function useBookedSlots() {
//   const { user } = useAuth();

//   return useQuery({
//     queryKey: ["bookings"],
//     queryFn: async () => {
//       const { data, error } = await supabase.from("bookings").select(`
//        id,
//   slot_id,
//   start_time,
//   duration,
//   type,
//   status,
//   teacher_outcome,
//   student_outcome,
//   rating,

//   teacher_unread_count,
//   student_unread_count,
//   last_message,
//   last_message_at,

//   teacher:teacher_id (
//     id,
//     full_name,
//     avatar_url
//   ),

//   student:student_id (
//     id,
//     full_name,
//     avatar_url
//   )
//     `);

//       if (error) throw error;

//       return data.map((b) => mapBooking(b, user?.id));
//     },
//     enabled: !!user,
//   });
// }
