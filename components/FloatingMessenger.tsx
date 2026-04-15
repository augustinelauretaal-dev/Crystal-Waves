"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Facebook, Instagram, X } from "lucide-react";

export default function FloatingMessenger() {
  const [isOpen, setIsOpen] = useState(false);

  // Animation variants for the sub-buttons
  const iconVariants = {
    hidden: { opacity: 0, y: 20, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    }),
    exit: { opacity: 0, y: 10, scale: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col gap-3 mb-2">
            {/* Instagram Button */}
            <motion.a
              href="https://www.instagram.com/crystalwavesresort"
              target="_blank"
              rel="noopener noreferrer"
              custom={1}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <Instagram className="w-5 h-5" />
            </motion.a>

            {/* Facebook Button */}
            <motion.a
              href="https://www.facebook.com/crystalwaveshotelandresort"
              target="_blank"
              rel="noopener noreferrer"
              custom={0}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-[#1877F2] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <Facebook className="w-5 h-5" />
            </motion.a>
          </div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className={`${
          isOpen ? "bg-slate-800" : "bg-cyan-600"
        } text-white p-4 rounded-full shadow-xl transition-colors duration-300 relative`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}