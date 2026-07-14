import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/supabase";

export function useLessons(teacherId: string | undefined) {
  const now = new Date().toISOString();

  const { data: lessons, isPending } = useQuery({
    queryKey: ["slots", teacherId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slots")
        .select("*")
        .eq("user_id", teacherId)

        .gt("end_time", now);

      if (error) throw error;
      return data;
    },
    enabled: !!teacherId,
  });
  return { lessons, isPending };
}
