"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Waves,
  Bed,
  Utensils,
  Wifi,
  Coffee,
  Dumbbell,
  Plane,
  Sparkles,
} from "lucide-react";

export default function LuxuryAmenities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const amenities = [
    {
      icon: <Waves className="w-7 h-7 stroke-[1.1]" />,
      title: "Infinity Pool",
      description: "Temperature-controlled waters overlooking the horizon.",
    },
    {
      icon: <Bed className="w-7 h-7 stroke-[1.1]" />,
      title: "Signature Suites",
      description: "Bespoke furnishings and panoramic floor-to-ceiling views.",
    },
    {
      icon: <Utensils className="w-7 h-7 stroke-[1.1]" />,
      title: "Gourmet Dining",
      description: "A culinary journey led by world-renowned chefs.",
    },
    {
      icon: <Sparkles className="w-7 h-7 stroke-[1.1]" />,
      title: "Wellness Spa",
      description: "Holistic treatments inspired by ancient coastal traditions.",
    },
    {
      icon: <Dumbbell className="w-7 h-7 stroke-[1.1]" />,
      title: "Fitness Studio",
      description: "Equipped with state-of-the-art Technogym technology.",
    },
    {
      icon: <Coffee className="w-7 h-7 stroke-[1.1]" />,
      title: "Private Lounge",
      description: "Artisanal coffee and curated spirits in a serene setting.",
    },
    {
      icon: <Wifi className="w-7 h-7 stroke-[1.1]" />,
      title: "Seamless Connectivity",
      description: "High-speed fiber optic network throughout the estate.",
    },
    {
      icon: <Plane className="w-7 h-7 stroke-[1.1]" />,
      title: "Chauffeur Service",
      description: "Private airport transfers and local exploration in luxury.",
    },
  ];

  return (
    <section id="amenities" ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h3 className="text-cyan-600 text-[11px] font-bold uppercase tracking-[0.4em] mb-4">
            Curated Comfort
          </h3>
          <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900 mb-6">
            The <span className="not-italic font-light">Guest Experience</span>
          </h2>
          <p className="text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            Every detail is meticulously considered to provide an atmosphere of 
            unparalleled ease and quiet sophistication.
          </p>
        </motion.div>

        {/* Professional Border Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-100">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="p-12 border-r border-b border-slate-100 group hover:bg-slate-50 transition-colors duration-500"
            >
              <div className="mb-8 relative">
                {/* Subtle Icon Background Animation */}
                <div className="absolute -inset-2 bg-cyan-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
                <div className="relative z-10 text-slate-400 group-hover:text-cyan-600 transition-colors duration-500">
                  {amenity.icon}
                </div>
              </div>

              <h4 className="text-[13px] uppercase tracking-[0.2em] font-bold text-slate-900 mb-4 group-hover:translate-x-1 transition-transform duration-500">
                {amenity.title}
              </h4>
              
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action (Optional for Luxury Feel) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <button className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 border-b border-slate-200 pb-2 hover:text-cyan-600 hover:border-cyan-600 transition-all">
            View All Resort Offerings
          </button>
        </motion.div>
      </div>
    </section>
  );
}