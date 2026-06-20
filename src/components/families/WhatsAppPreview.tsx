import { Smartphone, MoreVertical, Phone, Video, Info } from "lucide-react";

interface WhatsAppPreviewProps {
  message: string;
  recipient?: string;
}

export default function WhatsAppPreview({ message, recipient }: WhatsAppPreviewProps) {
  const currentHour = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="w-[320px] h-[600px] mx-auto bg-slate-900 rounded-[3rem] border-[8px] border-slate-900 shadow-2xl relative overflow-hidden flex flex-col">
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
        <div className="w-32 h-6 bg-slate-900 rounded-b-3xl"></div>
      </div>
      
      {/* Phone Header - WhatsApp Style */}
      <div className="bg-[#075e54] text-white pt-8 pb-2 px-3 flex flex-col z-10">
         <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
               <div className="flex -space-x-1 items-center">
                  <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center font-bold text-slate-600 text-xs">
                     {recipient ? recipient.charAt(0) : "P"}
                  </div>
               </div>
               <div>
                  <div className="font-bold text-sm leading-tight">{recipient || "Padre/Madre"}</div>
                  <div className="text-[10px] text-emerald-100">en línea</div>
               </div>
            </div>
            <div className="flex gap-4">
               <Video className="w-5 h-5 text-emerald-50" />
               <Phone className="w-5 h-5 text-emerald-50" />
               <MoreVertical className="w-5 h-5 text-emerald-50" />
            </div>
         </div>
      </div>

      {/* Chat Background */}
      <div 
         className="flex-1 bg-[#efeae2] p-4 flex flex-col gap-3 overflow-y-auto"
         style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'contain', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(239, 234, 226, 0.9)' }}
      >
         
         <div className="w-full flex justify-center mt-2">
            <span className="bg-[#e1f3fb] text-[#1f2a30] text-[10px] py-1 px-3 rounded-lg shadow-sm">Hoy</span>
         </div>

         <div className="bg-[#fef8cb] text-[#1f2a30] p-2 rounded-lg text-xs shadow-sm flex items-start gap-2 mb-2">
            <Info className="w-4 h-4 flex-shrink-0 text-amber-500 mt-0.5" />
            Tus mensajes con el asistente YACHAYLLU están protegidos. Esta es una comunicación oficial e informativa.
         </div>

         {message ? (
            <div className="self-end bg-[#dcf8c6] max-w-[85%] rounded-lg p-2 shadow-sm relative text-[#1f2a30] text-sm leading-relaxed">
               <div className="whitespace-pre-wrap mb-3">{message}</div>
               <div className="text-[9px] text-[#000000] opacity-45 absolute bottom-1 right-2 flex items-center gap-1">
                  {currentHour} <span className="text-blue-500 font-black">✓✓</span>
               </div>
            </div>
         ) : (
            <div className="flex-1 flex items-center justify-center text-center px-6">
               <div className="bg-white/80 p-3 rounded-xl border border-slate-200 shadow-sm text-xs text-slate-500 font-medium">
                  Selecciona una plantilla o redacta un mensaje para ver cómo se verá en el teléfono del apoderado.
               </div>
            </div>
         )}
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f0f0] p-2 flex items-center gap-2">
         <div className="flex-1 bg-white rounded-full h-10 flex items-center px-4 text-slate-400 text-sm shadow-sm">
            Mensaje
         </div>
         <div className="w-10 h-10 bg-[#008f68] rounded-full flex items-center justify-center shadow-sm">
            <Smartphone className="w-5 h-5 text-white" />
         </div>
      </div>
    </div>
  );
}
