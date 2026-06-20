import { useState } from "react";
import { Card, Badge, Button, Modal } from "../../components/ui";
import { Upload, CheckCircle, FileText, Download } from "lucide-react";

export default function StudentMissions() {
   const [uploaded, setUploaded] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
   const [modalTitle, setModalTitle] = useState("");
   const [modalContent, setModalContent] = useState("");

   const showModal = (title: string, content: string) => {
     setModalTitle(title);
     setModalContent(content);
     setModalOpen(true);
   };

   return (
      <div className="space-y-6">
         <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Misión: Guardianes del Agua</h1>
               <Badge variant="blue" className="mt-2 text-sm">En progreso</Badge>
            </div>
            <Button variant="outline" onClick={() => showModal("Descargar Ficha", "Descargando ficha de la misión para trabajar de forma offline...")}><Download className="w-4 h-4 md:mr-2" /> <span className="hidden md:inline">Descargar Ficha (Offline)</span></Button>
         </header>

         <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
               <Card className="p-6">
                 <h2 className="text-xl font-bold mb-4 border-b border-slate-100 pb-2">Narrativa de la Misión</h2>
                 <p className="text-slate-700 leading-relaxed mb-6">
                   El río Huallaga es la fuente de vida de nuestra comunidad. Lamentablemente, vemos que la contaminación está afectando la biodiversidad y reduciendo el turismo sostenible en la zona. El alcalde escolar necesita datos precisos.
                   <br/><br/>Tú y tu Ayllu han sido encomendados con la tarea de investigar la calidad del agua en 3 estaciones cercanas al puente Calicanto y proponer soluciones tecnológicas.
                 </p>

                 <h3 className="font-bold text-lg mb-2">Pasos a seguir:</h3>
                 <ul className="list-decimal pl-5 space-y-2 text-slate-600 mb-6">
                    <li>Visiten las 3 estaciones de muestreo y usen los reactivos para medir el pH del agua.</li>
                    <li>Anoten los datos en su bitácora.</li>
                    <li>Con su Ayllu, grafiquen los resultados y escriban conclusiones considerando el impacto biológico.</li>
                    <li>Suban la foto de su afiche y sus datos consolidados en la sección de Evidencias.</li>
                 </ul>
               </Card>

               <Card className="p-6 border-2 border-dashed border-slate-300 bg-slate-50 text-center transition-colors hover:border-[var(--color-yachay-earth)] hover:bg-slate-100">
                  {!uploaded ? (
                    <div className="space-y-4 py-8">
                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-slate-200">
                          <Upload className="w-8 h-8 text-[var(--color-yachay-earth)]" />
                       </div>
                       <div>
                         <h3 className="font-bold text-slate-800 text-lg">Sube aquí tu evidencia</h3>
                         <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">Puedes subir un archivo PDF, fotos de tu cuaderno, portafolio físico (.jpg, .png).</p>
                       </div>
                       <Button variant="primary" onClick={() => setUploaded(true)} className="mt-2">Seleccionar Archivo</Button>
                    </div>
                  ) : (
                    <div className="space-y-4 py-8">
                       <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                          <CheckCircle className="w-8 h-8" />
                       </div>
                       <div>
                         <h3 className="font-bold text-emerald-700 text-lg">¡Evidencia Entregada!</h3>
                         <p className="text-sm text-slate-600 mt-1">El archivo "afiche_agua.jpg" se ha enviado al docente Prof. Demo. Recibirás tu retroalimentación pronto.</p>
                       </div>
                       <div className="flex gap-2 justify-center mt-2">
                           <Button variant="outline" onClick={() => setUploaded(false)}>Cambiar archivo</Button>
                           <Button variant="secondary" onClick={() => showModal("Matriz de Evaluación", "Mostrando rúbrica para esta competencia...")}><FileText className="w-4 h-4 mr-2"/>Ver Rúbrica</Button>
                       </div>
                    </div>
                  )}
               </Card>
            </div>

            <div>
               <Card className="p-5 sticky top-6">
                  <h3 className="font-bold text-slate-800 mb-4">Detalles de Misión</h3>
                  <div className="space-y-4 text-sm text-slate-600">
                     <div className="flex justify-between border-b border-slate-100 pb-2">
                       <span className="font-medium text-slate-500">Área</span>
                       <span className="font-medium text-slate-800">C. y Tecnología</span>
                     </div>
                     <div className="flex justify-between border-b border-slate-100 pb-2">
                       <span className="font-medium text-slate-500">Competencia</span>
                       <span className="font-medium text-slate-800 text-right truncate w-32" title="Indaga mediante métodos científicos">Indaga mediante...</span>
                     </div>
                     <div className="flex justify-between border-b border-slate-100 pb-2">
                       <span className="font-medium text-slate-500">Vencimiento</span>
                       <span className="text-red-600 font-medium">Hoy, 23:59</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="font-medium text-slate-500">Ayllu</span>
                       <span className="font-medium text-slate-800">Los Cóndores</span>
                     </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100">
                      <h4 className="font-semibold text-slate-800 mb-2">Recursos en Línea</h4>
                      <div className="flex flex-col gap-2">
                          <a href="#" onClick={(e) => { e.preventDefault(); showModal("Recurso PDF", "Visualizando Ficha de Laboratorio"); }} className="text-[var(--color-yachay-blue)] hover:underline text-sm flex items-center"><FileText className="w-4 h-4 mr-2 flex-shrink-0" /> Ficha de Laboratorio.pdf</a>
                          <a href="#" onClick={(e) => { e.preventDefault(); showModal("Recurso PDF", "Visualizando Guía de pH"); }} className="text-[var(--color-yachay-blue)] hover:underline text-sm flex items-center"><FileText className="w-4 h-4 mr-2 flex-shrink-0" /> Guía de pH.pdf</a>
                      </div>
                  </div>
               </Card>
            </div>
         </div>

         <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
           <div className="space-y-4">
             <p className="text-slate-600">
               {modalContent}
             </p>
             <Button className="w-full" onClick={() => setModalOpen(false)}>Entendido</Button>
           </div>
         </Modal>
      </div>
   )
}
