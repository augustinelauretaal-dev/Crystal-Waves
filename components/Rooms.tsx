"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Maximize, ArrowRight } from "lucide-react";

export default function LuxuryRooms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const rooms = [
    {
      id: 1,
      name: "Heritage Veranda",
      price: "2,500",
      capacity: "2 Guests",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      size: "25 sqm",
      tag: "Cozy Classic"
    },
    {
      id: 2,
      name: "Deluxe Oceanfront",
      price: "3,500",
      capacity: "2-3 Guests",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      size: "35 sqm",
      tag: "Best Seller"
    },
    {
      id: 3,
      name: "The Family Sanctuary",
      price: "5,000",
      capacity: "4-6 Guests",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      size: "50 sqm",
      tag: "Spacious"
    },
    {
      id: 4,
      name: "Presidential Wave Suite",
      price: "8,000",
      capacity: "2-4 Guests",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      size: "75 sqm",
      tag: "Ultimate Luxury"
    },
  ];

  return (
    <section id="rooms" ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="text-cyan-600 text-[11px] font-bold uppercase tracking-[0.4em] mb-4">
                Private Retreats
              </h3>
              <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900">
                Suites & <span className="not-italic font-light">Sanctuaries</span>
              </h2>
            </div>
            <p className="text-slate-500 font-light max-w-sm border-l border-slate-200 pl-6 leading-relaxed">
              Each residence is a masterpiece of coastal design, blending artisan craftsmanship with modern serenity.
            </p>
          </div>
        </motion.div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 rounded-sm mb-6">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Floating Price Badge */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   <p className="text-white/70 text-[10px] uppercase tracking-widest mb-1">Starts From</p>
                   <p className="text-white font-serif italic text-xl">₱{room.price}<span className="text-xs not-italic font-light opacity-60"> / Night</span></p>
                </div>

                {/* Top Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1">
                  <span className="text-[9px] uppercase tracking-tighter font-bold text-slate-900">{room.tag}</span>
                </div>
              </div>

              {/* Text Details */}
              <div className="space-y-3">
                <h3 className="text-xl font-serif text-slate-900 group-hover:text-cyan-700 transition-colors">
                  {room.name}
                </h3>
                
                <div className="flex items-center gap-6 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                  <span className="flex items-center gap-2"><Users size={12} /> {room.capacity}</span>
                  <span className="flex items-center gap-2"><Maximize size={12} /> {room.size}</span>
                </div>

                <div className="pt-4 overflow-hidden">
                  <a 
                    href="#booking" 
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900 hover:text-cyan-600 transition-all group/link"
                  >
                    Check Availability 
                    <ArrowRight size={14} className="-translate-x-2 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}