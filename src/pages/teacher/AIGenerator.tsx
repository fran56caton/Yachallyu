import { useState } from "react";
import { Copy, Sparkles, AlertCircle, Save, Check, RefreshCw } from "lucide-react";
import { Button, Card, Badge } from "../../components/ui";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function AIGenerator() {
  const [loading, setLoading] = useState(false);
  const [mission, setMission] = useState<any>(null);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    area: "Ciencia y Tecnología",
    grade: "3° Secundaria",
    topic: "El ciclo del agua y su impacto local",
    context: "Río Huallaga, contaminación local",
    difficulty: "Intermedio"
  });

  const handleGenerate = async () => {
    setLoading(true);
    setSaved(false);
    try {
      // Simulate API call or enhanced fallback
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMission({
        title: `Misión: Exploradores de ${formData.topic}`,
        narrative: `Nuestra comunidad necesita entender mejor el impacto de ${formData.topic} en nuestro entorno, específicamente en ${formData.context}. Nos enfrentamos a una situación crítica que requiere indagación científica y propuestas de solución. Ustedes han sido elegidos como el equipo investigador oficial de YACHAYLLU para esta tarea.`,
        purpose: "Comprender y analizar el problema local mediante la recolección de datos reales para generar propuestas viables, aplicando métodos científicos.",
        competency: "Indaga mediante métodos científicos para construir sus conocimientos.",
        capabilities: [
          "Problematiza situaciones para hacer indagación.",
          "Diseña estrategias para hacer indagación.",
          "Genera y registra datos o información.",
          "Analiza datos e información."
        ],
        roles: [
          { name: "Coordinador", desc: "Verifica tiempos y cumplimiento de tareas." },
          { name: "Investigador", desc: "Explora la zona / bibliografía en busca de datos clave." },
          { name: "Registrador", desc: "Anota y toma evidencias fotográficas para la ficha." },
          { name: "Vocero", desc: "Sintetiza la conclusión y la presenta a la clase." }
        ],
        activities: [
          "1. Activación (15m): Discutir en equipo la narrativa y organizar roles.",
          "2. Exploración (40m): Salida de campo o análisis de casos reales sobre " + formData.context + ".",
          "3. Estructuración (20m): Llenar la ficha de recolección de datos y responder las preguntas centrales.",
          "4. Evaluación (15m): Redactar la conclusión y propuesta grupal. Escanear el QR y subir el PDF/Foto."
        ],
        evidence: "Ficha física o digital completada con respuestas argumentadas, evidencia fotográfica opcional, subida a través de la Entrega QR Inteligente.",
        rubric: [
          { crit: "Manejo de Datos", niv: "Interpreta adecuadamente la información de campo." },
          { crit: "Propuesta", niv: "Plantea una solución alineada al problema de " + formData.context + "." }
        ],
        warning: "La IA propone. El docente valida."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!mission) return;
    
    const newMissionToSave = {
       title: mission.title,
       grade: formData.grade,
       type: formData.area,
       status: "Borrador",
       desc: mission.narrative,
       fullData: mission
    };

    const existingMissions = JSON.parse(localStorage.getItem('yachayllu_missions') || '[]');
    existingMissions.unshift(newMissionToSave);
    localStorage.setItem('yachayllu_missions', JSON.stringify(existingMissions));
    
    setSaved(true);
    setTimeout(() => {
       navigate("/teacher/missions");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="blue"><Sparkles className="w-3 h-3 mr-1 inline" /> Asistente IA</Badge>
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Generador de Misiones</h1>
        <p className="text-slate-600 mt-1 max-w-2xl text-balance">
          Diseña experiencias de aprendizaje conectadas al currículo y al entorno de tus estudiantes en segundos.
        </p>
      </header>

      <div className="grid md:grid-cols-12 gap-6 items-start">
        {/* Form Column */}
        <div className="md:col-span-5 space-y-4 sticky top-6">
          <Card className="p-5 relative overflow-hidden bg-white max-h-[80vh] overflow-y-auto">
             <div className="space-y-4 relative z-10">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Área Curricular</label>
                 <select 
                   value={formData.area}
                   onChange={e => setFormData({...formData, area: e.target.value})}
                   className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-[var(--color-yachay-earth)] focus:border-[var(--color-yachay-earth)] bg-white"
                 >
                   <option>Ciencia y Tecnología</option>
                   <option>Ciencias Sociales</option>
                   <option>Comunicación</option>
                   <option>Matemática</option>
                   <option>Educación para el Trabajo</option>
                   <option>Desarrollo Personal, Ciudadanía y Cívica</option>
                 </select>
               </div>

               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Grado</label>
                 <select 
                    value={formData.grade}
                    onChange={e => setFormData({...formData, grade: e.target.value})}
                    className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-[var(--color-yachay-earth)] focus:border-[var(--color-yachay-earth)] bg-white"
                  >
                   <option>1° Secundaria</option>
                   <option>2° Secundaria</option>
                   <option>3° Secundaria</option>
                   <option>4° Secundaria</option>
                   <option>5° Secundaria</option>
                 </select>
               </div>

               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Tema Principal</label>
                 <input 
                   type="text" 
                   value={formData.topic}
                   onChange={e => setFormData({...formData, topic: e.target.value})}
                   placeholder="Ej: El ciclo del agua..."
                   className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-[var(--color-yachay-earth)] focus:border-[var(--color-yachay-earth)] bg-white"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Contexto Local / Territorial (Importante)</label>
                 <textarea 
                   rows={3} 
                   value={formData.context}
                   onChange={e => setFormData({...formData, context: e.target.value})}
                   placeholder="Ej: El río Huallaga frente al colegio..."
                   className="w-full rounded-lg border-slate-300 border p-2.5 text-sm focus:ring-[var(--color-yachay-earth)] focus:border-[var(--color-yachay-earth)] bg-white resize-none"
                 />
               </div>

               <Button 
                onClick={handleGenerate} 
                disabled={loading}
                variant="primary" 
                className="w-full mt-2 py-6 text-md font-bold"
               >
                 {loading ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : <Sparkles className="w-5 h-5 mr-2" />}
                 {loading ? "Generando Ficha..." : "Generar Ficha Completa"}
               </Button>
            </div>
          </Card>
          
          <div className="flex items-start gap-3 p-4 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 shadow-sm">
             <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
             <div className="text-sm">
               <span className="font-bold block">La IA propone. El docente valida.</span>
               Verifica siempre la alineación curricular antes de asignar y generar los códigos QR para el Ayllu.
             </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="md:col-span-7 h-full">
           <AnimatePresence mode="wait">
             {!mission && !loading && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="h-full min-h-[500px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-50/50"
               >
                 <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                   <Sparkles className="w-8 h-8" />
                 </div>
                 <h3 className="font-medium text-slate-700 mb-1">Esperando Parámetros</h3>
                 <p className="max-w-xs text-sm text-balance">Completa los datos de la izquierda y presiona "Generar Ficha Completa".</p>
               </motion.div>
             )}

             {loading && (
                <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="h-full min-h-[500px] rounded-xl flex flex-col items-center justify-center p-8 text-center"
               >
                 <div className="w-20 h-20 relative mb-6">
                    <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[var(--color-yachay-earth)] rounded-full border-t-transparent animate-spin"></div>
                 </div>
                 <p className="text-[var(--color-yachay-earth)] font-bold text-lg mb-2">Generando Estructura Pedagógica</p>
                 <div className="space-y-2 text-sm text-slate-500 text-left bg-white p-4 rounded-xl border border-slate-200 shadow-sm max-w-sm w-full mx-auto">
                    <p className="flex items-center gap-2"><span>Buscando datos...</span></p>
                 </div>
               </motion.div>
             )}

             {mission && !loading && (
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border text-left border-slate-200 rounded-xl shadow-md overflow-hidden"
               >
                 <div className="bg-[var(--color-yachay-bg)] px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm bg-white/90">
                    <Badge variant="green" className="shadow-sm">Misión Extendida Generada</Badge>
                    <div className="flex gap-2">
                       {saved ? (
                           <Button variant="outline" className="h-9 px-4 text-emerald-600 border-emerald-200 bg-emerald-50"><Check className="w-4 h-4 mr-2"/> Guardado en Misiones</Button>
                       ) : (
                           <Button variant="primary" className="h-9 px-4 font-bold shadow-md" onClick={handleSave}><Save className="w-4 h-4 mr-2"/> Guardar Misión</Button>
                       )}
                    </div>
                 </div>

                 <div className="p-8 space-y-8">
                    <div>
                       <h2 className="text-3xl font-display font-bold text-slate-900 leading-tight">{mission.title}</h2>
                       <div className="flex gap-2 mt-3">
                          <Badge variant="gray" className="text-sm px-3 py-1 bg-slate-100">{formData.area}</Badge>
                          <Badge variant="gray" className="text-sm px-3 py-1 bg-slate-100">{formData.grade}</Badge>
                       </div>
                    </div>

                    <div className="bg-indigo-50/50 p-5 rounded-xl border-l-4 border-l-indigo-500">
                       <h3 className="text-lg font-bold text-indigo-900 mb-2">Narrativa del Desafío (El 'Gancho')</h3>
                       <p className="text-indigo-800 italic leading-relaxed">"{mission.narrative}"</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Propósito de Aprendizaje</h3>
                            <p className="text-slate-800 text-sm">{mission.purpose}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Competencia Principal</h3>
                            <p className="text-slate-800 text-sm font-medium">{mission.competency}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">Capacidades Movilizadas</h3>
                        <ul className="list-disc pl-5 space-y-1 text-slate-700 text-sm">
                            {mission.capabilities?.map((cap: string, i: number) => (
                                <li key={i}>{cap}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">Roles para el Ayllu (Trabajo Colaborativo)</h3>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            {mission.roles?.map((role: any, i: number) => (
                                <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                    <span className="font-bold text-[var(--color-yachay-earth)] text-sm">{role.name}</span>
                                    <p className="text-xs text-slate-600 mt-1">{role.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">Secuencia Didáctica de la Ficha</h3>
                        <div className="space-y-3">
                            {mission.activities?.map((act: string, i: number) => (
                                <div key={i} className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i+1}</div>
                                    <p className="text-sm text-slate-700 leading-relaxed">{act.replace(/^\d+\.\s*/, '')}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl">
                       <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Entregable Final (Para QR)</h3>
                       <p className="text-emerald-900 text-sm font-medium">{mission.evidence}</p>
                    </div>

                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
