import { useQuery } from "@tanstack/react-query";
import useProfile from "./useProfile";
import { supabase } from "../supabase/supabase";

export function useLessons() {
  const { profile: teacher } = useProfile();

  const now = new Date().toISOString();

  const { data: lessons, isPending } = useQuery({
    queryKey: ["slots", teacher?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slots")
        .select("*")
        .eq("user_id", teacher?.id)

        .gt("end_time", now);

      if (error) throw error;
      return data;
    },
    enabled: !!teacher?.id,
  });
  return { lessons, isPending };
}
