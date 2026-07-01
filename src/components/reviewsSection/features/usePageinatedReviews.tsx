import { useQuery } from "@tanstack/react-query";
import { getPaginatedReviews } from "./getTeacherReviews";

export function usePaginatedReviews(
  teacherId: string,
  page: number,
  pageSize?: number,
) {
  return useQuery({
    queryKey: ["teacherReviews", teacherId, page, pageSize],
    queryFn: () => getPaginatedReviews(teacherId, page, pageSize),
    enabled: !!teacherId,
    staleTime: 1000 * 60 * 5,
  });
}
