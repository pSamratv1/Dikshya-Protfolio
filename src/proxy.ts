import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { useUser } from "@clerk/nextjs";

declare global {
  interface CustomJwtSessionClaims {
    publicMetadata: {
      role?: "admin" | "customer";
    };
  }
}

// 1. Define Public Routes (Anyone can access)
const isPublicRoute = createRouteMatcher([
  "/",
  "/shop(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/api/auth/imagekit",
]);

// 2. Define Admin Routes (Only Admins)
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // If the user is trying to access an ADMIN route
  if (isAdminRoute(req)) {
    // A. If NOT logged in -> Send to Sign In
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // B. If logged in but NOT an admin -> Send to HOME
    // This stops the redirect loop
    const role = sessionClaims?.publicMetadata?.role;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // For all other routes (Public or logged-in customers visiting /shop), do nothing
  return;
});

export const config = {
  matcher: [
    // Protects /admin and matches all other routes except static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
