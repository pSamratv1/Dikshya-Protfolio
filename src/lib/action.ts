"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

// --- 1. HERO SECTION ---

export async function getHero() {
  const hero = await prisma.hero.findUnique({
    where: { id: "main_hero" },
  });
  // Return DB data or Fallback defaults if empty
  return (
    hero || {
      videoUrl: "/201676-916080496.mp4", // Default local video
      eyebrow: "The Portfolio",
      headline: "Find Your Niche",
      subheadline:
        "Entrepreneur, podcast host, and connector sharing stories of mindset, growth, and purpose.",
      ctaText: "Explore the Journey",
      ctaLink: "#about",
    }
  );
}

export async function updateHero(data: any) {
  await prisma.hero.upsert({
    where: { id: "main_hero" },
    update: data,
    create: { id: "main_hero", ...data },
  });
  revalidatePath("/"); // Update Homepage
  revalidatePath("/admin"); // Update Admin Panel
}

// --- 2. ABOUT SECTION ---

export async function getAbout() {
  const about = await prisma.about.findUnique({ where: { id: "main_about" } });
  return (
    about || {
      eyebrow: "About Dikshya",
      title: "Confidence comes from Clarity.",
      lead: "I’m Dikshya Limbu — an entrepreneur and podcast host driven by meaningful conversations.",
      body: "Through business, networking, and media, I connect people with ideas and opportunities.",
      ctaText: "Read My Story",
      imageUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    }
  );
}

export async function updateAbout(data: any) {
  await prisma.about.upsert({
    where: { id: "main_about" },
    update: data,
    create: { id: "main_about", ...data },
  });
  revalidatePath("/"); // Update Homepage
  revalidatePath("/admin"); // Update Admin Panel
}

// --- 3. PODCAST SECTION ---

export async function getPodcasts() {
  // Sort by 'order' so you can arrange them in Admin
  return await prisma.podcast.findMany();
}

export async function addPodcast(data: any) {
  // 1. Remove 'id' from the data object so Prisma generates a new UUID
  const { id, ...createData } = data;

  await prisma.podcast.create({
    data: createData,
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updatePodcast(id: string, data: any) {
  await prisma.podcast.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deletePodcast(id: string) {
  await prisma.podcast.delete({ where: { id } });
  revalidatePath("/"); // Update Homepage
  revalidatePath("/admin"); // Update Admin Panel
}

// --- 4. GUEST SECTION ---

export async function getGuests() {
  return await prisma.guest.findMany({ orderBy: { order: "asc" } });
}

export async function addGuest(data: any) {
  // 1. Remove 'id' from the data
  const { id, ...createData } = data;

  await prisma.guest.create({
    data: createData,
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateGuest(id: string, data: any) {
  await prisma.guest.update({
    where: { id },
    data,
  });
  revalidatePath("/"); // Update Homepage
  revalidatePath("/admin"); // Update Admin Panel
}

export async function deleteGuest(id: string) {
  await prisma.guest.delete({ where: { id } });
  revalidatePath("/"); // Update Homepage
  revalidatePath("/admin"); // Update Admin Panel
}

// --- 5. GALLERY SECTION ---

export async function getGallery() {
  return await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
}

export async function addGalleryImage(imageUrl: string) {
  await prisma.galleryImage.create({ data: { imageUrl } });
  revalidatePath("/"); // Update Homepage
  revalidatePath("/admin"); // Update Admin Panel
}
export async function deleteGalleryImage(id: string) {
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/"); // Update Homepage
  revalidatePath("/admin"); // Update Admin Panel
}

// ---6  .TESTIMONIAL ACTIONS ---
export async function getTestimonials() {
  return await prisma.testimonial.findMany({ orderBy: { createdAt: "asc" } });
}
// ADD
export async function addTestimonial(data: any) {
  const { id, ...createData } = data; // Remove ID if present to let Prisma generate it
  await prisma.testimonial.create({ data: createData });
  revalidatePath("/"); // Update Homepage
  revalidatePath("/admin"); // Update Admin Dashboard
}

// UPDATE
export async function updateTestimonial(id: string, data: any) {
  await prisma.testimonial.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

// DELETE
export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// --- 7 .PRODUCT ACTIONS ---
export async function getProducts() {
  return await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
}

export async function addProduct(data: any) {
  const {
    id,
    name,
    price,
    images,
    videos,
    details,
    care,
    description,
    category,
    quantity,
    createdAt,
    orderItems,
    reviews,
  } = data;
  await prisma.product.create({
    data: {
      id,
      name,
      description,
      category,
      quantity,
      createdAt,
      orderItems,
      reviews,
      price: parseFloat(price),
      details: details || "",
      care: care || "",
      images: images || [],
      videos: videos || [],
    },
  });

  revalidatePath("/shop");
  revalidatePath("/admin");
}

// UPDATE Product
export async function updateProduct(id: string, data: any) {
  const { price, quantity, ...rest } = data; // Destructure to handle price conversion
  await prisma.product.update({
    where: { id },
    data: {
      ...rest,
      price: parseFloat(price),
      // quantity: parseInt(quantity),
    },
  });
  revalidatePath("/shop");
  revalidatePath("/admin");
}

// DELETE Product
export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/shop");
  revalidatePath("/admin");
}

// --- REVIEW ACTIONS ---
export async function getProductReviews(productId: string) {
  return await prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
  });
}

// lib/action.ts

export async function addReview(productId: string, data: any) {
  console.log("✅ SERVER ACTION HIT. ProductID:", productId);
  console.log("✅ Data Received:", data);

  const user = await currentUser();

  if (!user) {
    console.log("❌ No User Found");
    throw new Error("You must be logged in to write a review.");
  }

  try {
    await prisma.review.create({
      data: {
        rating: Number(data.rating),
        title: data.title || null,
        comment: data.comment || data.content || "",
        recommend: String(data.recommend) === "true",
        productId: productId,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userAvatar: user.imageUrl || null,
      },
    });

    console.log("✅ Database Entry Created");
    revalidatePath(`/shop/${productId}`);
  } catch (dbError) {
    console.error("❌ Prisma Error:", dbError);
    throw new Error("Database failed to save review");
  }
}

// --- RELATED PRODUCTS ---
export async function getRelatedProducts(currentId: string) {
  // Get 4 products that are NOT the current one
  return await prisma.product.findMany({
    where: { id: { not: currentId } },
    take: 4,
    orderBy: { createdAt: "desc" }, // or randomize if you prefer
  });
}

// --- SHOP ACTIONS ---

// 4. Create Order (Checkout)
export async function createOrder(
  cartItems: any[],
  total: number,
  userId: string,
  customerEmail: string
) {
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        customerEmail,
        total,
        status: "paid", // Simulating successful payment
        items: {
          create: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order Error:", error);
    return { success: false, error: "Failed to create order" };
  }
}

// --- MASTER FETCH (For Homepage) ---
export async function getPortfolioData() {
  const [hero, about, podcasts, guests, gallery, testimonials, products] =
    await Promise.all([
      getHero(),
      getAbout(),
      getPodcasts(),
      getGuests(),
      getGallery(),
      getTestimonials(),
      getProducts(),
    ]);

  return { hero, about, podcasts, guests, gallery, testimonials, products };
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 604800; // weeks
  if (interval > 1) return Math.floor(interval) + " weeks ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  return "Today";
}
