import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../authentication/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLoginout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      navigate("/");
      toast.success("Hope to see you soon again!");
    },
  });

  return { logout, isLoginout };
}
