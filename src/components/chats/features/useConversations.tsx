import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/useAuth";
import { supabase } from "../../../api/supabase/supabase";
import { mapConversation } from "../../../mappers/mapConversations";

export function useConversations() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["conversations", user?.id],
    enabled: !!user?.id,

    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations_view")
        .select("*")
        .or(`teacher_id.eq.${user!.id},student_id.eq.${user!.id}`)
        .not("last_message", "is", null)
        .order("last_message_at", { ascending: false });

      if (error) throw error;
      // console.log(data);

      return data.map((row) => mapConversation(row, user!.id));
    },
  });
}

// export function useConversations() {
//   const { user } = useAuth();

//   return useQuery({
//     queryKey: ["conversations", user?.id],

//     enabled: !!user?.id,

//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("bookings")
//         .select(
//           `
//     id,
//     teacher_id,
//     student_id,
//     teacher_unread_count,
//     student_unread_count,
//     last_message,
//     last_message_at,
//     start_time,
//     duration,

//     teacher:teacher_id (
//       id,
//       full_name,
//       avatar_url
//     ),

//     student:student_id (
//       id,
//       full_name,
//       avatar_url
//     )
//   `,
//         )
//         .or(`teacher_id.eq.${user?.id},student_id.eq.${user?.id}`)
//         .not("last_message", "is", null)
//         .order("last_message_at", { ascending: false });

//       if (error) throw error;

//       return data.map((booking) => mapConversation(booking, user!.id));
//     },
//   });
// }
