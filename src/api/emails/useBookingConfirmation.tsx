import { useQuery } from "@tanstack/react-query";
import { getBookingConfirmationData } from "../../../emails/features/emailApi";

export function useBookingConfirmation(bookingId: string | undefined) {
  return useQuery({
    queryKey: ["booking-confirmation", bookingId],

    enabled: !!bookingId,

    queryFn: () => getBookingConfirmationData(bookingId!),
  });
}
