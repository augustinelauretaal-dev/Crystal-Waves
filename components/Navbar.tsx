"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, Calendar, Globe, Star } from "lucide-react";

export default function LuxuryNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Amenities", href: "#amenities" },
    { name: "Rooms", href: "#rooms" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Location", href: "#location" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Utility Bar */}
      <div 
        className={`hidden lg:block border-b border-white/10 transition-all duration-700 ease-in-out overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 h-10 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/60">
          <div className="flex gap-6">
            <span className="flex items-center gap-2 tracking-widest"><MapPin size={12} className="text-cyan-400" /> Nueva Ecija, PH</span>
            <span className="flex items-center gap-2 tracking-widest"><Phone size={12} className="text-cyan-400" /> +63 912 345 6789</span>
          </div>
          <div className="flex gap-5 items-center">
            <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"><Globe size={12} /> EN</span>
            <div className="h-3 w-[1px] bg-white/20"></div>
            <a href="#location" className="hover:text-white transition-colors">Find Us</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "bg-slate-950/95 backdrop-blur-md border-b border-white/5 py-3" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex justify-between items-center">
          
          {/* Logo (Home Link) */}
          <a href="/" className="flex flex-col group cursor-pointer no-underline">
            <span className="text-white text-xl lg:text-2xl font-serif tracking-tight leading-none italic transition-transform duration-500 group-hover:scale-105">
              Crystal <span className="font-light not-italic text-cyan-200">Waves</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.5em] text-cyan-400/80 font-bold mt-1">
              Sanctuary & Spa
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 hover:text-cyan-300 transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400/50 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-6">
            <a
              href="#booking"
              className="hidden sm:flex group relative items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 px-6 py-2.5 rounded-full transition-all duration-500"
            >
              <Calendar size={14} className="text-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                Book a Stay
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(true)}
              className="xl:hidden text-white hover:text-cyan-300 transition-colors"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-slate-950 z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-serif italic text-lg text-white/60">Menu</span>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-5 flex-1 overflow-y-auto custom-scrollbar">
                {/* Mobile version adds Home link explicitly */}
                <a href="/" className="text-2xl font-serif text-white hover:text-cyan-300 transition-colors" onClick={() => setIsOpen(false)}>Home</a>
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-serif text-white/90 hover:text-cyan-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="border-t border-white/10 pt-8 mt-6 space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">Reservations</p>
                  <p className="text-white font-serif italic text-lg">+63 912 345 6789</p>
                </div>
                <a 
                  href="#booking"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-cyan-700 hover:bg-cyan-600 text-white text-center py-4 font-bold uppercase text-[10px] tracking-[0.3em] transition-all"
                >
                  Check Availability
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}