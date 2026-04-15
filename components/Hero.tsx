"use client";

import { motion } from "framer-motion";
import { ChevronDown, Star, Play, MapPin } from "lucide-react";

export default function LuxuryHero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Cinematic Background with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('https://scontent.fmnl25-3.fna.fbcdn.net/v/t39.30808-6/612480411_1328155526005712_2609935873598117439_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEMs7saSOKkAl-N1kS8eEy7qqt9kjXmdOmqq32SNeZ06c7POfgCHgZ-A3Mxou_C0XKXvO0z9jlj68tIhR7pN-qP&_nc_ohc=Pe2HP60GnnsQ7kNvwEEyXs3&_nc_oc=AdrPwp93XXh8DWHRiaUrxRK4fdCNgAdF3bOtcfAVkQwaMCclJScVDabqCZsQrBA1xDk&_nc_zt=23&_nc_ht=scontent.fmnl25-3.fna&_nc_gid=FsJ5p4_fxsjkeoJrk0UuHg&_nc_ss=7a3a8&oh=00_Af1Jn3e7NeRM_qwtuc1ECqPd_3yR_zw-loXGbMT8lh2-hQ&oe=69E2E173')] bg-cover bg-center"
        />
        {/* Professional Overlay: Darker at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Subtle Location Tag */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-[1px] bg-cyan-400"
            />
            <span className="text-cyan-400 text-[11px] font-bold uppercase tracking-[0.4em] flex items-center gap-2">
              <MapPin size={12} /> Exquisite Tropical Escape
            </span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-[1px] bg-cyan-400"
            />
          </div>

          <h1 className="text-7xl md:text-9xl font-serif italic text-white mb-2 tracking-tight">
            Crystal <span className="not-italic font-light">Waves</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-12 font-light tracking-[0.2em] uppercase max-w-2xl mx-auto leading-relaxed">
            Experience the <span className="text-white border-b border-cyan-500/50">pinnacle</span> of coastal luxury and refined serenity.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a
            href="#booking"
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden bg-white text-slate-950 px-12 py-5 rounded-sm font-bold uppercase text-[10px] tracking-[0.2em] transition-all"
          >
            <span className="relative z-10">Reserve Your Suite</span>
            <div className="absolute inset-0 bg-cyan-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </motion.a>

          <button className="flex items-center gap-4 text-white group hover:text-cyan-300 transition-colors">
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center group-hover:border-cyan-300 transition-all">
              <Play size={18} fill="currentColor" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Play Film</span>
          </button>
        </motion.div>

        {/* Minimalist Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 border-t border-white/10 pt-12"
        >
          {[
            { label: "Private Suites", val: "42" },
            { label: "Michelin Dining", val: "03" },
            { label: "Guest Satisfaction", val: "4.9/5" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center group">
              <span className="text-3xl font-serif text-white mb-1 group-hover:text-cyan-400 transition-colors">{stat.val}</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-400 to-transparent"></div>
        <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-bold rotate-90 origin-left ml-2">Scroll</span>
      </motion.div>
    </section>
  );
}