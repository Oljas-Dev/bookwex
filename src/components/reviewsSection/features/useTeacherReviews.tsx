import { useQuery } from "@tanstack/react-query";
import { getTeacherReviews } from "./getTeacherReviews";

export function useTeacherReviews(teacherId: string | undefined) {
  return useQuery({
    queryKey: ["teacher-reviews", teacherId],

    queryFn: () => getTeacherReviews(teacherId!),

    enabled: !!teacherId,
  });
}
