"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation, Compass, ArrowUpRight } from "lucide-react";

export default function LuxuryLocation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Actual coordinates for Crystal Waves Talavera
  const lat = "15.5589941";
  const lng = "120.9260104";

  return (
    <section id="location" ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-cyan-600 text-[11px] font-bold uppercase tracking-[0.4em] mb-4">
            The Destination
          </h3>
          <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900">
            Find Your <span className="not-italic font-light">Way to Us</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Detailed Info Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <h3 className="text-xl font-serif text-slate-900 mb-4 italic">
                A Central Luzon Landmark
              </h3>
              <p className="text-slate-500 font-light leading-relaxed">
                Nestled in the vibrant heart of Talavera, Nueva Ecija, Crystal Waves 
                serves as an accessible oasis for travelers seeking both adventure 
                and repose. 
              </p>
            </div>

            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-50 transition-colors">
                  <MapPin className="w-5 h-5 text-slate-400 group-hover:text-cyan-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-1">Address</p>
                  <p className="text-slate-900 font-serif italic">
                    Maharlika Highway, Talavera, <br />
                    Nueva Ecija, Philippines
                  </p>
                </div>
              </div>

              {/* Coordinates */}
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-50 transition-colors">
                  <Compass className="w-5 h-5 text-slate-400 group-hover:text-cyan-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-1">Global Position</p>
                  <p className="text-slate-900 font-mono text-sm tracking-tight">
                    {lat}° N, {lng}° E
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-sm font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-cyan-700 transition-all group"
              >
                <Navigation size={14} />
                Get Directions
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>

          {/* Map Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="relative h-[500px] w-full bg-slate-100 rounded-sm overflow-hidden shadow-2xl border border-slate-100">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.2312686866185!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDMzJzMyLjQiTiAxMjDCsDU1JzMzLjYiRQ!5e0!3m2!1sen!2sph!4v1700000000000`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(20%) contrast(1.1) opacity(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Decorative Frame Overlay */}
              <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}