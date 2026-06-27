import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/useAuth";
import { supabase } from "../supabase/supabase";
import { mapCurrentUser } from "../../mappers/mapCurrentUser";

export default function useCurrentUser() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profiles", user?.id],

    enabled: !!user?.id,

    queryFn: async () => {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, my_teachers")
        .eq("id", user!.id)
        .single();

      if (error) throw error;

      const { data: teachers, error: teachersError } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", profile.my_teachers ?? []);

      if (teachersError) throw teachersError;

      return mapCurrentUser({
        ...profile,
        teachers,
      });
    },
  });
}
