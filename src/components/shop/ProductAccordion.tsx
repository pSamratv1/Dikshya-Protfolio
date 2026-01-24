"use client";

import { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function ProductAccordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center group text-left"
      >
        <span className="font-sans text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">
          {title}
        </span>
        <span
          className={`text-gray-400 font-light text-xl transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="font-serif text-gray-600 text-sm leading-relaxed pr-4">
          {children}
        </div>
      </div>
    </div>
  );
}
