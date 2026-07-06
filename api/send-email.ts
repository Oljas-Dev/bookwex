import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";
// import { createClient } from "@supabase/supabase-js";
// import { signupVerificationTemplate } from "../emails/signupVerification";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

// const supabaseAdmin = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
// );

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

// import { Resend } from "resend";
// import type { VercelRequest, VercelResponse } from "@vercel/node";
// import { createClient } from "@supabase/supabase-js";

// type EmailPayload = {
//   to: string;
//   subject: string;
//   html: string;
// };

// type VerificationPayload = {
//   type: "signup-verification";
//   html: string;
//   email: string;
//   fullName: string;
// };

// const supabaseAdmin = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
// );

// const resend = new Resend(process.env.RESEND_API_KEY!);

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({
//       error: "Method not allowed",
//     });
//   }

//   try {
//     // --------------------------
//     // Signup verification email
//     // --------------------------

//     if (!Array.isArray(req.body)) {
//       const body = req.body as VerificationPayload;

//       if (body.type === "signup-verification") {
//         const { data, error } = await supabaseAdmin.auth.admin.generateLink({
//           type: "signup",
//           email: body.email,
//         });

//         if (error) {
//           return res.status(500).json(error);
//         }

//         const html = signupVerificationTemplate(
//           body.fullName,
//           data.properties.action_link,
//         );

//         await resend.emails.send({
//           from: "notifications@mail.bookwex.com",
//           to: body.email,
//           subject: "Confirm your Bookwex account",
//           html,
//         });

//         return res.status(200).json({
//           success: true,
//         });
//       }

//       return res.status(400).json({
//         error: "Unknown request type",
//       });
//     }

//     // --------------------------
//     // Booking emails
//     // --------------------------

//     const emails = req.body as EmailPayload[];

//     const { data, error } = await resend.batch.send(
//       emails.map((email) => ({
//         from: "notifications@mail.bookwex.com",
//         to: email.to,
//         subject: email.subject,
//         html: email.html,
//       })),
//     );

//     if (error) {
//       return res.status(500).json(error);
//     }

//     return res.status(200).json(data);
//   } catch (err) {
//     console.error(err);

//     return res.status(500).json({
//       error: "Internal server error",
//     });
//   }
// }
