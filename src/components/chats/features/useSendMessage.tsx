import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase/supabase";
import { useUser } from "../../../api/features/useUser";
import { mapMessage } from "../../../mappers/mapMessage";
import type { Message } from "../../../types/chats";
// import type { MessageRow } from "../../../types/chats";

// export type Message = {
//   id: string;
//   booking_id: string;
//   sender_id: string | undefined;
//   text: string | undefined;
//   created_at: string;
//   optimistic?: boolean;
//   is_read?: boolean;
//   sender?: Partial<Profile> | undefined;
// };

interface UserType {
  id: string;
  full_name: string;
  avatar_url: string;
}

type BookingType = {
  duration: number;
  id: string;
  start_time: string;
  student: UserType;
  teacher: UserType;
  teacher_unread_count: number;
  student_unread_count: number;
};

type SendMessageInput = {
  bookingId: string;
  text: string | undefined;
};

type ChatRoomData = {
  booking: BookingType; // your booking type
  messages: Message[];
};

export function useSendMessage() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, text }: SendMessageInput) => {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          booking_id: bookingId,
          sender_id: user?.id,
          text,
        })
        .select()
        .single();

      if (error) {
        console.error(error.message);
        throw error;
      }
      return mapMessage(data);
    },

    // optimistic update
    onMutate: async ({ bookingId, text }) => {
      const queryKey = ["chat-room", bookingId];

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<ChatRoomData>(queryKey);

      const tempId = "temp-" + Date.now();

      const optimisticMessage: Message & { optimistic: boolean } = {
        id: tempId,
        bookingId: bookingId,
        senderId: user?.id,
        text,
        createdAt: new Date().toISOString(),
        optimistic: true,
      };

      queryClient.setQueryData<ChatRoomData>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          messages: [...old.messages, optimisticMessage],
        };
      });

      return {
        previousData,
        tempId,
        queryKey,
      };
    },

    // ❌ ROLLBACK on error
    onError: (_err, _variables, context) => {
      if (!context?.previousData) return;

      queryClient.setQueryData(context.queryKey, context.previousData);
    },

    // ✅ REPLACE optimistic with real message
    onSuccess: (data, variables, context) => {
      if (!context) return;

      queryClient.setQueryData<ChatRoomData>(context.queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          messages: old.messages.map((msg) =>
            msg.id === context.tempId ? data : msg,
          ),
        };
      });

      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["chat-room", variables.bookingId],
      });
    },

    onSettled: (_data, _error, _variables, context) => {
      if (!context) return;

      queryClient.invalidateQueries({
        queryKey: context.queryKey,
      });
    },
  });
}
