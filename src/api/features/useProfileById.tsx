import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/supabase";

export function useProfileById(userId?: string) {
  const { data: teacher, isPending } = useQuery({
    queryKey: ["profiles", userId],
    enabled: !!userId,

    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .eq("role", "admin")
        .single();

      if (error) {
        console.error(error.message);
        throw error;
      }

      return data;
    },
  });

  return { teacher, isPending };
}
