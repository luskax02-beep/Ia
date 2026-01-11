import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { Globe, Users, Activity, Signal } from 'lucide-react';

// Simplified World Map SVG Path (Mercator-ish)
const WORLD_MAP_PATH = "M58.9,207.2c-2.4-0.8-4.1,1.1-2.9,3.3c1.7,3.1,6.5,5,8.8,1.4C66.1,209.8,61.8,208.2,58.9,207.2z M170.5,145.4 c-0.2,0.6,0.3,1.3,0.9,1.1c0.6-0.2,0.6-1.1,0-1.2C171,145.2,170.6,145.2,170.5,145.4z M176.6,145.3c-0.1,0.6,0.5,1.1,1,0.9 c0.5-0.2,0.4-1-0.1-1.1C177,145,176.7,145.1,176.6,145.3z M667.6,357.5c-0.6,0.9-0.1,2.1,0.9,2.2c1,0.1,1.5-1.1,0.8-1.9 C669,357.2,668.2,357.1,667.6,357.5z M695.6,345.8c-0.9,0.1-1.6,1.2-1.1,2c0.6,0.9,2,0.7,2.2-0.3 C696.8,346.5,696.4,345.8,695.6,345.8z M611.8,367.6c-2.3,1.3-1.6,4.9,1,5.2c2.4,0.3,3.7-2.9,1.8-4.5 C613.9,367.7,612.8,367.5,611.8,367.6z M240.2,367.1c-1.2,0.8-0.9,2.7,0.5,3c1.3,0.3,2.3-1.3,1.5-2.3 C241.8,367.2,241,366.9,240.2,367.1z M52.5,237.5c-0.8,0.7-0.5,2.1,0.6,2.2c1,0.2,1.6-1.1,0.9-1.8 C53.6,237.4,53,237.3,52.5,237.5z M251.4,220.4c-0.8,0.7-0.4,1.9,0.6,2c1,0.1,1.4-1.2,0.7-1.8C252.3,220.2,251.8,220.2,251.4,220.4z M170.8,223.6c-0.8,0.4-0.9,1.6,0,2.1c0.9,0.5,2-0.2,1.9-1.2C172.6,223.8,171.7,223.4,170.8,223.6z M626,355.2 c-0.8,0.9-0.2,2.3,1,2.4c1.1,0.1,1.7-1.3,0.9-2.1C627.4,355,626.6,354.9,626,355.2z M176.3,237.1c-1.3,0.2-2,1.8-1.2,2.8 c0.9,1,2.7,0.5,2.9-0.8C178.2,238,177.3,236.9,176.3,237.1z M193.1,232.8c-0.9,0.4-1.1,1.6-0.4,2.3c0.8,0.8,2.2,0.2,2.2-0.9 C194.8,233.3,194,232.7,193.1,232.8z M808.9,307.3c-2,1.3-1.2,4.4,1.2,4.6c2.2,0.2,3.3-2.6,1.6-4C811,307.2,809.9,307.1,808.9,307.3 z M167.2,168.4c-0.7,0.6-0.4,1.7,0.5,1.8c0.8,0.1,1.2-1,0.6-1.5C168,168.4,167.5,168.3,167.2,168.4z M186.2,161.7 c-0.6,0.6-0.2,1.7,0.7,1.7c0.8,0.1,1.2-1,0.6-1.5C187.1,161.6,186.6,161.5,186.2,161.7z M257.6,145.4c-2.3,1-1.9,4.7,0.7,5.1 c2.4,0.3,4-2.7,2.2-4.4C259.7,145.4,258.6,145.2,257.6,145.4z M221.7,133.5c-0.8,0.7-0.4,2,0.7,2c1,0,1.4-1.2,0.7-1.8 C222.7,133.4,222.1,133.4,221.7,133.5z M235.6,133.1c-1.3,0.3-1.8,2-0.8,2.9c1,0.9,2.7,0.2,2.7-1.1C237.5,133.9,236.6,133.2,235.6,133.1 z M249,114.7c-0.7,0.6-0.4,1.7,0.6,1.8c0.8,0.1,1.3-1,0.6-1.6C249.8,114.6,249.3,114.6,249,114.7z M140.6,77.5 c-3.5,1.2-3.1,6.5,0.6,7.1c3.5,0.6,6-3.7,3.6-6.1C143.9,77.6,142.2,77.3,140.6,77.5z M852.7,294.5c-1.4,0.9-0.9,3.1,0.8,3.3 c1.6,0.2,2.5-1.8,1.2-2.8C854.2,294.5,853.4,294.4,852.7,294.5z M826.9,292.9c-1.4,1.7,0.7,4,2.5,2.9c1.5-1,0.4-3.5-1.4-3.5 C827.6,292.3,827.2,292.5,826.9,292.9z M131.6,211.3c-1.6,0.9-1.2,3.3,0.6,3.6c1.7,0.3,2.7-1.8,1.4-2.9 C133.1,211.5,132.3,211.3,131.6,211.3z M686.3,283.4c-1.2,0.8-0.9,2.8,0.5,3c1.4,0.3,2.3-1.4,1.4-2.3 C687.9,283.5,687.1,283.3,686.3,283.4z M127.3,158c-1.6,2.2,1.3,4.9,3.3,3.1c1.7-1.5-0.1-4.5-2.2-4.2 C128,157,127.6,157.4,127.3,158z M654.5,263.6c-1.4,1.4,0.1,3.7,1.9,3.1c1.5-0.5,1.5-2.8-0.1-3.3 C655.8,263.2,655,263.3,654.5,263.6z M164.7,260.6c-0.6,1-0.2,2.3,0.9,2.5c1.2,0.2,1.8-1.3,1-2.2 C166.2,260.4,165.3,260.3,164.7,260.6z M287.4,110.1c-1.7,0.7-1.8,3.1-0.1,3.8c1.6,0.6,3.2-1.2,2.3-2.7 C289.2,110.5,288.4,110.2,287.4,110.1z M628.2,229.7c-2.6,2.3-0.5,6.6,2.8,5.8c2.8-0.7,3-5-0.1-6.1 C630.1,229.2,629,229.2,628.2,229.7z M186.2,85.2c-3.7,1-3.6,6.6,0.1,7.4c3.6,0.8,6.5-3.6,4-6.3C189.5,85.4,187.9,85,186.2,85.2 z M85.2,83.1c-4.4,0.4-6.3,6-2.6,8.2c3.7,2.1,8.1-2.1,6.1-5.7C88.2,84.4,86.8,83.4,85.2,83.1z M852.1,232.2c-1.3,0.7-1.1,2.7,0.4,3.1 c1.4,0.4,2.5-1.2,1.7-2.3C853.8,232.4,853,232.1,852.1,232.2z M107,175.7c-2.4,1.8-1.1,5.6,1.9,5.5c2.7-0.1,3.4-3.8,1-5.1 C109.1,175.7,108,175.6,107,175.7z M131.7,179.9c-2.1,1.6-0.9,5,2.1,4.9c2.7-0.1,3.4-3.6,1.1-4.8 C134.2,179.5,132.8,179.4,131.7,179.9z M662.9,228.6c-1.6,2.1,1.1,4.9,3.1,3.3c1.8-1.4,0.1-4.6-2.1-4.3 C663.6,227.8,663.2,228.1,662.9,228.6z M104.3,165.7c-1.2,2.3,1.8,4.5,3.6,2.6c1.5-1.6-0.3-4.3-2.3-3.6 C105.1,164.9,104.6,165.2,104.3,165.7z M79.8,171.7c-2.7,1.8-1.5,6.1,1.9,6.2c3-0.1,4.1-3.9,1.5-5.5C82.3,171.8,81,171.6,79.8,171.7 z M110.1,154.5c-2.2,2.6,1.5,6,4.1,3.8c2.2-1.9-0.1-5.7-2.8-5C110.9,153.4,110.4,153.9,110.1,154.5z M253.2,105.2 c-2.3,1.5-1.3,5.1,1.5,5.1c2.4,0.1,3.6-3.1,1.7-4.6C255.6,105.1,254.3,105,253.2,105.2z M654.5,198c-2,1.4-1.1,4.6,1.4,4.7 c2.3,0.1,3.4-2.9,1.6-4.2C656.7,197.9,655.6,197.8,654.5,198z M191.6,252.1c-0.8,0.3-1.1,1.3-0.7,1.9c0.5,0.7,1.5,0.7,1.9,0.1 c0.5-0.6,0-1.6-0.7-1.9C192,252,191.8,252,191.6,252.1z M662,194.2c-1.3,0.7-1.1,2.6,0.3,3c1.4,0.4,2.5-1.2,1.7-2.2 C663.6,194.3,662.8,194.1,662,194.2z M656.3,176.7c-2.3,1.3-1.6,4.9,1,5.2c2.4,0.3,3.7-2.9,1.8-4.5 C658.4,176.8,657.3,176.6,656.3,176.7z M127.3,138.8c-2.7,1.3-2.1,5.5,0.9,5.9c2.8,0.4,4.5-3.3,2.4-5.3 C129.8,138.8,128.6,138.5,127.3,138.8z M789.7,159.2c-2.2,2.6,1.4,6,4.1,3.8c2.2-1.9-0.1-5.7-2.8-5 C790.5,158.1,790,158.6,789.7,159.2z M123.6,116.1c-3.1,1-3,5.6,0.1,6.2c3,0.7,5.5-3.1,3.3-5.3 C126.3,116.3,124.9,115.9,123.6,116.1z M650.6,163.6c-2.1,2.2,0.8,5.5,3.4,4c2.2-1.3,0.9-4.8-1.5-4.8 C651.9,162.8,651.2,163.1,650.6,163.6z M764.4,142.1c-1.9,1.2-1.2,4.3,1.1,4.5c2.2,0.2,3.2-2.5,1.7-3.9 C766.4,142.1,765.4,141.9,764.4,142.1z M171.6,134.4c-0.6,0.8-0.2,2.1,0.8,2.2c1,0.2,1.7-1,1-1.8 C172.9,134.1,172.1,134.1,171.6,134.4z M90.4,136.2c-3.4,1.4-2.8,6.4,0.9,6.9c3.4,0.5,5.6-4,3.2-6.1 C93.6,136.3,91.9,135.9,90.4,136.2z M655.8,140.4c-2.3,1-1.9,4.7,0.7,5.1c2.4,0.3,4-2.7,2.2-4.4 C658,140.4,656.8,140.3,655.8,140.4z M637.2,139c-2.2,1.3-1.6,4.7,0.9,5c2.3,0.3,3.6-2.8,1.8-4.3 C639.2,139.1,638.1,138.9,637.2,139z M170.8,99.9c-2.1,1.1-1.6,4.4,0.8,4.7c2.3,0.3,3.5-2.7,1.8-4.1 C172.7,100,171.7,99.8,170.8,99.9z M672.6,120.7c-3.1,1.5-2.2,6.1,1.2,6.3c3.1,0.2,4.8-4.1,2.2-6 C675.2,120.5,673.8,120.3,672.6,120.7z M193.3,121.2c-0.8,0.7-0.4,1.9,0.6,2c1,0.1,1.4-1.2,0.7-1.8 C194.2,121,193.7,121,193.3,121.2z M100.9,103.2c-2.6,1.4-1.9,5.3,1,5.6c2.6,0.2,4.1-3.2,2-4.9 C103.2,103.3,102,103,100.9,103.2z M606.3,122.9c-1.5,1.2-0.7,3.6,1.2,3.7c1.8,0.1,2.5-2.2,1.1-3.2 C608.1,122.9,607.2,122.8,606.3,122.9z M616.7,117.9c-1.4,1.7,0.7,4,2.5,2.9c1.5-1,0.4-3.5-1.4-3.5 C617.5,117.3,617.1,117.5,616.7,117.9z M287.9,78.2c-1.9,1.1-1.3,4.1,0.9,4.4c2.1,0.2,3.2-2.4,1.7-3.8 C289.9,78.2,288.8,78.1,287.9,78.2z M695.1,105.1c-3.5,2.1-1.9,7.4,2.1,7.1c3.5-0.3,4.8-5.8,1.6-7.3 C697.9,104.5,696.4,104.6,695.1,105.1z M733.2,94.9c-2.3,2.4,0.9,6,3.6,4.2c2.3-1.5,0.7-5.5-1.9-5.2 C734.4,94.1,733.7,94.4,733.2,94.9z M707.9,94.5c-1.4,1.7,0.7,4,2.5,2.9c1.5-1,0.4-3.5-1.4-3.5 C708.7,93.9,708.2,94.1,707.9,94.5z M662.9,95.5c-0.8,0.9-0.2,2.3,1,2.4c1.1,0.1,1.7-1.3,0.9-2.1 C664.3,95.3,663.5,95.2,662.9,95.5z M381.1,64.2c-3.2,2.4-1,7.2,2.8,6.4c3.4-0.7,3.6-6-0.3-6.9 C382.9,63.5,381.9,63.7,381.1,64.2z M605.6,90.2c-1.6,2.1,1.1,4.9,3.1,3.3c1.8-1.4,0.1-4.6-2.1-4.3 C606.3,89.4,605.9,89.7,605.6,90.2z M628.2,85.2c-1.4,1.7,0.7,4,2.5,2.9c1.5-1,0.4-3.5-1.4-3.5 C629,84.6,628.5,84.8,628.2,85.2z M617,80.1c-1.3,0.7-1.1,2.7,0.4,3.1c1.4,0.4,2.5-1.2,1.7-2.3 C618.7,80.3,617.9,80,617,80.1z M654.5,70c-2.7,2.2,0.3,6.2,3.3,4.6c2.4-1.3,1.1-5.3-1.6-5.3 C655.7,69.2,655,69.5,654.5,70z M637.2,63.4c-2.3,1.3-1.6,4.9,1,5.2c2.4,0.3,3.7-2.9,1.8-4.5 C639.2,63.5,638.1,63.3,637.2,63.4z M586.2,56.7c-2.4,1.1-1.7,5,1.2,5.2c2.7,0.2,4.1-3.6,1.9-5.1 C588.6,56.3,587.4,56.3,586.2,56.7z M489.1,48.2c-2.6,1.4-1.9,5.3,1,5.6c2.6,0.2,4.1-3.2,2-4.9 C491.4,48.3,490.2,48,489.1,48.2z M542.1,46.5c-1.4,1.7,0.7,4,2.5,2.9c1.5-1,0.4-3.5-1.4-3.5 C542.9,45.9,542.5,46.1,542.1,46.5z";

