"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Search, ShoppingBag, X, User } from "lucide-react";

// --- MENU DATA ---
const NAV_DATA = [
  {
    label: "JEWELRY",
    href: "/shop/jewelry",
    items: [
      {
        name: "New Arrivals",
        href: "/shop/new",
        image:
          "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=500&auto=format&fit=crop",
      },
      {
        name: "Earrings",
        href: "/shop/earrings",
        image:
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500&auto=format&fit=crop",
      },
      {
        name: "Necklaces",
        href: "/shop/necklaces",
        image:
          "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=500&auto=format&fit=crop",
      },
      {
        name: "Watches",
        href: "/shop/watches",
        image:
          "https://images.unsplash.com/photo-1524592094765-f78715006e01?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
  {
    label: "ACCESSORIES",
    href: "/shop/accessories",
    items: [
      {
        name: "Eyewear",
        href: "/shop/eyewear",
        image:
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500&auto=format&fit=crop",
      },
      {
        name: "Laptop Cases",
        href: "/shop/cases",
        image:
          "https://images.unsplash.com/photo-1545231027-637d2f6210f8?q=80&w=500&auto=format&fit=crop",
      },
      {
        name: "Book Boxes",
        href: "/shop/books",
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500&auto=format&fit=crop",
      },
      {
        name: "All Accessories",
        href: "/shop/accessories",
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
  {
    label: "COLLABORATIONS",
    href: "/shop/collabs",
    items: [
      {
        name: "Freja x Heaven Mayhem",
        href: "/shop/freja",
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=500&auto=format&fit=crop",
      },
      {
        name: "Real Fine x Heaven Mayhem",
        href: "/shop/real-fine",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
];

export default function ShopNavbar() {
  const { toggleCart, cartCount } = useCart();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeCategory = NAV_DATA.find((c) => c.label === hoveredCategory);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b hover:bg-white ${
          isScrolled || hoveredCategory
            ? "bg-white border-gray-100 text-black"
            : "bg-transparent border-transparent text-black"
        }`}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="flex justify-between items-center px-6 md:px-12 h-[80px]">
          {/* LEFT: Menu Links */}
          <div className="hidden md:flex gap-8 items-center h-full">
            {NAV_DATA.map((cat) => (
              <div
                key={cat.label}
                onMouseEnter={() => setHoveredCategory(cat.label)}
                className="relative h-full flex items-center"
              >
                <Link
                  href={cat.href}
                  className={`nav-link transition-colors ${
                    hoveredCategory === cat.label
                      ? "text-gray-500 underline underline-offset-4"
                      : "hover:text-gray-500"
                  }`}
                >
                  {cat.label}
                </Link>
              </div>
            ))}
            <Link
              href="/shop"
              className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#B0A285] hover:text-black transition-colors"
            >
              Dikshya<span className="italic">Inc</span>
            </Link>
          </div>

          {/* CENTER: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="font-sans text-2xl uppercase tracking-widest font-bold"
            >
              DIKSHYA LIMBU
            </Link>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-6">
            <button className="hidden lg:block nav-link hover:text-gray-500">
              Rewards
            </button>

            {/* Account */}
            <div className="nav-link font-sans text-[10px] uppercase tracking-widest">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="hover:text-gray-500 transition-colors">
                    <User size={18} strokeWidth={1.5} />
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="scale-75 origin-right">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-gray-500 transition-colors"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="flex items-center gap-2 hover:text-gray-500 transition-colors relative"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* --- MEGA MENU DROPDOWN (Split Layout) --- */}
        <div
          className={`absolute top-[80px] left-0 w-full bg-white border-b border-gray-100 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            hoveredCategory
              ? "max-h-[600px] opacity-100 shadow-sm"
              : "max-h-0 opacity-0"
          }`}
        >
          {activeCategory && (
            <div className="new-container mx-auto px-12 py-12 flex gap-12">
              {/* LEFT SIDE: Text Links List */}
              <div className="w-1/4 border-r border-gray-100 pr-8 flex flex-col gap-6 animate-in fade-in slide-in-from-left-2 duration-500">
                {activeCategory.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="font-sans text-[11px] uppercase tracking-[0.15em] hover:underline underline-offset-4 transition-all"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href={activeCategory.href}
                  className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#B0A285] mt-4 hover:text-black"
                >
                  Shop All {activeCategory.label} →
                </Link>
              </div>

              {/* RIGHT SIDE: Visual Grid */}
              <div className="w-3/4 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-2 duration-700 delay-100">
                {activeCategory.items.slice(0, 3).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group block text-center"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-gray-50 mb-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    </div>
                    <span className="font-sans text-[10px] uppercase tracking-[0.15em] opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* --- SEARCH OVERLAY --- */}
      <div
        className={`fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl transition-all duration-500 ${
          isSearchOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-8 right-8 p-2 hover:rotate-90 transition-transform duration-300"
        >
          <X size={32} strokeWidth={1} />
        </button>
        <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center max-w-3xl">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8">
            Search Product
          </span>
          <form className="w-full relative group">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent border-b border-gray-300 py-4 font-serif text-4xl text-center placeholder:text-gray-200 focus:outline-none focus:border-black transition-colors"
              autoFocus={isSearchOpen}
            />
          </form>
        </div>
      </div>
    </>
  );
}
