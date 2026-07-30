import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "npm:@supabase/supabase-js";

import { getGoogleAccessToken } from "../_shared/google.ts";

import { capitalizeAllFirst } from "../_shared/text.ts";


const allowedOrigins = [
  "http://localhost:5173",
  "https://www.bookwex.com",
];

let supabaseAdmin:
  ReturnType<typeof createClient> | null = null;
let bookingId: string | null = null;


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

    const body = await req.json();

  bookingId = body.bookingId;


  supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SERVICE_ROLE_KEY")!,
  );


    if (!bookingId) {
      return new Response(
        JSON.stringify({
          error: "Missing bookingId",
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

    /*
      Get booking information
    */

    const {
      data: booking,
      error: bookingError,
    } =
      await supabaseAdmin
        .from("bookings")
        .select(`
          id,
          start_time,
          duration,
          teacher_id,
          student_id,
          student:student_id (
          full_name
        )
        `)
        .eq(
          "id",
          bookingId,
        )
        .single();


    if (bookingError || !booking) {
      throw bookingError;
    }


    /*
      Get teacher Google token
    */

    if (!booking.teacher_id) {
  throw new Error(
    "Booking has no teacher_id"
  );
}

    const accessToken =
      await getGoogleAccessToken(
        booking.teacher_id,
      );

    /*
      Calculate end time
    */

    const start =
      new Date(
        booking.start_time,
      );


    const end =
      new Date(
        start.getTime()
        +
        booking.duration * 60 * 1000,
      );


    /*
      Create Google Calendar event
    */

    const googleResponse =
      await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${accessToken}`,

            "Content-Type":
              "application/json",
          },


          body: JSON.stringify({

            summary:
  `Bookwex lesson with ${
    capitalizeAllFirst(
      booking.student?.full_name ?? "student"
    )
  }`,


            start: {
              dateTime:
                start.toISOString(),
            },


            end: {
              dateTime:
                end.toISOString(),
            },

          }),
        },
      );


    const googleEvent =
      await googleResponse.json();


    if (!googleResponse.ok) {

      await supabaseAdmin
        .from("bookings")
        .update({
          google_event_status:
            "failed",
        })
        .eq(
          "id",
          bookingId,
        );


      throw new Error(
        JSON.stringify(
          googleEvent,
        ),
      );
    }



    /*
      Save Google event id
    */

    await supabaseAdmin
      .from("bookings")
      .update({

        google_event_id:
          googleEvent.id,

        google_event_status:
          "synchronized",

      })
      .eq(
        "id",
        bookingId,
      );



    return new Response(
      JSON.stringify({

        success: true,

        googleEventId:
          googleEvent.id,

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

     if (bookingId && supabaseAdmin) {
    await supabaseAdmin
  .from("bookings")
  .update({
    google_event_status: "failed",
    google_error:
      error instanceof Error
        ? error.message
        : String(error),
  })
  .eq("id", bookingId);
  }


    return new Response(
      JSON.stringify({

        error:
          error instanceof Error
            ? error.message
            : String(error),

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