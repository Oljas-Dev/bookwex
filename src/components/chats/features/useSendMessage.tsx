import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase/supabase";
import { useUser } from "../../../api/features/useUser";

export type Message = {
  id: string;
  lesson_id: string | undefined;
  sender_id: string | undefined;
  text: string | undefined;
  created_at: string;
  optimistic?: boolean;
  is_read?: boolean;
};

type SendMessageInput = {
  lessonId: string | undefined;
  text: string | undefined;
};

export function useSendMessage() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lessonId, text }: SendMessageInput) => {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          lesson_id: lessonId,
          sender_id: user?.id,
          text,
        })
        .select()
        .single();

      if (error) {
        console.error(error.message);
        throw error;
      }
      return data as Message;
    },

    // optimistic update
    onMutate: async ({ lessonId, text }) => {
      const queryKey = ["messages", lessonId];

      await queryClient.cancelQueries({ queryKey });

      const previousMessages =
        queryClient.getQueryData<Message[]>(queryKey) || [];

      const tempId = "temp-" + Date.now();

      const optimisticMessage: Message = {
        id: tempId,
        lesson_id: lessonId,
        sender_id: user?.id,
        text,
        created_at: new Date().toISOString(),
        optimistic: true,
      };

      queryClient.setQueryData<Message[]>(
        ["messages", lessonId],
        (old = []) => [...old, optimisticMessage],
      );

      return { previousMessages, tempId, queryKey };
    },

    // ❌ ROLLBACK on error
    onError: (_err, _variables, context) => {
      if (!context) return;

      queryClient.setQueryData(context.queryKey, context.previousMessages);
    },

    // ✅ REPLACE optimistic with real message
    onSuccess: (data, _variables, context) => {
      if (!context) return;

      queryClient.setQueryData<Message[]>(context.queryKey, (old = []) =>
        old.map((msg) => (msg.id === context.tempId ? data : msg)),
      );
    },

    onSettled: (_data, _error, _variables, context) => {
      if (!context) return;

      queryClient.invalidateQueries({
        queryKey: context.queryKey,
      });
    },
  });
}
