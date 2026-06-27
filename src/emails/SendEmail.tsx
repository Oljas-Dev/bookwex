import { sendEmail } from "../api/emails/useResendEmail";
import { capitalizeAllFirst } from "../helpers/features";

interface bookingConfirmEmail {
  bookingDate: string;
  startTime: string;
  endTime: string;
  studentEmail: string;
  teacherEmail: string;
  teacherName: string;
}

export async function bookingConfirmationEmail({
  data,
}: {
  data: bookingConfirmEmail;
}) {
  const formattedTeacherName = capitalizeAllFirst(data.teacherName);
  try {
    await sendEmail([
      {
        to: `${data.teacherEmail}`,
        subject: "One step closer to Tutor Web App release",
        html: `<div>
            <h1>You have booked lesson on ${data.bookingDate}!</h1>
            <p>Your server works successfully and sends emails using Resend.</p>
            <p>Congratulations, on finishing this part!</p>
            <p>You are well done! 😉🚀</p>
        </div>`,
      },
      {
        to: `${data.studentEmail}`,
        subject: `You've booked a lesson with ${data.teacherName}`,
        html: `<div>
            <h1>You have booked a lesson on ${data.bookingDate}!</h1>
            <p>${formattedTeacherName} will wait for you from ${data.startTime}.</p>
            <p>You can cancel this booking 12 hours before lesson starts.</p>
            <p>From your loving Teacher!!!</p>
        </div>`,
      },
    ]);
  } catch (error) {
    console.error(error);
  }
}
