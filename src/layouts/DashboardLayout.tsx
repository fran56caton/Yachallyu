import { ReactNode } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { BookOpen, Users, Compass, BarChart, Settings, Home, MountainSnow, Map, QrCode, Beaker, Globe, MessageCircle } from "lucide-react";
import { cn } from "../lib/utils";

export default function DashboardLayout({ children }: { children?: ReactNode }) {
  const location = useLocation();
  const isTeacher = location.pathname.startsWith('/teacher');
  const isAdmin = location.pathname.startsWith('/admin');

  const adminNav = [
    { name: "Gestión Testimonios", href: "/admin/testimonials", icon: Users },
  ];

  const teacherNav = [
    { name: "Inicio", href: "/teacher", icon: Home },
    { name: "YACHAYLLU Familias", href: "/teacher/families", icon: MessageCircle },
    { name: "Aulas & Ayllus", href: "/teacher/classes", icon: Users },
    { name: "Registro & Ayllus", href: "/teacher/registry", icon: Users },
    { name: "Plantillas", href: "/teacher/templates", icon: BookOpen },
    { name: "Generador IA", href: "/teacher/ai-generator", icon: Compass },
    { name: "Interculturalidad", href: "/teacher/intercultural", icon: Globe },
    { name: "Misiones", href: "/teacher/missions", icon: BookOpen },
    { name: "Yupana Lab", href: "/teacher/yupana", icon: MountainSnow },
    { name: "Entregas QR", href: "/teacher/deliveries", icon: QrCode },
    { name: "Mapa QR", href: "/teacher/map", icon: Map },
    { name: "YACHAYLLU LAB", href: "/teacher/lab", icon: Beaker },
    { name: "Marketplace", href: "/teacher/marketplace", icon: BookOpen },
    { name: "Progreso", href: "/teacher/analytics", icon: BarChart },
  ];

  const studentNav = [
    { name: "Mi Pasaporte", href: "/student", icon: Home },
    { name: "Mis Misiones", href: "/student/missions", icon: Compass },
    { name: "Mi Ayllu", href: "/student/ayllu", icon: Users },
    { name: "Interculturalidad", href: "/student/intercultural", icon: Globe },
    { name: "Mapa QR", href: "/student/map", icon: Map },
    { name: "YACHAYLLU LAB", href: "/student/lab", icon: Beaker },
    { name: "Yupana", href: "/student/yupana", icon: MountainSnow },
  ];

  const navItems = isAdmin ? adminNav : isTeacher ? teacherNav : studentNav;

  return (
    <div className="min-h-screen bg-[var(--color-yachay-bg)] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 relative z-10 flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between md:justify-start gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[var(--color-yachay-earth)] flex items-center justify-center text-white font-bold">
              Y
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-800">YACHAYLLU</span>
          </Link>
          
          <div className="flex items-center gap-3 md:hidden">
             <div className="px-2 py-1 bg-green-50 text-[var(--color-yachay-green)] text-xs font-medium rounded animate-pulse">
               Sincronizado
             </div>
             <Link to="/" className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
               Salir
             </Link>
          </div>
        </div>

        <div className="p-4 md:hidden border-b border-slate-100">
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {navItems.map((item) => (
               <Link
               key={item.name}
               to={item.href}
               className={cn(
                 "flex flex-col items-center gap-1 p-2 min-w-[70px] rounded-lg text-xs font-medium transition-colors",
                 location.pathname === item.href 
                   ? "bg-[var(--color-yachay-earth)] text-white" 
                   : "text-slate-600 hover:bg-slate-50"
               )}
             >
               <item.icon className="w-5 h-5" />
               <span className="truncate w-full text-center">{item.name}</span>
             </Link>
            ))}
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col space-y-1 hidden md:flex">
          <div className="mb-4 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {isAdmin ? "Panel Administrador" : isTeacher ? "Panel Docente" : "Panel Estudiante"}
          </div>
          <div className="space-y-1 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive 
                      ? "bg-[var(--color-yachay-earth)] text-white shadow-sm" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400")} />
                  {item.name}
                </Link>
              );
            })}
          </div>
          
          <div className="mt-auto pt-4">
             <Link to="/" className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full border border-slate-200">
                Log Out / Inicio
             </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100 hidden md:block">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=DocenteDemo" alt="Avatar" className="w-full h-full" />
             </div>
             <div className="flex-1 min-w-0">
               <div className="text-sm font-medium text-slate-900 truncate">Prof. Demo</div>
               <div className="text-xs text-slate-500 truncate">Ciencia y Tecnología</div>
             </div>
           </div>
           <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
             <span className="flex items-center gap-1">
               <span className="w-2 h-2 rounded-full bg-[var(--color-yachay-green)]"></span>
               Offline Ready
             </span>
             <Settings className="w-4 h-4 cursor-pointer hover:text-slate-800" />
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto pattern-andean relative z-0">
        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
           {children ? children : <Outlet />}
        </div>
      </main>
    </div>
  );
}
