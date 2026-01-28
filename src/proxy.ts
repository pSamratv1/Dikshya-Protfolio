import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

declare global {
  interface CustomJwtSessionClaims {
    publicMetadata: {
      role?: "admin" | "customer";
    };
  }
}

// 1. Define which routes are Admin-only
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Check if the current request is for an admin route
  if (isAdminRoute(req)) {
    const session = await auth();

    // ❌ If NOT logged in -> Redirect to sign-in
    if (!session.userId) {
      // session.redirectToSignIn() is the cleanest way to handle this in Clerk v6
      return session.redirectToSignIn();
    }

    // ❌ If logged in but NOT an admin -> Redirect to HOME (prevents loop)
    // Redirecting to /sign-in while already logged in causes the blank page/loop.
    const role = session.sessionClaims?.publicMetadata?.role;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
