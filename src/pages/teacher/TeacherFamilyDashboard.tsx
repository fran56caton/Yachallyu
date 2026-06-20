import { useState } from "react";
import { Search, Plus, Filter, MessageCircle, AlertTriangle, CheckCircle, Smartphone, Send, History } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import WhatsAppPreview from "../../components/families/WhatsAppPreview";

interface Guardian {
   id: string;
   student: string;
   name: string;
   relation: string;
   phone: string;
   consent: "active" | "inactive" | "pending";
   last_message: string;
}

export default function TeacherFamilyDashboard() {
   const [activeTab, setActiveTab] = useState<"directory" | "composer" | "history">("directory");
   const [selectedGuardian, setSelectedGuardian] = useState<Guardian | null>(null);

   const guardians: Guardian[] = [
      { id: "1", student: "María Quispe", name: "Rosa Huamán", relation: "Madre", phone: "+51 987654321", consent: "active", last_message: "Ayer" },
      { id: "2", student: "Juan Pérez", name: "Carlos Pérez", relation: "Padre", phone: "+51 987654322", consent: "pending", last_message: "Hace 1 semana" },
      { id: "3", student: "Ana Gómez", name: "Lucía Gómez", relation: "Madre", phone: "+51 987654323", consent: "inactive", last_message: "Nunca" },
   ];

   const templates = [
      { id: "t1", title: "Insignia Obtenida", content: "Hola {nombre_apoderado}. Su hijo(a) {nombre_estudiante} consiguió la insignia {nombre_insignia} en YACHAYLLU. ¡Felicitaciones por su esfuerzo!" },
      { id: "t2", title: "Misión Completada", content: "Hola {nombre_apoderado}. Su hijo(a) completó la misión {nombre_mision}. Recomendación: {recomendacion} Ver resumen: {enlace_seguro}" },
      { id: "t3", title: "Alerta de Misión Pendiente", content: "Hola {nombre_apoderado}. Su hijo(a) tiene pendiente la misión {nombre_mision}. Puede apoyarlo recordándole revisar su ficha." },
   ];

   const [messageText, setMessageText] = useState("");

   const handleTemplateSelect = (content: string) => {
      // Mock replace
      let text = content
         .replace("{nombre_apoderado}", selectedGuardian ? selectedGuardian.name : "[Apoderado]")
         .replace("{nombre_estudiante}", selectedGuardian ? selectedGuardian.student : "[Estudiante]")
         .replace("{nombre_insignia}", "Investigador Científico")
         .replace("{nombre_mision}", "Guardianes del Agua")
         .replace("{recomendacion}", "Converse en casa sobre cómo cuidar el agua.")
         .replace("{enlace_seguro}", "https://yachayllu.edu/s/12x45");
      setMessageText(text);
   };

   return (
      <div className="space-y-6 pb-20">
         <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-8 h-8 text-[var(--color-whatsapp)]" style={{ color: '#25D366' }} /> YACHAYLLU Familias
               </h1>
               <p className="text-slate-600 mt-2">Conectando el Pasaporte Digital del estudiante con la familia de forma simple por WhatsApp.</p>
            </div>
            <Button variant="primary">
               <Plus className="w-5 h-5 mr-2" /> Registrar Apoderado
            </Button>
         </header>

         {/* Tabs */}
         <div className="flex gap-4 border-b border-slate-200">
            <button 
               onClick={() => setActiveTab("directory")}
               className={`pb-3 px-1 text-sm font-bold border-b-2 transition-colors ${activeTab === 'directory' ? 'border-[var(--color-yachay-earth)] text-[var(--color-yachay-earth)]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
               Directorio de Familias
            </button>
            <button 
               onClick={() => setActiveTab("composer")}
               className={`pb-3 px-1 text-sm font-bold border-b-2 transition-colors ${activeTab === 'composer' ? 'border-[var(--color-yachay-earth)] text-[var(--color-yachay-earth)]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
               Enviar Mensaje
            </button>
            <button 
               onClick={() => setActiveTab("history")}
               className={`pb-3 px-1 text-sm font-bold border-b-2 transition-colors ${activeTab === 'history' ? 'border-[var(--color-yachay-earth)] text-[var(--color-yachay-earth)]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
               Historial y Respuestas
            </button>
         </div>

         {activeTab === "directory" && (
            <div className="space-y-4">
               <div className="flex gap-4">
                  <div className="relative flex-1">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                     <input type="text" placeholder="Buscar familia o estudiante..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none" />
                  </div>
                  <Button variant="outline" className="bg-white"><Filter className="w-5 h-5"/></Button>
               </div>

               <div className="grid gap-4">
                  {guardians.map(g => (
                     <Card key={g.id} className="p-4 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                           <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-slate-900 text-lg">{g.name}</h3>
                              {g.consent === 'active' && <Badge variant="green" className="text-[10px]">Consentimiento Activo</Badge>}
                              {g.consent === 'pending' && <Badge variant="yellow" className="text-[10px]">Pendiente</Badge>}
                              {g.consent === 'inactive' && <Badge variant="red" className="text-[10px]">Sin Autorización</Badge>}
                           </div>
                           <p className="text-sm text-slate-600">Apoderado de: <strong>{g.student}</strong> ({g.relation})</p>
                           <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><Smartphone className="w-4 h-4"/> {g.phone}</p>
                        </div>
                        <div className="flex flex-row md:flex-col gap-2">
                           <Button variant="primary" className="text-sm py-1.5 h-auto shadow-sm" onClick={() => { setSelectedGuardian(g); setActiveTab("composer"); }} disabled={g.consent !== 'active'}>
                              <MessageCircle className="w-4 h-4 mr-2" /> Escribir
                           </Button>
                        </div>
                     </Card>
                  ))}
               </div>
            </div>
         )}

         {activeTab === "composer" && (
            <div className="grid lg:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <Card className="p-6 border-slate-200">
                     <h3 className="font-bold text-slate-900 mb-4">1. Seleccionar Destinatario</h3>
                     {selectedGuardian ? (
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                           <div>
                              <div className="font-bold text-slate-800">{selectedGuardian.name}</div>
                              <div className="text-xs text-slate-500">Apoderado de {selectedGuardian.student}</div>
                           </div>
                           <Button variant="ghost" className="text-xs text-slate-500" onClick={() => setSelectedGuardian(null)}>Cambiar</Button>
                        </div>
                     ) : (
                        <select className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-yachay-earth)] text-sm" onChange={(e) => setSelectedGuardian(guardians.find(g => g.id === e.target.value) || null)}>
                           <option value="">Seleccionar apoderado con consentimiento...</option>
                           {guardians.filter(g => g.consent === 'active').map(g => (
                              <option key={g.id} value={g.id}>{g.name} (Apoderado de {g.student})</option>
                           ))}
                        </select>
                     )}
                  </Card>

                  <Card className="p-6 border-slate-200">
                     <h3 className="font-bold text-slate-900 mb-4">2. Elegir Plantilla Aprobada</h3>
                     <div className="space-y-2">
                        {templates.map(t => (
                           <button key={t.id} onClick={() => handleTemplateSelect(t.content)} className="w-full text-left p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors">
                              <div className="font-bold text-sm text-slate-800 mb-1">{t.title}</div>
                           </button>
                        ))}
                     </div>
                  </Card>

                  <Card className="p-6 border-slate-200">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-900">3. Mensaje a Enviar</h3>
                        <Button variant="outline" className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200">✨ Redactar con IA</Button>
                     </div>
                     <textarea 
                        className="w-full p-3 border border-slate-300 rounded-lg min-h-[120px] text-sm focus:ring-2 focus:ring-[var(--color-whatsapp)] outline-none resize-none"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="El mensaje aparecerá aquí..."
                     />
                     <div className="flex items-start gap-2 mt-2 text-xs text-slate-500">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-500" />
                        Asegúrese de no incluir información muy sensible como calificaciones exactas o diagnósticos.
                     </div>
                  </Card>
               </div>

               <div className="space-y-6">
                  <div className="sticky top-6">
                     <h3 className="font-bold text-slate-900 mb-4 hidden lg:block">Vista Previa</h3>
                     <WhatsAppPreview message={messageText} recipient={selectedGuardian?.name} />

                     <Button 
                        variant="primary" 
                        className="w-full mt-6 py-3 text-white shadow-md font-bold text-base"
                        style={{ backgroundColor: '#25D366' }}
                        disabled={!messageText || !selectedGuardian}
                        onClick={() => {
                           alert('Mensaje simulado enviado correctamente');
                           setMessageText('');
                           setActiveTab('history');
                        }}
                     >
                        <Send className="w-5 h-5 mr-2" /> Enviar Mensaje
                     </Button>
                     {/* Semi-automatic fallback mode */ }
                     <div className="mt-4 text-center">
                        <a href="#" className="text-xs text-slate-500 underline">Modo manual: Abrir en WhatsApp Web</a>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {activeTab === "history" && (
            <Card className="p-6 border-slate-200">
               <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><History className="w-5 h-5"/> Últimos Mensajes y Respuestas</h3>
               
               <div className="space-y-4">
                  <div className="p-4 border border-slate-100 rounded-lg bg-slate-50">
                     <div className="flex justify-between items-start mb-2">
                        <div>
                           <span className="font-bold text-slate-800 text-sm">Rosa Huamán (Apoderada de María)</span>
                           <span className="text-xs text-slate-500 ml-2">Ayer, 08:30 PM</span>
                        </div>
                        <Badge variant="blue" className="text-[10px]">Respuesta de apoderado</Badge>
                     </div>
                     <p className="text-slate-700 text-sm italic">"Gracias profesora, conversaré con ella sobre el cuidado del agua en casa como me sugiere."</p>
                     <div className="mt-3 flex gap-2">
                        <Button variant="outline" className="text-xs bg-white py-1 h-auto">Marcar atendido</Button>
                        <Button variant="primary" className="text-xs py-1 h-auto" onClick={() => { setSelectedGuardian(guardians[0]); setActiveTab('composer'); }}>Responder</Button>
                     </div>
                  </div>

                  <div className="p-4 border border-slate-100 rounded-lg bg-white">
                     <div className="flex justify-between items-start mb-2">
                        <div>
                           <span className="font-bold text-slate-800 text-sm">Rosa Huamán (Apoderada de María)</span>
                           <span className="text-xs text-slate-500 ml-2">Ayer, 04:15 PM</span>
                        </div>
                        <Badge variant="green" className="text-[10px]">Enviado y Leído</Badge>
                     </div>
                     <p className="text-slate-600 text-sm">Hola Rosa Huamán. Su hijo(a) completó la misión Guardianes del Agua. Recomendación: Converse en casa sobre cómo cuidar el agua. Ver resumen: https://yachayllu.edu/s/12x45</p>
                  </div>
               </div>
            </Card>
         )}

      </div>
   );
}
