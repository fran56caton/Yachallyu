import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, Badge, Modal } from "../components/ui";
import { Upload, Camera, FileText, CheckCircle, AlertCircle, Bot, Zap, ChevronLeft, Image as ImageIcon } from "lucide-react";

const mockMissions = {
  "huallaga-123": {
    mission: "Guardianes del Agua",
    ayllu: "Ayllu Huallaga",
    aula: "3° Secundaria A - CyT",
    docente: "Docente Demo",
    competencia: "Indaga mediante métodos científicos...",
    estudiantes: [
      { id: 1, nombre: "Alania Franco" },
      { id: 2, nombre: "Ríos Ana" },
      { id: 3, nombre: "López Carlos" },
      { id: 4, nombre: "Torres María" }
    ]
  }
};

export default function QRDeliveryPage() {
  const { token } = useParams<{ token: string }>();
  const data = mockMissions[(token as keyof typeof mockMissions)] || mockMissions["huallaga-123"];

  const [step, setStep] = useState<"idle" | "upload" | "analyzing" | "result">("idle");
  const [file, setFile] = useState<File | null>(null);
  const [participation, setParticipation] = useState<Record<number, string>>({});
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleParticipationChange = (id: number, level: string) => {
    setParticipation(prev => ({ ...prev, [id]: level }));
  };

  const handleSubmit = () => {
    if (!file) return;
    setStep("upload");
    
    // Simulate upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setStep("analyzing");
        setTimeout(() => {
          setStep("result");
        }, 3000);
      }
    }, 500);
  };

  if (!data) {
    return <div className="p-8 text-center">Token inválido o misión no encontrada.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-[var(--color-yachay-earth)] text-white p-4 shadow-md sticky top-0 z-10 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-white text-[var(--color-yachay-earth)] font-bold flex items-center justify-center">Y</div>
            <span className="font-display font-bold text-lg">YACHAYLLU</span>
         </div>
         <Badge variant="blue" className="bg-white/20 text-white border-none">Entrega QR</Badge>
      </header>

      <main className="flex-1 max-w-lg w-full mx-auto p-4 space-y-6 pb-20">
        
        {/* INFO TARJETA PRECARGADA */}
        <Card className="p-5 border-t-4 border-t-[var(--color-yachay-earth)] shadow-sm">
           <h2 className="text-xl font-bold text-slate-900 leading-tight mb-4">{data.mission}</h2>
           
           <div className="space-y-3 text-sm">
             <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
               <span className="text-slate-500 font-medium">Ayllu:</span>
               <span className="font-bold text-slate-800">{data.ayllu}</span>
             </div>
             <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
               <span className="text-slate-500 font-medium">Aula:</span>
               <span className="font-bold text-slate-800">{data.aula}</span>
             </div>
             <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
               <span className="text-slate-500 font-medium">Docente:</span>
               <span className="font-bold text-slate-800">{data.docente}</span>
             </div>
           </div>
        </Card>

        {step === "idle" && (
          <div className="space-y-6 fade-in">
             {/* SUBIDA DE ARCHIVOS */}
             <Card className="p-5 border-2 border-dashed border-slate-300 bg-white hover:border-[var(--color-yachay-earth)] transition-colors">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-orange-50 text-[var(--color-yachay-earth)] rounded-full flex items-center justify-center mx-auto">
                     <Camera className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Sube la Evidencia de tu Ayllu</h3>
                    <p className="text-sm text-slate-500 mt-1">Toma una foto clara a la ficha o sube un archivo PDF/JPG.</p>
                  </div>
                  
                  {file ? (
                     <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-center justify-between text-left">
                        <div className="flex items-center gap-2 overflow-hidden">
                           <ImageIcon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                           <span className="text-sm font-bold text-emerald-800 truncate">{file.name}</span>
                        </div>
                        <button onClick={() => setFile(null)} className="text-xs text-red-500 font-bold px-2">Cambiar</button>
                     </div>
                  ) : (
                     <div className="flex flex-col gap-3">
                        <label className="w-full relative">
                          <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileChange} />
                          <div className="w-full py-3 bg-[var(--color-yachay-earth)] text-white rounded-lg font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--color-yachay-earth-dark)] transition-colors">
                             <Camera className="w-5 h-5" /> Tomar Foto o Elegir Archivo
                          </div>
                        </label>
                     </div>
                  )}
                </div>
             </Card>

             {/* PARTICIPACION */}
             {file && (
                <Card className="p-5 slide-in-bottom">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">Confirma Participación</h3>
                  <p className="text-xs text-slate-500 mb-4 bg-amber-50 p-2 rounded-lg border border-amber-100 italic">Marca el nivel de participación de cada integrante en esta misión. El docente lo validará.</p>
                  
                  <div className="space-y-3">
                     {data.estudiantes.map(est => (
                        <div key={est.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                           <p className="font-bold text-sm text-slate-800 mb-2">{est.nombre}</p>
                           <select 
                              className="w-full text-sm p-2 border border-slate-300 rounded focus:outline-none focus:border-[var(--color-yachay-earth)] bg-white"
                              value={participation[est.id] || ""}
                              onChange={(e) => handleParticipationChange(est.id, e.target.value)}
                           >
                              <option value="" disabled>Selecciona nivel...</option>
                              <option value="bastante">Participó bastante</option>
                              <option value="parcial">Participó parcialmente</option>
                              <option value="poco">Participó poco</option>
                              <option value="ausente">No participó / Ausente</option>
                           </select>
                        </div>
                     ))}
                  </div>

                  <div className="mt-6">
                     <label className="text-sm font-bold text-slate-700 block mb-2">Comentario del equipo (opcional)</label>
                     <textarea rows={3} placeholder="¿Qué fue lo más interesante o difícil de la misión?" className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-yachay-earth)] text-sm"></textarea>
                  </div>

                  <Button variant="primary" className="w-full mt-6 h-12 text-lg shadow-lg shadow-[var(--color-yachay-earth)]/30" onClick={handleSubmit}>
                    Enviar Evidencia del Ayllu
                  </Button>
                </Card>
             )}
          </div>
        )}

        {step === "upload" && (
           <Card className="p-8 text-center space-y-6 fade-in mt-10">
              <div className="relative w-24 h-24 mx-auto">
                 <svg className="animate-spin w-full h-full text-slate-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="var(--color-yachay-earth)"></path>
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center font-bold text-[var(--color-yachay-earth)] text-xl">
                    {uploadProgress}%
                 </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Subiendo archivo...</h3>
                <p className="text-sm text-slate-500 mt-2">Por favor no cierres esta página.</p>
              </div>
           </Card>
        )}

        {step === "analyzing" && (
           <Card className="p-8 text-center space-y-6 fade-in mt-10 border-blue-200 bg-blue-50">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                 <Bot className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 border-b border-blue-200 pb-2 mb-2">IA Analizando Ficha</h3>
                <p className="text-sm text-blue-700">Evaluando respuestas y coherencia según la rúbrica de la misión...</p>
                <div className="mt-4 flex flex-col gap-2 text-xs text-blue-600 text-left bg-white p-3 rounded border border-blue-100">
                   <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> OCR Finalizado: Extraído texto</div>
                   <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> Análisis de rúbrica en proceso...</div>
                </div>
              </div>
           </Card>
        )}

        {step === "result" && (
           <div className="space-y-6 fade-in">
              <div className="text-center bg-emerald-50 border border-emerald-200 rounded-2xl p-6 shadow-sm">
                 <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                 </div>
                 <h2 className="text-2xl font-bold text-emerald-900 mb-1">¡Evidencia Entregada!</h2>
                 <p className="text-sm text-emerald-700">Se ha notificado al docente. Panel del Ayllu actualizado.</p>
              </div>

              <Card className="p-5 border-purple-200 bg-gradient-to-b from-white to-purple-50">
                 <div className="flex items-center gap-2 mb-4">
                    <Bot className="w-6 h-6 text-purple-600" />
                    <h3 className="font-bold text-purple-900">Análisis Preliminar IA</h3>
                 </div>
                 <p className="text-xs font-bold uppercase text-purple-500 mb-3 tracking-wider border-b border-purple-100 pb-2">Requiere validación docente</p>
                 
                 <div className="space-y-4 text-sm">
                    <div>
                       <span className="font-bold text-slate-800 flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-500" /> Logro Principal:</span>
                       <p className="text-slate-600 pl-5">Identificaron correctamente los contaminantes del agua local y plantearon una hipótesis sólida.</p>
                    </div>
                    <div>
                       <span className="font-bold text-slate-800 flex items-center gap-1"><AlertCircle className="w-4 h-4 text-amber-500" /> Oportunidad de Mejora:</span>
                       <p className="text-slate-600 pl-5">Falta justificar la conclusión con los datos registrados en la tabla de observación.</p>
                    </div>
                 </div>

                 <div className="mt-4 pt-4 border-t border-purple-100">
                    <Badge variant="purple" className="w-full justify-center py-1.5 text-sm">Nivel Sugerido: EN PROCESO</Badge>
                 </div>
              </Card>

              <Link to="/student" className="block w-full text-center py-3 bg-white border border-slate-300 rounded-lg font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                 Ir a mi panel de estudiante
              </Link>
           </div>
        )}
      </main>
    </div>
  );
}
