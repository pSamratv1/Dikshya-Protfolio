// "use client";

// import { ImageKitProvider, IKUpload } from "imagekitio-next";
// import { useState } from "react";

// interface ImageUploadProps {
//   onSuccess: (url: string) => void;
//   defaultValue?: string;
//   label?: string;
// }

// export default function ImageUpload({
//   onSuccess,
//   defaultValue,
//   label = "Upload Image",
// }: ImageUploadProps) {
//   const [uploading, setUploading] = useState(false);
//   const [preview, setPreview] = useState(defaultValue);

//   const onError = (err: any) => {
//     console.log("Error", err);
//     setUploading(false);
//     alert("Upload failed. Please try again.");
//   };

//   const onUploadSuccess = (res: any) => {
//     setUploading(false);
//     setPreview(res.url);
//     onSuccess(res.url); // Pass the URL back to your form
//   };

//   return (
//     <div className="space-y-4">
//       <label className="block font-sans text-[10px] uppercase tracking-widest text-gray-400">
//         {label}
//       </label>

//       <ImageKitProvider
//         publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY}
//         urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
//         authenticator={async () => {
//           const response = await fetch('/api/auth/imagekit');
//           const data = await response.json();
//           return data;
//         }}
//       >
//         <div className="relative group border border-dashed border-gray-300 bg-[#F9F8F4] p-8 text-center hover:bg-white transition-colors cursor-pointer">
//           {/* Hidden Actual Input */}
//           <IKUpload
//             fileName="portfolio-upload"
//             onError={onError}
//             onSuccess={onUploadSuccess}
//             onUploadStart={() => setUploading(true)}
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//           />

//           {/* Custom Visuals */}
//           {uploading ? (
//             <div className="font-serif text-gray-500 animate-pulse">
//               Uploading...
//             </div>
//           ) : preview ? (
//             <div className="relative w-full h-48">
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="w-full h-full object-contain"
//               />
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs uppercase tracking-widest">
//                 Click to Replace
//               </div>
//             </div>
//           ) : (
//             <div className="text-gray-400">
//               <span className="text-2xl block mb-2">+</span>
//               <span className="font-sans text-[10px] uppercase tracking-widest">
//                 Click to Upload
//               </span>
//             </div>
//           )}
//         </div>
//       </ImageKitProvider>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";

interface ImagePickerProps {
  label: string;
  defaultValue?: string;
  onImageSelect: (url: string) => void;
}

export default function ImagePicker({
  label,
  defaultValue,
  onImageSelect,
}: ImagePickerProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "link">("upload");
  const [preview, setPreview] = useState(defaultValue || "");
  const [isUploading, setIsUploading] = useState(false);

  // --- HANDLERS ---

  // 1. Handle File Upload (ImageKit)
  const onUploadSuccess = (res: any) => {
    setIsUploading(false);
    setPreview(res.url);
    onImageSelect(res.url); // Send URL to parent form
  };

  const onUploadError = (err: any) => {
    console.error("Upload Error", err);
    setIsUploading(false);
    alert("Upload failed. Check console.");
  };

  // 2. Handle Text Link
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreview(url);
    onImageSelect(url);
  };

  return (
    <div className="group space-y-4 mb-8">
      <div className="flex justify-between items-end">
        <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-[#B0A285] transition-colors">
          {label}
        </label>

        {/* Toggle Switch */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("upload")}
            className={`text-[9px] uppercase tracking-widest pb-1 transition-all ${
              activeTab === "upload"
                ? "text-black border-b border-black"
                : "text-gray-300"
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => setActiveTab("link")}
            className={`text-[9px] uppercase tracking-widest pb-1 transition-all ${
              activeTab === "link"
                ? "text-black border-b border-black"
                : "text-gray-300"
            }`}
          >
            Paste Link
          </button>
        </div>
      </div>

      {/* --- PREVIEW AREA (Shows for both) --- */}
      {preview && (
        <div className="relative w-full h-48 bg-[#F9F8F4] border border-[#E5E2D9] mb-4 flex items-center justify-center overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full object-contain"
          />
          <button
            onClick={() => {
              setPreview("");
              onImageSelect("");
            }}
            className="absolute top-2 right-2 bg-white/80 p-2 text-[8px] uppercase tracking-widest hover:bg-red-50 hover:text-red-500"
          >
            Remove
          </button>
        </div>
      )}

      {/* --- INPUT AREA --- */}
      {!preview && (
        <div className="h-32 w-full">
          {activeTab === "upload" ? (
            <ImageKitProvider
              publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY}
              urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
              authenticator={async () => {
                const res = await fetch("/api/auth/imagekit");
                return res.json();
              }}
            >
              <div className="relative w-full h-full bg-[#FAFAFA] border border-dashed border-[#E5E2D9] hover:bg-white hover:border-black/20 transition-all flex flex-col items-center justify-center cursor-pointer">
                {isUploading ? (
                  <span className="font-serif text-gray-400 italic animate-pulse">
                    Uploading...
                  </span>
                ) : (
                  <>
                    <span className="text-2xl text-gray-300 mb-2">+</span>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-gray-400">
                      Click to Select File
                    </span>
                  </>
                )}

                {/* Hidden File Input */}
                <IKUpload
                  fileName="portfolio_upload"
                  onUploadStart={() => setIsUploading(true)}
                  onSuccess={onUploadSuccess}
                  onError={onUploadError}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </ImageKitProvider>
          ) : (
            // Link Input Mode
            <div className="relative h-full flex items-center">
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                onChange={handleLinkChange}
                className="w-full bg-transparent border-b border-[#E5E2D9] py-3 font-serif text-xl text-[#1C1B1A] placeholder:font-sans placeholder:text-xs placeholder:uppercase placeholder:tracking-widest placeholder:text-gray-300 focus:outline-none focus:border-[#1C1B1A] transition-all"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}