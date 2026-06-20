import { useState } from "react";
import { X, CheckCircle, AlertTriangle, Star } from "lucide-react";
import { Button } from "../ui";

export default function TestimonialFormModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
     name: "",
     role: "",
     institution: "",
     region: "",
     area: "General",
     education_level: "Secundaria",
     quote: "",
     photo_url: "",
     rating: 5,
     consent_display: true,
     consent_full_name: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
     setError("");
     try {
        const res = await fetch("/api/testimonials", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error("Error enviando testimonio");
        setStep(3); // Success step
     } catch (err: any) {
        setError(err.message || "Ocurrió un error.");
     } finally {
        setLoading(false);
     }
  };

  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
           
           <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg">Comparte tu experiencia</h3>
              <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-600 rounded-lg transition-colors">
                 <X className="w-5 h-5" />
              </button>
           </div>

           <div className="p-6 overflow-y-auto">
              {step === 1 && (
                 <form onSubmit={() => setStep(2)} className="space-y-4">
                    <div className="text-sm text-slate-600 mb-6">Estamos construyendo YACHAYLLU para transformar la educación. Cuéntanos qué impacto crees que tendría en tu comunidad o cómo la usarías.</div>
                    
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-700">Nombre completo</label>
                       <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none" placeholder="Ej. María Sánchez" />
                    </div>

                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-700">Tu Rol</label>
                       <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none bg-white">
                          <option value="">Selecciona tu rol...</option>
                          <option value="Docente">Docente</option>
                          <option value="Docente rural">Docente Rural</option>
                          <option value="Estudiante de secundaria">Estudiante de secundaria</option>
                          <option value="Estudiante preuniversitario">Estudiante preuniversitario</option>
                          <option value="Director de institución educativa">Director de institución educativa</option>
                          <option value="Coordinador académico">Coordinador académico</option>
                          <option value="Madre/Padre de familia">Madre/Padre de familia</option>
                          <option value="Aliado educativo">Aliado educativo</option>
                       </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700">Institución Educativa (Opcional)</label>
                          <input type="text" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none" placeholder="I.E. 1234" />
                       </div>
                       <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700">Región</label>
                          <input required type="text" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none" placeholder="Ej. Cusco" />
                       </div>
                    </div>
                    
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-700">URL de Foto de Perfil (Opcional)</label>
                       <input type="url" value={formData.photo_url} onChange={e => setFormData({...formData, photo_url: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none" placeholder="https://..." />
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end gap-2">
                       <Button type="button" variant="ghost" onClick={onClose} className="text-sm">Cancelar</Button>
                       <Button type="button" variant="primary" onClick={() => {
                          if(formData.name && formData.role && formData.region) setStep(2);
                       }} className="text-sm shadow-sm" disabled={!formData.name || !formData.role || !formData.region}>Continuar</Button>
                    </div>
                 </form>
              )}

              {step === 2 && (
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-700">Valoración</label>
                       <div className="flex gap-1">
                          {[1,2,3,4,5].map(val => (
                             <button type="button" key={val} onClick={() => setFormData({...formData, rating: val})} className="p-1 transition-colors">
                                <Star className={`w-6 h-6 ${val <= formData.rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" />
                             </button>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-700">Tu Testimonio / Opinión</label>
                       <p className="text-xs text-slate-500 mb-2">¿Cómo imaginas que YACHAYLLU impactaría tu experiencia educativa?</p>
                       <textarea required rows={5} value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none resize-none" placeholder="Me gustaría usar esta plataforma porque..." />
                    </div>

                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 mt-4">
                       <h4 className="text-xs font-bold text-amber-800 mb-2">Permisos de publicación</h4>
                       <label className="flex items-start gap-2 mb-2 cursor-pointer">
                          <input type="checkbox" checked={formData.consent_display} onChange={e => setFormData({...formData, consent_display: e.target.checked})} className="mt-1 accent-amber-600" />
                          <span className="text-xs text-amber-900 leading-tight">Autorizo que mi testimonio sea mostrado públicamente en la landing page de YACHAYLLU.</span>
                       </label>
                       <label className="flex items-start gap-2 cursor-pointer">
                          <input type="checkbox" checked={formData.consent_display && formData.consent_full_name} onChange={e => setFormData({...formData, consent_full_name: e.target.checked})} disabled={!formData.consent_display} className="mt-1 accent-amber-600" />
                          <span className={`text-xs leading-tight ${!formData.consent_display ? 'text-amber-900/50' : 'text-amber-900'}`}>Mostrar mi nombre completo (si se desmarca, se usarán solo iniciales y primer nombre).</span>
                       </label>
                    </div>

                    {error && (
                       <div className="text-red-600 text-xs flex items-center gap-1"><AlertTriangle className="w-4 h-4"/> {error}</div>
                    )}

                    <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between gap-2">
                       <Button type="button" variant="outline" onClick={() => setStep(1)} className="text-sm bg-white">Atrás</Button>
                       <Button type="submit" variant="primary" className="text-sm shadow-sm" disabled={loading || !formData.quote}>
                          {loading ? "Enviando..." : "Enviar Testimonio"}
                       </Button>
                    </div>
                 </form>
              )}

              {step === 3 && (
                 <div className="py-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                       <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">¡Gracias por tu aporte!</h3>
                    <p className="text-slate-600 text-sm max-w-sm mb-8">
                       Tu testimonio ha sido enviado exitosamente y se encuentra <strong>Pendiente de revisión</strong>. 
                       Un administrador lo revisará antes de publicarlo.
                    </p>
                    <Button variant="outline" onClick={onClose} className="w-full max-w-xs">Cerrar</Button>
                 </div>
              )}
           </div>
        </div>
     </div>
  );
}
