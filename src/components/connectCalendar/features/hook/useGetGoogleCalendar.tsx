import { useQuery } from "@tanstack/react-query";
import { getGoogleCalendar } from "../api/getGoogleCalendar";

export function useGetGoogleCalendar() {
  const { data: calendar, isPending } = useQuery({
    queryKey: ["get-google-calendar"],

    queryFn: getGoogleCalendar,
  });

  return { calendar, isPending };
}
