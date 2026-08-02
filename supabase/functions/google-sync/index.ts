import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js";
import { getGoogleAccessToken } from "../_shared/google.ts";


const allowedOrigins = [
  "http://localhost:5173",
  "https://www.bookwex.com",
];


Deno.serve(async (req) => {
  const origin = req.headers.get("Origin");

  const corsHeaders = {
    "Access-Control-Allow-Origin":
      allowedOrigins.includes(origin ?? "")
        ? origin!
        : "https://www.bookwex.com",

    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };


  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }


  try {

    const { teacherId } =
      await req.json();


    if (!teacherId) {
      return new Response(
        JSON.stringify({
          error: "Missing teacherId",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        },
      );
    }


    const accessToken =
      await getGoogleAccessToken(
        teacherId,
      );


    // keep the rest of your sync logic here
    const now = new Date();

const future = new Date();
future.setMonth(future.getMonth() + 3);


const calendarResponse = await fetch(
  "https://www.googleapis.com/calendar/v3/freeBusy",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: new Date().toISOString(),
      timeMax: new Date(
        Date.now() + 90 * 24 * 60 * 60 * 1000,
      ).toISOString(),

      items: [
        {
          id: "primary",
        },
      ],
    }),
  },
);


const calendarData =
  await calendarResponse.json();

const busyTimes =
  data.calendars.primary.busy.map((busy) => ({
    teacher_id: teacherId,
    start_time: busy.start,
    end_time: busy.end,
    source: "google",
  }));

    const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get(
      "SERVICE_ROLE_KEY",
    )!,
  );

await supabaseAdmin
  .from("calendar_busy_times")
  .delete()
  .eq("teacher_id", teacherId)
  .eq("source", "google");


if (busyTimes.length > 0) {
  const { error: insertError } =
    await supabaseAdmin
      .from("calendar_busy_times")
      .insert(busyTimes);

  if (insertError) {
    throw insertError;
  }
}


const { error: updateError } =
  await supabaseAdmin
    .from("teacher_calendars")
    .update({
      last_synced_at:
        new Date().toISOString(),

      sync_status:
        "active",
    })
    .eq(
      "teacher_id",
      teacherId,
    );


if (updateError) {
  throw updateError;
}


    return new Response(
      JSON.stringify({
        success: true,
        data: calendarData.items,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      },
    );


  } catch (error) {

    console.error(error);

    return new Response(
      JSON.stringify({
        error:
          error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      },
    );
  }
});