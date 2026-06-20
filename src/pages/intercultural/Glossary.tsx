import { useState, useEffect } from "react";
import { Search, Plus, Filter, Volume2, CheckCircle, Clock } from "lucide-react";
import { Badge, Button, Card } from "../../components/ui";

interface GlossaryItem {
  id: string;
  spanish_term: string;
  quechua_term?: string;
  english_term?: string;
  meaning: string;
  cultural_context: string;
  category: string;
  validation_status: string;
}

export default function Glossary() {
  const [items, setItems] = useState<GlossaryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const isTeacher = location.pathname.startsWith('/teacher');

  useEffect(() => {
    // In-memory demo data
    setItems([
      {
        id: "1",
        spanish_term: "Agua",
        quechua_term: "Yaku [por validar]",
        english_term: "Water",
        meaning: "Sustancia líquida transparente e inodora.",
        cultural_context: "En la cultura andina, el agua es considerada un ser vivo (Yaku Mama) y se le guarda profundo respeto, siendo esencial para la vida comunitaria y los rituales.",
        category: "Naturaleza",
        validation_status: "Por validar"
      },
      {
        id: "2",
        spanish_term: "Comunidad",
        quechua_term: "Ayllu [por validar]",
        english_term: "Community",
        meaning: "Conjunto de personas vinculadas por características comunes.",
        cultural_context: "El ayllu es la base de la organización social andina, basada en la reciprocidad (ayni) y el trabajo colectivo (minka).",
        category: "Comunidad",
        validation_status: "Validado"
      },
      {
         id: "3",
         spanish_term: "Puente",
         quechua_term: "Chaka [por validar]",
         english_term: "Bridge",
         meaning: "Construcción que permite salvar un accidente geográfico.",
         cultural_context: "El puente simboliza la unión de dos mundos. En Huánuco, el Puente Calicanto es un símbolo histórico de la ciudad.",
         category: "Patrimonio",
         validation_status: "Validado"
      }
    ]);
  }, []);

  const filtered = items.filter(i => 
    i.spanish_term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (i.quechua_term && i.quechua_term.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Glosario Intercultural</h1>
          <p className="text-slate-600 mt-2">Palabras y conceptos en Castellano, Quechua local e Inglés.</p>
        </div>
        {isTeacher && (
           <Button variant="primary">
             <Plus className="w-5 h-5 mr-2" /> Añadir término
           </Button>
        )}
      </header>

      <div className="flex gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
               type="text" 
               placeholder="Buscar en castellano o quechua..." 
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none"
            />
         </div>
         <Button variant="outline" className="bg-white"><Filter className="w-5 h-5"/></Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
         {filtered.map(item => (
            <Card key={item.id} className="p-6 border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <h3 className="text-xl font-bold text-slate-900">{item.spanish_term}</h3>
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.category}</span>
                  </div>
                  {item.validation_status === 'Validado' ? (
                     <Badge variant="green" className="flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Validado</Badge>
                  ) : (
                     <Badge variant="yellow" className="flex items-center gap-1"><Clock className="w-3 h-3"/> {item.validation_status}</Badge>
                  )}
               </div>

               <div className="space-y-3 mb-6">
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-100/50 flex justify-between items-center">
                     <div>
                        <span className="text-[10px] uppercase font-bold text-amber-700 block mb-0.5">Quechua Local</span>
                        <span className="font-medium text-amber-900">{item.quechua_term}</span>
                     </div>
                     <button className="p-1.5 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors">
                        <Volume2 className="w-4 h-4" />
                     </button>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100/50 flex justify-between items-center">
                     <div>
                        <span className="text-[10px] uppercase font-bold text-blue-700 block mb-0.5">English</span>
                        <span className="font-medium text-blue-900">{item.english_term}</span>
                     </div>
                     <button className="p-1.5 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                        <Volume2 className="w-4 h-4" />
                     </button>
                  </div>
               </div>

               <div className="space-y-2">
                  <div className="text-sm">
                     <span className="font-bold text-slate-700">Significado: </span>
                     <span className="text-slate-600">{item.meaning}</span>
                  </div>
                  <div className="text-sm">
                     <span className="font-bold text-slate-700">Contexto Cultural: </span>
                     <span className="text-slate-600 italic">"{item.cultural_context}"</span>
                  </div>
               </div>
            </Card>
         ))}
      </div>
    </div>
  );
}
