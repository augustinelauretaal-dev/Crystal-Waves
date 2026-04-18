"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, Wind, ShieldCheck, Star } from "lucide-react";

export default function LuxuryAbout() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <Wind className="w-6 h-6 stroke-[1.2]" />,
      title: "Coastal Serenity",
      description: "Architecture designed to harmonize with the rhythmic flow of the Pacific.",
    },
    {
      icon: <Compass className="w-6 h-6 stroke-[1.2]" />,
      title: "Bespoke Tours",
      description: "Curated local experiences tailored to your personal sense of adventure.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 stroke-[1.2]" />,
      title: "Private Sanctuary",
      description: "Secluded accommodations offering total privacy and tranquil comfort.",
    },
    {
      icon: <Star className="w-6 h-6 stroke-[1.2]" />,
      title: "Elite Concierge",
      description: "A dedicated team anticipating your needs before they even arise.",
    },
  ];

  return (
    <section id="about" ref={ref} className="py-24 bg-[#FCFCFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div className="max-w-2xl">
            <h3 className="text-cyan-600 text-[11px] font-bold uppercase tracking-[0.4em] mb-4">
              The Heritage
            </h3>
            <h2 className="text-5xl md:text-6xl font-serif italic text-slate-900 leading-tight">
              A Legacy of <br />
              <span className="not-italic font-light">Refined Hospitality</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Crystal Waves is more than a destination; it is a meticulously crafted sanctuary where the boundaries between nature and luxury blur.
            </p>
          </div>
        </motion.div>

        {/* Story & Image Section */}
        <div className="grid lg:grid-cols-12 gap-16 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-7 relative"
          >
            {/* Main Decorative Image Holder */}
            <div className="aspect-[16/10] bg-slate-200 overflow-hidden rounded-sm shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80" 
                alt="Resort Pool" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/10 transition-opacity group-hover:opacity-0" />
            </div>
            
            {/* Floating Achievement Card */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -right-6 md:right-10 bg-white p-8 shadow-xl border-t-4 border-cyan-500 max-w-[240px]"
            >
              <p className="text-5xl font-serif italic text-slate-900 mb-1">15</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 leading-tight">
                Years of Unrivaled Excellence
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-6">
              <h4 className="text-2xl font-serif text-slate-800 italic">Unforgettable Memories</h4>
              <p className="text-slate-500 leading-relaxed font-light">
                Nestled within the lush landscapes of Nueva Ecija, Crystal Waves invites you to disconnect from the digital world and reconnect with yourself. Our architecture pays homage to the ocean&apos;s curves, offering panoramic views from every vantage point.
              </p>
              <p className="text-slate-500 leading-relaxed font-light">
                Whether you seek the thrill of water sports or the quiet contemplation of our spa gardens, our dedicated team ensures every moment is tailored to your desires.
              </p>
            </div>
            
            <button className="text-[11px] uppercase tracking-[0.3em] font-bold border-b border-slate-300 pb-2 hover:border-cyan-500 hover:text-cyan-600 transition-all">
              Discover Our Philosophy
            </button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white p-10 hover:bg-slate-50 transition-colors group"
            >
              <div className="text-cyan-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-sm uppercase tracking-widest font-bold text-slate-900 mb-4">
                {feature.title}
              </h4>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}