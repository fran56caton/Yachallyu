import { useState, useEffect } from "react";
import { Badge, Button, Card } from "../../components/ui";
import { Check, X, Star, Eye, Trash2, Edit } from "lucide-react";
import { Testimonial } from "../../components/testimonials/TestimonialsSection";

export default function AdminTestimonialsTable() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = () => {
    fetch("/api/testimonials/all")
      .then(res => res.json())
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching testimonials", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const updateStatus = async (id: string, action: 'approve' | 'reject') => {
     try {
        const res = await fetch(`/api/testimonials/${id}/${action}`, {
           method: 'PATCH',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ label: action === 'approve' ? 'Validado' : '' })
        });
        if (res.ok) {
           fetchTestimonials();
        }
     } catch (err) {
        console.error(err);
     }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
     try {
        const res = await fetch(`/api/testimonials/${id}/feature`, {
           method: 'PATCH',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ featured: !currentFeatured })
        });
        if (res.ok) {
           fetchTestimonials();
        }
     } catch (err) {
        console.error(err);
     }
  };

  const deleteTestimonial = async (id: string) => {
     if(!confirm("¿Estás seguro de eliminar este testimonio?")) return;
     try {
        const res = await fetch(`/api/testimonials/${id}`, {
           method: 'DELETE'
        });
        if (res.ok) {
           fetchTestimonials();
        }
     } catch (err) {
        console.error(err);
     }
  };

  const statusColor = (status: string) => {
      switch(status) {
         case 'publicado': return 'green';
         case 'pendiente': return 'yellow';
         case 'rechazado': return 'red';
         default: return 'gray';
      }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-display font-bold text-slate-900">Gestión de Testimonios</h1>
        <p className="text-slate-600 mt-2">Revisa, aprueba y destaca los testimonios de la comunidad.</p>
      </header>

      <Card className="p-0 overflow-hidden">
         {loading ? (
            <div className="p-8 text-center text-slate-500">Cargando testimonios...</div>
         ) : (
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50 border-b border-slate-200">
                     <tr>
                        <th className="px-6 py-4 font-bold text-slate-700">Autor</th>
                        <th className="px-6 py-4 font-bold text-slate-700">Rol & Región</th>
                        <th className="px-6 py-4 font-bold text-slate-700">Testimonio</th>
                        <th className="px-6 py-4 font-bold text-slate-700">Estado</th>
                        <th className="px-6 py-4 font-bold text-slate-700">Destacado</th>
                        <th className="px-6 py-4 font-bold text-slate-700 text-right">Acciones</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {testimonials.map(t => (
                        <tr key={t.id} className="hover:bg-slate-50/50">
                           <td className="px-6 py-4">
                              <div className="font-medium text-slate-900">{t.name}</div>
                              <div className="text-xs text-slate-500">{new Date(t.created_at).toLocaleDateString()}</div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="text-slate-700">{t.role}</div>
                              <div className="text-xs text-slate-500">{t.region}</div>
                           </td>
                           <td className="px-6 py-4 max-w-xs truncate text-slate-600">
                              {t.quote}
                           </td>
                           <td className="px-6 py-4">
                              <Badge variant={statusColor(t.status)}>{t.status}</Badge>
                              {t.label && <div className="text-[10px] text-slate-400 mt-1 uppercase">{t.label}</div>}
                           </td>
                           <td className="px-6 py-4">
                              <button onClick={() => toggleFeatured(t.id, t.featured)} className={`p-1.5 rounded-full transition-colors ${t.featured ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:bg-slate-100'}`}>
                                 <Star className="w-4 h-4" fill={t.featured ? "currentColor" : "none"} />
                              </button>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                 {t.status === 'pendiente' && (
                                    <>
                                       <button onClick={() => updateStatus(t.id, 'approve')} className="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded" title="Aprobar"><Check className="w-4 h-4"/></button>
                                       <button onClick={() => updateStatus(t.id, 'reject')} className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded" title="Rechazar"><X className="w-4 h-4"/></button>
                                    </>
                                 )}
                                 <button onClick={() => alert("Ver detalles no implementado en MVP")} className="p-1.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded" title="Ver completo"><Eye className="w-4 h-4"/></button>
                                 <button onClick={() => deleteTestimonial(t.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Eliminar"><Trash2 className="w-4 h-4"/></button>
                              </div>
                           </td>
                        </tr>
                     ))}
                     {testimonials.length === 0 && (
                        <tr>
                           <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No hay testimonios.</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         )}
      </Card>
    </div>
  );
}
