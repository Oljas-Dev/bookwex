import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../api/supabase/supabase";
import toast from "react-hot-toast";

export function useCancelBooking() {
  const queryClient = useQueryClient();

  const { mutate: cancelBooking, isPending } = useMutation({
    mutationKey: ["slots"],
    mutationFn: async ({ bookingId }: { bookingId: string | undefined }) => {
      const { data, error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId)
        .select();

      if (error) {
        console.error(error.message);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slots"] });
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Booking was successfully canceled");
    },
  });

  return { cancelBooking, isPending };
}
