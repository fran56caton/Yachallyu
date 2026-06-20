import { useState, useEffect, useRef } from "react";
import { Button, Card } from "../../../components/ui";
import { Play, Pause, RotateCcw, Crosshair } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter, ScatterChart, ZAxis } from 'recharts';

export default function ParabolicSimulator({ mode }: { mode: string }) {
  const [velocity, setVelocity] = useState(20);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.8); // m/s^2
  
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [data, setData] = useState<{t: number, x: number, y: number}[]>([{t: 0, x: 0, y: 0}]);
  
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const [targetHit, setTargetHit] = useState(false);

  // Target X between 30 and 80
  const [targetX] = useState(Math.floor(Math.random() * 50) + 30);
  const targetWidth = 10;

  const getPosition = (t: number) => {
     const rad = (angle * Math.PI) / 180;
     const vx0 = velocity * Math.cos(rad);
     const vy0 = velocity * Math.sin(rad);
     
     const x = vx0 * t;
     const y = (vy0 * t) - (0.5 * gravity * t * t);
     return { x, y };
  };

  const animate = (t: number) => {
    if (lastTimeRef.current != undefined) {
      const deltaTime = (t - lastTimeRef.current) / 1000;
      setTime(prevTime => {
         const newTime = prevTime + deltaTime;
         const pos = getPosition(newTime);
         
         // Auto-stop when it hits the ground
         if (pos.y < 0 && newTime > 0.1) {
             setRunning(false);
             if (pos.x >= targetX - targetWidth/2 && pos.x <= targetX + targetWidth/2) {
                setTargetHit(true);
             }
             return prevTime; // clamp to previous frame
         }

         return newTime;
      });
    }
    lastTimeRef.current = t;
    if (running) {
       requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (running) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = undefined;
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [running, angle, velocity, gravity]);

  useEffect(() => {
     if (running) {
        const interval = setInterval(() => {
           setData(prev => {
              if (prev.length > 100) return prev;
              const pos = getPosition(time);
              if (pos.y < 0) return prev; // Stop recording
              return [...prev, { t: Number(time.toFixed(1)), x: Number(pos.x.toFixed(1)), y: Number(pos.y.toFixed(1)) }];
           });
        }, 100);
        return () => clearInterval(interval);
     }
  }, [running, time]);

  const currentPos = getPosition(time);
  
  // Calculate max values for UI info
  const rad = (angle * Math.PI) / 180;
  const maxHeight = Math.pow(velocity * Math.sin(rad), 2) / (2 * gravity);
  const maxRange = (Math.pow(velocity, 2) * Math.sin(2 * rad)) / gravity;
  const timeOfFlight = (2 * velocity * Math.sin(rad)) / gravity;

  return (
    <div className="h-full flex flex-col md:flex-row p-4 gap-4 overflow-y-auto">
      {/* Control Panel */}
      <Card className="w-full md:w-80 p-4 shrink-0 flex flex-col space-y-4">
        <div>
           <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Panel de Control</h3>
           <div className="space-y-4">
              <div>
                 <label className="block text-xs font-bold text-slate-700 mb-1">Velocidad Inicial: {velocity} m/s</label>
                 <input 
                    type="range" min="1" max="40" step="1" 
                    value={velocity} onChange={(e) => {
                       setVelocity(Number(e.target.value)); 
                       if(!running) { setTime(0); setData([{t: 0, x: 0, y: 0}]); setTargetHit(false); }
                    }}
                    className="w-full accent-blue-600" disabled={running}
                 />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-700 mb-1">Ángulo: {angle}°</label>
                 <input 
                    type="range" min="0" max="90" step="1" 
                    value={angle} onChange={(e) => {
                       setAngle(Number(e.target.value)); 
                       if(!running) { setTime(0); setData([{t: 0, x: 0, y: 0}]); setTargetHit(false); }
                    }}
                    className="w-full accent-blue-600" disabled={running}
                 />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-700 mb-1">Gravedad: {gravity} m/s²</label>
                 <select 
                    value={gravity} onChange={e => setGravity(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded text-sm bg-white"
                    disabled={running}
                 >
                    <option value={9.8}>Tierra (9.8)</option>
                    <option value={1.6}>Luna (1.6)</option>
                    <option value={3.7}>Marte (3.7)</option>
                    <option value={24.7}>Júpiter (24.7)</option>
                 </select>
              </div>
           </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 grid grid-cols-2 gap-2 text-xs">
           <div><span className="text-slate-500">Tiempo(s):</span> <strong className="block text-sm">{time.toFixed(2)}</strong></div>
           <div><span className="text-slate-500">Altura(m):</span> <strong className="block text-sm">{Math.max(0, currentPos.y).toFixed(2)}</strong></div>
           <div><span className="text-slate-500">Alcance(m):</span> <strong className="block text-sm">{currentPos.x.toFixed(2)}</strong></div>
        </div>

        <div className="flex gap-2 pb-2 mt-auto">
           <Button variant={running ? "outline" : "primary"} onClick={() => setRunning(!running)} className="flex-1 bg-blue-600 border-blue-600">
              {running ? <><Pause className="w-4 h-4 mr-1"/> Pausa</> : <><Play className="w-4 h-4 mr-1"/> Lanzar</>}
           </Button>
           <Button variant="outline" onClick={() => { setRunning(false); setTime(0); setData([{t:0, x:0, y:0}]); setTargetHit(false); }}>
              <RotateCcw className="w-4 h-4"/>
           </Button>
        </div>
      </Card>

      {/* View Area & Data */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
         {/* Simulation View */}
         <Card className="h-64 shrink-0 p-0 overflow-hidden relative bg-sky-50">
             {/* Dynamic SVG trajectory drawing */}
             <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 -100 100 100" className="absolute top-0 left-0">
                {/* Ground */}
                <rect x="0" y="0" width="100" height="10" fill="#a3e635"/>
                
                {/* Target */}
                <rect x={targetX - targetWidth/2} y="-2" width={targetWidth} height="2" fill="#ef4444" />
                <circle cx={targetX} cy="-1" r="1.5" fill="white" />
                
                {/* Max expected trajectory path (dashed) */}
                {time === 0 && (
                  <path 
                     d={`M 0 0 Q ${maxRange/2} ${-maxHeight*2} ${maxRange} 0`}
                     fill="none" stroke="#ca8a04" strokeWidth="0.5" strokeDasharray="1, 1" opacity="0.5"
                  />
                )}

                {/* Actual projectile */}
                <circle 
                   cx={currentPos.x} 
                   cy={-currentPos.y} 
                   r="1.5" 
                   fill={targetHit ? "#ef4444" : "#1e40af"} 
                />
             </svg>
             <div className="absolute top-2 left-2 text-xs font-bold text-slate-500 bg-white/70 px-2 py-1 rounded">Escala: 1 unit = 1m</div>

             {targetHit && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border-2 border-green-500 text-green-600 font-bold animate-bounce flex items-center">
                   <Crosshair className="w-5 h-5 mr-2" /> ¡Blanco alcanzado!
                </div>
             )}
         </Card>

         <div className="flex-1 grid grid-cols-1 gap-4 overflow-hidden">
            {/* Charts */}
            <Card className="p-4 flex flex-col h-full overflow-hidden">
               <h3 className="font-bold text-slate-800 text-sm mb-4">Gráfica Trayectoria (y vs x)</h3>
               <div className="flex-1 w-full min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                     <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="x" name="Alcance (m)" label={{ value: 'Alcance X (m)', position: 'bottom' }} tick={{fontSize: 12}} />
                        <YAxis type="number" dataKey="y" name="Altura (m)" label={{ value: 'Altura Y (m)', angle: -90, position: 'left' }} tick={{fontSize: 12}} />
                        <Tooltip cursor={{strokeDasharray: '3 3'}} />
                        <Scatter name="Proyectil" data={data} fill="#3b82f6" line={{stroke: '#3b82f6', strokeWidth: 2}} shape="circle" isAnimationActive={false} />
                     </ScatterChart>
                  </ResponsiveContainer>
               </div>
               
               <div className="mt-2 text-xs flex gap-4 border-t pt-2">
                  <span><strong>Altura Máx Teórica:</strong> {maxHeight.toFixed(2)}m</span>
                  <span><strong>Alcance Teórico:</strong> {maxRange.toFixed(2)}m</span>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
