"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar as CalendarIcon, Users, User, Mail, Phone, MessageSquare, Check, AlertCircle, Loader2 } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  roomType: string;
  guests: string;
  specialRequest: string;
}

export default function LuxuryBooking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    roomType: "",
    guests: "2",
    specialRequest: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Calculate stay duration
  const stayDuration = dateRange.from && dateRange.to 
    ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // Get room price based on selection
  const getRoomPrice = (roomType: string) => {
    const prices: { [key: string]: number } = {
      "Suite Room": 8000,
      "Family Room": 5000,
      "Deluxe Room": 3500,
      "Standard Room": 2500,
    };
    return prices[roomType] || 0;
  };

  // Calculate total cost
  const totalCost = stayDuration > 0 && formData.roomType 
    ? stayDuration * getRoomPrice(formData.roomType)
    : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!dateRange.from || !dateRange.to) {
      setErrorMessage("Please select your check-in and check-out dates");
      return false;
    }
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name");
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your phone number");
      return false;
    }
    if (!formData.roomType) {
      setErrorMessage("Please select your preferred accommodation");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const bookingData = {
        ...formData,
        checkIn: dateRange.from?.toISOString(),
        checkOut: dateRange.to?.toISOString(),
        guests: formData.guests
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitStatus("success");
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          roomType: "",
          guests: "2",
          specialRequest: ""
        });
        setDateRange({ from: undefined, to: undefined });
        
        // Reset form element
        (e.target as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to submit booking. Please try again.");
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section id="booking" ref={ref} className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h3 className="text-cyan-600 text-[11px] font-bold uppercase tracking-[0.4em] mb-4">
            Availability
          </h3>
          <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900 mb-6">
            Secure Your <span className="not-italic font-light">Sanctuary</span>
          </h2>
          <p className="text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            Please provide your preferred dates and details. Our concierge team will 
            personally confirm your reservation within 24 hours.
          </p>
        </motion.div>

        {/* Success/Error Messages */}
        {submitStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-6 p-4 rounded-sm border ${
              submitStatus === "success" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {submitStatus === "success" ? (
                <Check className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <div>
                <p className="font-semibold text-sm">
                  {submitStatus === "success" 
                    ? "Reservation Request Received!" 
                    : "Submission Error"
                  }
                </p>
                <p className="text-xs mt-1">
                  {submitStatus === "success" 
                    ? "Thank you for your interest. Our team will contact you within 24 hours to confirm your reservation and arrange payment."
                    : errorMessage
                  }
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)] rounded-sm overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-5">
            
            {/* Left Side: Stay Details (Calendar) */}
          <div className="lg:col-span-2 bg-slate-950 p-10 text-white rounded-2xl border border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <CalendarIcon className="text-cyan-400 w-5 h-5" />
                </div>
                <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-slate-400">
                  Availability
                </span>
              </div>
              {dateRange.from && dateRange.to && (
                <button 
                  onClick={() => setDateRange({ from: undefined, to: undefined })}
                  className="text-[10px] uppercase tracking-wider text-cyan-400 hover:text-white transition-colors"
                >
                  Clear Dates
                </button>
              )}
            </div>

            <div className="luxury-calendar flex justify-center">
              <DayPicker
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                disabled={{ before: new Date() }}
                className="m-0"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-6",
                  caption: "flex justify-center pt-1 relative items-center mb-4",
                  caption_label: "text-sm font-medium tracking-widest uppercase text-cyan-50",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-slate-500 rounded-md w-10 font-medium text-[10px] uppercase tracking-tighter",
                  row: "flex w-full mt-2",
                  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                  day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-800 rounded-full transition-all duration-200",
                  day_range_start: "day-range-start bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold rounded-full",
                  day_range_end: "day-range-end bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold rounded-full",
                  day_selected: "bg-cyan-500/20 text-cyan-200",
                  day_today: "text-cyan-400 font-bold underline underline-offset-4",
                  day_outside: "opacity-20",
                  day_disabled: "opacity-10 cursor-not-allowed",
                  day_range_middle: "aria-selected:bg-cyan-500/10 aria-selected:text-cyan-100 rounded-none",
                  day_hidden: "invisible",
                }}
              />
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
              <div className="flex flex-col gap-1">
                <span className="text-white/30 uppercase tracking-[0.2em] text-[9px] font-bold">Check-In</span>
                <span className="font-serif text-lg text-cyan-50">
                  {dateRange.from ? format(dateRange.from, "dd MMM yyyy") : "—"}
                </span>
              </div>
              <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
                <span className="text-white/30 uppercase tracking-[0.2em] text-[9px] font-bold">Check-Out</span>
                <span className="font-serif text-lg text-cyan-50">
                  {dateRange.to ? format(dateRange.to, "dd MMM yyyy") : "—"}
                </span>
              </div>
            </div>

            {/* Stay Summary */}
            {stayDuration > 0 && (
              <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <span className="text-cyan-300 text-[9px] uppercase tracking-wider">Nights</span>
                    <p className="text-white font-bold text-xl">{stayDuration}</p>
                  </div>
                  <div>
                    <span className="text-cyan-300 text-[9px] uppercase tracking-wider">Guests</span>
                    <p className="text-white font-bold text-xl">{formData.guests}</p>
                  </div>
                  <div>
                    <span className="text-cyan-300 text-[9px] uppercase tracking-wider">Total</span>
                    <p className="text-white font-bold text-xl">₱{totalCost.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

            {/* Right Side: Guest Details */}
            <div className="lg:col-span-3 p-10 md:p-14">
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
                
                {/* Full Name */}
                <div className="relative border-b border-slate-200 pb-2 focus-within:border-cyan-500 transition-colors">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2 mb-2">
                    <User size={12} /> Full Name
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-slate-900 font-serif italic text-lg outline-none placeholder:text-slate-200"
                    placeholder="E.g. Alexander Mercer"
                  />
                </div>

                {/* Email */}
                <div className="relative border-b border-slate-200 pb-2 focus-within:border-cyan-500 transition-colors">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2 mb-2">
                    <Mail size={12} /> Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-slate-900 font-serif italic text-lg outline-none placeholder:text-slate-200"
                    placeholder="alex@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="relative border-b border-slate-200 pb-2 focus-within:border-cyan-500 transition-colors">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2 mb-2">
                    <Phone size={12} /> Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-slate-900 font-serif italic text-lg outline-none placeholder:text-slate-200"
                    placeholder="+63 000 000 0000"
                  />
                </div>

                {/* Room Type */}
                <div className="relative border-b border-slate-200 pb-2 focus-within:border-cyan-500 transition-colors">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2 mb-2">
                    <Users size={12} /> Accommodation
                  </label>
                  <select
                    name="roomType"
                    required
                    value={formData.roomType}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-slate-900 font-serif italic text-lg outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select Accommodation</option>
                    <option value="Suite Room">Presidential Wave Suite (₱8,000/night)</option>
                    <option value="Family Room">The Family Sanctuary (₱5,000/night)</option>
                    <option value="Deluxe Room">Deluxe Oceanfront (₱3,500/night)</option>
                    <option value="Standard Room">Heritage Veranda (₱2,500/night)</option>
                  </select>
                </div>

                {/* Number of Guests */}
                <div className="relative border-b border-slate-200 pb-2 focus-within:border-cyan-500 transition-colors">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2 mb-2">
                    <Users size={12} /> Number of Guests
                  </label>
                  <select
                    name="guests"
                    required
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-slate-900 font-serif italic text-lg outline-none appearance-none cursor-pointer"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="7">7 Guests</option>
                    <option value="8">8 Guests</option>
                  </select>
                </div>

                {/* Special Request */}
                <div className="md:col-span-2 relative border-b border-slate-200 pb-2 focus-within:border-cyan-500 transition-colors">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2 mb-2">
                    <MessageSquare size={12} /> Special Requests
                  </label>
                  <textarea
                    name="specialRequest"
                    rows={1}
                    value={formData.specialRequest}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-slate-900 font-serif italic text-lg outline-none resize-none placeholder:text-slate-200"
                    placeholder="Dietary preferences, anniversary arrangements..."
                  />
                </div>
              </div>

              <div className="mt-16">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full lg:w-auto bg-slate-900 text-white px-16 py-5 rounded-sm font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-cyan-700 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Request Reservation"
                  )}
                </button>
                <p className="text-[10px] text-slate-400 mt-4 italic">
                  * Submission does not guarantee booking. Our team will contact you for payment details.
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}