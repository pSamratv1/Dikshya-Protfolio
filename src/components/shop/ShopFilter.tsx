"use client";

import { useState } from "react";
import { ListFilter } from "lucide-react";

export default function ShopFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`flex-shrink-0 hidden lg:block pr-8 sticky top-32 h-fit ${
        isOpen ? "w-48" : "w-24"
      }`}
    >
      <div
        className={`w-24 border-b border-gray-200 pb-4 mb-4 ${
          isOpen ? "w-48" : "w-24"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex gap-4 items-center w-full font-sans text-xs uppercase tracking-widest"
        >
          <span>Filters</span>
          <div className={` ${isOpen ? "rotate-180" : "rotate-0"}`}>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="www.w3.org"
            >
              <ListFilter className="w-4 h-4" />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded-none accent-black"
              />
              <span className="font-serif text-sm text-gray-600 group-hover:text-black transition-colors">
                In Stock
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded-none accent-black"
              />
              <span className="font-serif text-sm text-gray-600 group-hover:text-black transition-colors">
                Out of Stock
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
