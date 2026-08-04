import { sendEmail } from "./useResendEmail";

interface googleCalendarEmail {
  teacherEmail: string | undefined;
}

export async function googleCalendarDisconnected(data: googleCalendarEmail) {
  try {
    await sendEmail([
      {
        to: data.teacherEmail,
        subject: "Your Google Calendar has been disconnected",
        html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>Google Calendar disconnected successfully</h2>

      <p>
        Your Google Calendar connection has been successfully removed from 
        <strong>Bookwex</strong>.
      </p>

      <p>
        Calendar synchronization has now stopped. Bookwex will no longer
        synchronize your availability or create and manage lesson events in
        your Google Calendar.
      </p>

      <p>
        Any stored Google Calendar connection data used for synchronization
        has been removed.
      </p>

      <p>
        If you would like to use calendar synchronization again in the future,
        you can reconnect your Google Calendar anytime from your Bookwex profile
        settings.
      </p>

      <p>
        We hope Bookwex continues to make managing your lessons easier.
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
