import { createSupabaseServer } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const path = searchParams.get("path") || "/dashboard";

  if (!code) return NextResponse.redirect("/login");

  const client = await createSupabaseServer();

  const { error } = await client.auth.exchangeCodeForSession(code);
  if (!error) {
    const forwardedHost = request.headers.get("x-forwarded-host");
    const devMode = process.env.NODE_ENV === "development";
    const redirect = origin + path;
    if (devMode) {
      return NextResponse.redirect(redirect);
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost + path}`);
    } else {
      return NextResponse.redirect(redirect);
    }
  }
};
