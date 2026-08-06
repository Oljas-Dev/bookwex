import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createLessonPackages } from "../features/createPackages";
import { useNavigate } from "react-router-dom";

export default function useCreateLessonPackages() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createPackages, isPending } = useMutation({
    mutationFn: createLessonPackages,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson-packages"],
      });
      toast.success("Your lesson packages were successfuly created");
      navigate("/profile");
    },
  });

  return {
    createPackages,
    isPending,
  };
}
