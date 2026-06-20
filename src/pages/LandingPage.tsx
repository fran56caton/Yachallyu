import { Link } from "react-router-dom";
import { Button } from "../components/ui";
import { ArrowRight, Globe, Layers, BookOpen, Map, QrCode, Cpu, Download } from "lucide-react";
import { motion } from "motion/react";
import TestimonialsSection from "../components/testimonials/TestimonialsSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-yachay-bg)] text-slate-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded bg-[var(--color-yachay-earth)] flex items-center justify-center text-white font-bold">
              Y
            </div>
            <span className="font-display font-bold text-xl tracking-tight">YACHAYLLU</span>
          </div>
          <div className="hidden md:flex gap-6 items-center flex-1 justify-center text-sm font-medium text-slate-600">
            <a href="#problema" className="hover:text-[var(--color-yachay-earth)] transition-colors">El Problema</a>
            <a href="#solucion" className="hover:text-[var(--color-yachay-earth)] transition-colors">La Solución</a>
            <a href="#modulos" className="hover:text-[var(--color-yachay-earth)] transition-colors">Módulos</a>
            <a href="#planes" className="hover:text-[var(--color-yachay-earth)] transition-colors">Planes</a>
            <a href="#contacto" className="hover:text-[var(--color-yachay-earth)] transition-colors">Contacto</a>
          </div>
          <div className="flex gap-3">
             <Link to="/login">
               <Button variant="ghost">Iniciar Sesión</Button>
             </Link>
             <Link to="/role">
               <Button variant="primary" className="hidden sm:inline-flex">Probar Demo</Button>
             </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-100 blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-100 blur-3xl opacity-50 z-0"></div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-yachay-earth)]/10 text-[var(--color-yachay-earth-dark)] text-sm font-semibold mb-6">
              EdTech Híbrida para la EBR
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Convierte el currículo en <span className="text-[var(--color-yachay-earth)]">misiones reales</span> de aprendizaje.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl text-balance">
              Plataforma EdTech offline-first con IA, mapas QR, pasaporte digital, kits físicos, yupana virtual, simulaciones y analítica por competencias.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
               <Link to="/teacher">
                 <Button variant="primary" className="h-12 px-6 w-full sm:w-auto text-base">
                   Probar demo docente <ArrowRight className="ml-2 w-4 h-4" />
                 </Button>
               </Link>
               <Link to="/role">
                 <Button variant="outline" className="h-12 px-6 w-full sm:w-auto text-base">
                   Explorar misiones
                 </Button>
               </Link>
               <a href="#contacto">
                 <Button variant="ghost" className="h-12 px-6 w-full sm:w-auto text-base underline underline-offset-4">
                   Solicitar implementación
                 </Button>
               </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative hidden lg:block">
             <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop" alt="Estudiantes usando la plataforma" className="w-full h-full object-cover aspect-[4/3] transform hover:scale-105 transition-transform duration-700" />
             </div>
             {/* Floating badge */}
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4 animate-bounce">
                <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
                   <QrCode className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-sm font-bold text-slate-800">Mapa QR Activado</div>
                   <div className="text-xs text-slate-500">Misión Kotosh Iniciada</div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Problem & Solution Grid */}
      <section id="problema" className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
             <div>
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-8">¿Por qué YACHAYLLU?</h2>
                <div className="space-y-8">
                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 mt-1 flex-shrink-0 bg-white shadow-sm text-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6"/>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-slate-800">Cursos aislados</h3>
                      <p className="text-slate-600 leading-relaxed mt-1">Baja conexión entre el aprendizaje en el aula y la realidad del estudiante.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 mt-1 flex-shrink-0 bg-white shadow-sm text-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6"/>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-slate-800">Sobrecarga docente</h3>
                      <p className="text-slate-600 leading-relaxed mt-1">Docentes con muy poco tiempo para diseñar materiales y rúbricas contextualizadas.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 mt-1 flex-shrink-0 bg-white shadow-sm text-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6"/>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-slate-800">Brecha digital</h3>
                      <p className="text-slate-600 leading-relaxed mt-1">Plataformas que dependen 100% de una conexión a internet estable.</p>
                    </div>
                  </div>
                </div>
             </div>

             <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-yachay-earth)] to-amber-300 transform rounded-2xl rotate-3 opacity-20"></div>
                <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-200 relative z-10" id="solucion">
                   <div className="absolute top-0 right-0 p-6 opacity-10">
                     <Cpu className="w-32 h-32 text-[var(--color-yachay-earth)]" />
                   </div>
                   <h2 className="text-3xl font-display font-bold mb-8 text-[var(--color-yachay-earth-dark)]">Nuestra Solución</h2>
                   <ul className="space-y-6">
                     <li className="flex items-start gap-4">
                       <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm border border-emerald-200">✓</div>
                       <span className="text-slate-700 text-lg">Convierte el colegio y la comunidad en un territorio de aprendizaje vivo.</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm border border-emerald-200">✓</div>
                       <span className="text-slate-700 text-lg">Cada estudiante participa en misiones y equipos de forma colaborativa (Ayllus).</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm border border-emerald-200">✓</div>
                       <span className="text-slate-700 text-lg">IA Generativa que crea misiones adaptadas al contexto validables por el docente.</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm border border-emerald-200">✓</div>
                       <span className="text-slate-700 text-lg"><strong className="text-slate-900">Offline-First</strong>: Funciona completamente sin internet y sincroniza después.</span>
                     </li>
                   </ul>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Components Section */}
      <section id="modulos" className="py-20 px-4 max-w-7xl mx-auto">
         <div className="text-center mb-16">
           <h2 className="text-3xl font-display font-bold mb-4">Todo lo necesario en un solo entorno</h2>
           <p className="text-slate-600 max-w-2xl mx-auto text-balance">
             Diseñado específicamente para el Currículo Nacional de Educación Básica (CNEB), YACHAYLLU atiende todas las áreas con herramientas específicas.
           </p>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: "Software Offline", icon: Download, color: "text-blue-600 bg-blue-50", to: "/teacher/analytics" },
              { title: "Generador IA", icon: Cpu, color: "text-purple-600 bg-purple-50", to: "/teacher/ai-generator" },
              { title: "Mapas QR", icon: QrCode, color: "text-slate-800 bg-slate-100", to: "/teacher/map" },
              { title: "Pasaporte Digital", icon: BookOpen, color: "text-orange-600 bg-orange-50", to: "/student" },
            ].map((mod, i) => (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} key={mod.title}>
                <Link to={mod.to} className="group p-6 rounded-xl border border-slate-200 bg-white text-center hover:shadow-lg hover:border-[var(--color-yachay-earth)] transition-all transform hover:-translate-y-1 block h-full">
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${mod.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <mod.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{mod.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">Probar módulo</p>
                </Link>
              </motion.div>
            ))}
         </div>
      </section>

      <TestimonialsSection />

      <section id="planes" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Planes y Precios</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Selecciona el plan que se adapte mejor a las necesidades de tu institución educativa.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-xl font-bold mb-2">Básico</h3>
              <p className="text-slate-500 mb-6 flex-1">Ideal para docentes individuales o clases pequeñas.</p>
              <div className="text-4xl font-display font-bold mb-6">Gratis</div>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 items-start"><span className="text-emerald-500">✓</span> Misiones limitadas</li>
                <li className="flex gap-2 items-start"><span className="text-emerald-500">✓</span> 1 Aula virtual</li>
                <li className="flex gap-2 items-start"><span className="text-emerald-500">✓</span> Pasaporte digital básico</li>
              </ul>
              <Button variant="outline" className="w-full">Comenzar Gratis</Button>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-[var(--color-yachay-earth)] shadow-xl flex flex-col relative scale-[1.02]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-yachay-earth)] text-white px-3 py-1 rounded-full text-xs font-bold">Más Popular</div>
              <h3 className="text-xl font-bold mb-2">Institucional</h3>
              <p className="text-slate-500 mb-6 flex-1">Para colegios que buscan transformar su ecosistema de aprendizaje.</p>
              <div className="text-4xl font-display font-bold mb-6 text-slate-900">Personalizado</div>
              <ul className="space-y-3 mb-8 text-slate-700">
                <li className="flex gap-2 items-start"><span className="text-[var(--color-yachay-earth)] font-bold">✓</span> Misiones ilimitadas</li>
                <li className="flex gap-2 items-start"><span className="text-[var(--color-yachay-earth)] font-bold">✓</span> Análisis por competencias</li>
                <li className="flex gap-2 items-start"><span className="text-[var(--color-yachay-earth)] font-bold">✓</span> Sincronización Offline-First</li>
                <li className="flex gap-2 items-start"><span className="text-[var(--color-yachay-earth)] font-bold">✓</span> Mapas QR Interactivos</li>
              </ul>
              <a href="#contacto"><Button variant="primary" className="w-full">Solicitar Demo</Button></a>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-slate-300 transition-colors">
              <h3 className="text-xl font-bold mb-2">Regional</h3>
              <p className="text-slate-500 mb-6 flex-1">Gestión a nivel UGEL o redes educativas enteras.</p>
              <div className="text-4xl font-display font-bold mb-6 text-slate-900">A medida</div>
              <ul className="space-y-3 mb-8 text-slate-700">
                <li className="flex gap-2 items-start"><span className="text-emerald-500 font-bold">✓</span> Todo lo de Institucional</li>
                <li className="flex gap-2 items-start"><span className="text-emerald-500 font-bold">✓</span> Dashboards analíticos globales</li>
                <li className="flex gap-2 items-start"><span className="text-emerald-500 font-bold">✓</span> APIs y exportación avanzada</li>
              </ul>
              <a href="#contacto"><Button variant="outline" className="w-full bg-slate-50">Contactar Ventas</Button></a>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-slate-50 py-24 px-4 border-t border-slate-200">
         <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-[var(--color-yachay-earth)] p-8 text-white text-center">
               <h2 className="text-3xl font-display font-bold mb-2">¿Listo para transformar tu colegio?</h2>
               <p className="text-orange-100">Déjanos tus datos y nuestro equipo educativo te contactará para una demostración guiada.</p>
            </div>
            <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Mensaje enviado exitosamente. ¡Nos contactaremos pronto!"); }}>
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nombre completo</label>
                    <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none" placeholder="Juan Pérez" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Correo institucional</label>
                    <input type="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none" placeholder="director@colegio.edu.pe" />
                 </div>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Institución Educativa</label>
                  <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none" placeholder="I.E. Los Libertadores" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Mensaje o necesidad principal</label>
                  <textarea rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--color-yachay-earth)] outline-none" placeholder="Nos gustaría implementar misiones en nuestra currícula..." />
               </div>
               <Button type="submit" variant="primary" className="w-full text-lg h-12 shadow-md hover:-translate-y-0.5 transition-all">Enviar Mensaje</Button>
            </form>
         </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
           <div>
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 rounded bg-[var(--color-yachay-earth)] flex items-center justify-center text-white font-bold">Y</div>
                 <span className="font-display font-bold text-xl tracking-tight text-white">YACHAYLLU</span>
              </div>
              <p className="text-sm">Transformando la educación básica regular en Perú a través de misiones conectadas con el mundo real.</p>
           </div>
           <div>
              <h4 className="text-white font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm">
                 <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                 <li><a href="#planes" className="hover:text-white transition-colors">Planes y Precios</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Historias de Éxito</a></li>
              </ul>
           </div>
           <div>
              <h4 className="text-white font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm">
                 <li><a href="#" className="hover:text-white transition-colors">Manual de Usuario</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Guía Offline</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
              </ul>
           </div>
           <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm">
                 <li>Soporte: ayuda@yachayllu.edu.pe</li>
                 <li>Ventas: ventas@yachayllu.edu.pe</li>
                 <li>Lima, Perú</li>
              </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-sm text-center">
            &copy; {new Date().getFullYear()} Yachayllu. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
