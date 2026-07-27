import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js";
import { createState } from "../_shared/jwt.ts";

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  const authHeader = req.headers.get(
    "Authorization",
  );

  if (!authHeader) {
    return new Response(
      JSON.stringify({
        error: "Missing authorization",
      }),
      {
        status: 401,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }


  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    },
  );


  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();


  if (error || !user) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
      }),
      {
        status: 401,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }


  const state = await createState(
    user.id,
  );


  const params = new URLSearchParams({
    client_id:
      Deno.env.get("GOOGLE_CLIENT_ID")!,

    redirect_uri:
      Deno.env.get("GOOGLE_REDIRECT_URI")!,

    response_type: "code",

    access_type: "offline",

    prompt: "consent",

    state,

    scope: [
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.events",
    ].join(" "),
  });


  return new Response(
    JSON.stringify({
      url:
        `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  );
});