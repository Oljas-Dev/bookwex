import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js";


Deno.serve(async (req) => {
  const resourceId =
    req.headers.get(
      "x-goog-resource-id",
    );

  const state =
    req.headers.get(
      "x-goog-resource-state",
    );


  console.log({
    state,
    resourceId,
  });

if (!resourceId) {
  return new Response("Missing resourceId", {
    status: 400,
  });
}


const supabaseAdmin =
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get(
      "SERVICE_ROLE_KEY",
    )!,
  );

// Getting the calendar owner
const { data: calendar, error } =
  await supabaseAdmin
    .from("teacher_calendars")
    .select("teacher_id")
    .eq(
      "resource_id",
      resourceId,
    )
    .single();


if (error || !calendar) {
    console.log(
      "Calendar lookup failed:",
    error,
    );

    return new Response("ok");
  }

// Trigering the sync calendars function
await fetch(
  "https://fqdmgsringvlmhpjasxj.supabase.co/functions/v1/google-sync",
  {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",

      Authorization:
        `Bearer ${Deno.env.get(
          "SERVICE_ROLE_KEY",
        )}`,
    },

    body: JSON.stringify({
      teacherId:
        calendar.teacher_id,
    }),
  },
);

return new Response("ok");
});