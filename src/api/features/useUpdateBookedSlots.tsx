import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookedSlots as apiUpdateBookings } from "../CRUD/apiGetBookedSlots";
import toast from "react-hot-toast";

export default function useUpdateBookedSlots() {
  const queryClient = useQueryClient();

  const { mutate: updateBookedSlots, isPending: isUpdatingBookings } =
    useMutation({
      mutationFn: apiUpdateBookings,
      mutationKey: ["bookings"],
      onSuccess: () => {
        toast.success("Slots were successfully updated");
        queryClient.invalidateQueries({ queryKey: ["slots"] });
      },
      onError: (err) => alert(err.message),
    });

  return { updateBookedSlots, isUpdatingBookings };
}
