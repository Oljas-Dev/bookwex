import { createClient } from "npm:@supabase/supabase-js";


export async function getGoogleAccessToken(
  teacherId: string,
) {
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get(
      "SERVICE_ROLE_KEY",
    )!,
  );


  const { data: calendar, error } =
    await supabaseAdmin
      .from("teacher_calendars")
      .select("*")
      .eq("teacher_id", teacherId)
      .eq("provider", "google")
      .single();


  if (error || !calendar) {
    throw new Error(
      "Google Calendar not connected",
    );
  }


  const expiresAt =
    new Date(calendar.expires_at);


  // token still valid
  if (
    expiresAt.getTime() >
    Date.now() + 60000
  ) {
    return calendar.access_token;
  }


  // refresh token
  const response =
    await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id:
            Deno.env.get(
              "GOOGLE_CLIENT_ID",
            )!,

          client_secret:
            Deno.env.get(
              "GOOGLE_CLIENT_SECRET",
            )!,

          refresh_token:
            calendar.refresh_token,

          grant_type:
            "refresh_token",
        }),
      },
    );


  const refreshed =
    await response.json();


  if (!refreshed.access_token) {
    throw new Error(
      "Unable to refresh Google token",
    );
  }


  const newExpiresAt =
    new Date(
      Date.now() +
      refreshed.expires_in * 1000,
    );


  await supabaseAdmin
    .from("teacher_calendars")
    .update({
      access_token:
        refreshed.access_token,

      expires_at:
        newExpiresAt.toISOString(),
    })
    .eq(
      "id",
      calendar.id,
    );


  return refreshed.access_token;
}