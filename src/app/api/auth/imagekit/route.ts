import ImageKit from "imagekit";
import { NextResponse } from "next/server";

// 1. Initialize with the keys from your .env
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!, // Ensure .env has PRIVATE_KEY, not IMAGEKIT_PRIVATE_KEY
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
  try {
    // 2. Generate the signature
    const authenticationParameters = imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("ImageKit Auth Error:", error);
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}
