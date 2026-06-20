import { useState, useEffect } from "react";
import { Info, RotateCcw, Save, CheckCircle, AlertTriangle, ChevronRight, Calculator, FileText, Share, Volume2, Beaker, Map, Sparkles } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";

interface Challenge {
  id: string;
  target_number: number;
  description: string;
  mission?: string;
  hints: string[];
}

const DEMO_CHALLENGES: Challenge[] = [
  {
    id: "c1",
    target_number: 143,
    description: "Representa el número 143.",
    hints: [
      "El número tiene 1 centena.",
      "Tiene 4 decenas.",
      "Necesitas 3 unidades."
    ]
  },
  {
    id: "c2",
    target_number: 248,
    description: "Representa el número 248.",
    hints: [
      "Revisa las centenas: necesitas 2.",
      "Debe haber 4 decenas.",
      "Coloca 8 unidades."
    ]
  },
  {
    id: "c3",
    target_number: 1325,
    description: "Representa el número 1 325.",
    hints: [
      "Tienes unidades de millar.",
      "Usa la columna UM para el 1000.",
      "3 centenas, 2 decenas, 5 unidades."
    ]
  }
];

export default function YupanaVirtual() {
  // Columns: UM, C, D, U
  const [board, setBoard] = useState<{ [col: string]: number[] }>({
    UM: [],
    C: [],
    D: [],
    U: []
  });
  
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'warning' | 'info'} | null>(null);

  const activeChallenge = DEMO_CHALLENGES[activeChallengeIdx];

  // Drag and drop state
  const [draggedType, setDraggedType] = useState<string | null>(null);

  // Constants
  const MAX_BEADS_PER_COL = 9;

  const currentTotal = () => {
    return (board.UM.length * 1000) + (board.C.length * 100) + (board.D.length * 10) + board.U.length;
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    setDraggedType(type);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDrop = (e: React.DragEvent, col: string) => {
    e.preventDefault();
    if (draggedType === "bead") {
       addBead(col);
    }
  };

  const addBead = (col: string) => {
     if (board[col].length < MAX_BEADS_PER_COL) {
        setBoard(prev => ({
           ...prev,
           [col]: [...prev[col], 1]
        }));
        logAction(`Agregada 1 cuenta en ${col}`);
        playSound();
     }
  };

  const removeBead = (col: string) => {
     if (board[col].length > 0) {
        setBoard(prev => ({
           ...prev,
           [col]: prev[col].slice(0, -1)
        }));
        logAction(`Retirada 1 cuenta de ${col}`);
        playSound();
     }
  };

  const resetBoard = () => {
    setBoard({ UM: [], C: [], D: [], U: [] });
    logAction("Tablero reiniciado");
  };

  const logAction = (text: string) => {
     setHistory(prev => [text, ...prev].slice(0, 10)); // keep last 10
  };

  const playSound = () => {
     // A simple "click" sound logic could go here. MVP: visual interaction suffices without actual Audio element logic for now, although requested as optional, let's pretend it plays a light wooden click.
  };

  const checkAnswer = () => {
     const total = currentTotal();
     if (total === activeChallenge.target_number) {
        setMessage({text: "¡Excelente! Representaste correctamente el número. Ahora explica cómo sabes que esa cantidad corresponde al valor pedido.", type: "success"});
     } else {
        const u = activeChallenge.target_number % 10;
        const d = Math.floor(activeChallenge.target_number / 10) % 10;
        const c = Math.floor(activeChallenge.target_number / 100) % 10;
        const um = Math.floor(activeChallenge.target_number / 1000) % 10;

        if (board.U.length !== u) setMessage({text: `Estás cerca. Revisa la columna de unidades. Necesitas ${u} unidades.`, type: "warning"});
        else if (board.D.length !== d) setMessage({text: `Revisa la columna de decenas. El número tiene ${d} decenas.`, type: "warning"});
        else if (board.C.length !== c) setMessage({text: `Revisa las centenas.`, type: "warning"});
        else setMessage({text: `Observa el valor posicional y corrige.`, type: "warning"});
     }
  };

  const getHint = () => {
     if (hintsUsed < activeChallenge.hints.length) {
        setMessage({text: `Pista: ${activeChallenge.hints[hintsUsed]}`, type: 'info'});
        setHintsUsed(prev => prev + 1);
        logAction("Pista solicitada");
     } else {
        setMessage({text: "Ya no hay más pistas para este reto.", type: 'warning'});
     }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
       {/* ZONA 1: Encabezado */}
       <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 flex items-center gap-2">
               <Beaker className="w-8 h-8 text-[var(--color-yachay-earth)]" /> Yupana Lab 360
            </h1>
            <p className="text-slate-600 mt-2 text-lg">Laboratorio andino de cálculo, pensamiento lógico, cultura y evidencia matemática.</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
             <Badge variant="yellow" className="text-sm">Modo Reto</Badge>
             <Button variant="outline" className="text-xs bg-slate-50" onClick={() => { resetBoard(); setHistory([]); setMessage(null); setHintsUsed(0); }}><RotateCcw className="w-4 h-4 mr-1"/> Reiniciar Progreso</Button>
          </div>
        </div>

        {/* Nota cultural */}
        <div className="mt-6 bg-amber-50/50 border border-amber-200/50 p-4 rounded-xl flex gap-3 text-amber-800/80">
           <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" />
           <div className="text-sm">
              <strong>YACHAYLLU reconoce la riqueza de los saberes andinos.</strong> Esta yupana virtual es un modelo educativo inspirado en la yupana y debe seguir fortaleciéndose con validación de docentes, investigadores y especialistas culturales.
           </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* ZONA 2 & 4: Yupana Interactive Board + Interpretation */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           {/* Visual Board */}
           <Card className="p-6 md:p-10 bg-[#fbf9f6] border-slate-200 shadow-md relative overflow-hidden">
              {/* Background Andean Pattern Hint */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%238B4513\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
              
              <div className="relative z-10">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Tablero Interactivo</h2>
                    {/* Seed bucket to drag from */}
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                       <span className="text-xs font-bold text-slate-500 uppercase">Semillas:</span>
                       <div 
                          draggable 
                          onDragStart={(e) => handleDragStart(e, "bead")}
                          className="w-8 h-8 bg-slate-800 rounded-full shadow-md cursor-grab active:cursor-grabbing border-2 border-slate-700" 
                          title="Arrastra esta semilla al tablero"
                       ></div>
                       <span className="text-[10px] text-slate-400 ml-2">Arrastra o haz clic en las celdas</span>
                    </div>
                 </div>

                 {/* Yupana Grid */}
                 <div className="bg-[#E6D5B8] rounded-2xl p-6 shadow-inner border-4 border-[#A07855]">
                    <div className="flex justify-center gap-4 md:gap-8">
                       {['UM', 'C', 'D', 'U'].map((colKey) => (
                          <div 
                             key={colKey}
                             className="space-y-2 flex flex-col items-center"
                             onDragOver={(e) => e.preventDefault()}
                             onDrop={(e) => handleDrop(e, colKey)}
                          >
                             <div className="text-center text-sm md:text-base font-bold text-[#5C3A21] mb-2 bg-[#D4B895] px-4 py-1 rounded-full uppercase tracking-widest">{colKey}</div>
                             {/* Represents 9 possible beads in a column, visualized as a grid block or continuous slots */}
                             <div 
                                className="w-16 md:w-20 bg-[#C19A6B] rounded-xl grid place-items-center cursor-pointer border-2 border-[#8B4513] transition-colors hover:bg-[#b0885a] relative" 
                                style={{ height: '300px' }}
                                onClick={() => addBead(colKey)}
                                onDoubleClick={(e) => { e.stopPropagation(); removeBead(colKey); }}
                                title="Clic para agregar, Doble clic para quitar"
                             >
                                <div className="absolute inset-x-0 bottom-4 flex flex-col-reverse items-center justify-start gap-2 h-full px-2 overflow-hidden pointer-events-none">
                                   {board[colKey].map((_, i) => (
                                      <div key={i} className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-full shadow-md border-2 border-slate-700 animate-in slide-in-from-top-4 fade-in duration-200 flex-shrink-0"></div>
                                   ))}
                                </div>
                                {board[colKey].length === 0 && (
                                   <div className="opacity-20 text-[#5C3A21] flex flex-col items-center">
                                      <span className="text-3xl font-bold">+</span>
                                   </div>
                                )}
                             </div>
                             <div className="text-[#5C3A21] font-bold text-xl mt-2">{board[colKey].length}</div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </Card>

           {/* ZONA 4: Interpretación Matemática */}
           <Card className="p-6 border-slate-200 bg-white shadow-sm">
              <h3 className="font-bold flex items-center gap-2 text-slate-800 mb-4 border-b border-slate-100 pb-2">
                 <Calculator className="w-5 h-5 text-[var(--color-yachay-earth)]"/> Interpretación Matemática
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <div className="text-sm text-slate-600 mb-1">Has colocado:</div>
                    <div className="text-slate-800 bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm leading-relaxed">
                       <strong>{board.UM.length}</strong> unidades de millar, <strong>{board.C.length}</strong> centenas, <strong>{board.D.length}</strong> decenas y <strong>{board.U.length}</strong> unidades. <br/><br/>
                       Eso representa el número: <span className="text-2xl font-bold text-[var(--color-yachay-earth)]">{currentTotal()}</span>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <div className="text-sm font-bold text-slate-700">Descomposición:</div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-700 font-mono text-sm shadow-inner">
                       {currentTotal()} = {board.UM.length * 1000} + {board.C.length * 100} + {board.D.length * 10} + {board.U.length}
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-700 text-sm shadow-inner mt-2">
                       {currentTotal() === 0 ? "Cero" : `${board.UM.length > 0 ? board.UM.length + ' UM + ' : ''}${board.C.length > 0 ? board.C.length + ' C + ' : ''}${board.D.length > 0 ? board.D.length + ' D + ' : ''}${board.U.length > 0 ? board.U.length + ' U' : ''}`.replace(/\+\s*$/, '')}
                    </div>
                 </div>
              </div>
           </Card>
        </div>

        {/* ZONA 3 & 5: Right Sidebar (Challenge + History) */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* ZONA 3: Panel de Reto */}
           <Card className="p-6 border-slate-200 border-t-4 border-t-[var(--color-yachay-earth)] shadow-md">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="font-bold flex items-center gap-2 text-slate-800">
                    <Sparkles className="w-5 h-5 text-[var(--color-yachay-earth)]"/> Reto Actual
                 </h3>
                 <Badge variant="blue">Misión Abierta</Badge>
              </div>
              <p className="text-slate-700 text-lg mb-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                 {activeChallenge.description}
              </p>

              {message && (
                 <div className={`p-4 rounded-xl mb-6 text-sm flex gap-3 items-start border ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                    message.type === 'warning' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                    'bg-blue-50 text-blue-800 border-blue-200'
                 } animate-in fade-in slide-in-from-top-1`}>
                    {message.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600"/> :
                     message.type === 'warning' ? <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600"/> :
                     <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600"/>}
                    <div className="font-medium">{message.text}</div>
                 </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-4">
                 <Button variant="outline" className="text-sm bg-white" onClick={getHint}>Ver Pista</Button>
                 <Button variant="primary" className="text-sm shadow-sm" onClick={checkAnswer}>Verificar</Button>
              </div>

              {message?.type === 'success' && (
                 <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                    <Button variant="outline" className="w-full text-sm bg-white" onClick={() => {
                       setActiveChallengeIdx((prev) => (prev + 1) % DEMO_CHALLENGES.length);
                       resetBoard();
                       setMessage(null);
                       setHintsUsed(0);
                    }}>
                       Siguiente Reto <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                 </div>
              )}
           </Card>

           {/* ZONA 5: Historial y Evidencia */}
           <Card className="p-6 border-slate-200 shadow-sm flex flex-col h-[calc(100%-250px)] min-h-[350px]">
              <h3 className="font-bold flex items-center gap-2 text-slate-800 mb-4 border-b border-slate-100 pb-2">
                 <FileText className="w-5 h-5 text-slate-500"/> Registro de Pasos
              </h3>
              
              <div className="flex-1 overflow-y-auto mb-4 bg-slate-50 rounded-lg p-3 border border-slate-100 font-mono text-xs text-slate-600 space-y-2">
                 {history.length === 0 ? (
                    <div className="text-slate-400 italic text-center mt-4">Aún no hay acciones...</div>
                 ) : (
                    history.map((entry, idx) => (
                       <div key={idx} className="flex gap-2">
                          <span className="text-slate-400 opacity-50">&gt;</span>
                          <span>{entry}</span>
                       </div>
                    ))
                 )}
              </div>

              <div className="space-y-3 pt-2">
                 <Button variant="outline" className="w-full justify-start text-sm bg-white hover:bg-slate-50" onClick={() => { alert("Reporte PDF generado (Demo)"); logAction("Reporte PDF exportado"); }}>
                    <DownloadIcon className="w-4 h-4 mr-2 text-slate-400" /> Exportar Reporte PDF
                 </Button>
                 <Button variant="outline" className="w-full justify-start text-sm bg-white hover:bg-slate-50" onClick={() => { alert("Evidencia guardada exitosamente"); logAction("Evidencia guardada"); }}>
                    <Save className="w-4 h-4 mr-2 text-slate-400" /> Guardar Evidencia
                 </Button>
                 <Button variant="primary" className="w-full justify-start text-sm shadow-sm bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white" onClick={() => { alert("Evidencia enviada al docente"); logAction("Enviado al docente"); }}>
                    <Share className="w-4 h-4 mr-2 text-emerald-100" /> Enviar al Docente
                 </Button>
              </div>
           </Card>

        </div>
      </div>
    </div>
  );
}

function DownloadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}

