"use client";

import { IKUpload, ImageKitProvider } from "imagekitio-next";

import { useState, useEffect } from "react"; // 1. Import useEffect

interface ImageUploadProps {
  onSuccess: (url: string) => void;
  defaultValue?: string;
  label?: string;
}

export default function ProductImageUpload({
  onSuccess,
  defaultValue,
  label = "Upload Image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(defaultValue || "");

  // 2. THIS IS THE FIX: Sync state when defaultValue changes (e.g. clicking Edit)
  useEffect(() => {
    setPreview(defaultValue || "");
  }, [defaultValue]);

  const onError = (err: any) => {
    console.log("Error", err);
    setUploading(false);
    alert("Upload failed. Please try again.");
  };

  const onUploadSuccess = (res: any) => {
    setUploading(false);
    setPreview(res.url);
    onSuccess(res.url);
  };

  // Allow pasting a link manually if needed
  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreview(e.target.value);
    onSuccess(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block font-sans text-[10px] uppercase tracking-widest text-gray-400">
          {label}
        </label>
        {/* Optional: Small text input to paste URL directly if not uploading */}
        <input
          type="text"
          placeholder="Or paste URL..."
          className="bg-transparent border-b border-gray-200 text-[10px] w-32 focus:outline-none"
          value={preview}
          onChange={handleManualInput}
        />
      </div>

      <ImageKitProvider
        publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY}
        urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
        authenticator={async () => {
          const response = await fetch("/api/auth/imagekit");
          return await response.json();
        }}
      >
        <div className="relative group border border-dashed border-gray-300 bg-[#F9F8F4] h-64 w-full text-center hover:bg-white transition-colors cursor-pointer flex flex-col items-center justify-center overflow-hidden">
          {/* Hidden Actual Input */}
          <IKUpload
            fileName="portfolio-upload"
            onError={onError}
            onSuccess={onUploadSuccess}
            onUploadStart={() => setUploading(true)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />

          {/* Custom Visuals */}
          {uploading ? (
            <div className="font-serif text-gray-500 animate-pulse z-10">
              Uploading...
            </div>
          ) : preview ? (
            <div className="relative w-full h-full">
              {/* Show the preview image */}
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain p-4"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs uppercase tracking-widest z-10">
                Click to Replace
              </div>
            </div>
          ) : (
            <div className="text-gray-400 z-10">
              <span className="text-2xl block mb-2">+</span>
              <span className="font-sans text-[10px] uppercase tracking-widest">
                Click to Upload
              </span>
            </div>
          )}
        </div>
      </ImageKitProvider>
    </div>
  );
}
