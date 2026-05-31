import { NextResponse, type NextRequest } from "next/server";

/**
 * Attribution middleware. Sets the 30-day `fyp_ref` cookie when a visitor lands via:
 *   - any URL with `?ref=<code>` → cookie + clean redirect that strips the query
 *   - any `/c/<code>` path → cookie passes through to the co-branded page
 *
 * Doesn't record the click here (middleware shouldn't fan out to the store) — the page
 * does that via a small client-side fetch to /api/creators/click on mount.
 */
const CODE_RE = /[^a-z0-9_-]/g;
function clean(input: string): string {
  return input.toLowerCase().trim().replace(CODE_RE, "").slice(0, 32);
}

function setRefCookie(res: NextResponse, code: string) {
  res.cookies.set("fyp_ref", code, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // /c/<code> — pass through, but set cookie so attribution sticks.
  const cMatch = pathname.match(/^\/c\/([^/]+)\/?$/);
  if (cMatch) {
    const code = clean(decodeURIComponent(cMatch[1]));
    if (!code) return NextResponse.next();
    const res = NextResponse.next();
    setRefCookie(res, code);
    return res;
  }

  // ?ref= on any other path — set cookie + redirect to strip the query for clean URLs.
  const ref = searchParams.get("ref");
  if (ref) {
    const code = clean(ref);
    if (!code) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.searchParams.delete("ref");
    const res = NextResponse.redirect(url);
    setRefCookie(res, code);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
};
