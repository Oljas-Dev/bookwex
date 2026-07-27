import { useQuery } from "@tanstack/react-query";
import { getGoogleBusyTimes } from "./getGoogleBusyTimes";

export function useGoogleBusyTimes(teacherId: string | undefined) {
  return useQuery({
    queryKey: ["google-busy-times", teacherId],

    queryFn: () => getGoogleBusyTimes(teacherId!),

    enabled: !!teacherId,
  });
}
