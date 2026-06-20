import { Link } from "react-router-dom";
import { BookOpen, Map, Mic, Users, CheckCircle, Image, Globe, FileText, Sparkles, Languages } from "lucide-react";
import { Card } from "../../components/ui";

export default function InterculturalDashboard() {
  const isTeacher = location.pathname.startsWith('/teacher');
  const basePath = isTeacher ? '/teacher/intercultural' : '/student/intercultural';

  const cards = [
    {
      title: "Glosario Cultural",
      description: "Palabras en quechua local, inglés y su contexto.",
      icon: BookOpen,
      href: `${basePath}/glossary`,
      color: "text-amber-600 bg-amber-50"
    },
    {
      title: "Misiones Bilingües",
      description: "Aprende investigando en tu territorio.",
      icon: Map,
      href: `${basePath}/missions`,
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      title: "Rutas Turísticas",
      description: "English for Local Tourism & Quechua.",
      icon: Globe,
      href: `${basePath}/tourism`,
      color: "text-blue-600 bg-blue-50"
    },
    {
      title: "Relatos y Saberes",
      description: "Historias y conocimientos de la comunidad.",
      icon: Users,
      href: `${basePath}/library`,
      color: "text-purple-600 bg-purple-50"
    },
    {
      title: "Banco de Audios",
      description: "Pronunciación, relatos y testimonios.",
      icon: Mic,
      href: `${basePath}/audio-bank`,
      color: "text-rose-600 bg-rose-50"
    },
    {
      title: "Validación Cultural",
      description: "Revisión por sabios y docentes.",
      icon: CheckCircle,
      href: `${basePath}/validation`,
      color: "text-slate-600 bg-slate-100",
      teacherOnly: true
    },
    {
      title: "Diccionario Visual",
      description: "Conceptos clave ilustrados y traducidos.",
      icon: Image,
      href: `${basePath}/visual-dict`,
      color: "text-indigo-600 bg-indigo-50"
    },
    {
      title: "Pasaporte Intercultural",
      description: "Insignias y tu mapa de identidad.",
      icon: FileText,
      href: `${basePath}/passport`,
      color: "text-teal-600 bg-teal-50"
    },
    {
      title: "Crear recurso IA",
      description: "Generar fichas y material con IA.",
      icon: Sparkles,
      href: `${basePath}/ai-generator`,
      color: "text-[var(--color-yachay-earth)] bg-[var(--color-yachay-earth)]/10",
      teacherOnly: true
    }
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Interculturalidad YACHAYLLU</h1>
          <p className="text-slate-600 mt-2">Aprender desde la lengua, la cultura, el territorio y la identidad.</p>
        </div>
        
        {/* Language Selector MVP */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
           <Languages className="w-5 h-5 text-slate-400" />
           <select className="bg-transparent text-sm font-medium outline-none text-slate-700">
              <option>Castellano</option>
              <option>Castellano + Quechua (validado)</option>
              <option>Castellano + English</option>
              <option>Modo Trilingüe</option>
           </select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.filter(c => !c.teacherOnly || isTeacher).map((card, idx) => (
          <Link key={idx} to={card.href}>
             <Card className="h-full p-6 hover:shadow-md transition-shadow group cursor-pointer border border-slate-200">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
                   <card.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[var(--color-yachay-earth)] transition-colors">{card.title}</h3>
                <p className="text-sm text-slate-600">{card.description}</p>
                <div className="mt-4 text-sm font-bold text-[var(--color-yachay-earth)] opacity-0 group-hover:opacity-100 transition-opacity">
                   Explorar →
                </div>
             </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
