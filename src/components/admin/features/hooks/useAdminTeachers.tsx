import { useQuery } from "@tanstack/react-query";
import { getAdminTeachers } from "../api/getTeachers";

export function useAdminTeachers(type: string[]) {
  const { data: adminTeachers, isPending } = useQuery({
    queryKey: ["admin-teachers", type],
    queryFn: () => getAdminTeachers(type),
  });

  return { adminTeachers, isPending };
}
