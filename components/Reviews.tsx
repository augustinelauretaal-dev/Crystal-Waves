"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

export default function LuxuryReviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reviews = [
    {
      name: "Maria Santos",
      rating: 5,
      comment: "An incredible escape. The staff was attentive to every detail, and the infinity pool at sunset is something I will never forget.",
      date: "March 2024",
    },
    {
      name: "John Cruz",
      rating: 5,
      comment: "The perfect sanctuary for my family. We found a level of peace here that is rare to find. The Family Suite was impeccably designed.",
      date: "February 2024",
    },
    {
      name: "Sarah Lee",
      rating: 5,
      comment: "Culinary excellence paired with stunning views. Every meal felt like a curated event. We are already planning our return.",
      date: "January 2024",
    },
    {
      name: "Michael Tan",
      rating: 5,
      comment: "A masterclass in hospitality. From the moment we were picked up at the airport, we felt like the only guests at the resort.",
      date: "December 2023",
    },
    {
      name: "Anna Garcia",
      rating: 5,
      comment: "Modern luxury meets coastal charm. The wellness spa treatments were world-class. Truly a 5-star experience in every sense.",
      date: "November 2023",
    },
    {
      name: "David Kim",
      rating: 5,
      comment: "Rarely does a resort look better in person than in the photos. Crystal Waves is a breathtaking exception. Exceptional service.",
      date: "October 2023",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
        }`}
      />
    ));
  };

  return (
    <section id="reviews" ref={ref} className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h3 className="text-cyan-600 text-[11px] font-bold uppercase tracking-[0.4em] mb-4">
            Guest Chronicles
          </h3>
          <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900 mb-6">
            Stories from <span className="not-italic font-light">The Coast</span>
          </h2>
          <div className="w-12 h-[1px] bg-slate-300 mx-auto"></div>
        </motion.div>

        {/* Masonry-style Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="break-inside-avoid bg-white p-10 rounded-sm border border-slate-100 relative group hover:border-cyan-200 transition-colors duration-500"
            >
              <Quote className="absolute top-6 right-8 w-8 h-8 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex gap-1 mb-6">
                {renderStars(review.rating)}
              </div>

              <p className="text-slate-600 font-light italic leading-relaxed text-lg mb-8">
                "{review.comment}"
              </p>

              <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold text-slate-900">
                    {review.name}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-tighter mt-1">
                    Verified Guest • {review.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}