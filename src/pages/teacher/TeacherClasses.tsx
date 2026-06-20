import { useState } from "react";
import { Card, Badge, Button, Modal } from "../../components/ui";
import { Users, Plus, Edit } from "lucide-react";

export default function TeacherClasses() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const showModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Aulas y Ayllus</h1>
           <p className="text-slate-600 mt-1">Gestiona a tus estudiantes y equipos de trabajo.</p>
        </div>
        <Button onClick={() => showModal("Nueva Aula", "Aquí se mostrará el formulario para crear un nueva aula.")}><Plus className="w-4 h-4 mr-2 inline" /> Nueva Aula</Button>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
         <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
               <div>
                  <h3 className="font-bold text-lg text-slate-800">3° A - Secundaria</h3>
                  <p className="text-sm text-slate-500">22 Alumnos • Ciencia y Tecnología</p>
               </div>
               <Button variant="ghost" className="px-2" onClick={() => showModal("Editar Aula", "Formulario para modificar los detalles del aula.")}><Edit className="w-4 h-4" /></Button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:border-[var(--color-yachay-earth)] transition-colors" onClick={() => showModal("Detalles del Ayllu", "Mostrando progreso del Ayllu Los Cóndores.")}>
                <div className="flex justify-between items-center mb-2">
                   <h4 className="font-semibold text-sm text-[var(--color-yachay-earth)] flex items-center"><Users className="w-4 h-4 mr-1"/> Ayllu Los Cóndores</h4>
                   <Badge variant="green">Activo</Badge>
                </div>
                <div className="flex gap-2.5">
                   <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden" title="Estudiante Demo 1">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=E1" />
                   </div>
                   <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden" title="Estudiante Demo 2">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=E2" />
                   </div>
                   <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden" title="Estudiante Demo 3">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=E3" />
                   </div>
                   <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden" title="Estudiante Demo 4">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=E4" />
                   </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:border-[var(--color-yachay-blue)] transition-colors" onClick={() => showModal("Detalles del Ayllu", "Mostrando progreso del Ayllu Las Vicuñas.")}>
                <div className="flex justify-between items-center mb-2">
                   <h4 className="font-semibold text-sm text-[var(--color-yachay-blue)] flex items-center"><Users className="w-4 h-4 mr-1"/> Ayllu Las Vicuñas</h4>
                   <Badge variant="green">Activo</Badge>
                </div>
                <div className="flex gap-2.5">
                   <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=E5" />
                   </div>
                   <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=E6" />
                   </div>
                   <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=E7" />
                   </div>
                </div>
              </div>
            </div>
         </Card>

         <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
               <div>
                  <h3 className="font-bold text-lg text-slate-800">4° A - Secundaria</h3>
                  <p className="text-sm text-slate-500">23 Alumnos • Ciencias Sociales</p>
               </div>
               <Button variant="ghost" className="px-2" onClick={() => showModal("Editar Aula", "Formulario para modificar los detalles del aula.")}><Edit className="w-4 h-4" /></Button>
            </div>
            <div className="py-8 text-center text-slate-500 text-sm">
                Sin Ayllus configurados aún. <br/>
                <Button variant="outline" className="mt-2 h-8 text-xs" onClick={() => showModal("Crear Ayllus", "Abriendo plataforma para crear y asignar Ayllus.")}>Crear Ayllus</Button>
            </div>
         </Card>
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
