"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  DoorOpen,
  LogOut,
  Check,
  X,
  Clock,
  LayoutDashboard,
  MessageSquare
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    totalRooms: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchStats();
      fetchRecentBookings();
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchRecentBookings = async () => {
    try {
      const response = await fetch("/api/admin/bookings?limit=5");
      const data = await response.json();
      setRecentBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchStats();
      fetchRecentBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Loading Workspace</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navigation */}
      <nav className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-5 h-5 text-cyan-500" />
              <h1 className="text-lg font-serif italic tracking-wide">
                Crystal Waves <span className="not-italic font-sans font-light text-sm text-slate-400 ml-2 uppercase tracking-[0.2em]">Command Center</span>
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-slate-300 text-sm">{session?.user?.email}</span>
              </div>
              <div className="w-px h-6 bg-slate-800"></div>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-sm border border-slate-200 p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <CalendarDays className="w-24 h-24" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Reservations</p>
            <p className="text-4xl font-light text-slate-900">{stats.totalBookings}</p>
          </div>

          <div className="bg-white rounded-sm border border-slate-200 p-6 shadow-sm relative overflow-hidden group hover:border-amber-200 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Awaiting Action</p>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-4xl font-light text-slate-900">{stats.pendingBookings}</p>
          </div>

          <div className="bg-white rounded-sm border border-slate-200 p-6 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Confirmed</p>
              <Check className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-4xl font-light text-slate-900">{stats.confirmedBookings}</p>
          </div>

          <div className="bg-white rounded-sm border border-slate-200 p-6 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Active Inventory</p>
              <DoorOpen className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-4xl font-light text-slate-900">{stats.totalRooms}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Recent Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Recent Inquiries</h2>
              <a href="/admin/bookings" className="text-xs font-bold text-cyan-600 uppercase tracking-wider hover:text-cyan-800 transition-colors">
                View All →
              </a>
            </div>
            
            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
              {recentBookings.length === 0 ? (
                <div className="p-10 text-center text-slate-500 text-sm">No recent bookings found.</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="p-5 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <p className="font-semibold text-slate-900 text-sm">{booking.user?.email}</p>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            booking.status === "confirmed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            booking.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            "bg-rose-50 text-rose-700 border-rose-200"
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {booking.room?.name} <span className="mx-1 text-slate-300">•</span> {booking.guests} Guests
                        </p>
                        <p className="text-xs text-slate-400">
                          {new Date(booking.checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} — {new Date(booking.checkOut).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>

                      {booking.status === "pending" && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateBookingStatus(booking.id, "confirmed")}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-sm text-xs font-bold text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, "cancelled")}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-sm text-xs font-bold text-slate-600 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm"
                          >
                            <X className="w-3.5 h-3.5" /> Decline
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Quick Actions */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Workspace Tasks</h2>
            <div className="bg-white rounded-sm border border-slate-200 shadow-sm p-2">
              <a
                href="/admin/bookings"
                className="flex items-center p-4 rounded-sm hover:bg-slate-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-colors mr-4 text-slate-500">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">Manage Ledger</p>
                  <p className="text-xs text-slate-500">View all reservations</p>
                </div>
              </a>
              
              <div className="h-px bg-slate-100 mx-4"></div>
              
              <a
                href="/admin/rooms"
                className="flex items-center p-4 rounded-sm hover:bg-slate-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-colors mr-4 text-slate-500">
                  <DoorOpen className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">Room Inventory</p>
                  <p className="text-xs text-slate-500">Edit suites & pricing</p>
                </div>
              </a>
              
              <div className="h-px bg-slate-100 mx-4"></div>
              
              <a
                href="/admin/reviews"
                className="flex items-center p-4 rounded-sm hover:bg-slate-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-colors mr-4 text-slate-500">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">Review Management</p>
                  <p className="text-xs text-slate-500">Moderate guest feedback</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}