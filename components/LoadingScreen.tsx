import React, { useEffect, useState, useMemo } from 'react';
import { Check } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);

  // Generate random dollar particles
  const dollars = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position
      animationDuration: `${2 + Math.random() * 3}s`, // Random speed between 2s and 5s
      animationDelay: `${Math.random() * 2}s`, // Random start delay
      fontSize: `${Math.random() * 1.5 + 1}rem`, // Random size
      opacity: Math.random() * 0.4 + 0.1 // Random opacity
    }));
  }, []);

  useEffect(() => {
    // Show loading screen for 3 seconds then start exit animation
    const timer = setTimeout(() => {
      setExiting(true);
      // Allow the exit animation to play before unmounting/hiding
      setTimeout(onComplete, 1200); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#09090b] transition-all duration-1000 ease-in-out overflow-hidden ${
        exiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Falling Money Animation Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {dollars.map((d) => (
          <div
            key={d.id}
            className="absolute top-[-10%] text-green-500 font-serif font-bold animate-fall"
            style={{
              left: `${d.left}%`,
              animationDuration: d.animationDuration,
              animationDelay: d.animationDelay,
              fontSize: d.fontSize,
              opacity: d.opacity,
              textShadow: '0 0 10px rgba(74, 222, 128, 0.5)'
            }}
          >
            $
          </div>
        ))}
      </div>

      {/* The Card */}
      <div className="relative z-10 w-[90%] max-w-[340px] h-[215px] md:max-w-[420px] md:h-[265px] bg-black rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 flex flex-col justify-between p-6 md:p-8 select-none">
        
        {/* Subtle texture/gradient on card */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 via-black to-black pointer-events-none" />
        
        {/* Noise texture overlay (optional css pattern simulated) */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] pointer-events-none" />

        {/* Top Row: Chip and Logo */}
        <div className="relative z-10 flex justify-between items-start">
          {/* EMV Chip */}
          <div className="w-12 h-9 md:w-14 md:h-11 bg-gradient-to-br from-zinc-300 to-zinc-500 rounded-md relative overflow-hidden shadow-inner border border-zinc-400/30">
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-600/40"></div>
             <div className="absolute top-0 left-1/2 h-full w-[1px] bg-zinc-600/40"></div>
             <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-zinc-600/40 rounded-sm"></div>
          </div>

          {/* Logo Group */}
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-tr from-[#bf953f] via-[#fcf6ba] to-[#b38728] rounded flex items-center justify-center shadow-lg">
                    <Check className="w-3 h-3 md:w-4 md:h-4 text-black stroke-[4]" />
                </div>
                <span className="text-[10px] md:text-xs font-bold text-zinc-300 tracking-wider">SwiftCollect</span>
             </div>
          </div>
        </div>

        {/* Center: Brand Name */}
        <div className="relative z-10 text-center mt-2">
           <h1 className="font-serif text-3xl md:text-5xl text-white tracking-tight drop-shadow-lg italic">
             SwiftCollect
           </h1>
           <p className="text-[8px] md:text-[10px] text-zinc-500 mt-2 tracking-[0.2em] font-medium">EXPIRATION 12/28</p>
        </div>

        {/* Bottom Row */}
        <div className="relative z-10 flex justify-between items-end mt-auto">
           {/* Color squares */}
           <div className="flex gap-1">
              <div className="w-6 h-4 md:w-8 md:h-5 bg-zinc-700 rounded-sm opacity-80" />
              <div className="w-6 h-4 md:w-8 md:h-5 bg-zinc-500 rounded-sm opacity-80" />
              <div className="w-6 h-4 md:w-8 md:h-5 bg-zinc-300 rounded-sm opacity-80" />
           </div>

           {/* Date */}
           <div className="text-zinc-200 text-sm md:text-base font-mono tracking-widest shadow-black drop-shadow-md">
             12/28
           </div>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
      </div>

      {/* Loading Indicator below card */}
      <div className={`absolute bottom-20 flex flex-col items-center gap-3 transition-opacity duration-500 ${exiting ? 'opacity-0' : 'opacity-100'}`}>
         <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] animate-[shimmer_1.5s_linear_infinite] w-full origin-left" />
         </div>
         <span className="text-xs text-zinc-500 font-medium tracking-widest uppercase">Iniciando sistema seguro...</span>
      </div>

    </div>
  );
};