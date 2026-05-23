import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/supabase";

export function useTeachers() {
  const { data: profiles, isPending: profilesLoading } = useQuery({
    queryKey: ["profiles"],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("is_public", true);

      if (error) throw error;

      return data;
    },
  });
  return { profiles, profilesLoading };
}
