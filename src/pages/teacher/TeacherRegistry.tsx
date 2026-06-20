import { useState, useEffect } from "react";
import { Card, Button, Badge, Modal } from "../../components/ui";
import { Search, User, Filter, AlertCircle, FileText, CheckCircle, TrendingUp, Users, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const estudiantesMock = {
  "3A": [
    { id: 1, nombre: "Alania Franco", nivel: "AD", asistencias: "95%", progreso: 85, estado: "Destacado" },
    { id: 2, nombre: "Ríos Ana", nivel: "A", asistencias: "100%", progreso: 75, estado: "En Logro" },
    { id: 3, nombre: "López Carlos", nivel: "B", asistencias: "85%", progreso: 55, estado: "En Proceso" },
    { id: 4, nombre: "Torres María", nivel: "B", asistencias: "92%", progreso: 60, estado: "En Proceso" },
    { id: 5, nombre: "Gómez Luis", nivel: "C", asistencias: "70%", progreso: 30, estado: "Riesgo" },
    { id: 6, nombre: "Quispe Daniel", nivel: "A", asistencias: "98%", progreso: 78, estado: "En Logro" },
    { id: 7, nombre: "Vásquez Elena", nivel: "AD", asistencias: "100%", progreso: 92, estado: "Destacado" },
    { id: 8, nombre: "García Pedro", nivel: "B", asistencias: "88%", progreso: 58, estado: "En Proceso" },
    { id: 9, nombre: "Herrera Sofía", nivel: "A", asistencias: "96%", progreso: 81, estado: "En Logro" },
    { id: 10, nombre: "Castro Miguel", nivel: "C", asistencias: "75%", progreso: 42, estado: "Riesgo" },
    { id: 11, nombre: "Mendoza Lucero", nivel: "A", asistencias: "100%", progreso: 85, estado: "En Logro" },
    { id: 12, nombre: "Salazar Diego", nivel: "B", asistencias: "90%", progreso: 66, estado: "En Proceso" },
    { id: 13, nombre: "Jiménez Rosa", nivel: "A", asistencias: "96%", progreso: 79, estado: "En Logro" },
    { id: 14, nombre: "Rojas Javier", nivel: "B", asistencias: "95%", progreso: 62, estado: "En Proceso" },
    { id: 15, nombre: "Paredes Carla", nivel: "AD", asistencias: "100%", progreso: 95, estado: "Destacado" },
    { id: 16, nombre: "Huamán José", nivel: "C", asistencias: "80%", progreso: 40, estado: "Riesgo" },
    { id: 17, nombre: "Sánchez Paola", nivel: "A", asistencias: "92%", progreso: 88, estado: "En Logro" },
    { id: 18, nombre: "Flores Kevin", nivel: "B", asistencias: "89%", progreso: 51, estado: "En Proceso" },
    { id: 19, nombre: "Romero Alicia", nivel: "A", asistencias: "98%", progreso: 83, estado: "En Logro" },
    { id: 20, nombre: "Espinoza Marcos", nivel: "AD", asistencias: "100%", progreso: 90, estado: "Destacado" }
  ],
  "3B": [
    { id: 21, nombre: "Pérez Juan", nivel: "A", asistencias: "90%", progreso: 80, estado: "En Logro" },
    { id: 22, nombre: "Mamani Rosa", nivel: "B", asistencias: "98%", progreso: 50, estado: "En Proceso" },
    { id: 23, nombre: "Cruz Alejandro", nivel: "C", asistencias: "72%", progreso: 35, estado: "Riesgo" },
    { id: 24, nombre: "Díaz Valeria", nivel: "A", asistencias: "100%", progreso: 85, estado: "En Logro" },
    { id: 25, nombre: "Ramos Víctor", nivel: "B", asistencias: "95%", progreso: 65, estado: "En Proceso" },
    { id: 26, nombre: "Vargas Camila", nivel: "AD", asistencias: "98%", progreso: 91, estado: "Destacado" },
    { id: 27, nombre: "Alvarado Martín", nivel: "B", asistencias: "92%", progreso: 60, estado: "En Proceso" },
    { id: 28, nombre: "Carrasco Lucía", nivel: "A", asistencias: "96%", progreso: 77, estado: "En Logro" },
    { id: 29, nombre: "Zeballos César", nivel: "B", asistencias: "90%", progreso: 58, estado: "En Proceso" },
    { id: 30, nombre: "Navarro Blanca", nivel: "AD", asistencias: "100%", progreso: 94, estado: "Destacado" },
    { id: 31, nombre: "Gutiérrez Renato", nivel: "C", asistencias: "81%", progreso: 44, estado: "Riesgo" },
    { id: 32, nombre: "Montoya Clara", nivel: "A", asistencias: "100%", progreso: 82, estado: "En Logro" },
    { id: 33, nombre: "Aliaga Felipe", nivel: "B", asistencias: "88%", progreso: 55, estado: "En Proceso" },
    { id: 34, nombre: "Cáceres Diana", nivel: "A", asistencias: "95%", progreso: 79, estado: "En Logro" },
    { id: 35, nombre: "Vega Rodrigo", nivel: "C", asistencias: "78%", progreso: 38, estado: "Riesgo" },
    { id: 36, nombre: "Pinto Nayeli", nivel: "A", asistencias: "98%", progreso: 86, estado: "En Logro" },
    { id: 37, nombre: "Valdez Hugo", nivel: "B", asistencias: "92%", progreso: 64, estado: "En Proceso" },
    { id: 38, nombre: "Medina Paola", nivel: "AD", asistencias: "100%", progreso: 98, estado: "Destacado" },
    { id: 39, nombre: "Cárdenas Raúl", nivel: "B", asistencias: "86%", progreso: 51, estado: "En Proceso" },
    { id: 40, nombre: "Sosa Mariana", nivel: "A", asistencias: "99%", progreso: 83, estado: "En Logro" }
  ],
  "4A": [
    { id: 41, nombre: "Quispe José", nivel: "AD", asistencias: "100%", progreso: 92, estado: "Destacado" },
    { id: 42, nombre: "Vera Estefanía", nivel: "A", asistencias: "94%", progreso: 81, estado: "En Logro" },
    { id: 43, nombre: "Blanco Andrés", nivel: "B", asistencias: "95%", progreso: 68, estado: "En Proceso" },
    { id: 44, nombre: "Reyna Gabriela", nivel: "A", asistencias: "98%", progreso: 88, estado: "En Logro" },
    { id: 45, nombre: "Cordero Bruno", nivel: "C", asistencias: "82%", progreso: 45, estado: "Riesgo" },
    { id: 46, nombre: "León Daniela", nivel: "B", asistencias: "90%", progreso: 62, estado: "En Proceso" },
    { id: 47, nombre: "Peña Sergio", nivel: "A", asistencias: "100%", progreso: 76, estado: "En Logro" },
    { id: 48, nombre: "Bustamante Kiara", nivel: "AD", asistencias: "98%", progreso: 90, estado: "Destacado" },
    { id: 49, nombre: "Miranda Tomás", nivel: "B", asistencias: "89%", progreso: 54, estado: "En Proceso" },
    { id: 50, nombre: "Salas Verónica", nivel: "A", asistencias: "97%", progreso: 85, estado: "En Logro" },
    { id: 51, nombre: "Mora Christian", nivel: "C", asistencias: "70%", progreso: 33, estado: "Riesgo" },
    { id: 52, nombre: "Tito Evelyn", nivel: "B", asistencias: "92%", progreso: 59, estado: "En Proceso" },
    { id: 53, nombre: "Castañeda Iván", nivel: "A", asistencias: "100%", progreso: 79, estado: "En Logro" },
    { id: 54, nombre: "Guerrero Andrea", nivel: "AD", asistencias: "99%", progreso: 93, estado: "Destacado" },
    { id: 55, nombre: "Fabián Leonardo", nivel: "B", asistencias: "94%", progreso: 66, estado: "En Proceso" },
    { id: 56, nombre: "Contreras María", nivel: "C", asistencias: "80%", progreso: 42, estado: "Riesgo" },
    { id: 57, nombre: "Arroyo Ricardo", nivel: "B", asistencias: "86%", progreso: 52, estado: "En Proceso" },
    { id: 58, nombre: "Bautista Fátima", nivel: "A", asistencias: "95%", progreso: 82, estado: "En Logro" },
    { id: 59, nombre: "Soria Pablo", nivel: "B", asistencias: "93%", progreso: 61, estado: "En Proceso" },
    { id: 60, nombre: "Gálvez Nadia", nivel: "A", asistencias: "100%", progreso: 87, estado: "En Logro" }
  ]
};

const nombresAyllu = ["Aymara", "Quechua", "Chanka", "Inca", "Moche", "Nazca", "Paracas", "Wari"];

export default function TeacherRegistry() {
   const [curso, setCurso] = useState("3A");
   const [searchQuery, setSearchQuery] = useState("");
   const [studentDetail, setStudentDetail] = useState<any>(null);

   const [ruletaOpen, setRuletaOpen] = useState(false);
   const [integrantesAyllu, setIntegrantesAyllu] = useState(4);
   const [spinning, setSpinning] = useState(false);
   const [ayllusGenerados, setAyllusGenerados] = useState<any[]>([]);
   
   const [availableMissions, setAvailableMissions] = useState<any[]>([]);
   const [selectedMission, setSelectedMission] = useState<string>("");
   const navigate = useNavigate();

   useEffect(() => {
     const saved = JSON.parse(localStorage.getItem('yachayllu_missions') || '[]');
     const defaults = [
       { title: "Guardianes del Agua" },
       { title: "Ruta Histórica de Kotosh" }
     ];
     const combined = [...saved, ...defaults];
     setAvailableMissions(combined);
     if (combined.length > 0) setSelectedMission(combined[0].title);
   }, []);

   const currentStudents = estudiantesMock[curso as keyof typeof estudiantesMock] || [];
   const filteredStudents = currentStudents.filter(s => s.nombre.toLowerCase().includes(searchQuery.toLowerCase()));

   const handleSpinRuleta = () => {
      setSpinning(true);
      setAyllusGenerados([]);
      
      setTimeout(() => {
         const shuffled = [...currentStudents].sort(() => 0.5 - Math.random());
         const ayllus = [];
         
         for (let i = 0; i < shuffled.length; i += integrantesAyllu) {
            ayllus.push({
               nombre: nombresAyllu[(i / integrantesAyllu) % nombresAyllu.length] || `Ayllu ${i + 1}`,
               integrantes: shuffled.slice(i, i + integrantesAyllu)
            });
         }
         
         setAyllusGenerados(ayllus);
         setSpinning(false);
      }, 1500);
   };

   const handleAsignarMision = () => {
      if (ayllusGenerados.length === 0 || !selectedMission) return;
      
      const asignment = {
         curso,
         mision: selectedMission,
         ayllus: ayllusGenerados,
         fecha: new Date().toISOString(),
         entregas: 0
      };
      
      const currentAsignments = JSON.parse(localStorage.getItem('yachayllu_assigned_missions') || '[]');
      currentAsignments.unshift(asignment);
      localStorage.setItem('yachayllu_assigned_missions', JSON.stringify(currentAsignments));
      
      setRuletaOpen(false);
      navigate("/teacher"); // Go to dashboard
   };

   const renderStudentDetail = () => {
      if (!studentDetail) return null;
      return (
         <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                  <User className="w-8 h-8" />
               </div>
               <div>
                  <h3 className="font-bold text-xl text-slate-900">{studentDetail.nombre}</h3>
                  <div className="flex gap-2 mt-1">
                     <Badge variant={studentDetail.estado === 'Riesgo' ? 'red' : studentDetail.estado === 'Destacado' ? 'blue' : 'green'}>{studentDetail.nivel} - {studentDetail.estado}</Badge>
                     <Badge variant="gray">Asistencia: {studentDetail.asistencias}</Badge>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Misiones Completadas</p>
                  <p className="text-2xl font-bold text-slate-800">12<span className="text-sm text-slate-500 font-normal"> / 15</span></p>
               </div>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Puntos Yachay</p>
                  <p className="text-2xl font-bold text-amber-600">450</p>
               </div>
            </div>

            <div>
               <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase">Progreso CNEB Detallado</h4>
               <div className="space-y-4">
                  <div>
                     <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">Indaga mediante métodos científicos...</span>
                        <span className="font-bold text-slate-900">{studentDetail.progreso}%</span>
                     </div>
                     <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${studentDetail.progreso > 70 ? 'bg-emerald-500' : studentDetail.progreso > 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{width: `${studentDetail.progreso}%`}}></div>
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">Explica el mundo físico...</span>
                        <span className="font-bold text-slate-900">{Math.min(studentDetail.progreso + 10, 100)}%</span>
                     </div>
                     <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${studentDetail.progreso + 10 > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{width: `${Math.min(studentDetail.progreso + 10, 100)}%`}}></div>
                     </div>
                  </div>
               </div>
            </div>

            <div>
               <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase">Últimas Evidencias</h4>
               <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-white">
                     <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <div>
                           <p className="text-sm font-bold text-slate-800">Reporte: Calidad del Agua</p>
                           <p className="text-xs text-slate-500">Subido hace 2 días</p>
                        </div>
                     </div>
                     <Button variant="outline" size="sm"><FileText className="w-3 h-3 mr-1 inline" /> Ver</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-white">
                     <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <div>
                           <p className="text-sm font-bold text-slate-800">Foto: Huerto Escolar</p>
                           <p className="text-xs text-slate-500">Subido hace 1 semana</p>
                        </div>
                     </div>
                     <Button variant="outline" size="sm"><FileText className="w-3 h-3 mr-1 inline" /> Ver</Button>
                  </div>
               </div>
            </div>
            
            {studentDetail.estado === 'Riesgo' && (
               <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                     <p className="text-sm font-bold text-red-800">Alerta de Riesgo Académico</p>
                     <p className="text-sm text-red-600 mt-1">El modelo predictivo sugiere asignar misiones de refuerzo en lectura comprensiva y apoyo tutorial continuo.</p>
                  </div>
               </div>
            )}
         </div>
      );
   };

   return (
      <div className="space-y-6 pb-12">
        <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-2">Registro de Estudiantes</h1>
            <p className="text-slate-600 mt-1">Gestiona las evidencias, progreso y notas por cada aula a tu cargo.</p>
          </div>
          <div className="flex gap-2">
            <select 
               className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-yachay-earth)] bg-white font-medium"
               value={curso}
               onChange={(e) => setCurso(e.target.value)}
            >
               <option value="3A">3° Secundaria A - CyT</option>
               <option value="3B">3° Secundaria B - CyT</option>
               <option value="4A">4° Secundaria A - Matemáticas</option>
            </select>
          </div>
        </header>

        <div className="flex flex-wrap gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
           <div className="relative flex-1 min-w-[200px]">
             <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
             <input type="text" placeholder="Buscar alumno por nombre..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none text-sm bg-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
           </div>
           <Button variant="primary" className="shadow-md font-bold group" onClick={() => setRuletaOpen(true)}>
             <Users className="w-4 h-4 mr-2" /> Ruleta de Ayllus
           </Button>
           <Button variant="outline" className="text-sm"><Filter className="w-4 h-4 mr-2 inline" /> Filtros</Button>
        </div>

        <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/40">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider">
                       <th className="p-4 font-bold border-b border-slate-200">Estudiante</th>
                       <th className="p-4 font-bold border-b border-slate-200">Nivel Actual</th>
                       <th className="p-4 font-bold border-b border-slate-200 hidden sm:table-cell">Asistencia</th>
                       <th className="p-4 font-bold border-b border-slate-200 hidden md:table-cell">Avance Misiones</th>
                       <th className="p-4 font-bold border-b border-slate-200 text-right">Acciones</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredStudents.length === 0 ? (
                       <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-500">No se encontraron estudiantes</td>
                       </tr>
                    ) : filteredStudents.map(student => (
                       <tr key={student.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => setStudentDetail(student)}>
                          <td className="p-4">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase hidden sm:flex">
                                   {student.nombre.substring(0,2)}
                                </div>
                                <div>
                                   <p className="font-bold text-slate-900">{student.nombre}</p>
                                   <p className="text-xs text-slate-500 sm:hidden">Asist: {student.asistencias}</p>
                                </div>
                             </div>
                          </td>
                          <td className="p-4">
                             <Badge variant={student.nivel === 'C' ? 'red' : student.nivel === 'AD' ? 'blue' : student.nivel === 'B' ? 'yellow' : 'green'}>{student.nivel}</Badge>
                          </td>
                          <td className="p-4 hidden sm:table-cell font-medium text-slate-700">
                             {student.asistencias}
                          </td>
                          <td className="p-4 hidden md:table-cell">
                             <div className="flex items-center gap-2">
                                <div className="w-full max-w-[100px] bg-slate-200 h-2 rounded-full overflow-hidden">
                                   <div className={`h-full rounded-full ${student.progreso > 70 ? 'bg-emerald-500' : student.progreso > 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{width: `${student.progreso}%`}}></div>
                                </div>
                                <span className="text-xs text-slate-500 font-bold">{student.progreso}%</span>
                             </div>
                          </td>
                          <td className="p-4 text-right">
                             <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); setStudentDetail(student); }}>Ver Detalle</Button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </Card>

        <Modal isOpen={!!studentDetail} onClose={() => setStudentDetail(null)} title="Expediente del Estudiante">
           {renderStudentDetail()}
        </Modal>

        <Modal isOpen={ruletaOpen} onClose={() => {setRuletaOpen(false); setAyllusGenerados([]);}} title="🎲 Ruleta de Ayllus (Sorteo de Grupos)">
           <div className="space-y-6">
              {!ayllusGenerados.length && !spinning && (
                 <div className="space-y-4">
                    <p className="text-sm text-slate-600">Configura los grupos aleatorios para el aula <span className="font-bold">{curso}</span>.</p>
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1">Integrantes por Ayllu</label>
                       <input type="number" min="2" max="10" value={integrantesAyllu} onChange={e => setIntegrantesAyllu(parseInt(e.target.value))} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-yachay-earth)]" />
                    </div>
                    <Button variant="primary" className="w-full h-12 text-lg font-bold" onClick={handleSpinRuleta}>Girar Ruleta 🎡</Button>
                 </div>
              )}

              {spinning && (
                 <div className="py-12 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 border-4 border-slate-200 border-t-[var(--color-yachay-earth)] rounded-full animate-spin mb-4"></div>
                    <h3 className="text-2xl font-display font-bold text-slate-800 animate-pulse">Mezclando estudiantes...</h3>
                 </div>
              )}

              {ayllusGenerados.length > 0 && !spinning && (
                 <div className="space-y-6 flex flex-col max-h-[60vh]">
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                       <h3 className="font-bold text-lg text-slate-800 text-center mb-2">¡Ayllus Generados! 🎉</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {ayllusGenerados.map((ayllu, idx) => (
                             <div key={idx} className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 shadow-sm">
                                <h4 className="font-bold text-indigo-800 border-b border-indigo-200 pb-1 mb-2 text-sm">{ayllu.nombre}</h4>
                                <ul className="space-y-1">
                                   {ayllu.integrantes.map((s: any) => (
                                      <li key={s.id} className="text-xs text-indigo-900">• {s.nombre}</li>
                                   ))}
                                </ul>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="border-t border-slate-200 pt-4 space-y-4">
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Asignar Misión a estos Ayllus</label>
                          <select 
                             className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                             value={selectedMission}
                             onChange={e => setSelectedMission(e.target.value)}
                          >
                             {availableMissions.map((m, i) => (
                                <option key={i} value={m.title}>{m.title}</option>
                             ))}
                          </select>
                       </div>
                       <Button variant="primary" className="w-full h-12 text-base shadow-sm bg-emerald-600 hover:bg-emerald-700 border-emerald-600" onClick={handleAsignarMision}>
                           <CheckCircle className="w-5 h-5 mr-2" /> Confirmar Selección
                       </Button>
                    </div>
                 </div>
              )}
           </div>
        </Modal>
      </div>
   )
}
