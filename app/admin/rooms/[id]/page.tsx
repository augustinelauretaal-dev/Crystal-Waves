"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { ArrowLeft, LogOut, Save, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";

export default function EditRoom({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    capacity: "",
    image: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        // Ideally, your API should support /api/admin/rooms/[id]
        const response = await fetch(`/api/admin/rooms`);
        const rooms = await response.json();
        const room = rooms.find((r: any) => r.id === resolvedParams.id);
        if (room) {
          setFormData({
            name: room.name,
            price: room.price.toString(),
            capacity: room.capacity.toString(),
            image: room.image,
          });
        }
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setFetching(false);
      }
    };

    if (session) fetchRoom();
  }, [resolvedParams.id, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/rooms/${resolvedParams.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/rooms");
      } else {
        alert("Error updating room");
      }
    } catch (error) {
      alert("Error updating room");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-cyan-600" />
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
          <h2 className="text-2xl font-bold text-slate-900">Modify Suite</h2>
          <p className="text-slate-500 text-sm">Update the specifications for <span className="text-cyan-600 font-semibold">{formData.name || "this room"}</span>.</p>
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
                  />
                </div>
              </div>

              {/* Visual Style Selector */}
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
                  <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${formData.image} border border-white/20 shadow-sm`} />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-slate-900 text-white py-4 rounded-sm font-bold text-xs uppercase tracking-[0.2em] hover:bg-cyan-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Apply Changes
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