// Locations (approximate % coordinates for the svg viewbox)
// ViewBox is 0 0 1000 500
const LOCATIONS = [
  { id: 'hq', name: 'São Paulo (HQ)', x: 320, y: 350, type: 'hq' },
  { id: 'ny', name: 'New York', x: 280, y: 150, type: 'client' },
  { id: 'ldn', name: 'London', x: 480, y: 110, type: 'client' },
  { id: 'lis', name: 'Lisbon', x: 460, y: 140, type: 'client' },
  { id: 'tok', name: 'Tokyo', x: 860, y: 160, type: 'client' },
  { id: 'syd', name: 'Sydney', x: 900, y: 400, type: 'client' },
  { id: 'sf', name: 'San Francisco', x: 180, y: 160, type: 'client' },
];

const Connections = () => {
  const hq = LOCATIONS.find(l => l.id === 'hq')!;
  
  return (
    <>
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {LOCATIONS.filter(l => l.id !== 'hq').map((target, i) => {
        // Calculate control point for curve (Quadratic Bezier)
        // Elevate the control point to create an arc
        const mx = (hq.x + target.x) / 2;
        const my = (hq.y + target.y) / 2 - 50; // Curve upwards
        
        const pathData = `M${hq.x},${hq.y} Q${mx},${my} ${target.x},${target.y}`;
        
        return (
          <g key={target.id}>
             {/* Static faint line */}
             <path 
                d={pathData} 
                fill="none" 
                stroke="#3f3f46" 
                strokeWidth="0.5" 
                strokeOpacity="0.3"
             />
             {/* Animated data packet */}
             <path 
                d={pathData} 
                fill="none" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                className="animate-dash"
                style={{
                  strokeDasharray: '10, 300',
                  animationDuration: `${3 + i * 0.5}s`
                }}
             />
          </g>
        );
      })}
    </>
  );
};

