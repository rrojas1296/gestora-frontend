import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { updateSession } from "./utils/supabase/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  return await updateSession(request, response);
}
export const config = {
  matcher: [
    "/",
    "/(es|en)/:path*",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.\\w+$|\\.well-known).*)",
  ],
};
