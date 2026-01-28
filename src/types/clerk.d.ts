import "@clerk/nextjs/server";

declare module "@clerk/nextjs/server" {
  interface SessionClaims {
    publicMetadata: {
      role?: "admin" | "user";
    };
  }
}
