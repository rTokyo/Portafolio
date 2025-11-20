'use client'

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, Terminal, Send } from 'lucide-react';

// Importación de componentes modulares
import { SurveillanceLayer } from '@/components/SurveillanceLayer';
import Scene3D from '@/components/Scene3D';
import { HeroSection, ProjectSection } from '@/components/Sections';

export default function SurveillanceOS() {
  const [isBreached, setIsBreached] = useState(false);
  const [nightVision, setNightVision] = useState(false);
  const [chatInput, setChatInput] = useState('');

  // Inicializar Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Efecto Flashbang
  const triggerBreach = () => {
    const flash = document.createElement('div');
    flash.className = "fixed inset-0 bg-white z-[100] pointer-events-none transition-opacity duration-[1500ms]";
    document.body.appendChild(flash);
    
    // Forzar repintado para la transición
    requestAnimationFrame(() => { flash.style.opacity = '0'; });
    setTimeout(() => flash.remove(), 1500);

    setIsBreached(true);
  };

  // Sonido de teclado
  const playKeySound = () => {
    // Descomentar y agregar archivos de audio en /public para habilitar
    // const audio = new Audio('/key-click.mp3'); audio.volume = 0.2; audio.play().catch(() => {});
  };

  return (
    <main className="min-h-screen bg-void text-bone selection:bg-alert selection:text-black overflow-x-hidden">
      
      {/* CAPA DE VFX GLOBAL */}
      <SurveillanceLayer nightVision={nightVision} />
      
      {/* ESCENA 3D DE FONDO */}
      <Scene3D mode={isBreached ? 'CONTACT' : 'HERO'} />

      {/* CONTROLES FLOTANTES */}
      {isBreached && (
        <button 
          onClick={() => setNightVision(!nightVision)}
          className="fixed bottom-8 right-8 z-[60] p-4 bg-black/50 border border-metal/50 backdrop-blur-md rounded-full text-metal hover:text-vision hover:border-vision transition-all"
        >
          {nightVision ? <EyeOff /> : <Eye />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {!isBreached ? (
          // ESTADO 1: BLOQUEADO (HERO)
          <motion.div key="locked" exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }} transition={{ duration: 1 }}>
            <HeroSection onBreach={triggerBreach} />
          </motion.div>
        ) : (
          // ESTADO 2: INFILTRADO (CONTENIDO)
          <motion.div 
            key="unlocked" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5, duration: 1 }}
          >
            {/* Header Falso */}
            <header className="fixed top-0 w-full p-6 flex justify-between items-center z-40 mix-blend-difference font-mono text-xs text-gray-500">
              <span>OPERATOR: MAXIMO</span>
              <span className="animate-pulse text-vision">CONNECTION: SECURE</span>
            </header>

            {/* Espaciador para que el contenido no empiece pegado arriba */}
            <div className="h-[20vh]"></div>

            {/* Sección Manifiesto (Scroll Trigger Simulado con CSS Sticky) */}
            <section className="min-h-screen flex flex-col items-center justify-center px-8 md:px-32 relative z-10 text-center">
              <h2 className="text-2xl md:text-5xl font-mono leading-relaxed max-w-4xl uppercase mix-blend-difference">
                <span className="text-alert text-sm block mb-8 tracking-widest">/// MANIFESTO_FILE</span>
                No diseñamos páginas. <span className="line-through decoration-alert decoration-4 opacity-50">Creamos plantillas.</span> 
                <span className="text-vision bg-black px-2">Infiltramos mentes.</span> <br/><br/>
                En la era de la vigilancia digital, el diseño es el único camuflaje que importa.
              </h2>
            </section>

            {/* Sección Proyectos */}
            <ProjectSection />

            {/* Sección Contacto (Chat Encriptado) */}
            <section className="min-h-screen flex items-center justify-center p-4 relative z-10">
              <div className="w-full max-w-2xl border border-vision/30 bg-black/80 backdrop-blur-xl p-6 md:p-12 shadow-[0_0_50px_rgba(0,255,65,0.1)]">
                <div className="flex items-center gap-2 mb-8 border-b border-metal/30 pb-4">
                  <Terminal className="text-vision w-5 h-5" />
                  <span className="font-mono text-xs text-vision">ENCRYPTED_CHANNEL_V2</span>
                </div>
                
                <div className="space-y-4 font-mono text-sm h-64 overflow-y-auto text-metal mb-4">
                  <div><span className="text-vision">system@root:</span> Initializing handshake...</div>
                  <div><span className="text-vision">system@root:</span> Connection established.</div>
                  <div><span className="text-vision">system@root:</span> Awaiting payload...</div>
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-3 text-vision">{'>'}</span>
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => { setChatInput(e.target.value); playKeySound(); }}
                    placeholder="Escribe tu mensaje..."
                    className="w-full bg-black/50 border border-metal/30 p-3 pl-8 text-white focus:outline-none focus:border-vision focus:ring-1 focus:ring-vision transition-all font-mono"
                  />
                  <button className="absolute right-2 top-2 p-1 text-metal hover:text-vision">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>

            <footer className="py-12 text-center font-mono text-[10px] text-metal">
              /// END_OF_TRANSMISSION ///
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
