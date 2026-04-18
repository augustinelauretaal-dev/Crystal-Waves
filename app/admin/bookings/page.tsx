"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  LogOut,
  CalendarDays,
  Users,
  BedDouble,
  Check,
  X,
  Search,
  Filter,
  Loader2,
  Mail,
  Clock,
  ChevronRight,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { signOut } from "next-auth/react";

interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: string;
  guests: number;
  specialRequest: string;
  createdAt: string;
  user: {
    email: string;
  };
  room: {
    name: string;
    image: string;
  };
}

export default function AdminBookings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    if (session) fetchBookings();
  }, [session]);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/admin/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const searchStr = searchTerm.toLowerCase();
    const matchesSearch = 
      booking.user.email.toLowerCase().includes(searchStr) ||
      booking.room.name.toLowerCase().includes(searchStr) ||
      (booking.specialRequest || "").toLowerCase().includes(searchStr);
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Quick stats for the header
  const stats = {
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    today: bookings.filter(b => new Date(b.checkIn).toDateString() === new Date().toDateString()).length
  };

  const getStatusUI = (status: string) => {
    const config = {
      pending: { color: "text-amber-600 bg-amber-50 border-amber-100", icon: <Clock className="w-3 h-3" /> },
      confirmed: { color: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: <Check className="w-3 h-3" /> },
      cancelled: { color: "text-rose-600 bg-rose-50 border-rose-100", icon: <X className="w-3 h-3" /> },
    };
    const style = config[status as keyof typeof config] || config.pending;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${style.color}`}>
        {style.icon} {status}
      </span>
    );
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Admin Header */}
      <nav className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push("/admin/dashboard")} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-serif italic tracking-wide">
                Crystal Waves <span className="not-italic font-sans font-light text-sm text-slate-400 ml-2 uppercase tracking-[0.2em]">Concierge</span>
              </h1>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Header Section with Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Reservation Ledger</h2>
            <p className="text-slate-500 mt-1">Review and manage upcoming guest stays and service requests.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 bg-white p-4 border border-slate-200 rounded-sm shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending</p>
              <p className="text-2xl font-bold text-amber-500">{stats.pending}</p>
            </div>
            <div className="flex-1 bg-white p-4 border border-slate-200 rounded-sm shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confirmed</p>
              <p className="text-2xl font-bold text-emerald-500">{stats.confirmed}</p>
            </div>
          </div>
        </div>

        {/* Search & Utility Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search guests, suites, or requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative flex items-center">
              <Filter className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-3 bg-white border border-slate-200 rounded-sm text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 appearance-none min-w-[160px]"
              >
                <option value="all">All Reservations</option>
                <option value="pending">Pending Review</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="py-20 text-center bg-white border border-dashed border-slate-300 rounded-sm">
              <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No records found for the current selection.</p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white border border-slate-200 rounded-sm shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                <div className="flex flex-col lg:flex-row">
                  {/* Primary Info */}
                  <div className="p-6 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/30">
                    <div className="flex items-center justify-between mb-4">
                      {getStatusUI(booking.status)}
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                        Ref: {booking.id.slice(-6)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight">{booking.user.email}</p>
                        <p className="text-xs text-slate-500 mt-1">{booking.guests} Guests Registered</p>
                      </div>
                    </div>
                  </div>

                  {/* Stay Details */}
                  <div className="p-6 flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-50 rounded-sm text-cyan-600">
                          <BedDouble className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Accommodation</p>
                          <p className="text-sm font-semibold text-slate-900">{booking.room.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-sm text-slate-600">
                          <CalendarDays className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</p>
                          <p className="text-sm font-medium text-slate-700">
                            {new Date(booking.checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} — {new Date(booking.checkOut).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Special Request Indicator */}
                    <div className="bg-slate-50 p-4 rounded-sm border border-slate-100">
                      <div className="flex items-center gap-2 mb-2 text-slate-400">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Guest Notes</span>
                      </div>
                      <p className="text-xs text-slate-600 italic line-clamp-2">
                        {booking.specialRequest || "No special requests provided."}
                      </p>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="p-6 lg:w-48 bg-slate-50/50 flex flex-row lg:flex-col justify-center gap-2 border-t lg:border-t-0 lg:border-l border-slate-100">
                    {booking.status === "pending" ? (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking.id, "confirmed")}
                          disabled={updatingId === booking.id}
                          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all disabled:opacity-50"
                        >
                          {updatingId === booking.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                          Approve
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, "cancelled")}
                          className="flex-1 lg:flex-none py-2.5 text-xs font-bold text-slate-400 hover:text-rose-600 transition-colors uppercase tracking-widest"
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => updateBookingStatus(booking.id, "cancelled")}
                        disabled={booking.status === "cancelled" || updatingId === booking.id}
                        className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-400 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:border-rose-200 hover:text-rose-600 transition-all disabled:hidden"
                      >
                        Cancel Stay
                      </button>
                    )}
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