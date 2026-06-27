import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../authentication/apiAuth";
import toast from "react-hot-toast";

export function useSignUp(onSuccessCallback?: () => void) {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,

    onError: (err: Error) => {
      console.error(err.message);
      toast.error(err.message);
      throw new Error(err.message);
    },

    onSuccess: () => {
      onSuccessCallback?.();
    },
  });

  return { signup, isPending };
}
