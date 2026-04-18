'use client';

import { useState } from 'react';
import { createReview } from '@/lib/reviews';
import StarRating from './StarRating';
import { Send, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface ReviewFormProps {
  onReviewSubmitted?: () => void;
}

export default function ReviewForm({ onReviewSubmitted }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess(false);
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.rating === 0) return setError('Please share your rating stars.');
    if (!formData.name.trim()) return setError('Please provide your name.');
    if (formData.description.trim().length < 10) return setError('Please share a bit more about your experience (min. 10 characters).');

    setIsSubmitting(true);
    setError('');

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('rating', formData.rating.toString());
      form.append('description', formData.description);

      const result = await createReview(form);

      if (result.success) {
        setSuccess(true);
        setFormData({ name: '', rating: 0, description: '' });
        // Small delay before closing the form to show success message
        setTimeout(() => {
          onReviewSubmitted?.();
        }, 2000);
      } else {
        setError(result.error || 'The chronicles couldn’t be updated. Please try again.');
      }
    } catch (err) {
      setError('A connection error occurred. Please try again shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Form Header */}
      <div className="bg-slate-900 px-8 py-6">
        <h3 className="text-white font-serif text-2xl italic">Share Your Experience</h3>
        <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mt-1">Your story becomes part of our history</p>
      </div>
      
      <div className="p-8">
        {/* Animated Feedback Messages */}
        {success && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">Your chronicle has been sent for moderation. Thank you!</p>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg animate-in shake">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Picker */}
          <div className="flex flex-col items-center justify-center py-4 border-b border-slate-50">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Overall Rating
            </label>
            <StarRating
              rating={formData.rating}
              onRatingChange={handleRatingChange}
              disabled={isSubmitting}
              size="lg" // Larger stars for the form
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all placeholder:text-slate-300"
                placeholder="e.g. Augustine Laureta"
                disabled={isSubmitting}
              />
            </div>

            {/* Description Input */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="description" className="block text-xs font-bold uppercase tracking-widest text-slate-500">
                  Your Story
                </label>
                <span className="text-[10px] text-slate-300 uppercase font-bold">
                  {formData.description.length} / 500
                </span>
              </div>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                maxLength={500}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all resize-none placeholder:text-slate-300 italic font-serif"
                placeholder="How was the ocean breeze? The service? The atmosphere?"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full bg-slate-900 text-white py-4 px-6 rounded-lg font-bold uppercase tracking-[0.2em] text-xs hover:bg-cyan-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <span>Submit Chronicle</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}