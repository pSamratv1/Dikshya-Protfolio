export {};

declare global {
  interface CustomJwtSessionClaims {
    publicMetadata: {
      role?: "admin" | "customer";
    };
  }

  interface UserPublicMetadata {
    role?: "admin" | "customer";
  }
}
