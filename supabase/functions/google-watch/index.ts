import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js";
import { getGoogleAccessToken, stopGoogleWatch, } from "../_shared/google.ts";

const allowedOrigins = [
  "http://localhost:5173",
  "https://bookwex.com",
];


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
    const { teacherId } = await req.json();

  if (!teacherId) {
    return Response.json(
      { error: "Missing teacherId" },
      { status: 400 },
    );
  }

  const supabaseAdmin =
    createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get(
        "SERVICE_ROLE_KEY",
      )!,
    );

  const { data: oldCalendar } =
  await supabaseAdmin
    .from("teacher_calendars")
    .select(
      "channel_id, resource_id",
    )
    .eq(
      "teacher_id",
      teacherId,
    )
    .eq(
      "provider",
      "google",
    )
    .maybeSingle();


  const accessToken =
    await getGoogleAccessToken(
      teacherId,
    );

    if (
  oldCalendar?.channel_id &&
  oldCalendar?.resource_id
) {
  await stopGoogleWatch(
    oldCalendar.channel_id,
    oldCalendar.resource_id,
    accessToken,
  );
}


  const channelId =
    crypto.randomUUID();


  const webhookUrl =
    "https://fqdmgsringvlmhpjasxj.supabase.co/functions/v1/google-webhook";


  const response =
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events/watch",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          id: channelId,

          type: "web_hook",

          address: webhookUrl,
        }),
      },
    );


  const data =
    await response.json();


  if (!response.ok) {
    return Response.json(
      data,
      {
        status: 500,
         headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      },
    );
  }

  await supabaseAdmin
  .from("teacher_calendars")
  .update({
    channel_id: channelId,
    resource_id: data.resourceId,
    expires_at: new Date(
      Number(data.expiration)
    ).toISOString(),
    sync_status: "active",

    last_synced_at:
      new Date().toISOString(),
  })
  .eq(
    "teacher_id",
    teacherId,
  )
  .eq(
    "provider",
    "google",
  );


  return new Response(
  JSON.stringify({
    success: true,
    channelId,
    resourceId: data.resourceId,
    expiration: data.expiration,
  }),
  {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  },
);
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});