import { useMutation } from "@tanstack/react-query";
import { sendVerificationEmail } from "./sendVerificationEmail";

export function useVerificationEmail() {
  return useMutation({
    mutationFn: ({ email, fullName }: { email: string; fullName: string }) =>
      sendVerificationEmail(email, fullName),
  });
}
