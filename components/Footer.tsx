"use client";

import { Facebook, Instagram, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

export default function LuxuryFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & Story */}
          <div className="md:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-serif italic mb-2 tracking-tight">
                Crystal <span className="not-italic font-light">Waves</span>
              </h2>
              <p className="text-cyan-600 text-[10px] uppercase tracking-[0.4em] font-bold">
                Hotel & Resort
              </p>
            </div>
            <p className="text-slate-500 font-light leading-relaxed max-w-sm text-sm">
              An sanctuary designed for the modern traveler. From our salt-water 
              pools to our curated wellness suites, every detail at Crystal Waves 
              is crafted for tranquility and renewal.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/crystalwaveshotelandresort" },
                { icon: Instagram, href: "#" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-950 transition-all duration-500"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-white">
              Navigation
            </h3>
            <ul className="space-y-4">
              {['Suites', 'Gallery', 'Amenities', 'Reservations', 'Location'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-slate-500 hover:text-cyan-500 text-sm font-light transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-white">
              Concierge
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-cyan-600 mt-1" />
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  Maharlika Highway, Talavera,<br />
                  Nueva Ecija, Philippines
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-cyan-600" />
                <p className="text-slate-500 text-sm font-light">+63 912 345 6789</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-cyan-600" />
                <p className="text-slate-500 text-sm font-light">concierge@crystalwaves.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[11px] uppercase tracking-widest font-medium">
            © {new Date().getFullYear()} Crystal Waves. Crafted for Excellence.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 group text-slate-500 hover:text-white transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Back to top</span>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}