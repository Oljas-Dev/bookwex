import { useMutation } from "@tanstack/react-query";
import { createFeedback } from "./createFeedback";
import toast from "react-hot-toast";

export function useCreateFeedback(onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: createFeedback,
    onError: (err: Error) => {
      console.error(err.message);
      toast.error(err.message);
      throw new Error(err.message);
    },
    onSuccess: () => {
      onSuccessCallback?.();
    },
  });
}
