import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env"
    );
  }

  // Get headers for verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify the webhook
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id as string,
      "svix-timestamp": svix_timestamp as string,
      "svix-signature": svix_signature as string,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Error occured", { status: 400 });
  }

  if (evt.type === "user.created") {
    const { id } = evt.data;

    if (id) {
      // 1. AWAIT THE CLERK CLIENT FIRST
      const client = await clerkClient();

      // 2. USE THE CLIENT INSTANCE
      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          role: "customer",
        },
      });

      console.log(`User ${id} assigned role: customer`);
    }
  }

  return new Response("", { status: 200 });
}
