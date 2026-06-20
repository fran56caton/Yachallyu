import { useState } from "react";
import { Button, Card, Badge, Modal } from "../../components/ui";
import { LayoutTemplate, PlusCircle, CheckCircle, FileText, Search } from "lucide-react";

export default function TeacherTemplates() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const templates = [
    { title: "Indagación Científica", type: "Ciencia y Tecnología", tags: ["Laboratorio", "Campo"], desc: "Estructura para misiones de investigación y recolección de datos naturales." },
    { title: "Rally Histórico Local", type: "Ciencias Sociales", tags: ["Patrimonio", "Entrevistas"], desc: "Formato para explorar la historia y memoria colectiva del territorio." },
    { title: "Debate Ciudadano", type: "DPCC", tags: ["Argumentación"], desc: "Plantilla para estructurar debates sobre problemáticas comunitarias locales." },
    { title: "Cuentacuentos Interactivo", type: "Comunicación", tags: ["Creatividad", "Oralidad"], desc: "Plantilla para misiones de expresión oral y creación de narrativas." },
  ];

  const showModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Plantillas de Misiones</h1>
           <p className="text-slate-600 mt-1">Acelera la creación de experiencias utilizando formatos probados y efectivos.</p>
        </div>
        <Button variant="primary" onClick={() => showModal("Crear Plantilla", "Abriendo el editor para guardar tu propia estructura de misión como plantilla pública o privada.")}>
           <PlusCircle className="w-5 h-5 mr-2 inline" /> Nueva Plantilla
        </Button>
      </header>

      <div className="flex gap-4">
         <div className="relative flex-1 max-w-md">
           <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
           <input type="text" placeholder="Buscar plantillas predefinidas..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none text-sm" />
         </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
         {templates.map((tpl) => (
            <Card key={tpl.title} className="flex flex-col">
               <div className="p-5 flex-1 space-y-3">
                 <div className="w-10 h-10 bg-orange-100 text-[var(--color-yachay-earth-dark)] rounded-lg flex items-center justify-center mb-4">
                    <LayoutTemplate className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-lg leading-tight text-slate-900">{tpl.title}</h3>
                 <p className="text-sm text-slate-600">{tpl.desc}</p>
                 <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="blue">{tpl.type}</Badge>
                    {tpl.tags.map(t => <Badge key={t} variant="gray">{t}</Badge>)}
                 </div>
               </div>
               <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-2">
                  <Button variant="outline" className="w-full text-xs" onClick={() => showModal("Vista Previa", `Vista previa de la plantilla: ${tpl.title}\n${tpl.desc}`)}>
                    <FileText className="w-3 h-3 mr-1 inline" /> Ver Prev
                  </Button>
                  <Button variant="primary" className="w-full text-xs" onClick={() => showModal("Usar Plantilla", `Cargando la estructura "${tpl.title}" en el generador de misiones...`)}>
                    <CheckCircle className="w-3 h-3 mr-1 inline" /> Usar
                  </Button>
               </div>
            </Card>
         ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
         <div className="space-y-4">
           <p className="text-slate-600 whitespace-pre-line leading-relaxed">
             {modalContent}
           </p>
           <Button className="w-full" onClick={() => setModalOpen(false)}>Aceptar</Button>
         </div>
      </Modal>
    </div>
  );
}
