"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, LogOut, PlusCircle, LayoutDashboard } from "lucide-react";
import { signOut } from "next-auth/react";

export default function NewRoom() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    capacity: "",
    image: "bg-gradient-to-br from-cyan-400 to-blue-500",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/rooms");
      } else {
        alert("Error creating room");
      }
    } catch (error) {
      alert("Error creating room");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Admin Header */}
      <nav className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
               <button
                onClick={() => router.push("/admin/rooms")}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-serif italic tracking-wide">
                Crystal Waves <span className="not-italic font-sans font-light text-sm text-slate-400 ml-2 uppercase tracking-[0.2em]">Management</span>
              </h1>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="hidden md:inline text-slate-400">{session?.user?.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Add New Suite</h2>
          <p className="text-slate-500 text-sm">Configure the details and pricing for your new guest room.</p>
        </div>

        <div className="bg-white rounded-sm border border-slate-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="space-y-6">
              {/* Room Name */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Suite Designation
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:bg-white transition-all"
                  placeholder="e.g. Royal Ocean Suite"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Nightly Rate (₱)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:bg-white transition-all"
                    placeholder="5000"
                  />
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Guest Capacity
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:bg-white transition-all"
                    placeholder="2"
                  />
                </div>
              </div>

              {/* Visual Style */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Dashboard Preview Style
                </label>
                <div className="relative">
                  <select
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:bg-white appearance-none transition-all"
                  >
                    <option value="bg-gradient-to-br from-cyan-400 to-blue-500">Crystal Blue Gradient</option>
                    <option value="bg-gradient-to-br from-slate-700 to-slate-900">Deep Slate Gradient</option>
                    <option value="bg-gradient-to-br from-emerald-400 to-teal-600">Lagoon Green Gradient</option>
                    <option value="bg-gradient-to-br from-amber-200 to-orange-400">Sunset Glow Gradient</option>
                  </select>
                  <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${formData.image} border border-white/20`} />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-slate-900 text-white py-4 rounded-sm font-bold text-xs uppercase tracking-[0.2em] hover:bg-cyan-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? "Processing..." : (
                  <>
                    <PlusCircle className="w-4 h-4" /> Initialize Room
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/rooms")}
                className="px-8 bg-white text-slate-500 py-4 rounded-sm font-bold text-xs uppercase tracking-[0.2em] border border-slate-200 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}