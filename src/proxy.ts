import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. TELL TYPESCRIPT ABOUT YOUR METADATA
declare global {
  interface CustomJwtSessionClaims {
    publicMetadata: {
      role?: "admin" | "customer" ;
    };
  }
}

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isAdminRoute(req)) return;

  const session = await auth(); // In v6, auth() returns a promise

  // ❌ Not logged in
  if (!session.userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // ✅ Check role from sessionClaims (now typed correctly)
  const role = session.sessionClaims?.publicMetadata?.role;

  if (role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url)); // Or /unauthorized
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
