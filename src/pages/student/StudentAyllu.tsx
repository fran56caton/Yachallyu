import { useState } from "react";
import { Card, Badge, Button, Modal } from "../../components/ui";
import { Users, Star, Award, MessageCircle } from "lucide-react";

export default function StudentAyllu() {
   const [modalOpen, setModalOpen] = useState(false);

   return (
      <div className="space-y-6">
         <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 mb-2">
               <div className="w-12 h-12 bg-slate-100 text-[var(--color-yachay-earth)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6" />
               </div>
               <div>
                 <h1 className="text-2xl font-display font-bold text-slate-900">Ayllu Los Cóndores</h1>
                 <p className="text-slate-500 text-sm">3° A - Secundaria • Prof. Demo</p>
               </div>
            </div>
            <Button variant="outline" onClick={() => setModalOpen(true)}><MessageCircle className="w-4 h-4 mr-2" /> Foro del Ayllu</Button>
         </header>

         <div className="grid md:grid-cols-12 gap-6">
            <Card className="p-0 overflow-hidden md:col-span-7">
               <div className="bg-[var(--color-yachay-earth)] text-white p-5 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Miembros del Equipo</h3>
                  <Badge variant="yellow" className="bg-orange-400 text-white border-transparent">4 Integrantes</Badge>
               </div>
               <div className="divide-y divide-slate-100">
                  <div className="p-4 flex items-center gap-4 bg-orange-50/50">
                     <div className="w-12 h-12 rounded-full border-2 border-[var(--color-yachay-earth)] p-0.5 pointer-events-none">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=EstudianteDemo&backgroundColor=e2e8f0" className="w-full h-full rounded-full"/>
                     </div>
                     <div className="flex-1">
                        <h4 className="font-bold text-slate-900">Tú (Estudiante Demo)</h4>
                        <div className="flex gap-2 mt-0.5">
                           <Badge variant="blue">Vocero</Badge>
                        </div>
                     </div>
                     <Badge variant="green" className="hidden sm:inline-flex">Online</Badge>
                  </div>
                  <div className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                     <div className="w-12 h-12 rounded-full bg-slate-200 pointer-events-none">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ana" className="w-full h-full rounded-full"/>
                     </div>
                     <div className="flex-1">
                        <h4 className="font-bold text-slate-800">Ana S.</h4>
                        <div className="flex gap-2 mt-0.5">
                           <Badge variant="gray">Secretaria</Badge>
                        </div>
                     </div>
                     <span className="text-xs text-slate-400 hidden sm:inline-block">Última vez hace 2h</span>
                  </div>
                  <div className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                     <div className="w-12 h-12 rounded-full bg-slate-200 pointer-events-none">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos" className="w-full h-full rounded-full"/>
                     </div>
                     <div className="flex-1">
                        <h4 className="font-bold text-slate-800">Carlos R.</h4>
                        <div className="flex gap-2 mt-0.5">
                           <Badge variant="gray">Coordinador</Badge>
                        </div>
                     </div>
                  </div>
                  <div className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                     <div className="w-12 h-12 rounded-full bg-slate-200 pointer-events-none">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" className="w-full h-full rounded-full"/>
                     </div>
                     <div className="flex-1">
                        <h4 className="font-bold text-slate-800">María P.</h4>
                        <div className="flex gap-2 mt-0.5">
                           <Badge variant="gray">Comunicadora</Badge>
                        </div>
                     </div>
                  </div>
               </div>
            </Card>

            <div className="space-y-6 md:col-span-5">
               <Card className="p-5">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-amber-500"/> Progreso del Equipo</h3>
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 flex items-center justify-between">
                     <div>
                       <span className="text-xs font-bold text-amber-800 uppercase tracking-wide block mb-1">Experiencia Global</span>
                       <span className="font-black text-3xl text-amber-600">3,450 <span className="text-base text-amber-500 font-medium">XP</span></span>
                     </div>
                     <div className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-amber-500 border-r-amber-500"></div>
                  </div>
               </Card>
               <Card className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4"><Award className="w-5 h-5 inline text-blue-500 mr-2"/> Insignias Colectivas</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="text-center p-4 border border-slate-100 rounded-xl bg-white hover:border-emerald-200 transition-colors hover:shadow-sm">
                        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center mb-3">
                           <Award className="w-7 h-7"/>
                        </div>
                        <span className="text-sm font-bold text-slate-800 leading-tight block">Ayllu Investigador</span>
                     </div>
                     <div className="text-center p-4 border border-slate-100 rounded-xl bg-slate-50 opacity-60">
                        <div className="w-14 h-14 bg-slate-200 text-slate-400 rounded-full mx-auto flex items-center justify-center mb-3">
                           <Award className="w-7 h-7"/>
                        </div>
                        <span className="text-sm font-medium text-slate-600 leading-tight block">Ayllu Solidario</span>
                     </div>
                  </div>
               </Card>
            </div>
         </div>

         <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Foro del Ayllu">
           <div className="space-y-4">
             <p className="text-slate-600">
               Abriendo foro de discusión del Ayllu (Próximamente...)
             </p>
             <Button className="w-full" onClick={() => setModalOpen(false)}>Entendido</Button>
           </div>
         </Modal>
      </div>
   )
}
