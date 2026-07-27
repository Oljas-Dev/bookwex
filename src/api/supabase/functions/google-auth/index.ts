Deno.serve(() => {
  const params = new URLSearchParams({
    client_id: Deno.env.get("GOOGLE_CLIENT_ID")!,
    redirect_uri: Deno.env.get("GOOGLE_REDIRECT_URI")!,
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope:
      "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events",
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

  return Response.redirect(url);
});
