import { useQuery } from "@tanstack/react-query";
import { getLessonOffer } from "../features/getLessonOffer";

export default function useGetLessonOffer(
  lessonOfferId: string | undefined,
  teacherId: string | undefined,
) {
  const { data: lessonTitle, isPending } = useQuery({
    queryKey: ["lesson-title", lessonOfferId, teacherId],
    queryFn: () => getLessonOffer(lessonOfferId!, teacherId!),
    enabled: !!lessonOfferId && !!teacherId,
  });

  return { lessonTitle, isPending };
}
