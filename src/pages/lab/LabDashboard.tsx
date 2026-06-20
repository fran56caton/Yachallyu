import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Card } from "../../components/ui";
import { Beaker, Search, FlaskConical, Atom, Dna, Leaf, GraduationCap, Cpu, Globe, Rocket, ChevronRight, Activity, Zap, Activity as WaveIcon, Target, Droplet } from "lucide-react";

export default function LabDashboard() {
  const navigate = useNavigate();

  const areas = [
    { title: "Ciencia y Tecnología", icon: FlaskConical, count: 12, color: "text-emerald-600", bg: "bg-emerald-50", link: "/teacher/lab/library?area=cyt" },
    { title: "Matemática", icon: Globe, count: 15, color: "text-blue-600", bg: "bg-blue-50", link: "/teacher/lab/library?area=mat" },
    { title: "Física", icon: Atom, count: 18, color: "text-indigo-600", bg: "bg-indigo-50", link: "/teacher/lab/library?area=fis" },
    { title: "Química", icon: Beaker, count: 8, color: "text-orange-600", bg: "bg-orange-50", link: "/teacher/lab/library?area=qui" },
    { title: "Biología", icon: Dna, count: 6, color: "text-rose-600", bg: "bg-rose-50", link: "/teacher/lab/library?area=bio" },
    { title: "Ambiente", icon: Leaf, count: 5, color: "text-green-600", bg: "bg-green-50", link: "/teacher/lab/library?area=amb" },
    { title: "Preuniversitario", icon: GraduationCap, count: 10, color: "text-purple-600", bg: "bg-purple-50", link: "/teacher/lab/library?area=pre" },
    { title: "Crear con IA", icon: Cpu, count: "Nuevo", color: "text-pink-600", bg: "bg-pink-50", link: "/teacher/lab/ai-builder" },
  ];

  const featuredSimulators = [
    { id: "mru", title: "Explorador de Movimiento: MRU", area: "Física", grade: "Secundaria", icon: Target },
    { id: "parabolico", title: "Trayectoria Perfecta", area: "Física", grade: "Secundaria", icon: Rocket },
    { id: "circuitos", title: "Circuit Lab Yachayllu", area: "Física", grade: "Secundaria", icon: Zap },
    { id: "funciones", title: "Explorador de Funciones", area: "Matemática", grade: "Secundaria", icon: Activity },
    { id: "agua", title: "Guardianes del Agua", area: "Ciencia y Tecnología", grade: "Primaria/Secundaria", icon: Droplet },
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-3">
             <div className="p-2 bg-[var(--color-yachay-earth)] text-white rounded-xl shadow-sm">
                <Beaker className="w-8 h-8" />
             </div>
             YACHAYLLU LAB
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Simuladores inteligentes para aprender experimentando.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="bg-white" onClick={() => navigate('/teacher/lab/offline')}>
              Simuladores Offline
           </Button>
           <Button variant="primary" className="shadow-md" onClick={() => navigate('/teacher/lab/library')}>
              Ver Biblioteca
           </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {areas.map((area, i) => (
            <Card key={i} className="p-5 cursor-pointer hover:shadow-md transition-all hover:border-slate-300 group" onClick={() => navigate(area.link)}>
               <div className={`w-12 h-12 rounded-2xl ${area.bg} ${area.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <area.icon className="w-6 h-6" />
               </div>
               <h3 className="font-bold text-slate-800">{area.title}</h3>
               <div className="mt-2 text-sm text-slate-500 font-medium">{typeof area.count === 'string' ? <Badge variant="pink">{area.count}</Badge> : `${area.count} simuladores`}</div>
            </Card>
         ))}
      </div>

      <div>
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">Simuladores Funcionales (MVP)</h2>
            <Button variant="ghost" onClick={() => navigate('/teacher/lab/library')}>Ver todos <ChevronRight className="w-4 h-4 ml-1" /></Button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredSimulators.map(sim => (
               <Card key={sim.id} className="p-0 overflow-hidden flex flex-col group cursor-pointer" onClick={() => navigate(`/teacher/lab/simulator/${sim.id}`)}>
                  <div className="h-32 bg-slate-100 flex items-center justify-center border-b border-slate-200 group-hover:bg-slate-200 transition-colors">
                     <sim.icon className="w-12 h-12 text-slate-400" strokeWidth={1} />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                     <div className="flex items-center gap-2 mb-2">
                        <Badge variant="blue" className="text-[10px]">{sim.area}</Badge>
                        <Badge variant="gray" className="text-[10px]">{sim.grade}</Badge>
                     </div>
                     <h3 className="font-bold text-slate-900 text-lg group-hover:text-[var(--color-yachay-earth)] transition-colors">{sim.title}</h3>
                     <div className="mt-auto pt-4 flex gap-2">
                        <Button variant="outline" className="w-full h-9 text-xs">Asignar</Button>
                        <Button variant="primary" className="w-full h-9 text-xs shadow-sm">Iniciar</Button>
                     </div>
                  </div>
               </Card>
            ))}
         </div>
      </div>
    </div>
  );
}
