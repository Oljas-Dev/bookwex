export async function sendVerificationEmail(email: string, fullName: string) {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "signup-verification",
      email,
      fullName,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send verification email");
  }

  return res.json();
}
