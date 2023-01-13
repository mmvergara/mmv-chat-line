import { createMiddlewareSupabaseClient, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DBTypes } from "./supabase/db-types";

const getSession = async (supabase: SupabaseClient<DBTypes>) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

const redirectTo = (req: NextRequest, redirect: string) => {
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = redirect;
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient<DBTypes>({ req, res });

  if (req.nextUrl.pathname.startsWith("/auth")) {
    const session = await getSession(supabase);
    if (session?.user) return redirectTo(req, "/");
    return res;
  }
  if (req.nextUrl.pathname.startsWith("/room/create")) {
    const session = await getSession(supabase);
    if (!session?.user) return redirectTo(req, "/");
    return res;
  }

  return res;
}

export const config = {
  matcher: "/:pages*",
};
