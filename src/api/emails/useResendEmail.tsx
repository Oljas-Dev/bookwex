type SendEmailPayload = {
  to: string | string[] | undefined;
  subject: string;
  html: string;
};

export async function sendEmail(data: SendEmailPayload[]): Promise<void> {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to send email");
  }

  return res.json();
}
