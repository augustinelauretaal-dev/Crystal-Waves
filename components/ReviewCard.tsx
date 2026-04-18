import StarRating from './StarRating';
import { Quote } from 'lucide-react'; // Added for a premium feel

interface Review {
  id: string;
  name: string;
  rating: number;
  description: string;
  verified: boolean;
  createdAt: string;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short',
      day: 'numeric'
    });
  };

  // Generate initials for an avatar-style circle
  const initials = review.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative bg-white border border-slate-100 p-8 rounded-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 group">
      
      {/* Subtle Background Icon */}
      <Quote className="absolute top-6 right-8 w-12 h-12 text-slate-50 transition-colors group-hover:text-cyan-50/50" />

      <div className="relative z-10 flex flex-col h-full">
        
        {/* Top Section: Rating & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <StarRating rating={Number(review.rating)} disabled size="sm" />
          
          {review.verified && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100/50">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              Verified Guest
            </span>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex-grow">
          <blockquote className="text-slate-600 mb-8 leading-relaxed italic font-serif text-lg lg:text-xl">
            "{review.description}"
          </blockquote>
        </div>
        
        {/* Footer Section: Identity */}
        <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 text-xs font-bold ring-2 ring-white shadow-sm">
            {initials}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 truncate leading-none mb-1.5">
              {review.name}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              <span>{review.verified ? 'Resident' : 'Visitor'}</span>
              <span className="w-1 h-1 rounded-full bg-slate-200" />
              <span>{formatDate(review.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}