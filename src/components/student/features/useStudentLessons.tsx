import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase/supabase";
import useStudent from "../../../api/features/useCurrentUser";

export function useStudentLessons() {
  const { student } = useStudent();

  const now = new Date().toISOString();

  const { data: studentLessons, isPending } = useQuery({
    queryKey: ["slots", student?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slots")
        .select("*")
        .eq("booked_by", student?.id)
        .gt("end_time", now);

      if (error) throw error;
      return data;
    },
    enabled: !!student?.id,
  });
  return { studentLessons, isPending };
}
