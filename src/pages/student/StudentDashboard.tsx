import { useState } from "react";
import { Card, Badge, Button, Modal } from "../../components/ui";
import { BookOpen, MountainSnow, Award, Star, Compass, MapPin, QrCode } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const handleScan = () => {
    setIsScanning(true);
    setModalTitle("Escaneando Código QR...");
    setModalContent("Conectando a la cámara...");
    setModalOpen(true);

    setTimeout(() => {
       setIsScanning(false);
       setModalTitle("¡Misión Desbloqueada!");
       setModalContent("Has visitado exitosamente: \"Laboratorio de Ciencias\"\nSe ha desbloqueado la actividad:\nInvestigación de Guardianes del Agua. ¡Ve a tus Misiones para comenzar!");
    }, 2000);
  };


  return (
    <div className="space-y-6">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
           <Link to="/student/ayllu" className="inline-block group">
             <div className="flex items-center gap-1 mb-2 hover:opacity-80 transition-opacity">
               <Badge variant="blue" className="cursor-pointer">
                 <MapPin className="w-3 h-3 mr-1 inline" /> Ayllu Los Cóndores
               </Badge>
             </div>
           </Link>
           <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Tu Pasaporte Digital</h1>
           <p className="text-slate-600 mt-1">Explora tus rutas de aprendizaje y misiones activas.</p>
        </div>
        <div className="flex bg-white rounded-lg border border-slate-200 p-2 items-center gap-4">
           <div className="text-center px-4 border-r border-slate-100">
             <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Nivel</div>
             <div className="font-display font-bold text-xl text-[var(--color-yachay-earth)]">5</div>
           </div>
           <div className="text-center px-4">
             <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1 justify-center"><Star className="w-3 h-3 text-amber-400 fill-amber-400"/> Puntos</div>
             <div className="font-display font-bold text-xl text-slate-800">1,240</div>
           </div>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6 items-start">
         
         {/* Identity Card */}
         <div className="md:col-span-1 space-y-6">
            <Card className="p-6 bg-gradient-to-br from-[var(--color-yachay-earth)] to-[var(--color-yachay-earth-dark)] text-white relative overflow-hidden border-none text-center">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Compass className="w-32 h-32" />
               </div>
               
               <div className="relative z-10">
                 <div className="w-24 h-24 mx-auto bg-white rounded-full p-1 mb-4 shadow-lg pointer-events-none">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=EstudianteDemo&backgroundColor=e2e8f0" alt="Avatar" className="w-full h-full rounded-full" />
                 </div>
                 <h2 className="text-xl font-bold font-display">Estudiante Demo</h2>
                 <p className="text-orange-100 text-sm">3° A - Secundaria</p>
                 
                 <div className="mt-6 pt-6 border-t border-white/20 flex justify-between text-left">
                    <div className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/student/missions')}>
                      <div className="text-xs text-orange-200 uppercase tracking-wider">Misiones</div>
                      <div className="font-bold text-lg">12</div>
                    </div>
                    <div>
                      <div className="text-xs text-orange-200 uppercase tracking-wider">Insignias</div>
                      <div className="font-bold text-lg">4</div>
                    </div>
                 </div>
               </div>
            </Card>

            <Card className="p-5 bg-slate-900 text-white border-none shadow-xl transform transition-transform hover:scale-105" onClick={handleScan}>
               <div className="flex flex-col items-center justify-center text-center space-y-3 cursor-pointer">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center relative overflow-hidden">
                     <QrCode className="w-8 h-8 text-white relative z-10" />
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/30 to-transparent translate-y-[-100%] animate-[scan_2s_ease-in-out_infinite]"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Escanear QR Físico</h3>
                    <p className="text-sm text-slate-400">Desbloquea misiones en tu colegio</p>
                  </div>
               </div>
            </Card>

            <Card className="p-5">
               <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-amber-500" /> Insignias Obtenidas</h3>
               <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 border border-slate-100 rounded-lg text-center flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                     <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><BookOpen className="w-5 h-5"/></div>
                     <span className="text-xs font-medium text-slate-700 leading-tight">Lector Crítico</span>
                  </div>
                  <div className="p-2 border border-slate-100 rounded-lg text-center flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                     <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><MountainSnow className="w-5 h-5"/></div>
                     <span className="text-xs font-medium text-slate-700 leading-tight">Guardián del Ambiente</span>
                  </div>
               </div>
            </Card>
         </div>

         {/* Missions and Progress */}
         <div className="md:col-span-2 space-y-6">
            
            <Card className="p-0 overflow-hidden">
               <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                 <h3 className="font-bold text-slate-800">Misiones Asignadas</h3>
                 <Badge variant="blue">3 Pendientes</Badge>
               </div>
               <div className="divide-y divide-slate-100 bg-white">
                  
                  {/* Mission Item */}
                  <div className="p-5 flex flex-col sm:flex-row gap-4 hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => navigate('/student/missions')}>
                     <div className="w-12 h-12 flex-shrink-0 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <BookOpen className="w-6 h-6" />
                     </div>
                     <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                           <h4 className="font-bold text-slate-900 text-lg">Guardianes del Agua</h4>
                           <Badge variant="yellow">En curso</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">El río Huallaga nos necesita. Ustedes son el escuadrón de análisis de agua para determinar los niveles de contaminación.</p>
                        
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                           <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                              <span className="bg-slate-100 px-2 py-1 rounded text-slate-700">Ciencia y Tecnología</span>
                              <span className="hidden sm:inline">•</span>
                              <span className="text-red-500">Vence: Hoy 23:59</span>
                           </div>
                           <Button variant="primary" className="h-8 px-3 text-xs w-full sm:w-auto">Continuar</Button>
                        </div>
                     </div>
                  </div>

                  {/* Mission Item */}
                  <div className="p-5 flex flex-col sm:flex-row gap-4 hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => navigate('/student/missions')}>
                     <div className="w-12 h-12 flex-shrink-0 bg-orange-100 text-[var(--color-yachay-earth)] rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <MountainSnow className="w-6 h-6" />
                     </div>
                     <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                           <h4 className="font-bold text-slate-900 text-lg">Ruta Histórica de Kotosh</h4>
                           <Badge variant="gray">Nueva</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">Descubre los secretos de las Manos Cruzadas y su importancia para nuestra identidad y cultura local.</p>
                        
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                           <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                              <span className="bg-slate-100 px-2 py-1 rounded text-slate-700">Historia</span>
                           </div>
                           <Button variant="outline" className="h-8 px-3 text-xs w-full sm:w-auto">Iniciar Misión</Button>
                        </div>
                     </div>
                  </div>

               </div>
               <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                  <Button variant="ghost" className="text-sm text-slate-600 w-full" onClick={() => navigate('/student/missions')}>Ver todas las misiones</Button>
               </div>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4">
               {/* Quick Tools */}
               <Card className="p-5 bg-slate-800 text-white border-slate-700 relative overflow-hidden">
                 <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
                    <QrCodeIcon />
                 </div>
                 <div className="relative z-10">
                   <h3 className="font-bold text-lg mb-2">Escáner Mapa QR</h3>
                   <p className="text-slate-300 text-sm mb-4 line-clamp-2">Escanea los códigos en tu colegio para descubrir nuevas misiones.</p>
                   <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-transparent" onClick={handleScan}>Abrir Cámara</Button>
                 </div>
               </Card>
               
               <Card className="p-5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden">
                 <div className="relative z-10 h-full flex flex-col">
                   <h3 className="font-bold text-lg mb-2">Yupana Virtual</h3>
                   <p className="text-white/80 text-sm mb-4 line-clamp-2">Practica matemática con la herramienta milenaria andina.</p>
                   <Link to="/student/yupana" className="inline-block w-full mt-auto">
                    <Button variant="secondary" className="w-full bg-white text-indigo-600 hover:bg-slate-50 border-transparent font-bold hover:text-indigo-700">
                        Ir a Yupana
                    </Button>
                   </Link>
                 </div>
               </Card>
            </div>

         </div>

      </div>

      <Modal isOpen={modalOpen} onClose={() => { if (!isScanning) setModalOpen(false) }} title={modalTitle}>
         <div className="space-y-4 text-center">
           {isScanning ? (
              <div className="py-8 flex flex-col items-center">
                 <div className="relative w-24 h-24 mb-4">
                    <QrCode className="w-full h-full text-slate-200" />
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.5)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                 </div>
                 <p className="text-slate-600 font-medium animate-pulse">{modalContent}</p>
                 <style>{`
                      @keyframes scan {
                        0% { top: 0; opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                      }
                 `}</style>
              </div>
           ) : (
              <>
                 <p className="text-slate-700 whitespace-pre-line text-left leading-relaxed">
                   {modalContent}
                 </p>
                 <Button className="w-full mt-4" onClick={() => setModalOpen(false)}>¡Vamos a la Misión!</Button>
              </>
           )}
         </div>
      </Modal>

    </div>
  );
}

function QrCodeIcon() {
  return (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  );
}
