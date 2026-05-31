import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase/supabase";
import { useAuth } from "../../../contexts/useAuth";

export function useTeachersLessons() {
  const { profile } = useAuth();

  const now = new Date().toISOString();

  const { data: bookedLessons, isPending: loadingTeachersLessons } = useQuery({
    queryKey: ["teacher-bookings", profile?.id],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
    *,

    student:profiles!bookings_booked_by_fkey (
      avatar_url
    )
  `,
        )
        .gt("start_time", now);

      if (error) throw error;

      return data;
    },

    enabled: !!profile?.id,
  });

  return {
    bookedLessons,
    loadingTeachersLessons,
  };
}
