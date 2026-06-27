import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../authentication/apiAuth";

type LoginInput = {
  email: string;
  password: string;
};

type Options = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

export function useLogin(options?: Options) {
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginInput) =>
      signin({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.user);

      queryClient.invalidateQueries({ queryKey: ["messages"] });

      options?.onSuccess?.();
    },

    onError: (err: Error) => {
      const message = err?.message || "Login failed";
      console.error("LOGIN ERROR:", message);

      options?.onError?.(message);
    },
  });

  return { login, isPending };
}
