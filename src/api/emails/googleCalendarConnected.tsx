import { sendEmail } from "./useResendEmail";

interface googleCalendarEmail {
  teacherEmail: string | undefined;
}

export async function googleCalendarConnected(data: googleCalendarEmail) {
  try {
    await sendEmail([
      {
        to: data.teacherEmail,
        subject: "Your Google Calendar is connected",
        html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>🎉 Google Calendar connected successfully!</h2>

      <p>
        Great news! Your Google Calendar has been successfully connected to 
        <strong>Bookwex</strong>.
      </p>

      <p>
        Bookwex will use your calendar connection to synchronize availability,
        help prevent double bookings, and add your Bookwex lessons to your calendar.
      </p>

      <p>
        Your Google Calendar connection can be managed anytime from your 
        Bookwex profile settings under the calendar connection section.
      </p>

      <p>
        You can disconnect Google Calendar whenever you want. After disconnecting,
        synchronization will stop and your stored calendar connection data will be removed.
      </p>

      <p>
        We hope this integration makes managing your lessons easier and improves
        your teaching experience.
      </p>

      <br />

      <p>
        Best wishes,
      </p>

      <p>
        <strong>The Bookwex Team</strong>
      </p>

      <p style="font-size: 12px; color: #777;">
        Questions? Contact us at privacy@bookwex.com
      </p>
    </div>
  `,
      },
    ]);
  } catch (error) {
    console.error(error);
  }
}
