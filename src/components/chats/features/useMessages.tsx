import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase/supabase";
import type { Message } from "./useSendMessage";

export function useMessages(lessonId: string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["messages", lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("lesson_id", lessonId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  // ⚡ REALTIME SUBSCRIPTION
  useEffect(() => {
    if (!lessonId) return;

    const channel = supabase
      .channel(`messages-${lessonId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `lesson_id=eq.${lessonId}`,
        },
        (payload) => {
          queryClient.setQueryData(
            ["messages", lessonId],
            (old: Message[] = []) => {
              const exists = old.some((m) => m.id === payload.new.id);
              if (exists) return old;

              return [...old, payload.new];
            },
          );
        },
      )
      .subscribe();

    // cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, [lessonId, queryClient]);

  return query;
}
