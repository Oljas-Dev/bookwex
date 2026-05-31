import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../authentication/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signin({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user?.user);
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (err) => {
      console.error("ERROR", err.message);
    },
  });

  return { login, isPending };
}
