import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js";
import { getGoogleAccessToken, stopGoogleWatch } from "../_shared/google.ts";

const allowedOrigins = [
  "http://localhost:5173",
  "https://www.bookwex.com",
];

let supabaseAdmin:
  ReturnType<typeof createClient> | null = null;
let userId: string | null = null;

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
    //
    const supabaseUser = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
  {
    global: {
      headers: {
        Authorization:
          req.headers.get("Authorization")!,
      },
    },
  },
);

supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SERVICE_ROLE_KEY")!,
      );

const {
  data: { user },
} = await supabaseUser.auth.getUser();

userId = user?.id;

if (!userId) {
  throw new Error("Unauthorized");
}

// Google connection
const { data: calendar, error: calendarError } =
  await supabaseAdmin
    .from("teacher_calendars")
    .select("*")
    .eq("teacher_id", userId)
    .eq("provider", "google")
    .maybeSingle();

if (calendarError) {
  throw calendarError;
}

if (!calendar) {
  return new Response(
    JSON.stringify({
      success: true,
      message: "Google calendar already disconnected",
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  );
}

// Disconnect google calendar
try {
  if (
    calendar.channel_id &&
    calendar.resource_id
  ) {
    const accessToken =
  await getGoogleAccessToken(userId);

    await stopGoogleWatch(
      calendar.channel_id,
      calendar.resource_id,
      accessToken,
    );
  }
} catch (error) {
  console.log(
    "Failed to stop Google watch, continuing disconnect:",
    error,
  );
}

if (calendar.refresh_token) {
  await fetch(
  "https://oauth2.googleapis.com/revoke",
  {
    method: "POST",
    headers: {
      "Content-Type":
        "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: calendar.refresh_token,
    }),
  },
);
}

//Remove busy times
await supabaseAdmin
  .from("calendar_busy_times")
  .delete()
  .eq("teacher_id", userId);

// Remove Google connection
await supabaseAdmin
  .from("teacher_calendars")
  .delete()
  .eq("teacher_id", userId)
  .eq("provider", "google");



return new Response.redirect(
    JSON.stringify({
      success: true,
      message: "Google calendar disconnected",
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  );
  } catch (error) {
    console.error(
  "Google disconnect failed:",
  error,
);

    if (userId && supabaseAdmin) {
  await supabaseAdmin
    .from("teacher_calendars")
    
    .update({
      sync_status: "failed-disconnect",
    })
    .eq("teacher_id", userId);
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