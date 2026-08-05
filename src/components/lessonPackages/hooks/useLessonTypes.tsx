import { useQuery } from "@tanstack/react-query";
import { getLessonTypesApi } from "../features/packagesApi";

export default function useLessonTypes(teacherId: string) {
  const { data: lessonTypes, isPending } = useQuery({
    queryKey: ["lesson-types"],
    queryFn: () => getLessonTypesApi(teacherId),
  });

  return { lessonTypes, isPending };
}
