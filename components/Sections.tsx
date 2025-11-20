'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, ArrowRight, FileWarning, Eye } from 'lucide-react';

// --- SECCIÓN HERO ---
export const HeroSection = ({ onBreach }: { onBreach: () => void }) => {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden z-10">
      {/* Video Térmico Simulado */}
      <div className="absolute inset-0 z-[-1] opacity-30 mix-blend-screen filter invert contrast-125 grayscale">
         <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-people-walking-in-a-busy-street-at-night-3398-large.mp4" type="video/mp4" />
         </video>
      </div>
      
      <div className="bg-black/70 backdrop-blur-md p-12 border border-metal/30 flex flex-col items-center gap-6 max-w-3xl text-center">
        <div className="flex items-center gap-2 text-alert font-mono text-sm tracking-[0.5em] animate-pulse">
          <Lock className="w-4 h-4" /> SYSTEM_LOCKED
        </div>
        <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none">
          SURVEILLANCE<br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800">ARCHIVE</span>
        </h1>
        
        <button 
          onClick={onBreach}
          className="mt-8 group relative px-12 py-5 bg-transparent overflow-hidden border border-alert text-alert font-mono font-bold text-lg tracking-widest hover:text-black transition-colors duration-300"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Unlock className="w-5 h-5" /> BREACH_SYSTEM
          </span>
          <div className="absolute inset-0 bg-alert transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </section>
  );
};

// --- SECCIÓN PROYECTOS (Esta es la que te faltaba) ---
export const ProjectSection = () => {
  const cases = [
    { id: "CASE_099", title: "NEON_ECOMMERCE", status: "CONFIDENTIAL", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" },
    { id: "CASE_102", title: "CYBER_BANKING", status: "PUBLIC", img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80" },
    { id: "CASE_X12", title: "AI_TERMINAL", status: "REDACTED", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" },
  ];

  return (
    <section className="min-h-screen bg-void py-24 px-4 md:px-24 relative z-10">
      <div className="flex items-center gap-4 mb-16 border-b border-metal/30 pb-4">
        <FileWarning className="text-vision w-8 h-8" />
        <h2 className="text-4xl font-bold text-white uppercase tracking-widest">Evidence_Log</h2>
      </div>

      <div className="flex flex-col gap-20">
        {cases.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-8 cursor-none"
          >
            {/* Texto del Proyecto */}
            <div className="relative z-20 mix-blend-difference">
               <div className="font-mono text-xs text-metal mb-2">{item.id} // {item.status}</div>
               <h3 className="text-5xl md:text-8xl font-black text-gray-500 group-hover:text-white transition-colors duration-300 uppercase">
                 {item.title}
               </h3>
            </div>

            {/* Imagen Revelable (Hover) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 overflow-hidden rotate-3 group-hover:rotate-0 transition-transform">
               <img src={item.img} className="w-full h-full object-cover filter grayscale contrast-125" />
               {/* Efecto Glitch CSS simple */}
               <div className="absolute inset-0 bg-alert/20 mix-blend-color-dodge opacity-50"></div>
            </div>

            <ArrowRight className="hidden md:block w-12 h-12 text-metal group-hover:text-vision transition-all transform group-hover:translate-x-4" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
