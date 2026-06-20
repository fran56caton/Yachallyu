import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card } from "../../components/ui";
import { Search, Filter, Atom, Zap, Globe, Target, Rocket, Activity, Droplet, LayoutGrid } from "lucide-react";

const SIMULATORS_DB = [
  { id: "mru", title: "Explorador de Movimiento: MRU", area: "Física", type: "Interactivo", difficulty: "Fácil", modeOffline: true },
  { id: "parabolico", title: "Trayectoria Perfecta", area: "Física", type: "Interactivo", difficulty: "Medio", modeOffline: true },
  { id: "circuitos", title: "Circuit Lab Yachayllu", area: "Física", type: "Constructor", difficulty: "Medio", modeOffline: false },
  { id: "funciones", title: "Explorador de Funciones", area: "Matemática", type: "Interactivo", difficulty: "Díficil", modeOffline: true },
  { id: "agua", title: "Guardianes del Agua", area: "Ciencia y Tecnología", type: "Datos", difficulty: "Fácil", modeOffline: false },
  { id: "mruv", title: "Laboratorio de Aceleración", area: "Física", type: "Interactivo", difficulty: "Medio", modeOffline: true },
];

export default function SimulatorsLibrary() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterArea, setFilterArea] = useState("Todos");

  const filtered = SIMULATORS_DB.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchesArea = filterArea === "Todos" || s.area === filterArea;
    return matchesSearch && matchesArea;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-3 mb-2">
         <Button variant="ghost" className="px-0 hover:bg-transparent text-slate-500" onClick={() => navigate('/teacher/lab')}>
            Lab
         </Button>
         <span className="text-slate-300">/</span>
         <span className="font-medium text-slate-900">Biblioteca</span>
      </div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Biblioteca de Simuladores</h1>
          <p className="text-slate-600 mt-1">Explora y asigna simuladores interactivos a tus estudiantes.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
           {["Todos", "Física", "Matemática", "Ciencia y Tecnología"].map(tab => (
              <button 
                 key={tab}
                 onClick={() => setFilterArea(tab)}
                 className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filterArea === tab ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                 {tab}
              </button>
           ))}
        </div>
      </header>

      <div className="flex gap-4">
         <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
            <input 
               type="text" 
               placeholder="Buscar por nombre, tema o competencia..." 
               value={search}
               onChange={e => setSearch(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-yachay-earth)]"
            />
         </div>
         <Button variant="outline" className="bg-white"><Filter className="w-5 h-5 mr-2"/> Filtros Avanzados</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
         {filtered.map(sim => (
            <Card key={sim.id} className="p-5 flex flex-col hover:shadow-md transition-shadow">
               <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                     <LayoutGrid className="w-5 h-5" />
                  </div>
                  {sim.modeOffline && <Badge variant="green" className="text-[10px]">Offline</Badge>}
               </div>
               <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{sim.title}</h3>
               <p className="text-xs text-slate-500 mb-4">{sim.area} • {sim.type}</p>
               
               <div className="flex items-center gap-2 mb-6">
                  <Badge variant="gray" className="text-xs font-normal">Dificultad: {sim.difficulty}</Badge>
               </div>

               <div className="mt-auto flex gap-2">
                  <Button variant="outline" className="flex-1">Asignar</Button>
                  <Button variant="primary" className="flex-1" onClick={() => navigate(`/teacher/lab/simulator/${sim.id}`)}>Explorar</Button>
               </div>
            </Card>
         ))}
      </div>
    </div>
  );
}
