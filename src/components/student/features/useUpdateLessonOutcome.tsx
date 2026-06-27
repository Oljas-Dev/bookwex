import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLessonOutcome } from "./changeBookingStatus";
import toast from "react-hot-toast";

export function useUpdateLessonOutcome() {
  const queryClient = useQueryClient();

  const { mutate: updateOutcome, isPending } = useMutation({
    mutationFn: updateLessonOutcome,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Lesson status was successfully saved");
    },
  });

  return {
    updateOutcome,
    isPending,
  };
}
