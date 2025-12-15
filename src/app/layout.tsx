import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dikshya Limbu",
    template: "%s | Dikshya Limbu",
  },

  description:
    "Dikshya Limbu is an entrepreneur and podcast host of Niche with Dikshya, sharing global stories on mindset, business, and personal growth.",

  metadataBase: new URL("https://dikshyalimbu.com"),

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Dikshya Limbu",
    description:
      "Entrepreneur and podcast host sharing stories on mindset, growth, and finding your niche.",
    url: "https://dikshyalimbu.com",
    siteName: "Dikshya Limbu",
    type: "website",
    // Open Graph image used for rich link previews on social platforms (Facebook, LinkedIn, WhatsApp, etc.)

    // images: [
    //   {
    //     url: "/og-image.jpg", // you must add this later
    //     width: 1200,
    //     height: 630,
    //     alt: "Dikshya Limbu — Entrepreneur & Podcast Host",
    //   },
    // ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dikshya Limbu",
    description:
      "Entrepreneur and podcast host sharing stories on mindset, growth, and finding your niche.",
    // Twitter image used for rich link previews on social platform twitter
    // images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-base text-primary antialiased overflow-hidden">{children}</body>
    </html>
  );
}
