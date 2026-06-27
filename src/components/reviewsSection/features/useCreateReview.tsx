import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createReview } from "./createReview";

export function useCreateReview() {
  const queryClient = useQueryClient();

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: createReview,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["teacher-reviews", variables.review.userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      toast.success("Review added");
    },
  });

  return {
    submitReview,
    isPending,
  };
}
