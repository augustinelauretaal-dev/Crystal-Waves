"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Quote, Plus, X, MessageSquare, Loader2, Sparkles, ChevronRight, Filter } from "lucide-react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating"; // Using your improved, visible-star component
import { getReviews } from "@/lib/reviews";

interface Review {
  id: string;
  name: string;
  rating: number;
  description: string;
  verified: boolean;
  createdAt: string | Date;
}

export default function LuxuryReviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Base State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Modal State
  const [showAllModal, setShowAllModal] = useState(false);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const fetchReviews = async () => {
    try {
      const result = await getReviews();
      if (result.success && result.data) {
        setReviews(result.data as Review[]);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Compute stats, filters, and sort order
  const { filteredAndSortedReviews, averageRating, rawAverage } = useMemo(() => {
    // 1. Calculate Average Rating
    const avg = reviews.length 
      ? (reviews.reduce((acc, curr) => acc + Number(curr.rating), 0) / reviews.length) 
      : 0;

    // 2. Base array
    let result = [...reviews];
    
    // 3. Apply Star Filter
    if (filterRating !== 'all') {
      result = result.filter(r => Math.round(Number(r.rating)) === filterRating);
    }

    // 4. Apply Sorting
    result.sort((a, b) => {
      const rateA = Number(a.rating);
      const rateB = Number(b.rating);
      return sortOrder === 'desc' ? rateB - rateA : rateA - rateB;
    });

    return { 
      filteredAndSortedReviews: result, 
      averageRating: avg.toFixed(1), // String for display: 3.8
      rawAverage: Math.round(avg)   // Number for stars: 4
    };
  }, [reviews, filterRating, sortOrder]);

  // Count helper for the filter buttons
  const getCount = (rating: number | 'all') => {
    if (rating === 'all') return reviews.length;
    return reviews.filter(r => Math.round(Number(r.rating)) === rating).length;
  };

  return (
    <section id="reviews" ref={ref} className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- FIXED: RESTORED HEADER & TRUST BAR --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          
          {/* Main Title Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-cyan-600" />
              <h3 className="text-cyan-600 text-[10px] font-bold uppercase tracking-[0.5em]">
                Testimonials
              </h3>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif italic text-slate-900 leading-tight">
              Guest <span className="not-italic font-light text-slate-300">Chronicles</span>
            </h2>
          </motion.div>

          {/* Dynamic Trust/Add Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-8 bg-slate-50/50 border border-slate-100 p-6 rounded-2xl backdrop-blur-sm"
          >
            {/* Average Rating Display */}
            <div className="text-right border-r border-slate-200 pr-8">
              <div className="flex justify-end mb-2">
                {/* FIX: Using Number() and rounding for Star display */}
                <StarRating rating={rawAverage} disabled size="sm" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Avg. Rating <span className="text-slate-900 ml-1">{averageRating}/5.0</span>
              </p>
            </div>
            
            {/* Expandable Form Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className={`
                group relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-700 shadow-2xl
                ${showForm 
                  ? "bg-slate-900 text-white rotate-180" 
                  : "bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow-slate-200"
                }
              `}
            >
              {showForm ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
              {!showForm && (
                <span className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[9px] font-bold uppercase tracking-[0.3em] text-cyan-600 whitespace-nowrap bg-white px-3 py-1 shadow-sm border border-slate-100 rounded">
                  Leave a Review
                </span>
              )}
            </button>
          </motion.div>
        </div>
        {/* --- END RESTORED HEADER --- */}

        {/* REVIEW FORM DRAWER */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-24"
            >
              <div className="max-w-2xl mx-auto p-10 bg-slate-50 border border-slate-100 rounded-sm">
                <ReviewForm onReviewSubmitted={() => { fetchReviews(); setShowForm(false); }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LOADING/EMPTY STATES */}
        {loading ? (
          <div className="flex flex-col items-center py-32">
            <Loader2 className="w-10 h-10 text-cyan-600 animate-spin mb-4 opacity-20" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">Retrieving Stories</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-32 text-center border border-dashed border-slate-100 rounded-3xl">
            <MessageSquare className="w-12 h-12 text-slate-100 mx-auto mb-6" />
            <p className="font-serif italic text-3xl text-slate-300">The Journals are empty.<br/>Be the first to share your journey.</p>
          </div>
        ) : (
          <>
            {/* Masonry Grid (Previewing first 6 based on sort order) */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {filteredAndSortedReviews.slice(0, 6).map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="break-inside-avoid"
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            {reviews.length > 6 && (
              <div className="mt-16 text-center border-t border-slate-50 pt-10">
                <button 
                  onClick={() => setShowAllModal(true)}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-500 group hover:shadow-xl shadow-slate-100"
                >
                  Explore All {reviews.length} Stories
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- ALL REVIEWS MODAL (Remains Correct) --- */}
      <AnimatePresence>
        {showAllModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAllModal(false)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header with Filtering */}
              <div className="p-8 md:px-12 border-b border-slate-100 bg-slate-50/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h3 className="font-serif italic text-4xl text-slate-900">The Full Collection</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">Discover the depths of the guest experience</p>
                  </div>
                  <button onClick={() => setShowAllModal(false)} className="p-4 bg-white rounded-full border border-slate-200 hover:bg-rose-50 hover:text-rose-500 transition-all">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* STAR FILTER BAR (Matching screenshot structure) */}
                <div className="flex flex-wrap items-center gap-2">
                  {[ 'all', 5, 4, 3, 2, 1 ].map((val) => (
                    <button
                      key={val}
                      onClick={() => setFilterRating(val as any)}
                      className={`px-5 py-2.5 rounded-lg text-xs font-medium transition-all border ${
                        filterRating === val 
                        ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      {val === 'all' ? 'All' : `${val} Star`} ({getCount(val as any)})
                    </button>
                  ))}
                  
                  <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block" />

                  {/* 5-1 / 1-5 Sort Toggle */}
                  <button 
                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <Filter className="w-3 h-3" />
                    {sortOrder === 'desc' ? 'Highest First' : 'Lowest First'}
                  </button>
                </div>
              </div>

              {/* Modal Content Masonry Grid */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-hide bg-white">
                {filteredAndSortedReviews.length === 0 ? (
                  <div className="py-24 text-center">
                    <p className="font-serif italic text-2xl text-slate-300">No {filterRating}-star chronicles found.</p>
                  </div>
                ) : (
                  <motion.div 
                    layout
                    className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredAndSortedReviews.map((review) => (
                        <motion.div 
                          layout 
                          key={review.id} 
                          initial={{ opacity: 0, scale: 0.9 }} 
                          animate={{ opacity: 1, scale: 1 }} 
                          exit={{ opacity: 0, scale: 0.9 }} 
                          transition={{ duration: 0.4 }}
                          className="break-inside-avoid"
                        >
                          <ReviewCard review={review} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}