import { sendEmail } from "../api/emails/useResendEmail";
import { capitalizeAllFirst } from "../helpers/features";

interface bookingConfirmEmail {
  bookingDate: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  studentEmail: string | undefined;
  teacherEmail: string | undefined;
  teacherName: string | undefined;
}

export async function bookingConfirmationEmail(data: bookingConfirmEmail) {
  const formattedTeacherName = capitalizeAllFirst(data.teacherName);
  try {
    await sendEmail([
      {
        to: data.teacherEmail,
        subject: "New lesson booking – Bookwex",
        html: `<div>
            <h1>Your student has booked a lesson on ${data.bookingDate}!</h1>
            </br>
            </br>
            <p>You can cancel this booking 12 hours before lesson starts.</p>
            </br>
            </br>
            <p>Warm regards</p>
            <p>Bookwex team</p>
        </div>`,
      },
      {
        to: `${data.studentEmail}`,
        subject: "Booking confirmed – Bookwex",
        html: `<div>
            <h1>You have booked a lesson on ${data.bookingDate}!</h1>
            </br>
            </br>
            <p>
            Your lesson with ${formattedTeacherName} starts at
              <strong>${data.startTime}</strong>
            and ends at
              <strong>${data.endTime}</strong>.
            </p>
            <p>You can cancel this booking 12 hours before lesson starts.</p>
            </br>
            </br>
            <p>Warm regards</p>
            <p>Bookwex team</p>
        </div>`,
      },
    ]);
  } catch (error) {
    console.error(error);
  }
}
