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
          .from("chat_room_view")
          .select("*")
          .eq("booking_id", bookingId)
          .single(),
      ]);

      if (messagesRes.error) throw messagesRes.error;
      if (bookingRes.error) throw bookingRes.error;

      // console.log(bookingRes.data);

      return {
        booking: mapChatRoom(bookingRes.data),
        messages: messagesRes.data.map(mapMessage),
      };
    },
  });
}

// grant select on bookings_view to authenticated;
