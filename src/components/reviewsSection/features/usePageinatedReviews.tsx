import { useQuery } from "@tanstack/react-query";
import { getPaginatedReviews } from "./getTeacherReviews";

export function usePaginatedReviews(teacherId: string, page: number) {
  return useQuery({
    queryKey: ["teacherReviews", teacherId, page],
    queryFn: () => getPaginatedReviews(teacherId, page),
    enabled: !!teacherId,
    staleTime: 1000 * 60 * 5,
  });
}
