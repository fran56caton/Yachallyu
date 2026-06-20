import { useState, useEffect } from "react";
import { Card, Badge, Button } from "../../components/ui";
import { Users, FileText, CheckCircle, Clock, Plus, Beaker, Play, UsersIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [activeMissions, setActiveMissions] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('yachayllu_assigned_missions') || '[]');
    const defaults = [
       { title: "Guardianes del Agua", grade: "3A", type: "Ciencia y Tecnología", status: "En curso", date: "Vence: Hoy" },
       { title: "Ruta Histórica de Kotosh", grade: "4A", type: "Ciencias Sociales", status: "Por evaluar", date: "Vence: 24 May" },
       { title: "Mercado Escolar del Ayllu", grade: "3A", type: "Ingeniería EPT", status: "Borrador", date: "Sin fecha" }
    ];
    
    const formattedSaved = saved.map((s: any) => ({
       title: s.mision,
       grade: s.curso,
       type: "Asignado via Ruleta",
       status: "En curso",
       date: "Vence: Pronto",
       ayllusCount: s.ayllus.length
    }));

    setActiveMissions([...formattedSaved, ...defaults].slice(0, 5));
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Hola, Prof. Demo 👋</h1>
        <p className="text-slate-600 mt-1">Aquí tienes un resumen de tus aulas y misiones activas.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/teacher/classes')}>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users className="w-5 h-5"/></div>
             <div>
               <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Estudiantes</p>
               <p className="text-2xl font-bold text-slate-800">45</p>
             </div>
          </div>
        </Card>
        <Card className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/teacher/missions')}>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-green-50 text-emerald-600 rounded-lg"><CheckCircle className="w-5 h-5"/></div>
             <div>
               <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Completadas</p>
               <p className="text-2xl font-bold text-slate-800">12</p>
             </div>
          </div>
        </Card>
        <Card className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/teacher/missions')}>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Clock className="w-5 h-5"/></div>
             <div>
               <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">En progreso</p>
               <p className="text-2xl font-bold text-slate-800">{activeMissions.filter(m => m.status === 'En curso').length}</p>
             </div>
          </div>
        </Card>
        <Card className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/teacher/registry')}>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><FileText className="w-5 h-5"/></div>
             <div>
               <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Evidencias</p>
               <p className="text-2xl font-bold text-slate-800">124</p>
             </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Main Content Area - Active Missions */}
        <div className="md:col-span-2 space-y-4">
           <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Misiones Activas y Asignaciones</h2>
              <div className="flex gap-2">
                 <Link to="/teacher/registry">
                   <Button variant="secondary" className="text-sm h-9 shadow-sm hidden sm:flex">
                     <UsersIcon className="w-4 h-4 mr-1 inline" /> Ver Ruleta
                   </Button>
                 </Link>
                 <Link to="/teacher/ai-generator">
                   <Button variant="primary" className="text-sm h-9 shadow-sm">
                     <Plus className="w-4 h-4 mr-1 inline" /> Nueva Misión
                   </Button>
                 </Link>
              </div>
           </div>
           
           <Card className="p-0 overflow-hidden shadow-sm border border-slate-200">
             <div className="divide-y divide-slate-100 bg-white">
                {activeMissions.length === 0 ? (
                   <div className="p-8 text-center text-slate-500">
                      No hay misiones asignadas aún.
                   </div>
                ) : (
                   activeMissions.map((m, i) => (
                     <div key={i} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                       <div>
                         <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-slate-900">{m.title}</h3>
                            {m.ayllusCount && <Badge variant="blue" className="text-[10px]"><UsersIcon className="w-3 h-3 mr-1 inline"/> {m.ayllusCount} Ayllus</Badge>}
                         </div>
                         <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                           <Badge variant="gray" className="bg-slate-100">{m.grade}</Badge>
                           <span className="text-slate-300">•</span>
                           <span>{m.type}</span>
                           <span className="text-slate-300">•</span>
                           <span className="flex items-center text-slate-600"><Clock className="w-3 h-3 mr-1"/> {m.date}</span>
                         </div>
                       </div>
                       <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                         {m.status === "Borrador" && <Badge variant="gray">Borrador</Badge>}
                         {m.status === "En curso" && <Badge variant="blue">En Curso</Badge>}
                         {m.status === "Por evaluar" && <Badge variant="yellow">Por Evaluar</Badge>}
                         
                         <Button variant="outline" className="text-xs ml-auto border-slate-200 h-8" onClick={() => navigate('/teacher/missions')}>Ver Detalle</Button>
                       </div>
                     </div>
                   ))
                )}
             </div>
           </Card>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-[var(--color-yachay-bg)] to-indigo-50 border border-indigo-100 shadow-sm h-auto flex flex-col justify-center">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[var(--color-yachay-earth)] mb-4 shadow-sm border border-indigo-50">
                <Beaker className="w-6 h-6"/>
             </div>
             <h3 className="font-bold text-slate-900 mb-2 text-lg">Generador de Misiones Inteligente</h3>
             <p className="text-sm text-slate-600 mb-6 leading-relaxed">Crea fichas didácticas detalladas alineadas al CNEB y con contexto territorial usando IA.</p>
             <Link to="/teacher/ai-generator" className="inline-block w-full mt-auto">
                <Button variant="primary" className="w-full h-11 font-bold shadow-md hover:shadow-lg transition-shadow">
                  Generar Nueva Ficha
                </Button>
             </Link>
          </Card>
          
          <Card className="p-5 border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-slate-900">Mis Aulas y Avance</h3>
                 <Button variant="ghost" className="px-2 h-7 text-xs" onClick={() => navigate('/teacher/registry')}>Registro</Button>
             </div>
             <div className="space-y-3">
               <div 
                 onClick={() => navigate('/teacher/registry')}
                 className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 cursor-pointer transition-colors"
                >
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shadow-sm">3A</div>
                   <span className="font-medium text-sm text-slate-800">3° A - CyT</span>
                 </div>
                 <div className="text-right">
                    <span className="text-xs text-slate-500 font-medium block">20 Alumnos</span>
                 </div>
               </div>
               <div 
                 onClick={() => navigate('/teacher/registry')}
                 className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 cursor-pointer transition-colors"
               >
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shadow-sm">3B</div>
                   <span className="font-medium text-sm text-slate-800">3° B - CyT</span>
                 </div>
                 <div className="text-right">
                    <span className="text-xs text-slate-500 font-medium block">20 Alumnos</span>
                 </div>
               </div>
               <div 
                 onClick={() => navigate('/teacher/registry')}
                 className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 cursor-pointer transition-colors"
               >
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shadow-sm">4A</div>
                   <span className="font-medium text-sm text-slate-800">4° A - Matemática</span>
                 </div>
                 <div className="text-right">
                    <span className="text-xs text-slate-500 font-medium block">20 Alumnos</span>
                 </div>
               </div>
             </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
