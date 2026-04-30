import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../CRUD/apiProfile";
import { useUser } from "./useUser";

export default function useStudent() {
  const { user, isLoading: userLoading } = useUser();

  const { data: student, isPending: isPendingStudent } = useQuery({
    queryKey: ["profiles", user?.id],
    queryFn: () => getStudent(user!.id),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
  return { student, user, isLoading: isPendingStudent || userLoading };
}
