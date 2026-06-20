import { useState } from "react";
import { Button, Card, Badge, Modal } from "../../components/ui";
import { ShoppingCart, Star, Box, Download, Check } from "lucide-react";

export default function Marketplace() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  
  const [cart, setCart] = useState<number[]>([]);

  const showModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  const addToCart = (p: typeof products[0]) => {
     if (p.type === 'Digital') {
        showModal("Recurso Desbloqueado", `"${p.title}" se ha añadido a tu biblioteca de plantillas y recursos y ya está disponible para usar.`);
        return;
     }

     if (!cart.includes(p.id)) {
        setCart([...cart, p.id]);
     }
  };

  const viewCart = () => {
    if (cart.length === 0) {
      showModal("Carrito Vacío", "No tienes artículos en tu carrito. Explora el catálogo para solicitar materiales.");
    } else {
      const total = cart.length;
      showModal("Solicitud de Materiales", `Tienes ${total} kit(s) físico(s) en tu carrito. A la institución se le enviará la cotización y los detalles logísticos para la implementación en aula.`);
    }
  };

  const products = [
    { id: 1, title: "Kit de Ciencias Nivel I", desc: "Materiales físicos para experimentos de biología y química básica.", price: "S/ 45.00", rating: 4.8, stock: "En stock", type: "Físico" },
    { id: 2, title: "Misiones Extra: Historia Local", desc: "Pack de 10 misiones adicionales sobre patrimonio cultural.", price: "Gratis", rating: 4.9, stock: "Digital", type: "Digital" },
    { id: 3, title: "Sensores Ambientales IoT", desc: "Kit de Arduino con sensores de humedad y temperatura para proyectos.", price: "S/ 120.00", rating: 4.7, stock: "En stock", type: "Físico" },
    { id: 4, title: "Guía Didáctica Docente", desc: "Manual avanzado para implementar Aprendizaje Basado en Proyectos.", price: "Gratis", rating: 5.0, stock: "Digital", type: "Digital" }
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
           <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Yachayllu Marketplace</h1>
           <p className="text-slate-600 mt-1">Recursos, kits educativos y misiones adicionales para tu institución.</p>
        </div>
        <Button variant={cart.length > 0 ? "primary" : "outline"} onClick={viewCart}>
           <ShoppingCart className="w-4 h-4 mr-2 inline" /> Ver Carrito ({cart.length})
        </Button>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2">
         <Button variant="primary" className="whitespace-nowrap transition-transform active:scale-95 text-sm">Todos</Button>
         <Button variant="outline" className="whitespace-nowrap transition-transform active:scale-95 text-sm">Recursos Físicos</Button>
         <Button variant="outline" className="whitespace-nowrap transition-transform active:scale-95 text-sm">Misiones Digitales</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
         {products.map(p => {
            const inCart = cart.includes(p.id);
            return (
              <Card key={p.id} className="flex flex-col justify-between hover:border-[var(--color-yachay-earth)] transition-colors group">
                 <div className="p-5">
                    <div className="aspect-square bg-slate-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                       <Box className="w-12 h-12 text-slate-300 group-hover:text-[var(--color-yachay-earth)] transition-colors" />
                    </div>
                    <div className="flex justify-between items-start mb-2 gap-2">
                       <h3 className="font-bold text-slate-900 leading-tight">{p.title}</h3>
                       <Badge variant={p.type === 'Digital' ? 'blue' : 'earth'}>{p.type}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{p.desc}</p>
                    <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                       <Star className="w-4 h-4 fill-current" /> {p.rating}
                    </div>
                 </div>
                 <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 rounded-b-xl">
                    <div className="font-bold text-lg text-slate-900">{p.price}</div>
                    <Button 
                       variant={inCart ? "ghost" : "primary"}
                       className="text-sm shadow-sm hover:translate-y-[-1px] transition-transform" 
                       onClick={() => addToCart(p)}
                       disabled={inCart}
                    >
                      {p.type === 'Digital' ? <Download className="w-4 h-4 mr-1 inline" /> : inCart ? <Check className="w-4 h-4 mr-1 inline" /> : <ShoppingCart className="w-4 h-4 mr-1 inline"/>}
                      {p.type === 'Digital' ? 'Obtener' : inCart ? 'Añadido' : 'Añadir'}
                    </Button>
                 </div>
              </Card>
            );
         })}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
         <div className="space-y-4">
           <p className="text-slate-600">
             {modalContent}
           </p>
           <Button className="w-full" onClick={() => setModalOpen(false)}>Seguir Comprando</Button>
         </div>
      </Modal>
    </div>
  );
}
