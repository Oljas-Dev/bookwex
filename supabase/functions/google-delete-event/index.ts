import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js";
import { getGoogleAccessToken } from "../_shared/google.ts";

const allowedOrigins = [
  "http://localhost:5173",
  "https://bookwex.com",
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
        : "https://bookwex.com",

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

    const {data: booking, error: bookingError} = 
      await supabaseAdmin
        .from("bookings")
        .select(`
          teacher_id,
          google_event_id
        `)
        .eq("id", bookingId)
        .single();

      if (bookingError || !booking) {
        throw bookingError;
      }

      if (!booking.google_event_id) {
  return new Response(
    JSON.stringify({
      success: true,
      message: "No Google event",
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  );
}

    const accessToken =
          await getGoogleAccessToken(
            booking.teacher_id,
          );

    const googleResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${booking.google_event_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!googleResponse.ok) {

      await supabaseAdmin
        .from("bookings")
        .update({
          google_event_status:
            "cancel_failed",
          google_event_id: null,
        })
        .eq(
          "id",
          bookingId,
        );


      throw new Error("Failed to cancel booking in Google calendar");
    }

    await supabaseAdmin
      .from("bookings")
      .update({

        google_event_status:
          "deleted",

      })
      .eq(
        "id",
        bookingId,
      );

      return new Response(
      JSON.stringify({
        success: true,
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
      google_event_status: "cancel_failed",
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
})