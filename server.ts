import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "yachayllu" });
  });

  // Mock API to simulate AI Mission Generator
  app.post("/api/generate-mission", (req, res) => {
    const { topic, grade, area } = req.body;
    // In a real app, this would use the Gemini SDK
    // const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    setTimeout(() => {
      res.json({
        title: `Misión: Exploradores de ${topic}`,
        narrative: `Nuestra comunidad necesita entender mejor el impacto de ${topic}. Ustedes han sido elegidos como el Ayllu investigador.`,
        purpose: `Comprender los conceptos fundamentales de ${area} aplicados a ${topic}.`,
        activities: [
          "Investigación en campo o fuentes locales.",
          "Análisis de datos en equipo.",
          "Presentación de un prototipo o informe en el cabildo escolar."
        ],
        evidence: "Portafolio digital y exposición.",
        warning: "La IA propone. El docente valida. *Datos generados requieren revisión local.*"
      });
    }, 1500);
  });

  // Testimonials API (In-Memory Database for MVP)
  let testimonials = [
    {
       id: "1",
       name: "Rosa M.",
       role: "Docente de Ciencia y Tecnología",
       institution: "Colegio Piloto",
       region: "Lima",
       area: "Ciencia y Tecnología",
       education_level: "Secundaria",
       quote: "YACHAYLLU me permitiría transformar una clase común en una misión de investigación. En vez de solo explicar el tema, los estudiantes podrían observar, registrar datos, subir evidencias y recibir retroalimentación.",
       status: "publicado",
       label: "Testimonio demo",
       rating: 5,
       photo_url: "https://i.pravatar.cc/150?u=rosa",
       consent_display: true,
       featured: true,
       created_at: new Date().toISOString()
    },
    {
       id: "2",
       name: "Carlos A.",
       role: "Docente de Matemática",
       institution: "Colegio Piloto",
       region: "Cusco",
       area: "Matemática",
       education_level: "Secundaria",
       quote: "Lo más potente es que la matemática deja de sentirse aislada. Con las misiones, los estudiantes podrían usar proporcionalidad, gráficos y datos para resolver problemas reales de su colegio o comunidad.",
       status: "publicado",
       label: "Caso de uso simulado",
       rating: 5,
       photo_url: "https://i.pravatar.cc/150?u=carlos",
       consent_display: true,
       featured: true,
       created_at: new Date().toISOString()
    },
    {
       id: "3",
       name: "Lucía R.",
       role: "Estudiante de secundaria",
       institution: "Colegio Piloto",
       region: "Arequipa",
       area: "General",
       education_level: "Secundaria",
       quote: "Me gustaría aprender con misiones porque no sería solo copiar del cuaderno. Podríamos trabajar en equipo, escanear códigos QR, usar simuladores y demostrar lo que aprendimos con evidencias.",
       status: "publicado",
       label: "Opinión esperada",
       rating: 5,
       photo_url: "https://i.pravatar.cc/150?u=lucia",
       consent_display: true,
       featured: true,
       created_at: new Date().toISOString()
    },
    {
       id: "4",
       name: "Miguel T.",
       role: "Director de institución educativa",
       institution: "Colegio Piloto",
       region: "Piura",
       area: "General",
       education_level: "Secundaria",
       quote: "Una plataforma como YACHAYLLU ayudaría a que la institución tenga evidencias claras del aprendizaje por competencias y reportes útiles para docentes, estudiantes y familias.",
       status: "publicado",
       label: "Escenario piloto por validar",
       rating: 4,
       photo_url: "https://i.pravatar.cc/150?u=miguel",
       consent_display: true,
       featured: false,
       created_at: new Date().toISOString()
    },
    {
       id: "5",
       name: "Ana P.",
       role: "Madre de familia",
       institution: "Colegio Piloto",
       region: "Lima",
       area: "General",
       education_level: "Secundaria",
       quote: "Sería valioso ver el avance de mi hijo no solo con notas, sino con evidencias, misiones completadas, logros y recomendaciones para seguir mejorando.",
       status: "publicado",
       label: "Opinión esperada",
       rating: 5,
       photo_url: "https://i.pravatar.cc/150?u=ana",
       consent_display: true,
       featured: false,
       created_at: new Date().toISOString()
    },
    {
       id: "6",
       name: "Diego S.",
       role: "Estudiante preuniversitario",
       institution: "Colegio Piloto",
       region: "La Libertad",
       area: "General",
       education_level: "Secundaria",
       quote: "El módulo preuniversitario sería útil porque no solo mostraría preguntas, también analizaría mis errores y me recomendaría qué practicar según mi avance.",
       status: "publicado",
       label: "Testimonio demo",
       rating: 4,
       photo_url: "https://i.pravatar.cc/150?u=diego",
       consent_display: true,
       featured: false,
       created_at: new Date().toISOString()
    },
    {
       id: "7",
       name: "María Q.",
       role: "Docente rural",
       institution: "Colegio Piloto",
       region: "Ayacucho",
       area: "General",
       education_level: "Primaria",
       quote: "Lo importante es que pueda funcionar con poca conectividad. Si las misiones, fichas, QR y recursos se pueden usar sin internet, sería mucho más aplicable en escuelas rurales.",
       status: "publicado",
       label: "Caso de uso simulado",
       rating: 5,
       photo_url: "https://i.pravatar.cc/150?u=maria",
       consent_display: true,
       featured: false,
       created_at: new Date().toISOString()
    },
    {
       id: "8",
       name: "Jorge V.",
       role: "Coordinador académico",
       institution: "Colegio Piloto",
       region: "Tacna",
       area: "General",
       education_level: "Secundaria",
       quote: "YACHAYLLU podría ayudar a organizar mejor las evidencias por competencia, reducir tiempo de preparación docente y mostrar datos claros del progreso del aula.",
       status: "publicado",
       label: "Escenario piloto por validar",
       rating: 5,
       photo_url: "https://i.pravatar.cc/150?u=jorge",
       consent_display: true,
       featured: false,
       created_at: new Date().toISOString()
    }
  ];

  app.get("/api/testimonials", (req, res) => {
     res.json(testimonials.filter(t => t.status === "publicado"));
  });

  app.get("/api/testimonials/all", (req, res) => {
     res.json(testimonials);
  });

  app.get("/api/testimonials/featured", (req, res) => {
     res.json(testimonials.filter(t => t.status === "publicado" && t.featured));
  });

  app.post("/api/testimonials", (req, res) => {
     const newTestimonial = {
        id: Date.now().toString(),
        ...req.body,
        status: "pendiente",
        label: "Pendiente de validación",
        featured: false,
        created_at: new Date().toISOString()
     };
     testimonials.push(newTestimonial);
     res.status(201).json(newTestimonial);
  });

  app.patch("/api/testimonials/:id/approve", (req, res) => {
     const test = testimonials.find(t => t.id === req.params.id);
     if(test) {
        test.status = "publicado";
        test.label = req.body.label || "Testimonio validado";
        res.json(test);
     } else {
        res.status(404).json({error: "Not found"});
     }
  });

  app.patch("/api/testimonials/:id/reject", (req, res) => {
     const test = testimonials.find(t => t.id === req.params.id);
     if(test) {
        test.status = "rechazado";
        res.json(test);
     } else {
        res.status(404).json({error: "Not found"});
     }
  });

  app.patch("/api/testimonials/:id/feature", (req, res) => {
     const test = testimonials.find(t => t.id === req.params.id);
     if(test) {
        test.featured = req.body.featured;
        res.json(test);
     } else {
        res.status(404).json({error: "Not found"});
     }
  });

  app.delete("/api/testimonials/:id", (req, res) => {
     testimonials = testimonials.filter(t => t.id !== req.params.id);
     res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
