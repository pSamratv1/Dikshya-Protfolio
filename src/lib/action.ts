"use server";

import { prisma } from "./prsima";
import { revalidatePath } from "next/cache";

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
  return await prisma.podcast.findMany({ orderBy: { order: "asc" } });
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

export async function getProduct(id: string) {
  return await prisma.product.findUnique({ where: { id } });
}

export async function addProduct(data: any) {
  const { id, price, ...rest } = data;
  await prisma.product.create({
    data: {
      ...rest,
      price: parseFloat(price), // Ensure price is a number
    },
  });
  revalidatePath("/shop");
  revalidatePath("/admin");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/shop");
  revalidatePath("/admin");
}

// --- MASTER FETCH (For Homepage) ---
export async function getPortfolioData() {
  const [hero, about, podcasts, guests, gallery, testimonials] =
    await Promise.all([
      getHero(),
      getAbout(),
      getPodcasts(),
      getGuests(),
      getGallery(),
      getTestimonials(),
    ]);

  return { hero, about, podcasts, guests, gallery, testimonials };
}
