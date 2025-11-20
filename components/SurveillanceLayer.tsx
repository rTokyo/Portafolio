'use client'

import React, { useEffect, useState } from 'react';

export const SurveillanceLayer = ({ nightVision }: { nightVision: boolean }) => {
  const [time, setTime] = useState('');
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  // Reloj UTC Táctico
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}:${d.getUTCSeconds().toString().padStart(2, '0')}`);
    };
    const interval = setInterval(tick, 1000);
    tick();
    
    const moveCursor = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', moveCursor);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 z-[50] transition-all duration-500 ${nightVision ? 'sepia hue-rotate-[50deg] contrast-125 brightness-110' : ''}`}>
      
      {/* 1. FILM GRAIN (Ruido SVG) */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay">
        <svg className='h-full w-full'>
          <filter id='noiseFilter'>
            <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/>
          </filter>
          <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
        </svg>
      </div>

      {/* 2. SCANLINES */}
      <div className="absolute inset-0 bg-scanlines bg-[length:100%_4px] opacity-20"></div>

      {/* 3. VIGNETTE (Oscuridad en bordes) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)]"></div>

      {/* 4. UI DATA (Esquinas) */}
      <div className="absolute top-8 left-8 font-mono text-alert text-xs flex items-center gap-2 animate-pulse">
        <div className="w-3 h-3 bg-alert rounded-full"></div> REC ● [{time}]
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-metal text-xs">
        SYS_STATUS: {nightVision ? 'NIGHT_OP' : 'STANDARD'} // CAM_04
      </div>

      {/* 5. SNIPER CURSOR */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 mix-blend-difference transition-transform duration-75 ease-out hidden md:block"
        style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}
      >
        <div className="absolute top-1/2 w-full h-[1px] bg-white"></div>
        <div className="absolute left-1/2 h-full w-[1px] bg-white"></div>
        <div className="absolute inset-0 border border-white rounded-full opacity-50"></div>
      </div>
    </div>
  );
};
