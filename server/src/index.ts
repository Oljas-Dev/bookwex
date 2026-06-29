import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY in environment variables");
}

const resend = new Resend(resendApiKey);

// type SendEmailBody = {
//   to: string | string[];
//   subject: string;
//   html: string;
// };

type EmailItem = {
  to: string | string[];
  subject: string;
  html: string;
};

app.post("/api/send-email", async (req: Request, res: Response) => {
  const body = req.body as EmailItem[] | undefined;

  if (!body?.length) {
    return res.status(400).json({ error: "Missing emails" });
  }

  const { data, error } = await resend.batch.send(
    body.map((email) => ({
      from: "onboarding@resend.dev",
      ...email,
    })),
  );

  if (error) {
    console.error(error);
    return res.status(500).json({ error });
  }

  return res.json({ success: true, data });
});

// app.post(
//   "/api/send-email",
//   async (req: Request<object, object, SendEmailBody[]>, res: Response) => {
//     try {
//       // const { to, subject, html } = req.body;

//       if (!req.body) {
//         return res.status(400).json({ error: "Missing fields" });
//       }

//       const { data, error } = await resend.batch.send([
//         {
//           from: "onboarding@resend.dev",
//           to: req.body[0].to,
//           subject: req.body[0].subject,
//           html: req.body[0].html,
//         },
//         {
//           from: "onboarding@resend.dev",
//           to: req.body[1].to,
//           subject: req.body[1].subject,
//           html: req.body[1].html,
//         },
//       ]);
//       res.json({ success: true, data });
//       console.log(data);

//       if (error) console.error(error);
//     } catch (error) {
//       console.error("Resend error: ", error);
//       res.status(500).json({ success: false });
//     }
//   },
// );

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
