import { useState } from "react";
import { Mic, Play, Pause, Download, Filter, Search, Tag, CheckCircle, Clock } from "lucide-react";
import { Button, Card, Badge } from "../../components/ui";

interface AudioEntry {
   id: string;
   title: string;
   type: string;
   language: string;
   duration: string;
   status: string;
   author: string;
   tags: string[];
}

export default function AudioBank() {
   const isTeacher = location.pathname.startsWith('/teacher');

   const audios: AudioEntry[] = [
      { id: "1", title: "Pronunciación: Yaku", type: "Pronunciación", language: "Quechua", duration: "0:04", status: "Validado", author: "Sabio Local (Comunidad X)", tags: ["Agua", "Naturaleza"] },
      { id: "2", title: "Relato: Origen del Río Huallaga", type: "Relato Oral", language: "Castellano", duration: "3:45", status: "Validado", author: "Estudiante 4° A", tags: ["Historia", "Mitos"] },
      { id: "3", title: "Welcome to Kotosh", type: "Guía Turística", language: "English", duration: "1:20", status: "Por validar", author: "Estudiante 5° B", tags: ["Turismo", "Patrimonio"] },
      { id: "4", title: "Pronunciación: Ayllu", type: "Pronunciación", language: "Quechua", duration: "0:05", status: "Validado", author: "Docente", tags: ["Comunidad"] },
   ];

   return (
      <div className="space-y-6">
         <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-display font-bold text-slate-900">Banco de Audios</h1>
               <p className="text-slate-600 mt-2">Pronunciación, relatos orales y testimonios de la comunidad.</p>
            </div>
            <Button variant="primary">
               <Mic className="w-5 h-5 mr-2" /> Grabar o Subir Audio
            </Button>
         </header>

         <div className="flex gap-4">
            <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="Buscar por tema, palabra o idioma..." 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500 outline-none"
               />
            </div>
            <Button variant="outline" className="bg-white"><Filter className="w-5 h-5"/></Button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {audios.map(audio => (
               <Card key={audio.id} className="p-5 border border-slate-200">
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex gap-2 items-center">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded">{audio.type}</span>
                        <span className="px-2 py-0.5 bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-bold uppercase rounded">{audio.language}</span>
                     </div>
                     {audio.status === "Validado" ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" title="Validado" />
                     ) : (
                        <Clock className="w-4 h-4 text-amber-500" title="Por validar" />
                     )}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 leading-tight">{audio.title}</h3>
                  <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">Registrado por: {audio.author}</p>

                  <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                     <button className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center hover:bg-rose-700 transition flex-shrink-0">
                        <Play className="w-5 h-5 ml-1" />
                     </button>
                     <div className="flex-1">
                        <div className="h-1.5 bg-slate-200 rounded-full w-full overflow-hidden">
                           <div className="h-full bg-rose-300 w-1/3"></div>
                        </div>
                        <div className="flex justify-between mt-1">
                           <span className="text-[10px] text-slate-400 font-medium tracking-widest">0:00</span>
                           <span className="text-[10px] text-slate-400 font-medium tracking-widest">{audio.duration}</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                     <div className="flex gap-1 flex-wrap">
                        {audio.tags.map(t => (
                           <span key={t} className="text-[10px] text-slate-500 flex items-center gap-0.5"><Tag className="w-3 h-3"/>{t}</span>
                        ))}
                     </div>
                     <button className="text-slate-400 hover:text-slate-600">
                        <Download className="w-4 h-4" />
                     </button>
                  </div>
               </Card>
            ))}
         </div>
      </div>
   );
}
