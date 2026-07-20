import { useQuery } from "@tanstack/react-query";
import { getFounderCount } from "../features/getFounderCount";

export function useFounderCount() {
  const { data: founderCount, isPending } = useQuery({
    queryKey: ["founder-count"],
    queryFn: getFounderCount,
  });
  return { founderCount, isPending };
}
