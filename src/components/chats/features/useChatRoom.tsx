import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase/supabase";
import { mapMessage } from "../../../mappers/mapMessage";
import type { ChatRoomData } from "../../../types/chats";
import { mapChatRoom } from "../../../mappers/mapChatRoom";

export function useChatRoom(bookingId: string | undefined) {
  return useQuery<ChatRoomData>({
    queryKey: ["chat-room", bookingId],

    queryFn: async () => {
      const [messagesRes, bookingRes] = await Promise.all([
        supabase
          .from("messages")
          .select("*")
          .eq("booking_id", bookingId)
          .order("created_at"),

        supabase
          .from("bookings")
          .select(
            `
            id,
            teacher_unread_count,
            student_unread_count,
            start_time,
            duration,

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
            `,
          )
          .eq("id", bookingId)
          .single(),
      ]);

      if (messagesRes.error) throw messagesRes.error;
      if (bookingRes.error) throw bookingRes.error;

      return {
        booking: mapChatRoom(bookingRes.data),
        messages: messagesRes.data.map(mapMessage),
      };
    },
  });
}
