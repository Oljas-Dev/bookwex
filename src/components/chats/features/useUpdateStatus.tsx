import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase/supabase";
import type { Message } from "../../../types/chats";
// import type { Message } from "./useSendMessage";

export function useUpdateStatus() {
  const queryClient = useQueryClient();

  const { mutate: changeStatus, isPending } = useMutation({
    mutationKey: ["messages"],
    mutationFn: async ({
      bookingId,
      userId,
    }: {
      bookingId: string | undefined;
      userId: string | undefined;
    }) => {
      const { data, error } = await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("booking_id", bookingId)
        .neq("sender_id", userId)
        .select();

      if (error) {
        console.error(error.message);
        throw error;
      }
      return data;
    },
    onSuccess: (_, { bookingId }) => {
      queryClient.setQueryData(["messages", bookingId], (old: Message[] = []) =>
        old.map((msg) => ({
          ...msg,
          is_read: true,
        })),
      );
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
  return { changeStatus, isPending };
}
