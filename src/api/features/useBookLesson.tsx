import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookLesson as apiBookLesson } from "../CRUD/apiUpdateLesson";
import toast from "react-hot-toast";

export function useBookLesson() {
  const queryClient = useQueryClient();

  const { mutateAsync: bookLesson, isPending: isBooking } = useMutation({
    mutationFn: ({ lessonId }: { lessonId: string }) =>
      apiBookLesson({ lessonId }),
    mutationKey: ["slots"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slots"] });
      toast.success(
        "Lesson was successfuly booked. Check your email with confirmation!",
      );
    },
    onError: (err) => {
      console.error(err.message);
    },
  });

  return { bookLesson, isBooking };
}
