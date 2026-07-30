import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js";

Deno.serve(async (req) => {
  const secret =
    req.headers.get("x-cron-secret");

  if (
    secret !==
    Deno.env.get("CRON_SECRET")
  ) {
    return new Response(
      "Unauthorized",
      {
        status: 401,
      },
    );
  }

  const supabaseAdmin =
    createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get(
        "SERVICE_ROLE_KEY",
      )!,
    );

  const tomorrow =
    new Date();

  tomorrow.setDate(
    tomorrow.getDate() + 1,
  );

  const { data: calendars, error } =
    await supabaseAdmin
      .from("teacher_calendars")
      .select("teacher_id")
      .eq("provider", "google")
      .lt(
        "expires_at",
        tomorrow.toISOString(),
      );

  if (error) {
    throw error;
  }

  for (const calendar of calendars ?? []) {
    await fetch(
      "https://fqdmgsringvlmhpjasxj.supabase.co/functions/v1/google-watch",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          teacherId:
            calendar.teacher_id,
        }),
      },
    );
  }

  return Response.json({
    renewed:
      calendars?.length ?? 0,
  });
});