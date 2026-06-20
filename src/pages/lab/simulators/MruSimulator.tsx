import { useState, useEffect, useRef } from "react";
import { Button, Card } from "../../../components/ui";
import { Play, Pause, RotateCcw, AlertTriangle, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MruSimulator({ mode }: { mode: string }) {
  const [position, setPosition] = useState(0);
  const [velocity, setVelocity] = useState(5);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [data, setData] = useState<{t: number, x: number}[]>([{t: 0, x: 0}]);
  
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const animate = (t: number) => {
    if (lastTimeRef.current != undefined) {
      const deltaTime = (t - lastTimeRef.current) / 1000;
      setTime(prevTime => {
         const newTime = prevTime + deltaTime;
         setPosition(position + velocity * newTime); // x = x0 + vt. but we animate in small steps
         return newTime;
      });
    }
    lastTimeRef.current = t;
    requestRef.current = requestAnimationFrame(animate);
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
  }, [running, velocity, position]);

  // Record data points every 0.5s
  useEffect(() => {
     if (running) {
        const interval = setInterval(() => {
           setData(prev => {
              if (prev.length > 50) return prev; // Limit to 50 points
              return [...prev, { t: Number(time.toFixed(1)), x: Number((velocity * time).toFixed(1)) }];
           });
        }, 500);
        return () => clearInterval(interval);
     }
  }, [running, time, velocity]);

  const currentX = velocity * time;

  return (
    <div className="h-full flex flex-col md:flex-row p-4 gap-4 overflow-y-auto">
      {/* Control Panel */}
      <Card className="w-full md:w-80 p-4 shrink-0 flex flex-col space-y-6">
        <div>
           <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Panel de Control</h3>
           <div className="space-y-4">
              <div>
                 <label className="block text-xs font-bold text-slate-700 mb-1">Velocidad (m/s): {velocity}</label>
                 <input 
                    type="range" min="-10" max="10" step="1" 
                    value={velocity} onChange={(e) => {
                       setVelocity(Number(e.target.value)); 
                       if(!running) setData([{t: 0, x: 0}]);
                    }}
                    className="w-full accent-indigo-600"
                    disabled={running}
                 />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-700 mb-1">Posición Inicial: 0 m</label>
                 <input type="range" disabled className="w-full opacity-50" />
              </div>
           </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
           <div className="text-xs text-slate-500 mb-1">Tiempo transcurrido:</div>
           <div className="text-2xl font-mono text-slate-900 font-bold">{time.toFixed(2)} s</div>
        </div>

        <div className="flex gap-2 pb-4 mt-auto">
           <Button variant={running ? "outline" : "primary"} onClick={() => setRunning(!running)} className="flex-1">
              {running ? <><Pause className="w-4 h-4 mr-1"/> Pausa</> : <><Play className="w-4 h-4 mr-1"/> Iniciar</>}
           </Button>
           <Button variant="outline" onClick={() => { setRunning(false); setTime(0); setPosition(0); setData([{t:0, x:0}]); }}>
              <RotateCcw className="w-4 h-4"/>
           </Button>
        </div>
      </Card>

      {/* View Area & Data */}
      <div className="flex-1 flex flex-col gap-4">
         {/* Simulation View */}
         <Card className="h-64 shrink-0 p-0 overflow-hidden relative bg-sky-50 flex items-center">
            {/* Track */}
            <div className="absolute top-1/2 left-0 w-full h-12 bg-slate-400 -translate-y-1/2 flex items-end px-4 border-y-4 border-slate-500">
               {/* Markers */}
               <div className="w-full h-2 flex justify-between">
                  {[...Array(11)].map((_, i) => <div key={i} className="w-[2px] h-4 bg-white/50 relative top-[-4px]"></div>)}
               </div>
            </div>
            
            {/* Car */}
            <div 
               className="absolute top-1/2 -translate-y-1/2 w-16 h-10 bg-[var(--color-yachay-earth)] rounded-t-xl rounded-bl-sm transition-transform duration-75 flex items-center justify-center shadow-lg border-2 border-white"
               style={{ left: `calc(50% + ${(currentX * 10)}px - 32px)` }}
            >
               <ArrowRight className="text-white w-5 h-5 opacity-50" />
               <div className="absolute -bottom-2 left-1 w-3 h-3 bg-slate-900 rounded-full border border-white"></div>
               <div className="absolute -bottom-2 right-1 w-3 h-3 bg-slate-900 rounded-full border border-white"></div>
            </div>

            {/* Zero point marker */}
            <div className="absolute top-1/2 left-1/2 w-1 h-20 bg-emerald-500/50 -translate-y-1/2 -translate-x-1/2"></div>
         </Card>

         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Charts */}
            <Card className="p-4 flex flex-col">
               <h3 className="font-bold text-slate-800 text-sm mb-4">Gráfica Posición - Tiempo</h3>
               <div className="flex-1 w-full min-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="x" stroke="#4f46e5" strokeWidth={2} dot={false} isAnimationActive={false} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="t" type="number" domain={['dataMin', 'dataMax']} tick={{fontSize: 12}} />
                        <YAxis tick={{fontSize: 12}} />
                        <Tooltip />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </Card>
            
            {/* Table */}
            <Card className="p-4 flex flex-col">
               <h3 className="font-bold text-slate-800 text-sm mb-4">Tabla de Datos</h3>
               <div className="flex-1 overflow-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                        <tr>
                           <th className="px-4 py-2 text-slate-600 font-bold">Tiempo (s)</th>
                           <th className="px-4 py-2 text-slate-600 font-bold">Posición (m)</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.map((d, i) => (
                           <tr key={i} className="border-b border-slate-100 pb-1">
                              <td className="px-4 py-2 font-mono">{d.t.toFixed(1)}</td>
                              <td className="px-4 py-2 font-mono">{d.x.toFixed(1)}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               
               {mode === 'reto' && (
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 flex gap-3 items-start">
                     <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                     <div className="text-sm text-amber-900">
                        <strong>Reto:</strong> Logra que el vehículo alcance exactamente 50m en 10 segundos.
                     </div>
                  </div>
               )}
            </Card>
         </div>
      </div>
    </div>
  );
}
