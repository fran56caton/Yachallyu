import { useState } from "react";
import { Map, Users, Mic, Star, Globe, Plus } from "lucide-react";
import { Badge, Card, Button } from "../../components/ui";

export default function CulturalMissions() {
   const isTeacher = location.pathname.startsWith('/teacher');

   const missions = [
      {
         title: "Voces del Ayllu",
         area: "Comunicación / CC.SS.",
         product: "Entrevista a familiar",
         focus: "Memoria oral",
         languages: ["Castellano", "Quechua"],
         icon: Users,
         color: "text-purple-600 bg-purple-50"
      },
      {
         title: "Tourist Guide Huánuco",
         area: "Inglés / CC.SS.",
         product: "Guía turística bilingüe",
         focus: "Turismo Educativo",
         languages: ["English", "Castellano"],
         icon: Globe,
         color: "text-blue-600 bg-blue-50"
      },
      {
         title: "Palabras que viven",
         area: "Comunicación / Arte",
         product: "Diccionario visual",
         focus: "Lenguaje y Territorio",
         languages: ["Castellano", "Quechua"],
         icon: Mic,
         color: "text-amber-600 bg-amber-50"
      },
      {
         title: "Kotosh en tres lenguas",
         area: "CC.SS. / Inglés",
         product: "Ficha cultural",
         focus: "Patrimonio",
         languages: ["Castellano", "Quechua", "English"],
         icon: Map,
         color: "text-emerald-600 bg-emerald-50"
      }
   ];

   return (
      <div className="space-y-6">
         <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-display font-bold text-slate-900">Misiones Bilingües</h1>
               <p className="text-slate-600 mt-2">Convierte la cultura local en fuente real de aprendizaje.</p>
            </div>
            {isTeacher && (
               <Button variant="primary">
                  <Plus className="w-5 h-5 mr-2" /> Crear Misión
               </Button>
            )}
         </header>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missions.map((m, i) => (
               <Card key={i} className="p-6 border border-slate-200 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${m.color}`}>
                     <m.icon className="w-8 h-8"/>
                  </div>
                  <div className="flex-1">
                     <div className="flex gap-2 mb-2 flex-wrap">
                        {m.languages.map(l => (
                           <span key={l} className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-full uppercase">{l}</span>
                        ))}
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-1">{m.title}</h3>
                     <p className="text-sm font-medium text-slate-500 mb-4">{m.area} • {m.focus}</p>
                     
                     <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                        <span className="text-xs font-bold text-slate-700 block mb-1">Producto esperado:</span>
                        <span className="text-sm text-slate-600">{m.product}</span>
                     </div>

                     <div className="flex justify-end gap-2">
                        <Button variant="outline" className="bg-white text-sm py-1.5 h-auto">Ver Misión</Button>
                        {!isTeacher && <Button variant="primary" className="text-sm py-1.5 h-auto shadow-sm">Iniciar Misión</Button>}
                        {isTeacher && <Button variant="primary" className="text-sm py-1.5 h-auto shadow-sm">Asignar Misión</Button>}
                     </div>
                  </div>
               </Card>
            ))}
         </div>
      </div>
   )
}
