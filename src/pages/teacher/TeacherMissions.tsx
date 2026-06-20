import { useState, useEffect } from "react";
import { Card, Badge, Button, Modal } from "../../components/ui";
import { BookOpen, Search, Filter, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function TeacherMissions() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [allMissions, setAllMissions] = useState<any[]>([]);

  useEffect(() => {
    const defaultMissions = [
       { title: "Guardianes del Agua", grade: "3° A", type: "Ciencia y Tecnología", status: "En curso", desc: "Análisis de agua en el río Huallaga para concientizar sobre el impacto ambiental." },
       { title: "Ruta Histórica de Kotosh", grade: "4° A", type: "Ciencias Sociales", status: "Por evaluar", desc: "Exploración in-situ del templo de las Manos Cruzadas." },
       { title: "Mercado Escolar del Ayllu", grade: "3° A", type: "Educación para el Trabajo", status: "Borrador", desc: "Creación de proyectos de emprendimiento solidario." },
       { title: "La Yupana Viva", grade: "1° A", type: "Matemática", status: "Publicada", desc: "Operaciones matemáticas usando cálculo andino." },
       { title: "Radio Yachayllu", grade: "5° B", type: "Comunicación", status: "Evaluada", desc: "Creación de podcast de historias locales." }
    ];

    const saved = JSON.parse(localStorage.getItem('yachayllu_missions') || '[]');
    setAllMissions([...saved, ...defaultMissions]);
  }, []);

  const showModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Biblioteca de Misiones</h1>
           <p className="text-slate-600 mt-1">Explora, crea y asigna misiones a tus estudiantes.</p>
        </div>
        <div className="flex gap-2">
           <Link to="/teacher/ai-generator"><Button variant="outline">Generador IA</Button></Link>
           <Button variant="primary" onClick={() => showModal("Crear Manual", "Abriendo creador manual de misiones (Próximamente)")}>Crear Manual</Button>
        </div>
      </header>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input type="text" placeholder="Buscar misiones por competencia o tema..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none text-sm" />
        </div>
        <Button variant="outline" className="px-3" onClick={() => showModal("Filtros", "Abriendo panel de filtros avanzados")}><Filter className="w-4 h-4 mr-2" /> Filtros</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {allMissions.map((m, idx) => (
            <Card key={idx} className="p-0 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                {m.fullData && <div className="absolute top-0 right-0 p-1 bg-amber-500 text-white text-[10px] w-full text-center font-bold">NUEVA MISIÓN GENERADA</div>}
                <div className={`p-5 space-y-3 cursor-pointer ${m.fullData ? 'pt-7' : ''}`} onClick={() => showModal(`Detalles: ${m.title}`, m.fullData ? m.fullData.narrative : m.desc)}>
                   <div className="flex justify-between items-start gap-2">
                      <div className="w-10 h-10 bg-slate-100 text-[var(--color-yachay-earth)] rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <Badge variant={m.status === "Borrador" ? "gray" : m.status === "En curso" ? "blue" : m.status === "Por evaluar" ? "yellow" : "green"}>
                        {m.status}
                      </Badge>
                   </div>
                   <h3 className="font-bold text-lg text-slate-800 leading-tight group-hover:text-[var(--color-yachay-earth)] transition-colors">{m.title}</h3>
                   <p className="text-sm text-slate-600 line-clamp-2">{m.desc}</p>
                   <div className="flex gap-1 flex-wrap pt-2">
                      <Badge variant="gray">{m.type}</Badge>
                      <Badge variant="gray">{m.grade}</Badge>
                   </div>
                </div>
                <div className="border-t border-slate-100 p-4 bg-slate-50 flex gap-2">
                   <Button variant="secondary" className="w-full text-xs h-8" onClick={() => showModal("Asignar Misión", `Asignando misión "${m.title}" al aula seleccionada`)}><Play className="w-3 h-3 mr-1" /> Asignar</Button>
                   <Button variant="outline" className="w-full text-xs h-8" onClick={() => showModal("Editor", `Abriendo editor para: ${m.title}`)}>Editar</Button>
                </div>
            </Card>
         ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
         <div className="space-y-4">
           <p className="text-slate-600 italic">
             {modalContent}
           </p>
           <Button className="w-full" onClick={() => setModalOpen(false)}>Entendido</Button>
         </div>
      </Modal>
    </div>
  )
}
