import {
  SignJWT,
  jwtVerify,
} from "npm:jose";

const secret = new TextEncoder().encode(
  Deno.env.get("GOOGLE_STATE_SECRET")
);

export async function createState(
  teacherId: string
) {
  return await new SignJWT({
    teacherId,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime("10m")
    .sign(secret);
}


export async function verifyState(
  token: string
) {
  const { payload } = await jwtVerify(
    token,
    secret
  );

  return payload.teacherId as string;
}