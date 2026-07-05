import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error("Missing RESEND_API_KEY");
}

const resend = new Resend(apiKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const emails = req.body as EmailPayload[];

    const { data, error } = await resend.batch.send(
      emails.map((email) => ({
        from: "notification@mail.bookwex.com",
        to: email.to,
        subject: email.subject,
        html: email.html,
      })),
    );

    if (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
