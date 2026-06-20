import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, MessageCircle, Star } from "lucide-react";
import { Button, Card, Badge } from "../ui";
import TestimonialModal from "./TestimonialModal";
import TestimonialFormModal from "./TestimonialFormModal";

// Type definition
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution: string;
  region: string;
  area: string;
  education_level: string;
  quote: string;
  photo_url?: string;
  rating?: number;
  status: string;
  label: string;
  consent_display: boolean;
  consent_full_name?: boolean;
  featured: boolean;
  created_at: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<string>("Todos");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetch("/api/testimonials")
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error("Error fetching testimonials", err));
  }, []);

  const getProfileFilter = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes("docente")) return "Docentes";
    if (r.includes("estudiante")) return "Estudiantes";
    if (r.includes("director") || r.includes("coordinador")) return "Directivos";
    if (r.includes("padre") || r.includes("madre") || r.includes("familia")) return "Familias";
    if (r.includes("aliado") || r.includes("municipalidad")) return "Aliados";
    return "Otros";
  };

  const filteredTestimonials = testimonials.filter(t => 
     filter === "Todos" ? true : getProfileFilter(t.role) === filter
  );

  const nextSlide = () => {
     setCurrentIndex((prev) => (prev + 1) % Math.max(1, filteredTestimonials.length));
  };

  const prevSlide = () => {
     setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % Math.max(1, filteredTestimonials.length));
  };

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
           <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
              Voces que imaginan una <span className="text-[var(--color-yachay-earth)]">nueva forma de aprender</span>
           </h2>
           <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto text-balance">
              Docentes, estudiantes y comunidades educativas pueden usar YACHAYLLU para convertir el aula, el colegio y el territorio en experiencias reales de aprendizaje.
           </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 relative z-10">
           {["Todos", "Docentes", "Estudiantes", "Directivos", "Familias", "Aliados"].map(cat => (
              <button 
                 key={cat}
                 onClick={() => { setFilter(cat); setCurrentIndex(0); }}
                 className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-[var(--color-yachay-earth)] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}
              >
                 {cat}
              </button>
           ))}
        </div>

        {/* Carousel for Desktop / Grid for Mobile */}
        {filteredTestimonials.length > 0 ? (
           <div className="relative z-10 mb-12">
              {/* Desktop view (shows 3 items) */}
              <div className="hidden md:grid grid-cols-3 gap-6">
                 {filteredTestimonials.slice(currentIndex, currentIndex + 3).map((t, idx) => (
                    <TestimonialCard key={t.id} testimonial={t} onClick={() => setSelectedTestimonial(t)} />
                 ))}
                 {/* Fill empty spots if less than 3 */}
                 {filteredTestimonials.length < 3 && [...Array(3 - filteredTestimonials.length)].map((_, i) => (
                    <div key={`empty-${i}`} className="opacity-0 hidden lg:block"></div>
                 ))}
              </div>
              
              {/* Mobile view (shows 1 item) */}
              <div className="md:hidden flex flex-col items-center">
                 {filteredTestimonials[currentIndex] && (
                    <div className="w-full max-w-md">
                       <TestimonialCard testimonial={filteredTestimonials[currentIndex]} onClick={() => setSelectedTestimonial(filteredTestimonials[currentIndex])} />
                    </div>
                 )}
              </div>

              {/* Navigation Controls */}
              {filteredTestimonials.length > 1 && (
                 <div className="flex justify-center items-center gap-4 mt-8">
                    <button onClick={prevSlide} className="p-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-[var(--color-yachay-earth)] hover:border-[var(--color-yachay-earth)] transition-colors shadow-sm"><ChevronLeft className="w-6 h-6"/></button>
                    <div className="flex gap-2">
                       {filteredTestimonials.map((_, i) => (
                          <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex || (i >= currentIndex && i < currentIndex + 3 && window.innerWidth >= 768) ? 'bg-[var(--color-yachay-earth)] w-6' : 'bg-slate-300'}`}></div>
                       ))}
                    </div>
                    <button onClick={nextSlide} className="p-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-[var(--color-yachay-earth)] hover:border-[var(--color-yachay-earth)] transition-colors shadow-sm"><ChevronRight className="w-6 h-6"/></button>
                 </div>
              )}
           </div>
        ) : (
           <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto mb-12">
              No hay testimonios disponibles en esta categoría.
           </div>
        )}

        {/* Call to action & Ethical Note */}
        <div className="flex flex-col items-center gap-8 relative z-10">
           <Button variant="primary" onClick={() => setIsFormOpen(true)} className="h-12 px-8 text-base shadow-md group">
              <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Comparte tu experiencia con YACHAYLLU
           </Button>

           <p className="text-xs text-slate-400 max-w-2xl text-center italic mt-12 bg-white/50 p-4 rounded-xl border border-slate-100">
              Los testimonios marcados como "demo" representan escenarios de uso esperados durante la etapa MVP. Los testimonios reales serán publicados solo con autorización de sus participantes.
           </p>
        </div>

      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -ml-40 -mt-40 w-96 h-96 rounded-full bg-[var(--color-yachay-earth)]/5 blur-3xl z-0"></div>
      
      {/* Modals */}
      {selectedTestimonial && <TestimonialModal testimonial={selectedTestimonial} onClose={() => setSelectedTestimonial(null)} />}
      {isFormOpen && <TestimonialFormModal onClose={() => setIsFormOpen(false)} />}
    </section>
  );
}

function TestimonialCard({ testimonial, onClick }: { testimonial: Testimonial, onClick: () => void }) {
  const getLabelColor = (label: string) => {
     const l = label.toLowerCase();
     if (l.includes("demo") || l.includes("simulado") || l.includes("por validar") || l.includes("esperada")) return "bg-amber-100 text-amber-800 border-amber-200";
     return "bg-emerald-100 text-emerald-800 border-emerald-200";
  };

  const getInitials = (name: string) => {
     return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
     <Card className="h-full flex flex-col p-6 sm:p-8 cursor-pointer hover:shadow-xl hover:border-slate-300 transition-all border border-slate-200 bg-white group text-left relative" onClick={onClick}>
        <div className="absolute top-6 right-6 text-slate-100 group-hover:text-amber-100 transition-colors">
           <Quote className="w-12 h-12" fill="currentColor" />
        </div>
        
        <div className="flex items-center gap-4 mb-4 relative z-10">
           <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold overflow-hidden flex-shrink-0">
              {testimonial.photo_url ? (
                 <img src={testimonial.photo_url} alt={testimonial.name} className="w-full h-full object-cover" />
              ) : (
                 getInitials(testimonial.name)
              )}
           </div>
           <div>
              <h4 className="font-bold text-slate-900 leading-tight">{testimonial.name}</h4>
              <p className="text-sm text-slate-500 font-medium">{testimonial.role}</p>
              {(testimonial.institution || testimonial.region) && (
                 <p className="text-xs text-slate-400 mt-0.5">{testimonial.institution}{testimonial.institution && testimonial.region ? ' • ' : ''}{testimonial.region}</p>
              )}
           </div>
        </div>

        {testimonial.rating && (
           <div className="flex gap-1 mb-4 relative z-10">
              {[...Array(5)].map((_, i) => (
                 <Star key={i} className={`w-4 h-4 ${i < testimonial.rating! ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" />
              ))}
           </div>
        )}

        <div className="flex-1 relative z-10">
           <p className="text-slate-700 leading-relaxed italic line-clamp-4 group-hover:text-slate-900 transition-colors">"{testimonial.quote}"</p>
        </div>

        <div className="mt-6 flex items-center justify-between relative z-10 border-t border-slate-100 pt-4">
           <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wider ${getLabelColor(testimonial.label)}`}>
              {testimonial.label}
           </span>
           <span className="text-sm font-bold text-[var(--color-yachay-earth)] group-hover:translate-x-1 transition-transform inline-flex items-center">
              Leer más <ChevronRight className="w-4 h-4 ml-1" />
           </span>
        </div>
     </Card>
  );
}
