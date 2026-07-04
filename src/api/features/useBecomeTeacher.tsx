import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { becomeTeacher } from "../authentication/becomeTeacher";
import { useNavigate } from "react-router-dom";

export function useBecomeTeacher() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: activateTeacher, isPending } = useMutation({
    mutationFn: becomeTeacher,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["teacher-profile"],
      });

      toast.success("Teacher profile created");
      navigate("/profile");
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return {
    activateTeacher,
    isPending,
  };
}
