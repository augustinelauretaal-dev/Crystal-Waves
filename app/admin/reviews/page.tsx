"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Star,
  Check,
  X,
  Trash2,
  MessageSquare,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Clock,
  Search,
  Loader2,
  MoreVertical,
  ThumbsUp
} from "lucide-react";
import { getAdminReviews, updateReviewStatus, deleteReview } from "@/lib/admin-reviews";

interface Review {
  id: string;
  name: string;
  rating: number;
  description: string;
  verified: boolean;
  createdAt: string;
}

export default function AdminReviews() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    if (session) fetchReviews();
  }, [session]);

  const fetchReviews = async () => {
    try {
      const result = await getAdminReviews();
      if (result.success) setReviews(result.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, currentStatus: boolean) => {
    setProcessingId(id);
    try {
      const result = await updateReviewStatus(id, !currentStatus);
      if (result.success) fetchReviews();
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently remove this chronicle?")) return;
    setProcessingId(id);
    try {
      const result = await deleteReview(id);
      if (result.success) fetchReviews();
    } finally {
      setProcessingId(null);
    }
  };

  const filteredReviews = reviews.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === "loading") return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Syncing Chronicles</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Refined Navigation */}
      <nav className="bg-slate-950 text-white sticky top-0 z-50 px-6 py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-cyan-500/10 p-2 rounded">
              <ShieldCheck className="w-5 h-5 text-cyan-500" />
            </div>
            <h1 className="text-lg font-serif italic">Crystal Waves <span className="not-italic font-sans text-[10px] uppercase tracking-widest text-slate-500 ml-2">Moderation</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/admin/dashboard")} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
            </button>
            <button onClick={() => signOut()} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-rose-400">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header & Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight">Guest Feedback</h2>
            <p className="text-slate-500 mt-1">Review and verify stories from the coast.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 bg-white p-4 border border-slate-200 rounded-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Content</p>
              <p className="text-2xl font-bold text-emerald-600">{reviews.filter(r => r.verified).length}</p>
            </div>
            <div className="flex-1 bg-white p-4 border border-slate-200 rounded-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending</p>
              <p className="text-2xl font-bold text-amber-500">{reviews.filter(r => !r.verified).length}</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or content..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-sm focus:ring-1 focus:ring-cyan-500 outline-none text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Actionable Review Grid */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 py-20 text-center rounded-sm">
              <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 italic">No chronicles match your search.</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="group bg-white border border-slate-200 rounded-sm hover:border-cyan-200 transition-all shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center p-6 gap-6">
                  
                  {/* Rating & Identity */}
                  <div className="lg:w-48 shrink-0">
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-100"}`} />
                      ))}
                    </div>
                    <h3 className="font-bold text-slate-900 truncate">{review.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-slate-300" />
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 border-l lg:border-l border-slate-100 lg:pl-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        review.verified ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}>
                        {review.verified ? "Published" : "Under Review"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed italic font-serif">
                      "{review.description}"
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="lg:w-48 flex items-center justify-end gap-2 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0">
                    <button
                      disabled={processingId === review.id}
                      onClick={() => handleStatusUpdate(review.id, review.verified)}
                      className={`p-2.5 rounded-sm transition-colors border ${
                        review.verified 
                          ? "bg-white text-slate-400 hover:text-amber-500 hover:border-amber-200" 
                          : "bg-slate-900 text-white hover:bg-emerald-600"
                      }`}
                      title={review.verified ? "Unapprove" : "Approve"}
                    >
                      {processingId === review.id ? <Loader2 className="w-4 h-4 animate-spin" /> : (review.verified ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />)}
                    </button>
                    
                    <button
                      disabled={processingId === review.id}
                      onClick={() => handleDelete(review.id)}
                      className="p-2.5 bg-white text-slate-400 hover:text-rose-600 hover:border-rose-200 border border-slate-200 rounded-sm transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}