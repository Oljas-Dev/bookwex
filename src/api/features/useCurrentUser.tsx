import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/useAuth";
import { supabase } from "../supabase/supabase";
import { mapCurrentUser } from "../../mappers/mapCurrentUser";

export default function useCurrentUser() {
  const { profile, loading } = useAuth();

  return useQuery({
    queryKey: ["current-user", profile?.id],

    enabled: !!profile?.id && !loading,

    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, conference_link, my_teachers")
        .eq("id", profile!.id)
        .single();

      if (error) throw error;

      const { data: teachers, error: teachersError } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", data.my_teachers ?? []);

      if (teachersError) throw teachersError;

      return mapCurrentUser({
        ...data,
        teachers,
      });
    },
  });
}
