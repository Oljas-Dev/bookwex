import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase/supabase";
import type { Message } from "./useSendMessage";

export function useUpdateStatus() {
  const queryClient = useQueryClient();

  const { mutate: changeStatus, isPending } = useMutation({
    mutationKey: ["messages"],
    mutationFn: async ({
      lessonId,
      userId,
    }: {
      lessonId: string | undefined;
      userId: string | undefined;
    }) => {
      const { data, error } = await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("lesson_id", lessonId)
        .neq("sender_id", userId)
        .select();

      if (error) {
        console.error(error.message);
        throw error;
      }
      return data;
    },
    onSuccess: (_, { lessonId }) => {
      queryClient.setQueryData(["messages", lessonId], (old: Message[] = []) =>
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
