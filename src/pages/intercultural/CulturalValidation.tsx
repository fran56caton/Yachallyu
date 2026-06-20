import { useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, MessageSquare, Clock, Filter, Eye } from "lucide-react";
import { Button, Card, Badge } from "../../components/ui";

interface ValidationItem {
  id: string;
  type: string;
  title: string;
  content_preview: string;
  submitted_by: string;
  date: string;
  status: string;
  risk_level: "low" | "medium" | "high";
}

export default function CulturalValidation() {
  const isTeacher = location.pathname.startsWith('/teacher');

  const items: ValidationItem[] = [
    {
      id: "1",
      type: "Palabra Glosario",
      title: "Traducción Quechua: 'Minka'",
      content_preview: "Minka: Trabajo comunal en beneficio de la comunidad. Sugerido: 'Trabajo obligado'.",
      submitted_by: "Estudiante 3° B",
      date: "Hoy, 10:30 AM",
      status: "Pendiente",
      risk_level: "medium"
    },
    {
      id: "2",
      type: "Relato Oral",
      title: "Entrevista a Abuelo sobre la siembra",
      content_preview: "Audio de 4 mins con transcripción automática. Contiene historias familiares.",
      submitted_by: "Estudiante 5° A",
      date: "Ayer, 16:45 PM",
      status: "Pendiente",
      risk_level: "high"
    },
    {
      id: "3",
      type: "Evidencia Misión",
      title: "Guía Turística Kotosh",
      content_preview: "Texto bilingüe Castellano-Inglés sobre el Templo de las Manos Cruzadas.",
      submitted_by: "Estudiante 4° C",
      date: "Ayer, 09:15 AM",
      status: "Pendiente",
      risk_level: "low"
    }
  ];

  if (!isTeacher) {
     return <div className="p-8 text-center text-slate-500">Solo docentes pueden acceder al panel de validación.</div>;
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Validación Cultural</h1>
          <p className="text-slate-600 mt-2">Revisa, modera y aprueba traducciones y testimonios antes de su publicación.</p>
        </div>
      </header>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 text-amber-800">
         <AlertTriangle className="w-6 h-6 flex-shrink-0 text-amber-600 mt-0.5" />
         <div className="text-sm">
            <strong>Cuidado Lingüístico y Ético:</strong> Toda traducción en quechua o relato comunitario debe ser revisado para asegurar respeto por las fuentes. No apruebes traducciones inventadas.
         </div>
      </div>

      <div className="flex gap-4">
         <Button variant="outline" className="bg-white"><Filter className="w-5 h-5 mr-2"/> Filtrar pendientes</Button>
      </div>

      <div className="space-y-4">
         {items.map(item => (
            <Card key={item.id} className="p-6 border border-slate-200 flex flex-col md:flex-row gap-6">
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded tracking-wider">{item.type}</span>
                     {item.risk_level === 'high' && (
                        <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold uppercase rounded border border-rose-200">Revisión Cautelosa</span>
                     )}
                     <span className="text-xs text-slate-400 ml-auto flex items-center gap-1"><Clock className="w-3 h-3"/> {item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600 mb-3 bg-slate-50 p-3 rounded border border-slate-100">
                     {item.content_preview}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">Enviado por: {item.submitted_by}</p>
               </div>
               
               <div className="flex flex-row md:flex-col items-center justify-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  <Button variant="outline" className="w-full text-sm h-9 bg-white"><Eye className="w-4 h-4 mr-2"/> Ver Detalle</Button>
                  <Button variant="primary" className="w-full text-sm h-9 bg-emerald-600 hover:bg-emerald-700 border-emerald-600 shadow-sm"><CheckCircle className="w-4 h-4 mr-2"/> Aprobar</Button>
                  <Button variant="outline" className="w-full text-sm h-9 text-rose-600 border-rose-200 hover:bg-rose-50"><XCircle className="w-4 h-4 mr-2"/> Observar</Button>
               </div>
            </Card>
         ))}
      </div>
    </div>
  );
}
