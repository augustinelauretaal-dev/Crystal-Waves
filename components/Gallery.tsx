"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, Maximize2 } from "lucide-react";

export default function LuxuryGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    { id: 1, category: "Infinity Pool", span: "md:col-span-2 md:row-span-2", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80" },
    { id: 2, category: "Spa Sanctuary", span: "md:col-span-1 md:row-span-1", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" },
    { id: 3, category: "Ocean Suite", span: "md:col-span-1 md:row-span-2", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
    { id: 4, category: "Sunset Beach", span: "md:col-span-1 md:row-span-1", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" },
    { id: 5, category: "Fine Dining", span: "md:col-span-1 md:row-span-1", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" },
    { id: 6, category: "Tropical Gardens", span: "md:col-span-2 md:row-span-1", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80" },
    { id: 7, category: "Lounge Bar", span: "md:col-span-1 md:row-span-1", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" },
    ];

  const currentImg = images.find(i => i.id === selectedImage);

  return (
    <section id="gallery" ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h3 className="text-cyan-600 text-[11px] font-bold uppercase tracking-[0.4em] mb-4">
            Visual Journal
          </h3>
          <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900 mb-6">
            Moments of <span className="not-italic font-light">Serenity</span>
          </h2>
          <p className="text-slate-500 font-light max-w-xl mx-auto leading-relaxed text-lg">
            A glimpse into the soul of Crystal Waves. Explore the textures, 
            tones, and landscapes of our coastal haven.
          </p>
        </motion.div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`${image.span} relative group cursor-pointer overflow-hidden rounded-sm bg-slate-100`}
              onClick={() => setSelectedImage(image.id)}
            >
              <img 
                src={image.image} 
                alt={image.category}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
              />
              
              {/* Refined Overlay */}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                <Maximize2 className="text-white w-6 h-6 mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                <p className="text-white text-[10px] uppercase tracking-[0.3em] font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  View Detail
                </p>
              </div>

              {/* Minimal Caption */}
              <div className="absolute bottom-6 left-6 z-10 pointer-events-none group-hover:opacity-0 transition-opacity">
                <span className="text-white text-[10px] uppercase tracking-[0.2em] font-bold drop-shadow-md">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/98 z-[100] flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X className="w-8 h-8 stroke-1" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-6xl w-full h-full flex flex-col justify-center"
            >
              <img 
                src={currentImg?.image} 
                alt={currentImg?.category}
                className="w-full h-full object-contain"
              />
              <div className="mt-6 text-center">
                <p className="text-cyan-500 text-[10px] uppercase tracking-[0.4em] mb-2 font-bold">
                  Resort Collection
                </p>
                <h4 className="text-white font-serif italic text-2xl">
                  {currentImg?.category}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}