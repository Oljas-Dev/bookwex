import { useQuery } from "@tanstack/react-query";
import { apiGetBookedSlots } from "../CRUD/apiGetBookedSlots";

export default function useBookedSlots() {
  const { data: bookedSlots, isPending } = useQuery({
    queryKey: ["bookings"],
    queryFn: apiGetBookedSlots,
  });
  return { bookedSlots, isPending };
}
