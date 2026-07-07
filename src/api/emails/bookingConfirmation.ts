import { sendEmail } from "./useResendEmail";
import { capitalizeAllFirst } from "../../helpers/features";

interface bookingConfirmEmail {
  bookingDate: string | undefined;
  studentEmail: string | undefined;
  studentStartTime: string | undefined;
  studentEndTime: string | undefined;
  teacherEmail: string | undefined;
  teacherName: string | undefined;
  teacherStartTime: string | undefined;
  teacherEndTime: string | undefined;
}

export async function bookingConfirmationEmail(data: bookingConfirmEmail) {
  const formattedTeacherName = capitalizeAllFirst(data.teacherName);
  try {
    await sendEmail([
      {
        to: data.teacherEmail,
        subject: "New lesson booked on Bookwex",
        html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>🎉 You have a new lesson booking!</h2>

      <p>
        Great news! A student has booked a lesson with you through <strong>Bookwex</strong>.
      </p>

      <p>
        <strong>Date:</strong> ${data.bookingDate}<br />
        <strong>Time:</strong> ${data.teacherStartTime} – ${data.teacherEndTime}
      </p>

      <p>
        If your plans change, you can cancel this lesson up to
        <strong>12 hours before it begins.</strong>
      </p>

      <p>
        We hope you and your student have a productive lesson!
      </p>

      <br />

      <p>Best wishes,</p>
      <p><strong>The Bookwex Team</strong></p>
    </div>
  `,
      },
      {
        to: data.studentEmail,
        subject: "Your lesson is confirmed! 🎉",
        html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>Your booking is confirmed!</h2>

      <p>
        You're all set! Your lesson with
        <strong>${formattedTeacherName}</strong> has been successfully booked.
      </p>

      <p>
        <strong>Date:</strong> ${data.bookingDate}<br />
        <strong>Time:</strong> ${data.studentStartTime} – ${data.studentEndTime}
      </p>

      <p>
        You'll be able to join the lesson directly from your Bookwex dashboard
        shortly before it begins.
      </p>

      <p>
        Need to make a change? You can cancel your booking up to
        <strong>12 hours before the lesson starts.</strong>
      </p>

      <br />

      <p>We're excited to be part of your learning journey!</p>

      <br />

      <p>Best wishes,</p>
      <p><strong>The Bookwex Team</strong></p>
    </div>
  `,
      },
    ]);
  } catch (error) {
    console.error(error);
  }
}
