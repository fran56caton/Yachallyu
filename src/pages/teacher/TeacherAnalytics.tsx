import { useState } from "react";
import { Card, Button, Modal, Badge } from "../../components/ui";
import { BarChart as BarChartIcon, Activity, CheckSquare, Download, Filter, TrendingUp, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const dataCompetencias = [
  { name: 'Indaga métodos...', Logro: 75, Esperado: 80 },
  { name: 'Explica mundo físico...', Logro: 82, Esperado: 80 },
  { name: 'Diseña soluciones...', Logro: 45, Esperado: 75 },
  { name: 'Comprende textos...', Logro: 60, Esperado: 70 },
];

const dataNiveles = [
  { name: 'A (Logro Esperado)', value: 45, color: '#10b981' },
  { name: 'AD (Logro Destacado)', value: 15, color: '#3b82f6' },
  { name: 'B (En Proceso)', value: 30, color: '#f59e0b' },
  { name: 'C (En Inicio)', value: 10, color: '#ef4444' },
];

const dataPrediccion = [
  { mes: 'Mar', real: 60, predicho: 60 },
  { mes: 'Abr', real: 65, predicho: 66 },
  { mes: 'May', real: 68, predicho: 70 },
  { mes: 'Jun', real: null, predicho: 75 },
  { mes: 'Jul', real: null, predicho: 80 },
];

export default function TeacherAnalytics() {
   const [modalOpen, setModalOpen] = useState(false);
   const [filtroAula, setFiltroAula] = useState("3A");

   return (
      <div className="space-y-6 pb-12">
        <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-2">Analítica y Progreso</h1>
            <p className="text-slate-600 mt-1">Visualiza el avance por competencias CNEB y proyecciones de IA.</p>
          </div>
          <div className="flex gap-2">
            <select 
               className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-yachay-earth)] bg-white"
               value={filtroAula}
               onChange={(e) => setFiltroAula(e.target.value)}
            >
               <option value="3A">3° Secundaria A - CyT</option>
               <option value="3B">3° Secundaria B - CyT</option>
               <option value="4A">4° Secundaria A - Matemáticas</option>
            </select>
            <Button variant="outline" onClick={() => setModalOpen(true)}><Download className="w-4 h-4 mr-2 inline" /> Interfaz a SIAGIE</Button>
          </div>
        </header>

        <div className="grid md:grid-cols-4 gap-4">
           <Card className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                 <CheckSquare className="w-6 h-6"/>
              </div>
              <div>
                 <p className="text-xs text-slate-500 font-bold uppercase">Logro General</p>
                 <p className="text-2xl font-bold text-slate-800">68%</p>
              </div>
           </Card>
           <Card className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                 <Activity className="w-6 h-6"/>
              </div>
              <div>
                 <p className="text-xs text-slate-500 font-bold uppercase">Participación</p>
                 <p className="text-2xl font-bold text-slate-800">92%</p>
              </div>
           </Card>
           <Card className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                 <BarChartIcon className="w-6 h-6"/>
              </div>
              <div>
                 <p className="text-xs text-slate-500 font-bold uppercase">Misiones Finalizadas</p>
                 <p className="text-2xl font-bold text-slate-800">14</p>
              </div>
           </Card>
           <Card className="p-5 flex items-center gap-4 bg-purple-50 border-purple-100 group cursor-pointer hover:bg-purple-100 transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                 <AlertTriangle className="w-6 h-6"/>
              </div>
              <div>
                 <p className="text-xs text-purple-600 font-bold uppercase">Riesgo Escolar</p>
                 <p className="text-xl font-bold text-slate-800"><span className="text-red-500">3 Alumnos</span></p>
                 <p className="text-[10px] text-purple-500">Ver alertas tempranas</p>
              </div>
           </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
           <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-800">Progreso por Competencias</h3>
                <Badge variant="blue">General</Badge>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataCompetencias} margin={{top: 5, right: 30, left: -20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/>
                    <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} angle={-15} textAnchor="end" height={60} />
                    <YAxis tick={{fontSize: 12}} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <Bar dataKey="Logro" fill="#10b981" radius={[4, 4, 0, 0]} name="Logro Actual %" maxBarSize={40} />
                    <Bar dataKey="Esperado" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Meta Esperada %" maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </Card>

           <Card className="p-6">
              <h3 className="font-bold text-lg text-slate-800 mb-6">Distribución de Niveles CNEB</h3>
              <div className="h-64 flex items-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={dataNiveles}
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                       >
                          {dataNiveles.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                       <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                       <Legend verticalAlign="middle" align="right" layout="vertical" wrapperStyle={{fontSize: '12px'}} />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
           </Card>
        </div>

        <Card className="p-6">
           <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">IA Predictiva: Tendencia del Aula</h3>
                <p className="text-xs text-slate-500">Estimación de alcance de competencias hacia el cierre de bimestre</p>
              </div>
              <Badge variant="purple"><TrendingUp className="w-3 h-3 mr-1 inline"/> Modelo Activo</Badge>
           </div>
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={dataPrediccion} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                     <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" vertical={false} />
                     <XAxis dataKey="mes" padding={{ left: 30, right: 30 }} tick={{fontSize: 12}} />
                     <YAxis tick={{fontSize: 12}} domain={[0, 100]} />
                     <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                     <Legend wrapperStyle={{fontSize: "12px"}}/>
                     <Line type="monotone" dataKey="real" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} name="Logro Real %" />
                     <Line type="monotone" dataKey="predicho" stroke="#a855f7" strokeWidth={3} strokeDasharray="5 5" name="Proyección IA %" />
                 </LineChart>
              </ResponsiveContainer>
           </div>
        </Card>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Interfaz SIAGIE Offline">
           <div className="space-y-4">
             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                 <CheckSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                 <p className="text-sm text-blue-800">Se exportarán las calificaciones y logros de las competencias formativas en el formato requerido por SIAGIE. Podrás cargarlo cuando tengas conexión.</p>
             </div>
             <Button className="w-full" onClick={() => setModalOpen(false)}>Confirmar y Descargar CSV</Button>
           </div>
        </Modal>
      </div>
   )
}

