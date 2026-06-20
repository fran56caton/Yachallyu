import { useState } from "react";
import { Button, Card, Badge } from "../../../components/ui";
import { Power, Calculator, Zap, AlertTriangle, Lightbulb } from "lucide-react";

export default function CircuitsSimulator({ mode }: { mode: string }) {
  const [voltage, setVoltage] = useState(9);
  const [resistance, setResistance] = useState(10);
  const [switchClosed, setSwitchClosed] = useState(false);

  // Ohm's Law: I = V/R
  const current = switchClosed ? (voltage / resistance) : 0;
  
  // Power: P = VI
  const power = voltage * current;

  // Visual simulation logic
  const isBurnedOut = current > 2.0; // Simple threshold
  const brightness = Math.min(100, Math.max(0, current * 50)); // Scale for visual

  return (
    <div className="h-full flex flex-col md:flex-row p-4 gap-4 overflow-y-auto">
      {/* Control Panel */}
      <Card className="w-full md:w-80 p-4 shrink-0 flex flex-col space-y-6">
        <div>
           <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Herramientas</h3>
           <div className="space-y-5">
              <div>
                 <label className="block text-xs font-bold text-slate-700 mb-1">Voltaje Batería (V): {voltage} V</label>
                 <input 
                    type="range" min="1" max="24" step="1" 
                    value={voltage} onChange={(e) => setVoltage(Number(e.target.value))}
                    className="w-full accent-yellow-500"
                 />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-700 mb-1">Resistencia (Ω): {resistance} Ω</label>
                 <input 
                    type="range" min="1" max="100" step="1" 
                    value={resistance} onChange={(e) => setResistance(Number(e.target.value))}
                    className="w-full accent-green-600"
                 />
              </div>
           </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
           <div className="text-xs text-slate-500 mb-2 font-bold flex items-center"><Calculator className="w-4 h-4 mr-1"/> Cálculos (Ley de Ohm)</div>
           <div className="space-y-2 text-sm">
             <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="text-slate-600">Voltaje (V)</span>
                <span className="font-mono font-bold text-slate-900">{switchClosed ? voltage : 0} V</span>
             </div>
             <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="text-slate-600">Corriente (I = V/R)</span>
                <span className="font-mono font-bold text-slate-900">{current.toFixed(2)} A</span>
             </div>
             <div className="flex justify-between">
                <span className="text-slate-600">Potencia (P = V*I)</span>
                <span className="font-mono font-bold text-slate-900">{power.toFixed(2)} W</span>
             </div>
           </div>
        </div>

        {isBurnedOut && switchClosed && (
           <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start text-red-800 text-xs">
              <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>¡La corriente superó los 2.0 A y quemó el componente! Aumenta la resistencia o reduce el voltaje.</span>
           </div>
        )}
      </Card>

      {/* View Area & Data */}
      <div className="flex-1 flex flex-col gap-4">
         {/* Simulation View */}
         <Card className="flex-1 shrink-0 p-0 overflow-hidden relative flex flex-col items-center justify-center min-h-[300px] bg-[#1e1e2f]">
            {/* Simple Box Circuit representation */}
            <div className="relative w-64 h-48 border-4 border-[#4b5563] flex items-center justify-center">
               {/* Electrons Flow */}
               {switchClosed && !isBurnedOut && (
                  <div className="absolute inset-0 z-0 overflow-hidden opacity-50">
                     <div className="w-full h-full border-4 border-dashed border-yellow-400 animate-[spin_10s_linear_infinite]" style={{animationDirection: 'reverse', animationDuration: `${Math.max(1, 10/current)}s`}}></div>
                  </div>
               )}

               {/* Battery Component (Left) */}
               <div className="absolute -left-6 top-1/2 -translate-y-1/2 bg-slate-800 w-12 h-16 rounded border-2 border-slate-600 flex flex-col items-center justify-evenly z-10 shadow-lg">
                  <div className="w-4 h-2 bg-red-500 rounded-t-sm -mt-4"></div>
                  <div className="text-white text-[10px] font-bold">{voltage}V</div>
                  <div className="text-xs text-red-400 font-bold">+</div>
                  <div className="text-xs text-blue-400 font-bold">-</div>
               </div>

               {/* Resistor Component (Top) */}
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-700 px-3 py-1 rounded text-[10px] text-white font-bold border-2 border-green-900 z-10 shadow-lg">
                  {resistance} Ω
               </div>

               {/* Lightbulb Component (Right) */}
               <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col items-center z-10 shadow-lg">
                  <div className={`w-12 h-12 rounded-full border-2 border-slate-500 flex items-center justify-center transition-all bg-white relative overflow-hidden`} style={{ boxShadow: switchClosed && !isBurnedOut ? `0 0 ${brightness}px ${brightness/2}px rgba(253, 224, 71, 0.6)` : 'none' }}>
                     {isBurnedOut ? (
                        <div className="text-red-500 text-xs font-bold text-center">QUEMADO</div>
                     ) : (
                        <Lightbulb className={`w-6 h-6 transition-colors ${switchClosed ? 'text-yellow-500' : 'text-slate-300'}`} fill={switchClosed ? '#fde047' : 'none'}/>
                     )}
                     
                     {switchClosed && !isBurnedOut && (
                        <div className="absolute inset-0 bg-yellow-400 mix-blend-multiply" style={{opacity: current/2}}></div>
                     )}
                  </div>
                  <div className="w-6 h-4 bg-slate-400 mt-1 rounded-b-md"></div>
               </div>

               {/* Switch Component (Bottom) */}
               <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 shadow-lg cursor-pointer" onClick={() => setSwitchClosed(!switchClosed)}>
                  <div className="w-16 h-8 bg-slate-800 border-2 border-slate-600 rounded flex items-center px-1">
                     <div className={`w-6 h-6 rounded bg-slate-300 shadow-sm transition-transform ${switchClosed ? 'translate-x-7 bg-green-500' : ''}`}></div>
                  </div>
                  <div className="text-center text-[10px] mt-1 text-slate-400 font-bold">INTERRUPTOR</div>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
}
