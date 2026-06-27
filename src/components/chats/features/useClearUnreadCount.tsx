import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearUnreadCount } from "./clearUnreadCount";

export function useClearUnreadCount() {
  const queryClient = useQueryClient();

  const { mutate: clearUnread, isPending } = useMutation({
    mutationFn: clearUnreadCount,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["messages", variables.bookingId],
      });
    },
  });

  return {
    clearUnread,
    isPending,
  };
}
