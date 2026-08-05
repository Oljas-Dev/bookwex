import { useQuery } from "@tanstack/react-query";
import { getLessonOffer } from "../features/getLessonOffer";

export default function useGetLessonOffer(
  lessonOfferId: string | undefined,
  teacherId: string | undefined,
) {
  if (!lessonOfferId || !teacherId)
    return {
      lessonTitle: null,
      isPending: false,
    };

  const { data: lessonTitle, isPending } = useQuery({
    queryKey: ["lesson-title"],
    queryFn: () => getLessonOffer(lessonOfferId, teacherId),
  });

  return { lessonTitle, isPending };
}
