import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { TeacherLesson } from "../../../../types/ui";
import { updateTeacherLessons } from "../../../HeroSection/features/api/apiTeacherProfile";

export function useUpdateTeacherOffers() {
  const queryClient = useQueryClient();

  const { mutate: updateLessons, isPending } = useMutation({
    mutationFn: (lessons: TeacherLesson[] | undefined) =>
      updateTeacherLessons(lessons),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teacher-profile"],
      });

      toast.success("Lessons updated successfully");
    },

    onError: (err: Error) => {
      toast.error(err.message);
      console.error(err.message);
    },
  });

  return {
    updateLessons,
    isPending,
  };
}
