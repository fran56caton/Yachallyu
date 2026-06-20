import { X, Quote, Star } from "lucide-react";
import { Button } from "../ui";
import { Testimonial } from "./TestimonialsSection";

export default function TestimonialModal({ testimonial, onClose }: { testimonial: Testimonial, onClose: () => void }) {
  const getLabelColor = (label: string) => {
     const l = label.toLowerCase();
     if (l.includes("demo") || l.includes("simulado") || l.includes("por validar") || l.includes("esperada")) return "bg-amber-100 text-amber-800 border-amber-200";
     return "bg-emerald-100 text-emerald-800 border-emerald-200";
  };

  const getInitials = (name: string) => {
     return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
           
           <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className={`text-xs font-bold px-2 py-1 rounded border uppercase tracking-wider ${getLabelColor(testimonial.label)}`}>
                 {testimonial.label}
              </span>
              <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors">
                 <X className="w-5 h-5" />
              </button>
           </div>

           <div className="p-6 sm:p-10 overflow-y-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100 pb-8 mb-8 text-center sm:text-left">
                 <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-slate-500 font-bold text-2xl overflow-hidden flex-shrink-0">
                    {testimonial.photo_url ? (
                       <img src={testimonial.photo_url} alt={testimonial.name} className="w-full h-full object-cover" />
                    ) : (
                       getInitials(testimonial.name)
                    )}
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-slate-900">{testimonial.name}</h3>
                    {testimonial.rating && (
                       <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
                          {[...Array(5)].map((_, i) => (
                             <Star key={i} className={`w-4 h-4 ${i < testimonial.rating! ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" />
                          ))}
                       </div>
                    )}
                    <p className="text-lg text-[var(--color-yachay-earth-dark)] font-medium mt-1">{testimonial.role}</p>
                    <p className="text-slate-500 mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                       {testimonial.institution && <span>{testimonial.institution}</span>}
                       {testimonial.institution && testimonial.region && <span className="hidden sm:inline">•</span>}
                       {testimonial.region && <span>{testimonial.region}</span>}
                    </p>
                    {testimonial.area && testimonial.area !== 'General' && (
                       <div className="mt-3 inline-flex px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                          Área: {testimonial.area}
                       </div>
                    )}
                 </div>
              </div>

              <div className="relative">
                 <Quote className="absolute -top-4 -left-4 w-16 h-16 text-slate-100 -z-10" fill="currentColor"/>
                 <p className="text-xl sm:text-2xl text-slate-800 leading-relaxed italic relative z-10 font-medium">
                    "{testimonial.quote}"
                 </p>
              </div>
           </div>

           <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button variant="outline" onClick={onClose} className="bg-white">Cerrar</Button>
           </div>
        </div>
     </div>
  );
}
