"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, Calendar, Globe } from "lucide-react";

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
    { name: "The Resort", href: "#about" },
    { name: "Suites", href: "#rooms" },
    { name: "Experiences", href: "#amenities" },
    { name: "Dining", href: "#dining" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Utility Bar - Hidden on Scroll */}
      <div className={`hidden lg:block border-b border-white/10 transition-all duration-500 ${isScrolled ? "h-0 opacity-0 overflow-hidden" : "h-10 opacity-100"}`}>
        <div className="max-w-7xl mx-auto px-8 h-full flex justify-between items-center text-[11px] uppercase tracking-[0.2em] text-white/70">
          <div className="flex gap-6">
            <span className="flex items-center gap-2 font-medium"><MapPin size={12} className="text-cyan-400" /> Nueva Ecija, Philippines</span>
            <span className="flex items-center gap-2 font-medium"><Phone size={12} className="text-cyan-400" /> +63 912 345 6789</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"><Globe size={12} /> EN</span>
            <div className="h-3 w-[1px] bg-white/20"></div>
            <a href="#location" className="hover:text-white transition-colors">How to get here</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav
        className={`transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/5 py-3" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          
          {/* Elegant Serif Logo */}
          <div className="flex flex-col group cursor-pointer">
            <span className="text-white text-2xl lg:text-3xl font-serif tracking-tight leading-none italic transition-transform duration-500 group-hover:scale-105">
              Crystal <span className="font-light not-italic text-cyan-200">Waves</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-cyan-400/80 font-bold mt-1">
              Sanctuary & Spa
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[12px] uppercase tracking-[0.15em] font-medium text-white/90 hover:text-cyan-300 transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-cyan-300 transition-all duration-500 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
            
            {/* CTA Button */}
            <a
              href="#booking"
              className="group relative flex items-center gap-2 bg-transparent border border-white/30 px-7 py-2.5 rounded-sm overflow-hidden transition-all duration-500 hover:border-cyan-400"
            >
              <div className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              <Calendar size={16} className="relative z-10 text-white group-hover:text-slate-900 transition-colors duration-500" />
              <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-white group-hover:text-slate-900 transition-colors duration-500">
                Reservations
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-white hover:text-cyan-300 transition-colors"
          >
            <Menu size={30} strokeWidth={1.5} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-slate-950 z-[70] shadow-2xl p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif italic text-xl text-white">The Collection</span>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                  <X size={32} />
                </button>
              </div>

              <div className="flex flex-col gap-8 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-serif text-white/90 hover:text-cyan-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="border-t border-white/10 pt-8 mt-auto space-y-4">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Inquiries</p>
                <p className="text-white font-serif italic text-lg">+63 912 345 6789</p>
                <button className="w-full bg-cyan-600 text-white py-4 font-bold uppercase text-xs tracking-[0.2em] hover:bg-cyan-500 transition-colors">
                  Check Availability
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}