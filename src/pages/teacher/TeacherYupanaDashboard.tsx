import { useState } from "react";
import { Users, FileText, Activity, AlertTriangle, Eye, Download } from "lucide-react";
import { Card, Badge, Button } from "../../components/ui";

export default function TeacherYupanaDashboard() {
   const stats = [
      { label: "Estudiantes Activos", value: "24", icon: Users, color: "text-blue-600 bg-blue-50" },
      { label: "Evidencias Guardadas", value: "142", icon: FileText, color: "text-emerald-600 bg-emerald-50" },
      { label: "Tiempo Promedio", value: "8 min", icon: Activity, color: "text-purple-600 bg-purple-50" },
      { label: "Errores Frecuentes", value: "Valor Posicional", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" }
   ];

   const recentEvidences = [
      { id: "1", student: "María Quispe", module: "La Yupana Viva", target: "143", isCorrect: true, time: "4 min", level: "Logrado" },
      { id: "2", student: "Juan Pérez", module: "Reto Amauta", target: "248", isCorrect: false, time: "8 min", level: "En proceso" },
      { id: "3", student: "Ana Gómez", module: "Semillas que cuentan", target: "1325", isCorrect: true, time: "5 min", level: "Logrado" },
   ];

   return (
      <div className="space-y-6">
         <header className="mb-6">
            <h1 className="text-3xl font-display font-bold text-slate-900">Yupana Lab - Seguimiento</h1>
            <p className="text-slate-600 mt-2">Monitorea el progreso, la comprensión del valor posicional y las estrategias de cálculo de tus estudiantes.</p>
         </header>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
               <Card key={i} className="p-5 border border-slate-200 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                     <s.icon className="w-6 h-6" />
                  </div>
                  <div>
                     <div className="text-sm font-bold text-slate-500">{s.label}</div>
                     <div className="text-2xl font-black text-slate-900">{s.value}</div>
                  </div>
               </Card>
            ))}
         </div>

         <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
               <Card className="p-6 border-slate-200">
                  <div className="flex justify-between items-center mb-6">
                     <h2 className="text-lg font-bold text-slate-900">Últimas Evidencias</h2>
                     <Button variant="outline" className="text-xs bg-white"><Download className="w-4 h-4 mr-2"/> Exportar Excel</Button>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm text-slate-600">
                        <thead className="text-xs uppercase bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                           <tr>
                              <th className="px-4 py-3">Estudiante</th>
                              <th className="px-4 py-3">Misión</th>
                              <th className="px-4 py-3">Reto</th>
                              <th className="px-4 py-3">Resultado</th>
                              <th className="px-4 py-3">Nivel IA</th>
                              <th className="px-4 py-3">Acciones</th>
                           </tr>
                        </thead>
                        <tbody>
                           {recentEvidences.map(ev => (
                              <tr key={ev.id} className="border-b border-slate-100 hover:bg-slate-50">
                                 <td className="px-4 py-3 font-medium text-slate-900">{ev.student}</td>
                                 <td className="px-4 py-3">{ev.module}</td>
                                 <td className="px-4 py-3">{ev.target}</td>
                                 <td className="px-4 py-3">
                                    {ev.isCorrect ? (
                                       <Badge variant="green" className="py-0">Correcto</Badge>
                                    ) : (
                                       <Badge variant="red" className="py-0">Error en columnas</Badge>
                                    )}
                                 </td>
                                 <td className="px-4 py-3">{ev.level}</td>
                                 <td className="px-4 py-3">
                                    <Button variant="ghost" className="text-[var(--color-yachay-earth)] px-2 py-1"><Eye className="w-4 h-4" /></Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </Card>
            </div>

            <div className="space-y-6">
               <Card className="p-6 border-slate-200 bg-amber-50 shadow-inner">
                  <h3 className="font-bold flex items-center gap-2 text-amber-900 mb-4">
                     <AlertTriangle className="w-5 h-5" /> Alerta de Aprendizaje
                  </h3>
                  <div className="text-sm text-amber-800 space-y-4">
                     <p>La inteligencia artificial ha detectado que <strong>5 estudiantes</strong> confunden las decenas con las centenas al representar números mayores a 100.</p>
                     <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-sm">
                        <strong>Recomendación IA:</strong>
                        <p className="mt-1 text-slate-600">Asignar reto de "Descomposición" limitando las pistas para reforzar el valor posicional.</p>
                     </div>
                     <Button variant="primary" className="w-full shadow-sm bg-amber-600 hover:bg-amber-700">Asignar Refuerzo</Button>
                  </div>
               </Card>
            </div>
         </div>
      </div>
   );
}
