import { Link } from "react-router-dom";
import { BookOpen, User } from "lucide-react";
import { Card, Button } from "../components/ui";

export default function RoleSelector() {
  return (
    <div className="min-h-screen bg-[var(--color-yachay-bg)] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-xl bg-[var(--color-yachay-earth)] flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-sm">
            Y
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Bienvenido a Yachayllu</h1>
          <p className="text-slate-600 mt-2">Selecciona un rol de demostración para explorar la plataforma.</p>
        </div>

        <div className="grid gap-4">
          <Link to="/teacher">
            <Card className="p-6 hover:border-[var(--color-yachay-earth)] transition-colors cursor-pointer group hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-[var(--color-yachay-earth)] flex items-center justify-center group-hover:bg-[var(--color-yachay-earth)] group-hover:text-white transition-colors">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Rol Docente</h3>
                  <p className="text-sm text-slate-500 text-balance">Accede al panel de control, generador IA de misiones y evaluación.</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/student">
            <Card className="p-6 hover:border-[var(--color-yachay-blue)] transition-colors cursor-pointer group hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-[var(--color-yachay-blue)] flex items-center justify-center group-hover:bg-[var(--color-yachay-blue)] group-hover:text-white transition-colors">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Rol Estudiante</h3>
                  <p className="text-sm text-slate-500 text-balance">Explora el pasaporte digital, misiones asignadas y la yupana virtual.</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/admin">
            <Card className="p-6 hover:border-purple-600 transition-colors cursor-pointer group hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Rol Administrador</h3>
                  <p className="text-sm text-slate-500 text-balance">Gestiona testimonios y configura la plataforma.</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
        
        <div className="mt-8 text-center">
            <Link to="/">
                <Button variant="ghost" className="text-sm">← Volver al inicio</Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
