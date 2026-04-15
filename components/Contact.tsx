"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

export default function LuxuryContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Concierge-style feedback
    alert("Your inquiry has been received. Our concierge will reach out to you within 24 hours.");
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h3 className="text-cyan-600 text-[11px] font-bold uppercase tracking-[0.4em] mb-4">
            Connect
          </h3>
          <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900 mb-6">
            Begin Your <span className="not-italic font-light">Journey</span>
          </h2>
          <div className="w-12 h-[1px] bg-slate-300 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Contact Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-10"
          >
            <div>
              <h3 className="text-xl font-serif text-slate-900 mb-4 italic">
                Direct Channels
              </h3>
              <p className="text-slate-500 font-light leading-relaxed">
                Whether planning a retreat or a corporate event, our dedicated 
                team is here to assist with every detail.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Phone, label: "Phone", val: "+63 912 345 6789", href: "tel:+639123456789" },
                { icon: Mail, label: "Email", val: "concierge@crystalwaves.com", href: "mailto:info@crystalwaves.com" },
                { icon: MessageCircle, label: "WhatsApp", val: "+63 912 345 6789", href: "#" }
              ].map((item, i) => (
                <a 
                  key={i}
                  href={item.href}
                  className="flex items-center gap-6 p-4 rounded-sm hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-slate-400 group-hover:text-cyan-600 transition-colors shadow-sm">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{item.label}</p>
                    <p className="text-slate-900 font-serif italic text-lg">{item.val}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Refined Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7 bg-white p-10 md:p-14 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] rounded-sm"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
              
              {/* Name */}
              <div className="relative border-b border-slate-100 pb-2 focus-within:border-cyan-500 transition-colors">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Isabella Rossi"
                  className="w-full bg-transparent text-slate-900 font-serif italic text-lg outline-none placeholder:text-slate-200"
                />
              </div>

              {/* Email */}
              <div className="relative border-b border-slate-100 pb-2 focus-within:border-cyan-500 transition-colors">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="isabella@retreat.com"
                  className="w-full bg-transparent text-slate-900 font-serif italic text-lg outline-none placeholder:text-slate-200"
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2 relative border-b border-slate-100 pb-2 focus-within:border-cyan-500 transition-colors">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">
                  Your Inquiry
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="How can we make your stay exceptional?"
                  className="w-full bg-transparent text-slate-900 font-serif italic text-lg outline-none resize-none placeholder:text-slate-200"
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-5 rounded-sm font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-cyan-700 transition-all flex items-center justify-center gap-3 shadow-lg group"
                >
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send Inquiry
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}