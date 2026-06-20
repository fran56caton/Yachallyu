import { useState } from "react";
import { Button, Card } from "../../../components/ui";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function FunctionsSimulator({ mode }: { mode: string }) {
  const [funcType, setFuncType] = useState('cuadratica'); // lineal, cuadratica, seno
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  // Generate data points for domain -10 to 10
  const generateData = () => {
    let data = [];
    for (let x = -10; x <= 10; x += 0.5) {
      let y = 0;
      switch (funcType) {
        case 'lineal':
          y = (a * x) + b;
          break;
        case 'cuadratica':
          y = (a * Math.pow(x, 2)) + (b * x) + c;
          break;
        case 'seno':
          y = a * Math.sin(b * x + c);
          break;
      }
      data.push({ x: Number(x.toFixed(1)), y: Number(y.toFixed(2)) });
    }
    return data;
  };

  const data = generateData();

  const getEquationText = () => {
     switch (funcType) {
        case 'lineal': return `f(x) = ${a}x ${b >= 0 ? '+' : ''} ${b}`;
        case 'cuadratica': return `f(x) = ${a}x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}`;
        case 'seno': return `f(x) = ${a} * sen(${b}x ${c >= 0 ? '+' : ''} ${c})`;
        default: return '';
     }
  };

  return (
    <div className="h-full flex flex-col md:flex-row p-4 gap-4 overflow-y-auto">
      {/* Control Panel */}
      <Card className="w-full md:w-80 p-4 shrink-0 flex flex-col space-y-4">
        <div>
           <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Panel de Control</h3>
           
           <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Función</label>
              <select className="w-full p-2 border border-slate-300 rounded text-sm bg-white outline-none focus:border-indigo-500" value={funcType} onChange={e => {setFuncType(e.target.value); setA(1); setB(0); setC(0);}}>
                 <option value="lineal">Lineal</option>
                 <option value="cuadratica">Cuadrática</option>
                 <option value="seno">Trigonométrica (Seno)</option>
              </select>
           </div>

           <div className="space-y-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div>
                 <label className="block text-xs font-bold text-slate-700 mb-1">Parámetro a: {a}</label>
                 <input type="range" min="-5" max="5" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full accent-indigo-600"/>
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-700 mb-1">Parámetro b: {b}</label>
                 <input type="range" min="-5" max="5" step="0.5" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full accent-indigo-600"/>
              </div>
              {funcType !== 'lineal' && (
                 <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Parámetro c: {c}</label>
                    <input type="range" min="-10" max="10" step="1" value={c} onChange={(e) => setC(Number(e.target.value))} className="w-full accent-indigo-600"/>
                 </div>
              )}
           </div>
        </div>

        <div className="mt-auto bg-indigo-50 p-3 rounded-lg border border-indigo-200">
           <div className="text-xs text-indigo-800 mb-1 font-bold">Función Actual:</div>
           <div className="text-lg font-mono text-indigo-900 bg-white p-2 border border-indigo-100 rounded text-center">
              {getEquationText()}
           </div>
        </div>
      </Card>

      {/* View Area & Data */}
      <div className="flex-1 flex flex-col gap-4">
         <Card className="flex-1 p-4 flex flex-col min-h-[400px]">
             <h3 className="font-bold text-slate-800 text-sm mb-4">Plano Cartesiano</h3>
             <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                      <XAxis dataKey="x" type="number" domain={[-10, 10]} ticks={[-10,-5,0,5,10]} />
                      <YAxis domain={['auto', 'auto']} />
                      {/* X and Y Axis solid lines for origin */}
                      <ReferenceLine x={0} stroke="#000" strokeWidth={1} opacity={0.5} />
                      <ReferenceLine y={0} stroke="#000" strokeWidth={1} opacity={0.5} />
                      
                      <Tooltip 
                         formatter={(value: any) => [value, 'f(x)']}
                         labelFormatter={(label: any) => `x = ${label}`}
                      />
                      <Line type="monotone" dataKey="y" stroke="#8b5cf6" strokeWidth={3} dot={false} isAnimationActive={false} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
         </Card>
      </div>
    </div>
  );
}
