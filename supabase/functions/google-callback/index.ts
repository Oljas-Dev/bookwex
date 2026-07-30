import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js";
import { verifyState } from "../_shared/jwt.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return new Response("Missing code or state", {
      status: 400,
    });
  }

  const teacherId = await verifyState(state);


  const tokenResponse = await fetch(
    "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id:
          Deno.env.get("GOOGLE_CLIENT_ID")!,

        client_secret:
          Deno.env.get("GOOGLE_CLIENT_SECRET")!,

        code,

        grant_type:
          "authorization_code",

        redirect_uri:
          Deno.env.get("GOOGLE_REDIRECT_URI")!,
      }),
    },
  );


  const tokens = await tokenResponse.json();


  if (!tokens.refresh_token) {
    return new Response(
      JSON.stringify({
        error: "No refresh token received",
      }),
      {
        status: 400,
      },
    );
  }


  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get(
      "SERVICE_ROLE_KEY",
    )!,
  );


  const expiresAt = new Date(
    Date.now() +
      tokens.expires_in * 1000,
  );


  const { error } =
    await supabaseAdmin
      .from("teacher_calendars")
      .upsert(
        {
          teacher_id: teacherId,
          provider: "google",
          access_token:
            tokens.access_token,
          refresh_token:
            tokens.refresh_token,
          expires_at:
            expiresAt.toISOString(),
        },
        {
          onConflict:
            "teacher_id,provider",
        },
      );


  if (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
      },
    );
  }

  const syncResponse = await fetch(
  `${Deno.env.get("SUPABASE_URL")}/functions/v1/google-sync`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        `Bearer ${Deno.env.get("SERVICE_ROLE_KEY")}`,
    },
    body: JSON.stringify({
      teacherId,
    }),
  },
);

if (!syncResponse.ok) {
  console.error(
    "Google sync failed:",
    await syncResponse.text(),
  );
}

const watchResponse = await fetch(
  `${Deno.env.get("SUPABASE_URL")}/functions/v1/google-watch`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        `Bearer ${Deno.env.get("SERVICE_ROLE_KEY")}`,
    },
    body: JSON.stringify({
      teacherId,
    }),
  },
);

if (!watchResponse.ok) {
  console.error(
    "Google watch failed:",
    await watchResponse.text(),
  );
}


  return Response.redirect(
  "http://localhost:5173/profile?connected=true",
  302,
);
});