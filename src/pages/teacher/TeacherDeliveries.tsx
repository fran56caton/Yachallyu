import { useState } from "react";
import { Card, Button, Badge, Modal } from "../../components/ui";
import { Search, Filter, CheckCircle, Bot, Eye, QrCode, FileText, AlertCircle, RefreshCw, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import QRCode from "qrcode";

const entregasMock = [
  { 
     id: "ent-001", 
     mision: "Guardianes del Agua", 
     ayllu: "Ayllu Huallaga", 
     aula: "3° Secundaria A", 
     estado: "analizando", 
     fecha: "Hoy, 10:15 AM",
     iaLevel: "N/A",
     archivo: "ficha_completada.jpg"
  },
  { 
     id: "ent-002", 
     mision: "Guardianes del Agua", 
     ayllu: "Ayllu Kotosh", 
     aula: "3° Secundaria A", 
     estado: "validacion_pendiente", 
     fecha: "Hoy, 09:30 AM",
     iaLevel: "Logrado (A)",
     archivo: "evidencia_equipo.pdf",
     iaFeedback: {
        logros: ["Hipótesis clara", "Buen uso de datos"],
        dificultades: ["Conclusión breve"],
        completitud: 95
     }
  },
  { 
     id: "ent-003", 
     mision: "Botánica Local", 
     ayllu: "Ayllu Amarilis", 
     aula: "4° Secundaria B", 
     estado: "observado", 
     fecha: "Ayer, 14:20 PM",
     iaLevel: "En Inicio (C)",
     archivo: "foto_huerto.jpg",
     iaFeedback: {
        logros: ["Identificación de especies locales"],
        dificultades: ["Ficha con secciones en blanco", "Texto ilegible en tabla"],
        completitud: 60
     }
  },
  { 
     id: "ent-004", 
     mision: "Historia Viva", 
     ayllu: "Ayllu Pillco", 
     aula: "5° Secundaria A", 
     estado: "completado", 
     fecha: "Hace 2 días",
     iaLevel: "Destacado (AD)",
     archivo: "entrevista_comunidad.pdf",
     iaFeedback: {
        logros: ["Argumentación profunda", "Vinculación con patrimonio"],
        dificultades: ["Ninguna significativa"],
        completitud: 100
     }
  }
];

export default function TeacherDeliveries() {
   const [entregas, setEntregas] = useState(entregasMock);
   const [selectedEntrega, setSelectedEntrega] = useState<typeof entregasMock[0] | null>(null);
   const [modalType, setModalType] = useState<"validation" | "qr_gen" | null>(null);

   const getEstadoBadge = (estado: string) => {
      switch(estado) {
         case 'analizando': return <Badge variant="purple" className="animate-pulse"><Bot className="w-3 h-3 mr-1 inline"/> IA Analizando</Badge>;
         case 'validacion_pendiente': return <Badge variant="blue"><Eye className="w-3 h-3 mr-1 inline"/> Requiere Validación</Badge>;
         case 'observado': return <Badge variant="yellow"><RefreshCw className="w-3 h-3 mr-1 inline"/> Observado / Mejora</Badge>;
         case 'completado': return <Badge variant="green"><CheckCircle className="w-3 h-3 mr-1 inline"/> Validado / Completado</Badge>;
         default: return <Badge variant="gray">{estado}</Badge>;
      }
   };

   const handleValidate = (newStatus: string) => {
      if (!selectedEntrega) return;
      setEntregas(entregas.map(e => e.id === selectedEntrega.id ? { ...e, estado: newStatus } : e));
      setModalType(null);
   };

   const handleGeneratePDFs = async () => {
      try {
          const pdf = new jsPDF({
              orientation: "portrait",
              unit: "mm",
              format: "a4"
          });

          // Generar QR en base64
          const qrUrl = `${window.location.origin}/entregar/huallaga-123`;
          const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 60 });

          // Título de la Ficha
          pdf.setFontSize(22);
          pdf.setTextColor(40, 40, 40);
          pdf.text("Ficha de Misión: Guardianes del Agua", 20, 30);

          pdf.setFontSize(14);
          pdf.setTextColor(80, 80, 80);
          pdf.text("Ayllu Huallaga - 3° Secundaria A - CyT", 20, 45);

          pdf.setFontSize(12);
          pdf.text("Docente: Docente Demo", 20, 55);
          pdf.text("Competencia: Indaga mediante métodos científicos...", 20, 65);

          pdf.setFontSize(14);
          pdf.setTextColor(0, 0, 0);
          pdf.text("Actividades:", 20, 85);

          pdf.setFontSize(12);
          pdf.text("1. ¿Cuáles son los principales contaminantes del agua local?", 20, 95);
          pdf.rect(20, 100, 170, 30); // Caja para respuesta

          pdf.text("2. Plantea una hipótesis al respecto:", 20, 145);
          pdf.rect(20, 150, 170, 30); // Caja para respuesta

          pdf.text("3. Conclusión grupal:", 20, 195);
          pdf.rect(20, 200, 170, 30); // Caja para respuesta

          // Agregar QR
          pdf.addImage(qrDataUrl, "PNG", 75, 235, 60, 60);

          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          pdf.text("Escanea este código al terminar la ficha para subir tu evidencia a YACHAYLLU.", 105, 290, { align: "center" });

          pdf.save("Ficha_Ayllu_Huallaga_Demo.pdf");
          setModalType(null);
      } catch (error) {
          console.error("Error generating PDF:", error);
          alert("Ocurrió un error al generar el PDF");
      }
   };

   return (
      <div className="space-y-6 pb-12">
        <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-2">Entregas Inteligentes</h1>
            <p className="text-slate-600 mt-1">Revisa evidencias subidas vía QR, valida sugerencias de IA y actualiza el estado de los Ayllus.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="hidden sm:flex"><Filter className="w-4 h-4 mr-2" /> Filtros</Button>
            <Button variant="primary" onClick={() => setModalType("qr_gen")}>
               <QrCode className="w-4 h-4 mr-2 inline" /> Generar Fichas QR
            </Button>
          </div>
        </header>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
           <Card className="p-4 bg-white border-l-4 border-l-blue-500">
              <p className="text-xs font-bold text-slate-500 uppercase">Val. Pendiente</p>
              <p className="text-2xl font-bold text-slate-800">12</p>
           </Card>
           <Card className="p-4 bg-white border-l-4 border-l-purple-500">
              <p className="text-xs font-bold text-slate-500 uppercase">Analizando IA</p>
              <p className="text-2xl font-bold text-slate-800">3</p>
           </Card>
           <Card className="p-4 bg-white border-l-4 border-l-amber-500">
              <p className="text-xs font-bold text-slate-500 uppercase">Observados</p>
              <p className="text-2xl font-bold text-slate-800">5</p>
           </Card>
           <Card className="p-4 bg-white border-l-4 border-l-emerald-500">
              <p className="text-xs font-bold text-slate-500 uppercase">Validados Hoy</p>
              <p className="text-2xl font-bold text-slate-800">24</p>
           </Card>
        </div>

        <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/40">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider">
                       <th className="p-4 font-bold border-b border-slate-200">Ayllu & Detalles</th>
                       <th className="p-4 font-bold border-b border-slate-200 hidden sm:table-cell">Archivo</th>
                       <th className="p-4 font-bold border-b border-slate-200">Estado Entrega</th>
                       <th className="p-4 font-bold border-b border-slate-200 hidden md:table-cell">Sug. IA</th>
                       <th className="p-4 font-bold border-b border-slate-200 text-right">Acción</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 bg-white">
                    {entregas.map(entrega => (
                       <tr key={entrega.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                             <p className="font-bold text-slate-900">{entrega.ayllu}</p>
                             <p className="text-xs text-slate-500 truncate max-w-[200px]">{entrega.mision} • {entrega.aula}</p>
                             <p className="text-xs text-slate-400 mt-1">{entrega.fecha}</p>
                          </td>
                          <td className="p-4 hidden sm:table-cell">
                             <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-100 px-2 py-1 rounded inline-flex">
                                <FileText className="w-4 h-4 text-slate-400" />
                                <span className="truncate max-w-[120px]">{entrega.archivo}</span>
                             </div>
                          </td>
                          <td className="p-4">
                             {getEstadoBadge(entrega.estado)}
                          </td>
                          <td className="p-4 hidden md:table-cell">
                             <span className={`text-sm font-bold ${entrega.estado === 'analizando' ? 'text-slate-400' : 'text-purple-600'}`}>
                                {entrega.iaLevel}
                             </span>
                          </td>
                          <td className="p-4 text-right space-x-2 whitespace-nowrap">
                             {entrega.estado === 'validacion_pendiente' ? (
                                <Button size="sm" variant="primary" onClick={() => { setSelectedEntrega(entrega); setModalType("validation"); }}>Validar IA</Button>
                             ) : entrega.estado === 'observado' ? (
                                <Button size="sm" variant="outline" onClick={() => { setSelectedEntrega(entrega); setModalType("validation"); }}>Revisar Corrección</Button>
                             ) : (
                                <Button size="sm" variant="ghost" className="text-slate-500" onClick={() => { setSelectedEntrega(entrega); setModalType("validation"); }}>Ver Detalles</Button>
                             )}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </Card>

        {/* Modal de Validación Docente */}
        {selectedEntrega && (
           <Modal isOpen={modalType === "validation"} onClose={() => {setModalType(null); setSelectedEntrega(null)}} title="Validación de Entrega" width="max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Lado Izquierdo: Archivo */}
                 <div className="bg-slate-100 rounded-xl flex items-center justify-center min-h-[300px] border border-slate-200 p-4">
                    <div className="text-center">
                       <FileCheck className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                       <p className="font-bold text-slate-700">{selectedEntrega.archivo}</p>
                       <p className="text-sm text-slate-500 mb-4">Vista previa de la evidencia subida.</p>
                       <Button variant="outline" size="sm">Descargar / Abrir Archivo</Button>
                    </div>
                 </div>

                 {/* Lado Derecho: Análisis y Validación */}
                 <div className="space-y-6">
                    <div className="border border-purple-200 bg-purple-50 rounded-xl p-4 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-2 opacity-10">
                          <Bot className="w-20 h-20" />
                       </div>
                       <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2"><Bot className="w-5 h-5"/> Análisis IA Preliminar</h3>
                       
                       {selectedEntrega.iaFeedback ? (
                          <div className="space-y-3 relative z-10 text-sm">
                             <div>
                                <span className="font-bold text-slate-800 text-xs uppercase block mb-1">Compleción estimada: {selectedEntrega.iaFeedback.completitud}%</span>
                                <div className="w-full bg-purple-200 h-1.5 rounded-full overflow-hidden">
                                   <div className="bg-purple-600 h-full rounded-full" style={{width: `${selectedEntrega.iaFeedback.completitud}%`}}></div>
                                </div>
                             </div>
                             <div>
                                <span className="font-bold text-emerald-700 text-xs uppercase block mb-1"><CheckCircle className="w-3 h-3 inline mr-1" />Logros Detectados</span>
                                <ul className="list-disc pl-4 text-emerald-900 text-xs space-y-1">
                                   {selectedEntrega.iaFeedback.logros.map((l, i) => <li key={i}>{l}</li>)}
                                </ul>
                             </div>
                             <div>
                                <span className="font-bold text-amber-700 text-xs uppercase block mb-1"><AlertCircle className="w-3 h-3 inline mr-1" />Dificultades / Faltantes</span>
                                <ul className="list-disc pl-4 text-amber-900 text-xs space-y-1">
                                   {selectedEntrega.iaFeedback.dificultades.map((l, i) => <li key={i}>{l}</li>)}
                                </ul>
                             </div>
                             <div className="pt-2 border-t border-purple-100 flex justify-between items-center">
                                <span className="font-bold text-purple-900">Nivel Sugerido CNEB:</span>
                                <Badge variant="purple">{selectedEntrega.iaLevel}</Badge>
                             </div>
                          </div>
                       ) : (
                          <div className="text-sm text-purple-700 italic">El archivo no tiene análisis disponible o está siendo procesado actualmente.</div>
                       )}
                    </div>

                    <div className="space-y-4">
                       <h3 className="font-bold text-slate-800">Acción Docente</h3>
                       <p className="text-xs text-slate-500 italic">"La IA analiza y sugiere. El docente valida."</p>
                       
                       <div className="space-y-3">
                          <label className="block text-sm font-bold text-slate-700">Retroalimentación final al Ayllu:</label>
                          <textarea className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-yachay-earth)]" rows={3} placeholder="Agrega comentarios o sugerencias de corrección..."></textarea>
                       </div>

                       <div className="grid grid-cols-2 gap-3 pt-2">
                          <Button variant="outline" className="w-full text-amber-600 border-amber-200 hover:bg-amber-50" onClick={() => handleValidate('observado')}>
                             <RefreshCw className="w-4 h-4 mr-2" /> Devolver para Mejora
                          </Button>
                          <Button variant="primary" className="w-full" onClick={() => handleValidate('completado')}>
                             <CheckCircle className="w-4 h-4 mr-2" /> Validar y Aprobar
                          </Button>
                       </div>
                    </div>
                 </div>
              </div>
           </Modal>
        )}

        {/* Modal de Generación de Fichas */}
        <Modal isOpen={modalType === "qr_gen"} onClose={() => setModalType(null)} title="Generador de Fichas con QR">
           <div className="space-y-4 text-center">
             <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4 border-2 border-slate-200 shadow-inner">
                <QrCode className="w-10 h-10 text-slate-600" />
             </div>
             <p className="text-slate-700 text-sm mb-6 pb-4 border-b border-slate-100">
               El sistema generará automáticamente archivos PDF imprimibles para cada uno de los Ayllus de esta aula. Cada ficha contendrá un Código QR único asociado al equipo para que suban sus evidencias finales con un escaneo directo.
             </p>

             <div className="space-y-3 text-left bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <label className="font-bold text-slate-700 block">1. Seleccionar Misión</label>
                <select className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-[var(--color-yachay-earth)]">
                   <option>Misión: Guardianes del Agua</option>
                   <option>Misión: Botánica Local</option>
                </select>

                <label className="font-bold text-slate-700 block pt-3">2. Seleccionar Aula</label>
                <select className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-[var(--color-yachay-earth)]">
                   <option>3° Secundaria A - CyT (5 Ayllus)</option>
                   <option>3° Secundaria B - CyT (4 Ayllus)</option>
                </select>
             </div>

             <div className="pt-4 flex gap-3">
               <Link to="/entregar/huallaga-123" target="_blank" className="flex-1 text-sm pt-2 text-[var(--color-yachay-earth)] hover:underline">Ver vista QR de ejemplo</Link>
               <Button className="flex-1" onClick={handleGeneratePDFs}>Generar y Descargar PDF Test</Button>
             </div>
           </div>
        </Modal>
      </div>
   )
}
