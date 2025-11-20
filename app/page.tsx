'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Zap, Terminal, Eye, Box, Hexagon, Ghost, 
  ArrowRight, Mail, Globe, Cpu, Layers, X, Menu 
} from 'lucide-react';

// --- 1. UTILIDADES Y EFECTOS VISUALES ---

// Custom Cursor
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-[#CCFF00] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <div className="w-1 h-1 bg-[#FF0099] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
    </motion.div>
  );
};

// Matrix Rain Effect
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '0123456789ABCDEFMWXZ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#CCFF00'; // Acid Green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 opacity-10 pointer-events-none z-0" />;
};

// Componente: Glitch Text
const GlitchText = ({ text, size = "text-6xl" }: { text: string, size?: string }) => (
  <div className={`relative group inline-block font-black italic uppercase ${size}`}>
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#FF0099] opacity-0 group-hover:opacity-70 group-hover:translate-x-[4px] transition-all duration-75 select-none">{text}</span>
    <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#00FFFF] opacity-0 group-hover:opacity-70 group-hover:-translate-x-[4px] transition-all duration-75 select-none">{text}</span>
  </div>
);

// Componente: Neo Card (Brutalista)
const NeoCard = ({ children, className = "", hoverEffect = true }: any) => (
  <motion.div 
    whileHover={hoverEffect ? { translateX: -4, translateY: -4, boxShadow: "8px 8px 0px 0px #CCFF00" } : {}}
    className={`bg-[#111] border-4 border-white p-6 shadow-[4px_4px_0px_0px_#000] relative overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF0099] to-[#CCFF00]" />
    {children}
  </motion.div>
);

// Componente: 3D Cube (Simulado CSS)
const RetroCube = () => (
  <div className="w-32 h-32 relative [transform-style:preserve-3d] animate-[spin_10s_linear_infinite]">
    <div className="absolute inset-0 border-4 border-[#CCFF00] bg-[#000]/80 translate-z-[64px] flex items-center justify-center text-2xl font-bold text-[#FF0099]">NULL</div>
    <div className="absolute inset-0 border-4 border-[#CCFF00] bg-[#000]/80 translate-z-[-64px]" />
    <div className="absolute inset-0 border-4 border-[#FF0099] bg-[#000]/80 rotate-y-90 translate-z-[64px]" />
    <div className="absolute inset-0 border-4 border-[#FF0099] bg-[#000]/80 rotate-y-[-90] translate-z-[64px]" />
    <div className="absolute inset-0 border-4 border-white bg-[#000]/80 rotate-x-90 translate-z-[64px]" />
    <div className="absolute inset-0 border-4 border-white bg-[#000]/80 rotate-x-[-90] translate-z-[64px]" />
  </div>
);

// --- 2. PÁGINAS ---

const Home = ({ setPage }: { setPage: (p: string) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
    className="flex flex-col justify-center items-center h-full text-center px-4 gap-8"
  >
    <div className="relative">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -top-20 -right-20 opacity-20 md:opacity-100"
      >
        <RetroCube />
      </motion.div>
      <GlitchText text="Digital" size="text-[12vw] md:text-[8vw] leading-[0.8]" />
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-[#FF0099] text-[12vw] md:text-[8vw] font-black italic uppercase leading-[0.8]">
        Rebellion
      </span>
    </div>
    
    <p className="max-w-xl font-mono text-neutral-400 text-sm md:text-base border-l-4 border-[#CCFF00] pl-4 text-left">
      Rechazamos la estética corporativa estéril. Abrazamos el caos, el error y la autenticidad. Bienvenido al futuro roto.
    </p>

    <motion.button
      onClick={() => setPage('work')}
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      className="bg-[#CCFF00] text-black font-black text-xl px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_#FFF] hover:bg-[#FF0099] hover:text-white hover:shadow-[6px_6px_0px_0px_#CCFF00] transition-all mt-8 flex items-center gap-2"
    >
      EXPLORAR PROYECTOS <ArrowRight className="w-6 h-6" />
    </motion.button>
  </motion.div>
);

const Work = () => {
  const projects = [
    { id: 1, title: "CYBER_FASHION", cat: "E-COMMERCE", color: "#FF0099", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "NEON_SYNTH", cat: "WEB3 APP", color: "#00FFFF", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "GLITCH_ART", cat: "PORTFOLIO", color: "#CCFF00", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "DATA_CORE", cat: "DASHBOARD", color: "#FFF", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full overflow-y-auto p-4 pb-24">
      <h2 className="text-4xl font-black mb-8 flex items-center gap-2"><Terminal className="text-[#CCFF00]" /> SELECTED_WORK</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <motion.div key={p.id} whileHover={{ y: -10 }} className="group relative cursor-pointer">
            <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 border-2 border-neutral-800" />
            <div className={`relative border-4 border-black bg-neutral-900 aspect-video overflow-hidden shadow-[8px_8px_0px_0px_${p.color}]`}>
              <img src={p.img} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 text-center backdrop-blur-sm">
                 <h3 className="text-3xl font-black text-white uppercase italic stroke-black">{p.title}</h3>
                 <span className="font-mono text-xs bg-[#CCFF00] text-black px-2 py-1 mt-2">{p.cat}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const About = () => (
  <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col md:flex-row gap-12 items-center h-full p-4 overflow-y-auto pb-24">
    <div className="w-full md:w-1/2 relative">
      <div className="w-full aspect-square border-4 border-white relative bg-[url('https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80')] bg-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500 shadow-[12px_12px_0px_0px_#FF0099]">
        <div className="absolute -top-6 -left-6 bg-[#CCFF00] text-black font-black text-xl px-4 py-2 rotate-[-5deg] border-2 border-black">LEVEL 24</div>
      </div>
    </div>
    <div className="w-full md:w-1/2 font-mono">
      <h2 className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">WHO_AM_I?</h2>
      <p className="text-lg mb-6 text-neutral-300 leading-relaxed">
        Soy una entidad creativa obsesionada con el <span className="text-[#FF0099] font-bold">caos controlado</span>. 
        Diseño experiencias que rompen la cuarta pared. No sigo tendencias, creo anomalías en la matrix.
      </p>
      
      <div className="space-y-4">
        {[
          { skill: "Design Strategy", val: "98%" },
          { skill: "Next.js / React", val: "100%" },
          { skill: "3D / WebGL", val: "85%" },
          { skill: "Neo-Brutalism", val: "MAX" }
        ].map((s, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1 text-[#CCFF00]">
              <span>{s.skill}</span>
              <span>{s.val}</span>
            </div>
            <div className="w-full h-4 border-2 border-white p-[2px]">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: s.val === "MAX" ? "100%" : s.val }} 
                transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                className="h-full bg-[#FF0099] relative overflow-hidden"
              >
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-50"></div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const Services = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full p-4 overflow-y-auto pb-24">
    <h2 className="text-center text-4xl font-black mb-12 uppercase">Protocolos de Servicio</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: "Web Development", icon: <Cpu size={40}/>, price: "$2k+", desc: "Next.js 15, Full Stack, High Performance.", color: "border-[#00FFFF]" },
        { title: "Visual Identity", icon: <Eye size={40}/>, price: "$1.5k+", desc: "Branding radical, Logos, Manual de Caos.", color: "border-[#CCFF00]" },
        { title: "3D Experiences", icon: <Box size={40}/>, price: "$3k+", desc: "R3F, WebGL, Inmersión total.", color: "border-[#FF0099]" }
      ].map((s, i) => (
        <NeoCard key={i} className={`h-full flex flex-col items-center text-center gap-4 ${s.color}`} hoverEffect={true}>
          <div className="bg-white text-black p-4 rounded-none border-2 border-black mb-2">{s.icon}</div>
          <h3 className="text-xl font-black uppercase">{s.title}</h3>
          <p className="font-mono text-sm text-gray-400">{s.desc}</p>
          <div className="mt-auto w-full pt-4 border-t border-gray-800">
            <div className="text-2xl font-bold text-white mb-2">{s.price}</div>
            <button className="w-full bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-2 transition-colors uppercase text-xs tracking-widest">
              Iniciar
            </button>
          </div>
        </NeoCard>
      ))}
    </div>
  </motion.div>
);

const Contact = () => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="h-full flex items-center justify-center p-4">
    <div className="w-full max-w-2xl">
      <NeoCard className="bg-[#050505]">
        <div className="flex justify-between items-center mb-8 border-b-4 border-white pb-4">
          <h2 className="text-3xl font-black uppercase flex items-center gap-2"><Mail /> INICIAR TRANSMISIÓN</h2>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-[#FF0099] rounded-full animate-pulse" />
            <div className="w-4 h-4 bg-[#CCFF00] rounded-full" />
          </div>
        </div>
        
        <form className="space-y-6 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[#CCFF00] text-xs uppercase">/// Identificador</label>
              <input type="text" placeholder="Tu Nombre" className="w-full bg-[#111] border-2 border-gray-700 p-3 text-white focus:border-[#FF0099] focus:outline-none focus:shadow-[4px_4px_0px_0px_#FF0099] transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[#CCFF00] text-xs uppercase">/// Frecuencia (Email)</label>
              <input type="email" placeholder="correo@ejemplo.com" className="w-full bg-[#111] border-2 border-gray-700 p-3 text-white focus:border-[#FF0099] focus:outline-none focus:shadow-[4px_4px_0px_0px_#FF0099] transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[#CCFF00] text-xs uppercase">/// Carga de Datos (Mensaje)</label>
            <textarea rows={4} placeholder="Cuéntame tu idea loca..." className="w-full bg-[#111] border-2 border-gray-700 p-3 text-white focus:border-[#FF0099] focus:outline-none focus:shadow-[4px_4px_0px_0px_#FF0099] transition-all" />
          </div>
          
          <button className="w-full bg-[#CCFF00] text-black font-black text-xl py-4 border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[8px_8px_0px_0px_#FFF] transition-all uppercase flex justify-center items-center gap-2">
            <Zap className="w-5 h-5 fill-current" /> Enviar Señal
          </button>
        </form>
      </NeoCard>
    </div>
  </motion.div>
);

// --- 3. LAYOUT PRINCIPAL (APP) ---

export default function App() {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'BASE' },
    { id: 'work', label: 'PROYECTOS' },
    { id: 'about', label: 'PERFIL' },
    { id: 'services', label: 'SERVICIOS' },
    { id: 'contact', label: 'CONTACTO' }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF0099] selection:text-white overflow-hidden relative">
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Custom Elements */}
      <CustomCursor />
      <MatrixRain />

      {/* Main Layout Grid */}
      <div className="relative z-10 flex flex-col h-screen">
        
        {/* HEADER */}
        <header className="flex justify-between items-center p-6 md:p-8 border-b-4 border-white bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
            <Hexagon className="text-[#CCFF00] fill-current w-8 h-8 animate-spin-slow" />
            <span className="font-black text-2xl italic tracking-tighter">NEO<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-[#FF0099]">BRUTAL</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 font-mono font-bold text-sm">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`hover:text-[#CCFF00] transition-colors uppercase relative group ${page === item.id ? 'text-[#CCFF00]' : 'text-gray-400'}`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-1 bg-[#FF0099] transition-all duration-300 ${page === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </header>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed inset-0 bg-[#CCFF00] z-40 flex flex-col justify-center items-center md:hidden"
            >
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => { setPage(item.id); setMenuOpen(false); }}
                  className="text-black font-black text-5xl my-4 hover:text-white transition-colors uppercase italic"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTENT AREA */}
        <main className="flex-grow relative overflow-hidden">
          <div className="absolute top-4 left-4 font-mono text-[10px] text-gray-500 hidden md:block">
            COORDS: {page.toUpperCase()}_SECTOR
          </div>
          
          <div className="h-full w-full max-w-7xl mx-auto relative">
            <AnimatePresence mode="wait">
              {page === 'home' && <Home key="home" setPage={setPage} />}
              {page === 'work' && <Work key="work" />}
              {page === 'about' && <About key="about" />}
              {page === 'services' && <Services key="services" />}
              {page === 'contact' && <Contact key="contact" />}
            </AnimatePresence>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="border-t-4 border-neutral-800 p-4 flex justify-between items-center bg-[#050505] text-xs font-mono text-gray-500 z-10">
          <div className="flex gap-4">
             <span>STATUS: <span className="text-[#CCFF00] animate-pulse">● ONLINE</span></span>
             <span>VER: 2.0.25</span>
          </div>
          <div className="uppercase">Designed for Rebellion</div>
        </footer>

      </div>
    </div>
  );
}