export const GlobalMap: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-up h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 shrink-0">
         <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-white/10 border border-white/20">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Centro de Comando Global</h2>
              <p className="text-sm md:text-base text-zinc-400">Monitoramento de transações em tempo real.</p>
            </div>
         </div>
         <div className="flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs md:text-sm font-mono text-green-400 uppercase tracking-widest">Sistema Online</span>
         </div>
      </div>

      <GlassCard className="p-0 overflow-hidden relative flex-1 min-h-[450px] lg:min-h-[700px] flex items-center justify-center bg-[#050505]">
         {/* Grid Background Effect */}
         <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
                backgroundImage: `
                  linear-gradient(to right, #333 1px, transparent 1px),
                  linear-gradient(to bottom, #333 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
            }}
         />
         
         {/* Radar Scan Line */}
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent absolute left-0 animate-[shimmer_8s_linear_infinite]" />
         </div>

         {/* Stats Overlay Top Left */}
         <div className="absolute top-4 left-4 z-20 space-y-2 md:space-y-4 pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-xl">
               <div className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Volumetria Total</div>
               <div className="text-lg md:text-2xl font-mono text-white">R$ 42.890,00</div>
               <div className="text-[10px] md:text-xs text-green-400 flex items-center gap-1 mt-1">
                 <Activity className="w-3 h-3" />
                 <span>+14% hoje</span>
               </div>
            </div>
            <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-xl hidden md:block">
               <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Usuários Conectados</div>
               <div className="text-2xl font-mono text-white">1,240</div>
            </div>
         </div>

         {/* The Map */}
         <div className="relative w-full h-full z-10 p-2 md:p-6">
            <svg viewBox="0 0 1000 500" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
               {/* World Map Background */}
               <path 
                  d={WORLD_MAP_PATH} 
                  fill="#18181b" 
                  stroke="#27272a" 
                  strokeWidth="1"
                  className="transition-colors duration-500 hover:fill-[#27272a]"
               />
               
               {/* Connections */}
               <Connections />

               {/* Location Markers */}
               {LOCATIONS.map((loc) => (
                  <g key={loc.id} className="group cursor-pointer">
                    {/* Ripple Effect for HQ */}
                    {loc.type === 'hq' && (
                       <circle cx={loc.x} cy={loc.y} r="20" fill="none" stroke="white" strokeOpacity="0.2" className="animate-ping" />
                    )}
                    
                    {/* The Dot */}
                    <circle 
                      cx={loc.x} 
                      cy={loc.y} 
                      r={loc.type === 'hq' ? 6 : 3} 
                      fill={loc.type === 'hq' ? 'white' : '#52525b'} 
                      className="group-hover:fill-white transition-colors duration-300"
                    />
                    
                    {/* Tooltip on Hover */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                       <rect x={loc.x + 10} y={loc.y - 15} width="100" height="30" rx="4" fill="black" fillOpacity="0.8" stroke="#333" />
                       <text x={loc.x + 15} y={loc.y + 5} fill="white" fontSize="10" fontFamily="monospace">{loc.name}</text>
                    </g>
                  </g>
               ))}
            </svg>
         </div>

         {/* Bottom Legend */}
         <div className="absolute bottom-6 right-6 z-20 hidden md:flex gap-4 text-xs font-mono text-zinc-500 bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/5">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span>HQ (Brasil)</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                <span>Cliente Ativo</span>
             </div>
             <div className="flex items-center gap-2">
                <Signal className="w-3 h-3 text-white animate-pulse" />
                <span>Fluxo de Dados</span>
             </div>
         </div>

      </GlassCard>
      
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -300;
          }
        }
        .animate-dash {
          animation: dash linear infinite;
        }
      `}</style>
    </div>
  );
};