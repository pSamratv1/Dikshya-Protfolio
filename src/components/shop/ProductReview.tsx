"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { addReview } from "@/lib/action";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  SlidersHorizontal,
  PenLine,
  ChevronDown,
} from "lucide-react";

// --- HELPERS ---
const StarRating = ({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={`${
          star <= rating
            ? "fill-black text-black"
            : "fill-transparent text-gray-300"
        }`}
      />
    ))}
  </div>
);

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 86400) return "Today";
  const days = Math.floor(seconds / 86400);
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} weeks ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

// --- MAIN COMPONENT ---
export default function ProductReviews({ productId, reviews = [] }: any) {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    rating: 5,
    title: "",
    comment: "",
    recommend: "true",
  });

  const safeReviews = Array.isArray(reviews) ? reviews : [];

  // Calculate Average
  const averageRating =
    safeReviews.length > 0
      ? (
          safeReviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
          safeReviews.length
        ).toFixed(1)
      : "5.0"; // Default for aesthetics if empty

  const handleWriteReviewClick = () => {
    if (!isSignedIn) {
      openSignIn({ afterSignInUrl: window.location.href });
    } else {
      setIsFormOpen(!isFormOpen);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addReview(productId, formData);
      setIsFormOpen(false);
      setFormData({ rating: 5, title: "", comment: "", recommend: "true" });
      alert("Review submitted successfully!");
    } catch (error) {
      alert("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white py-20 px-6 md:px-12 lg:px-24 text-[#1C1B1A]">
      {/* 1. HEADER SUMMARY */}
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-sans text-5xl font-bold tracking-tighter">
            {averageRating}
          </span>
          <StarRating rating={Math.round(Number(averageRating))} size={28} />
        </div>
        <p className="font-sans text-xs text-gray-500 tracking-wide">
          Based on {safeReviews.length} reviews
        </p>
      </div>

      {/* 2. ACTION BAR (Filters & Write Button) */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-b border-gray-200 py-6 mb-10 gap-4">
        {/* Left: Tabs/Filters */}
        <div className="flex items-center gap-8 w-full md:w-auto">
          <button className="flex items-center gap-2 border border-black px-6 py-2 bg-transparent hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={14} />
            <span className="font-serif italic text-sm">Filters</span>
          </button>
        </div>

        {/* Right: Write Review */}
        <button
          onClick={handleWriteReviewClick}
          className="flex items-center gap-2 border border-black px-8 py-2 bg-white hover:bg-black hover:text-white transition-all w-full md:w-auto justify-center"
        >
          <PenLine size={14} />
          <span className="font-serif italic text-sm">Write a Review</span>
        </button>
      </div>

      {/* 3. REVIEW FORM (Collapsible) */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isFormOpen ? "max-h-[1000px] opacity-100 mb-16" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#F9F8F4] p-8 md:p-12 border border-gray-100">
          <h3 className="font-serif text-3xl mb-8 text-center">
            Share your experience
          </h3>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
            <div className="flex flex-col items-center gap-4 mb-8">
              <label className="font-sans text-xs uppercase tracking-widest text-gray-500">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: num })}
                    className="focus:outline-none transition-transform active:scale-110"
                  >
                    <Star
                      size={32}
                      className={`${
                        formData.rating >= num
                          ? "fill-black text-black"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Title
                </label>
                <input
                  required
                  className="w-full bg-white border-b border-gray-300 p-3 font-serif text-lg focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
                  placeholder="Summarize your thoughts..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Review
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-white border border-gray-200 p-4 font-serif text-base focus:outline-none focus:border-black transition-colors resize-none placeholder:text-gray-300"
                  placeholder="What did you like or dislike?"
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-center gap-6 pt-4">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-8 py-3 font-sans text-xs uppercase tracking-widest hover:text-gray-600"
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                type="submit"
                className="px-10 py-3 bg-black text-white font-sans text-xs uppercase tracking-widest hover:bg-[#B0A285] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Posting..." : "Post Review"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 4. SORT HEADER */}
      {safeReviews.length > 0 && (
        <div className="flex justify-between items-center mb-8">
          <span className="font-sans text-sm text-gray-500">
            {safeReviews.length} Reviews
          </span>
          <div className="flex items-center gap-2 cursor-pointer group">
            <span className="font-sans text-xs uppercase tracking-widest text-gray-500 group-hover:text-black">
              Sort:
            </span>
            <span className="font-serif text-sm group-hover:underline">
              Highest Rating
            </span>
            <ChevronDown size={14} />
          </div>
        </div>
      )}

      {/* 5. REVIEWS LIST */}
      <div className="space-y-12">
        {safeReviews.length === 0 ? (
          <div className="text-center py-20 border-t border-gray-100">
            <p className="font-serif text-xl text-gray-400 italic">
              No reviews yet. Be the first.
            </p>
          </div>
        ) : (
          safeReviews.map((review: any) => (
            <div
              key={review.id}
              className="border-t border-gray-200 pt-8 flex flex-col gap-4"
            >
              {/* Top Row: User & Date */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-sm font-bold">
                    {review.userName || "Guest"}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500">
                    <CheckCircle2
                      size={14}
                      className="text-black fill-black/10"
                    />
                    <span className="font-sans text-[10px] uppercase tracking-widest opacity-70">
                      Verified Buyer
                    </span>
                  </div>
                </div>
                <span className="font-sans text-xs text-gray-400">
                  {timeAgo(review.createdAt)}
                </span>
              </div>

              {/* Stars */}
              <div className="mb-1">
                <StarRating rating={review.rating} size={14} />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-sans text-base font-bold mb-2">
                  {review.title}
                </h3>
                <p className="font-serif text-gray-700 leading-relaxed text-sm md:text-base max-w-3xl">
                  {review.comment}
                </p>
              </div>

              {/* Footer: Helpful? */}
              <div className="flex justify-end items-center gap-6 mt-2">
                <span className="font-sans text-[10px] uppercase tracking-widest text-gray-400">
                  Was this helpful?
                </span>
                <button className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors group">
                  <ThumbsUp size={14} />
                  <span className="font-sans text-xs">0</span>
                </button>
                <button className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors group">
                  <ThumbsDown size={14} />
                  <span className="font-sans text-xs">0</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
