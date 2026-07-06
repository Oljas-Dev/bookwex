import { sendEmail } from "../../../api/useResendEmail";

export function verifyEmail(email: string, fullName: string) {
  return sendEmail({
    type: "signup-verification",
    email,
    fullName,
  });
}
