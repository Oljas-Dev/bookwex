import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLessonOutcome } from "./confirmLessonApi";
import toast from "react-hot-toast";

export function useUpdateLessonOutcome() {
  const queryClient = useQueryClient();

  const { mutate: updateOutcome, isPending } = useMutation({
    mutationFn: updateLessonOutcome,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateOutcome, isPending };
}
