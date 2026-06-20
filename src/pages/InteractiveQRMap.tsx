import { useState } from "react";
import { Button, Card, Badge, Modal } from "../components/ui";
import { MapPin, QrCode, Navigation } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function InteractiveQRMap() {
  const location = useLocation();
  const isTeacher = location.pathname.startsWith('/teacher');

  const locations = [
    { id: 1, title: "Laboratorio de Ciencias", type: "science", status: "active", desc: "Misión: Guardianes del Agua", x: 25, y: 35 },
    { id: 2, title: "Huerto Escolar", type: "earth", status: "pending", desc: "Misión: Botánica Local", x: 75, y: 65 },
    { id: 3, title: "Patio Principal", type: "social", status: "active", desc: "Misión: Historia Viva", x: 50, y: 40 },
    { id: 4, title: "Biblioteca", type: "reading", status: "completed", desc: "Misión: Cuentacuentos", x: 20, y: 75 },
    { id: 5, title: "Huaca Cercana", type: "history", status: "active", desc: "Misión: Arqueología Interactiva", x: 80, y: 20 },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'science': return 'bg-blue-500 text-white';
      case 'earth': return 'bg-emerald-500 text-white';
      case 'social': return 'bg-amber-500 text-white';
      case 'reading': return 'bg-purple-500 text-white';
      case 'history': return 'bg-[var(--color-yachay-earth)] text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const [selectedLoc, setSelectedLoc] = useState<typeof locations[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const showModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  const handleScan = () => {
    setIsScanning(true);
    setModalTitle("Escaneando Código QR...");
    setModalContent("Conectando a la cámara...");
    setModalOpen(true);

    setTimeout(() => {
       setIsScanning(false);
       setModalTitle("¡Misión Desbloqueada!");
       setModalContent(`Has visitado exitosamente: "${selectedLoc?.title}"\nSe ha desbloqueado la actividad:\n${selectedLoc?.desc}`);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
           <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Mapa Interactivo de Misiones</h1>
           <p className="text-slate-600 mt-1">Navega y descubre códigos QR instalados en espacios reales del colegio y la comunidad.</p>
        </div>
        <div className="flex gap-2">
           {isTeacher && <Button variant="primary" onClick={() => showModal("Nuevo QR Estratégico", "Abriendo plataforma interactiva para vincular una nueva geolocalización o ambiente físico con una misión didáctica.")}><QrCode className="w-4 h-4 mr-2 inline" /> Instalar Nuevo QR</Button>}
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative bg-slate-200 rounded-xl border-4 border-white shadow-lg aspect-[4/3] sm:aspect-[16/9] overflow-hidden group">
            {/* Custom Interactive Map Base */}
            <div className="absolute inset-0 opacity-30 pointer-events-none transition-transform duration-[10s] group-hover:scale-110 object-cover" style={{ backgroundImage: 'radial-gradient(var(--color-yachay-earth) 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
            
            <div className="absolute inset-0 pointer-events-none opacity-20 transition-transform duration-[10s] group-hover:scale-105">
               {/* Simulating streets/paths */}
               <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M -50,50 Q 200,100 400,50 T 900,300" fill="transparent" stroke="#1e293b" strokeWidth="20" strokeLinecap="round" />
                  <path d="M 250,-50 V 600 M 600,100 V 700" fill="transparent" stroke="#1e293b" strokeWidth="15" strokeLinecap="round" />
                  <path d="M 100,300 L 800,100" fill="transparent" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" strokeDasharray="15,15" />
               </svg>
            </div>

            {locations.map(loc => (
              <div 
                 key={loc.id}
                 className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                 style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                 onClick={() => setSelectedLoc(loc)}
               >
                  <div className={`w-10 h-10 rounded-full border-2 shadow-xl flex items-center justify-center transition-all duration-300 ${getTypeColor(loc.type)} ${selectedLoc?.id === loc.id ? 'scale-125 border-white ring-4 ring-blue-300 z-20' : 'border-white hover:scale-110'}`}>
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                  </div>
                  {/* Ping Animation for active spots */}
                  {loc.status === 'active' && (
                     <span className={`absolute top-0 left-0 w-full h-full rounded-full opacity-75 animate-ping -z-10 ${getTypeColor(loc.type).split(' ')[0]}`}></span>
                  )}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-slate-900 text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                     {loc.title}
                  </div>
               </div>
            ))}
            
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow text-xs font-bold text-slate-700 flex items-center gap-2">
               <Navigation className="w-4 h-4 text-blue-600" />
               GPS Activo (Módulo Interactivo)
            </div>
        </div>

        <div>
           <Card className="h-full flex flex-col">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                 <h2 className="font-bold text-slate-800">Punto Seleccionado</h2>
                 {!selectedLoc && <Badge variant="gray">Ninguno</Badge>}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-center">
                 {selectedLoc ? (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                       <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(selectedLoc.type)}`}>
                             <MapPin className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-slate-900">{selectedLoc.title}</h3>
                            <Badge variant={selectedLoc.status === 'active' ? 'green' : 'yellow'} className="mt-1">
                               {selectedLoc.status === 'active' ? 'Disponible' : selectedLoc.status === 'completed' ? 'Completado' : 'No Iniciado'}
                            </Badge>
                          </div>
                       </div>
                       
                       <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                         <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Misión Vinculada</div>
                         <div className="font-medium text-slate-800">{selectedLoc.desc}</div>
                       </div>

                       <div className="bg-white p-6 rounded-xl border-2 border-slate-100 flex flex-col items-center justify-center space-y-4 hover:border-slate-300 transition-colors">
                          <div className="bg-slate-100 p-2 rounded-lg">
                             <QrCode className="w-24 h-24 text-slate-800" strokeWidth={1.5} />
                          </div>
                          {isTeacher ? (
                              <Button variant="outline" className="w-full" onClick={() => showModal("Descargar Código QR", `Generando documento PDF de alta resolución del código QR geolocalizado para: ${selectedLoc.title}\n\nListo para imprimir y colocar en sitio.`)}>Descargar PDF Imprimible</Button>
                          ) : (
                              <Button variant="primary" className="w-full shadow-md hover:-translate-y-0.5 transition-all" onClick={handleScan}>
                                 <QrCode className="w-4 h-4 mr-2 inline" /> Escanear para Desbloquear
                              </Button>
                          )}
                       </div>
                    </div>
                 ) : (
                    <div className="text-center text-slate-500 space-y-4">
                       <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                         <MapPin className="w-10 h-10" />
                       </div>
                       <p className="max-w-[200px] mx-auto">Selecciona un marcador en el mapa interactivo para ver los detalles del código QR físico.</p>
                    </div>
                 )}
              </div>
           </Card>
        </div>
      </div>
      
      <Modal isOpen={modalOpen} onClose={() => { if (!isScanning) setModalOpen(false) }} title={modalTitle}>
         <div className="space-y-4 text-center">
           {isScanning ? (
              <div className="py-8 flex flex-col items-center">
                 <div className="relative w-24 h-24 mb-4">
                    <QrCode className="w-full h-full text-slate-200" />
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.5)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                    <style>{`
                      @keyframes scan {
                        0% { top: 0; opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                      }
                    `}</style>
                 </div>
                 <p className="text-slate-600 font-medium animate-pulse">{modalContent}</p>
              </div>
           ) : (
              <>
                 <p className="text-slate-700 whitespace-pre-line text-left leading-relaxed">
                   {modalContent}
                 </p>
                 <Button className="w-full mt-4" onClick={() => setModalOpen(false)}>Aceptar</Button>
              </>
           )}
         </div>
      </Modal>
    </div>
  );
}
