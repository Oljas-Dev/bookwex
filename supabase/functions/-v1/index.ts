import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js";
import { getGoogleAccessToken } from "./../_shared/google.ts";


Deno.serve(async (req) => {

  try {

    const { teacherId } = await req.json();


    if (!teacherId) {
      return Response.json(
        {
          error: "Missing teacherId",
        },
        {
          status: 400,
        },
      );
    }


    const accessToken =
      await getGoogleAccessToken(
        teacherId,
      );


    const now = new Date();

    const future =
      new Date();

    future.setMonth(
      future.getMonth() + 3,
    );


    const calendarResponse =
      await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events?" +
        new URLSearchParams({
          timeMin:
            now.toISOString(),

          timeMax:
            future.toISOString(),

          singleEvents:
            "true",

          orderBy:
            "startTime",
        }),
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        },
      );


    const calendarData =
      await calendarResponse.json();


    console.log(
      calendarData.items?.length,
      "events found",
    );


    const supabaseAdmin =
      createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get(
          "SERVICE_ROLE_KEY",
        )!,
      );


    // remove old google events
    await supabaseAdmin
      .from("calendar_busy_times")
      .delete()
      .eq(
        "teacher_id",
        teacherId,
      )
      .eq(
        "source",
        "google",
      );


    const busyTimes =
      (calendarData.items ?? [])
      .filter(
        (event:any) =>
          event.start?.dateTime &&
          event.end?.dateTime,
      )
      .map(
        (event:any) => ({
          teacher_id:
            teacherId,

          start_time:
            event.start.dateTime,

          end_time:
            event.end.dateTime,

          source:
            "google",

          google_event_id:
            event.id,
        }),
      );


    if (busyTimes.length) {

      await supabaseAdmin
        .from("calendar_busy_times")
        .insert(
          busyTimes,
        );

    }


    return Response.json({
      success:true,
      synced:
        busyTimes.length,
    });


  } catch(error) {

    console.error(error);

    return Response.json(
      {
        error:
          error.message,
      },
      {
        status:500,
      },
    );
  }

});