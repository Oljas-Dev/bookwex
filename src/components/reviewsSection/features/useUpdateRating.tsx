import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertRating } from "./upsertRating";

export function useUpsertRating() {
  const queryClient = useQueryClient();

  const { mutate: saveRating, isPending } = useMutation({
    mutationFn: upsertRating,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["teacher-reviews", variables.teacherId],
      });

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });

  return {
    saveRating,
    isPending,
  };
}
