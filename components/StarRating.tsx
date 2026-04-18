"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion"; // Optional: for premium animations

interface StarRatingProps {
  rating: number;
  disabled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  onRatingChange?: (rating: number) => void;
}

export default function StarRating({ 
  rating, 
  disabled, 
  size = "md", 
  onRatingChange 
}: StarRatingProps) {
  const [hover, setHover] = useState(0);

  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <div 
      className="flex gap-1.5 items-center"
      role="radiogroup"
      aria-label="Rating"
    >
      {[1, 2, 3, 4, 5].map((star, index) => {
        const isActive = star <= (hover || rating);
        const isHalf = !isActive && star - 0.5 <= (hover || rating); // Reserved for future half-star logic

        return (
          <button
            key={star}
            type="button"
            role="radio"
            disabled={disabled}
            onClick={() => !disabled && onRatingChange?.(star)}
            onMouseEnter={() => !disabled && setHover(star)}
            onMouseLeave={() => !disabled && setHover(0)}
            className={`
              relative outline-none transition-all duration-300
              ${disabled ? "cursor-default" : "cursor-pointer hover:scale-125 active:scale-90"}
            `}
            aria-checked={star <= rating}
            aria-label={`${star} Star${star > 1 ? 's' : ''}`}
          >
            {/* Ambient Glow for Active Stars */}
            {isActive && !disabled && (
              <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full scale-150 animate-pulse" />
            )}

            <Star
              strokeWidth={isActive ? 1.5 : 2}
              className={`
                ${sizes[size]} 
                transition-all duration-300 ease-out
                ${isActive 
                  ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" 
                  : "fill-transparent text-slate-200 hover:text-slate-400"
                }
              `}
            />

            {/* Hidden Dot for the "Selected" state (Visual polish) */}
            {star === rating && !disabled && (
              <motion.div 
                layoutId="activeDot"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full"
              />
            )}
          </button>
        );
      })}
      
      {/* Helpful Label for Form mode */}
      {!disabled && hover > 0 && (
        <span className="ml-3 text-[10px] font-bold text-cyan-600 uppercase tracking-widest animate-in fade-in slide-in-from-left-2">
          {["Poor", "Fair", "Good", "Great", "Exceptional"][hover - 1]}
        </span>
      )}
    </div>
  );
}