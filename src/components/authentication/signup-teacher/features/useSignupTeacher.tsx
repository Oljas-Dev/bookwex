import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signupTeacher } from "./signupTeacher";

export function useSignupTeacher() {
  return useMutation({
    mutationFn: signupTeacher,

    onSuccess() {
      toast.success("Account created successfully");
    },

    onError(error) {
      toast.error(error.message);
    },
  });
}
