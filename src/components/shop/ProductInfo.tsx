"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

const AccordionItem = ({ title, isOpen, onClick, children }: any) => (
  <div className="border-t border-gray-200">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center py-4 text-left group"
    >
      <span className="font-sans text-[10px] uppercase tracking-widest text-gray-600 group-hover:text-black transition-colors">
        {title}
      </span>
      <span className="text-xl font-light">{isOpen ? "−" : "+"}</span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
      }`}
    >
      <div className="font-serif text-sm text-gray-500 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  </div>
);

export default function ProductInfo({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [openSection, setOpenSection] = useState("description"); // Default open

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  return (
    <div className="px-6 lg:px-6 py-12 lg:py-8 max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl lg:text-4xl  tracking-tight mb-1">
          {product.name}
        </h1>
        <div className="relative flex items-center gap-4">
          <p className="font-sans text-lg font-medium">
            Rs {product.price.toLocaleString()}
          </p>
          <div className="absolute left-0 top-10 flex justify-start gap-4">
            <span className="bg-gray-200 text-[9px] font-medium uppercase tracking-widest px-6 py-2 rounded-lg">
              New
            </span>
            <span className="bg-gray-200 text-[9px] font-medium uppercase tracking-widest px-6 py-2 rounded-lg">
              In Stock
            </span>
          </div>
        </div>
      </div>

      {/* Action */}
      <button
        onClick={() => addToCart({ ...product, image: product.images[0] })}
        className="w-full bg-black text-white py-4 font-sans text-xs uppercase tracking-[0.25em] hover:bg-gray-800 transition-all mb-12"
      >
        Add To Cart
      </button>

      {/* Accordions */}
      <div className="border-b border-gray-200">
        <AccordionItem
          title="Description"
          isOpen={openSection === "description"}
          onClick={() => toggle("description")}
        >
          <p>{product.description}</p>
          <p>
            Designed for the modern muse, this piece combines structural
            elegance with everyday functionality.
          </p>
        </AccordionItem>

        <AccordionItem
          title="Measurements"
          isOpen={openSection === "measurements"}
          onClick={() => toggle("measurements")}
        >
          <p>• Width: 24cm</p>
          <p>• Height: 18cm</p>
          <p>• Strap Drop: 45cm (Adjustable)</p>
        </AccordionItem>

        <AccordionItem
          title="Care Guide"
          isOpen={openSection === "care"}
          onClick={() => toggle("care")}
        >
          <p>
            Keep away from direct sunlight. Clean with a soft, dry cloth. Store
            in the provided dust bag when not in use.
          </p>
        </AccordionItem>

        <AccordionItem
          title="Shipping & Returns"
          isOpen={openSection === "shipping"}
          onClick={() => toggle("shipping")}
        >
          <p>
            Free shipping on orders over Rs 5,000. Returns accepted within 14
            days of delivery in original condition.
          </p>
        </AccordionItem>
      </div>
    </div>
  );
}
