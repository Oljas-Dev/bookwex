import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../authentication/apiAuth";
import { useNavigate } from "react-router-dom";
import { toParamStr } from "../../helpers/features";
import toast from "react-hot-toast";

type LogoutVariables = {
  teacherSlug?: string;
};

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLoginout } = useMutation<
    void,
    Error,
    LogoutVariables
  >({
    mutationFn: logoutApi,
    onSuccess: (_, variables) => {
      const teacherSlug = toParamStr(variables?.teacherSlug);

      navigate(`/teacher/${teacherSlug}`);
      queryClient.removeQueries();
      toast.success("Hope to see you soon again!");
    },
  });

  return { logout, isLoginout };
}
