import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../CRUD/apiProfile";
import { useAuth } from "../../contexts/useAuth";

export default function useStudent() {
  const { user } = useAuth();

  const { data: student, isPending: isPendingStudent } = useQuery({
    queryKey: ["profiles", user?.id],
    queryFn: () => getStudent(user!.id),
    enabled: !!user?.id,
  });
  return { student, user, isPendingStudent };
}
