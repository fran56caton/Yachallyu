import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Badge } from "../../components/ui";
import { ArrowLeft, Play, Pause, RotateCcw, Save, Download, HelpCircle, Activity, Info } from "lucide-react";
import MruSimulator from "./simulators/MruSimulator";
import ParabolicSimulator from "./simulators/ParabolicSimulator";
import CircuitsSimulator from "./simulators/CircuitsSimulator";
import FunctionsSimulator from "./simulators/FunctionsSimulator";
import WaterQualitySimulator from "./simulators/WaterQualitySimulator";

export default function SimulatorWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState("explorar"); // explorar, guiado, reto, docente

  const renderSimulator = () => {
     switch(id) {
        case "mru": return <MruSimulator mode={mode} />;
        case "parabolico": return <ParabolicSimulator mode={mode} />;
        case "circuitos": return <CircuitsSimulator mode={mode} />;
        case "funciones": return <FunctionsSimulator mode={mode} />;
        case "agua": return <WaterQualitySimulator mode={mode} />;
        default: return <div className="p-12 text-center text-slate-500">Simulador en desarrollo o no encontrado.</div>;
     }
  };

  const getSimTitle = () => {
     switch(id) {
        case "mru": return "Explorador de Movimiento: MRU";
        case "parabolico": return "Trayectoria Perfecta";
        case "circuitos": return "Circuit Lab Yachayllu";
        case "funciones": return "Explorador de Funciones";
        case "agua": return "Guardianes del Agua";
        default: return "Simulador";
     }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col -m-4 md:-m-8 bg-slate-50 relative pb-10 overflow-hidden">
      {/* Top Navbar for Simulator */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-10 flex-shrink-0">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
               <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex flex-col">
               <div className="flex items-center gap-2">
                 <h1 className="font-bold text-slate-900 text-sm md:text-base leading-tight">{getSimTitle()}</h1>
                 <Badge variant="blue" className="text-[10px] hidden md:inline-flex">Física</Badge>
               </div>
            </div>
         </div>

         <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            {["Explorar", "Reto"].map(m => (
               <button 
                  key={m}
                  onClick={() => setMode(m.toLowerCase())}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${mode === m.toLowerCase() ? 'bg-white shadow-sm text-[var(--color-yachay-earth)]' : 'text-slate-500 hover:text-slate-700'}`}
               >
                  {m}
               </button>
            ))}
         </div>

         <div className="flex items-center gap-2">
            <Button variant="outline" className="h-8 text-xs hidden md:flex"><HelpCircle className="w-4 h-4 mr-1"/> Guía</Button>
            <Button variant="primary" className="h-8 text-xs shadow-sm bg-indigo-600 hover:bg-indigo-700 border-indigo-600"><Save className="w-4 h-4 mr-1"/> Evidencia</Button>
         </div>
      </header>

      {/* Simulator Area */}
      <main className="flex-1 overflow-hidden relative">
         {renderSimulator()}
      </main>
    </div>
  );
}
