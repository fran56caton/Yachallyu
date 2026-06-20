import { useState } from "react";
import { Button, Card, Badge } from "../../../components/ui";
import { Droplet, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function WaterQualitySimulator({ mode }: { mode: string }) {
  const [ph, setPh] = useState(7);
  const [turbidity, setTurbidity] = useState(2); // NTU
  const [temperature, setTemperature] = useState(20);
  
  // Calculate quality index (0-100)
  // Optimal pH: 6.5 - 8.5
  const phScore = (ph >= 6.5 && ph <= 8.5) ? 100 : Math.max(0, 100 - Math.abs(7 - ph) * 20);
  
  // Optimal Turbidity < 5 NTU
  const turbidityScore = Math.max(0, 100 - (turbidity * 5));
  
  // Optimal Temp 15-25
  const tempScore = (temperature >= 15 && temperature <= 25) ? 100 : Math.max(0, 100 - Math.abs(20 - temperature) * 5);

  const overallScore = Math.round((phScore + turbidityScore + tempScore) / 3);

  const getStatus = () => {
    if (overallScore >= 80) return { label: "Excelente", color: "text-emerald-600", bg: "bg-emerald-100" };
    if (overallScore >= 60) return { label: "Aceptable", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { label: "Peligroso", color: "text-red-600", bg: "bg-red-100" };
  };

  const status = getStatus();

  const data = [
     { name: "pH", valor: phScore, fill: phScore < 60 ? '#ef4444' : '#10b981' },
     { name: "Turbidez", valor: turbidityScore, fill: turbidityScore < 60 ? '#ef4444' : '#10b981' },
     { name: "Temperatura", valor: tempScore, fill: tempScore < 60 ? '#ef4444' : '#10b981' }
  ];

  return (
    <div className="h-full flex flex-col md:flex-row p-4 gap-4 overflow-y-auto">
      {/* Control Panel */}
      <Card className="w-full md:w-80 p-4 shrink-0 flex flex-col space-y-4">
        <div>
           <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Variables Ambientales</h3>
           <div className="space-y-6">
              <div>
                 <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">pH del Agua</label>
                    <span className="text-xs font-mono bg-slate-100 px-1 rounded">{ph} pH</span>
                 </div>
                 <input type="range" min="0" max="14" step="0.5" value={ph} onChange={(e) => setPh(Number(e.target.value))} className="w-full accent-blue-500" />
                 <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Ácido (0)</span><span>Neutro (7)</span><span>Alcalino (14)</span>
                 </div>
              </div>

              <div>
                 <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Turbidez</label>
                    <span className="text-xs font-mono bg-slate-100 px-1 rounded">{turbidity} NTU</span>
                 </div>
                 <input type="range" min="0" max="25" step="1" value={turbidity} onChange={(e) => setTurbidity(Number(e.target.value))} className="w-full text-amber-900 accent-amber-700" />
              </div>

              <div>
                 <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Temperatura</label>
                    <span className="text-xs font-mono bg-slate-100 px-1 rounded">{temperature} °C</span>
                 </div>
                 <input type="range" min="0" max="40" step="1" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} className="w-full accent-rose-500" />
              </div>
           </div>
        </div>
      </Card>

      {/* View Area & Data */}
      <div className="flex-1 flex flex-col gap-4">
         {/* Top indicators */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="flex items-center gap-4 p-5 h-full">
               <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-lg ${status.bg} ${status.color}`}>
                  <Droplet className="w-10 h-10" fill="currentColor" opacity={0.6}/>
               </div>
               <div>
                  <h3 className="text-sm text-slate-500 font-medium uppercase tracking-wider">Índice de Calidad</h3>
                  <div className={`text-4xl font-bold ${status.color}`}>{overallScore}%</div>
                  <Badge variant={status.label === "Peligroso" ? "red" : status.label === "Aceptable" ? "yellow" : "green"} className="mt-1">
                     {status.label}
                  </Badge>
               </div>
            </Card>
            
            {/* Visual test tube visualization based on turbidity and pH */}
            <Card className="p-4 flex items-center justify-center bg-slate-50">
               <div className="relative w-16 h-32 border-4 border-t-0 border-white rounded-b-xl shadow-inner bg-white/50 overflow-hidden">
                  <div 
                     className="absolute bottom-0 left-0 w-full transition-all duration-300" 
                     style={{
                        height: '90%',
                        backgroundColor: ph < 5 ? '#fcd34d' : ph > 9 ? '#c084fc' : '#bae6fd', // Color based on pH
                        opacity: Math.max(0.3, 1 - (turbidity/20)), // Opacity based on Turbidity
                        filter: `blur(${turbidity/5}px)`
                     }}
                  ></div>
                  {/* Particles for turbidity */}
                  {turbidity > 5 && (
                     <div className="absolute inset-0 opacity-50 bg-[radial-gradient(#92400e_1px,transparent_1px)] [background-size:10px_10px]" style={{opacity: turbidity/25}}></div>
                  )}
               </div>
            </Card>
         </div>

         {/* Chart */}
         <Card className="flex-1 p-4 flex flex-col min-h-[250px]">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Puntaje por Parámetro</h3>
            <div className="flex-1 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, bottom: 0, left: 40 }}>
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                     <XAxis type="number" domain={[0, 100]} />
                     <YAxis dataKey="name" type="category" tick={{fontSize: 12}} />
                     <Tooltip />
                     <Bar dataKey="valor" radius={[0, 4, 4, 0]}>
                        {data.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            
            {status.label === "Peligroso" && (
               <div className="mt-4 p-3 bg-red-50 text-red-800 text-xs rounded-lg flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Este nivel de calidad hídrica no es apto para consumo humano ni vida silvestre.
               </div>
            )}
         </Card>
      </div>
    </div>
  );
}
