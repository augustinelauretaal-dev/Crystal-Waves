"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, ArrowLeft, LogOut, Loader2, BedDouble } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminRooms() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchRooms();
    }
  }, [session]);

  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/admin/rooms");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id: string) => {
    if (!confirm("Are you sure you want to decommission this room? This action cannot be undone.")) return;

    try {
      await fetch(`/api/admin/rooms/${id}`, { method: "DELETE" });
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  if (status === "loading" || loading) {
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
                onClick={() => router.push("/admin/dashboard")}
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

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Room Inventory</h2>
            <p className="text-slate-500 text-sm">Manage suites, pricing, and guest capacity across the property.</p>
          </div>
          <button
            onClick={() => router.push("/admin/rooms/new")}
            className="flex items-center justify-center bg-slate-900 text-white px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-[0.2em] hover:bg-cyan-600 transition-all shadow-lg shadow-slate-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Suite
          </button>
        </div>

        <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Suite Details
                </th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Rate
                </th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Occupancy
                </th>
                <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Management
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-slate-400 text-sm">
                    No suites currently registered in inventory.
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-sm ${room.image || 'bg-slate-100'} flex items-center justify-center border border-slate-100 shadow-sm`}>
                          <BedDouble className="w-5 h-5 text-white/80" />
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          {room.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-600">
                        ₱{room.price.toLocaleString()} <span className="text-[10px] text-slate-400 uppercase">/ Night</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        {room.capacity} Guests
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => router.push(`/admin/rooms/${room.id}`)}
                          className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-sm transition-all"
                          title="Edit Suite"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteRoom(room.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-sm transition-all"
                          title="Delete Suite"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}