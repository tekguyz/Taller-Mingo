"use client";

import { Phone, MessageSquare } from "lucide-react";

interface MobileActionBarProps {
  lang: string;
}

export default function MobileActionBar({ lang }: MobileActionBarProps) {
  const isEs = lang === "es";

  // Pre-filled WhatsApp message targeted to Chinandega clientele
  const whatsappText = isEs 
    ? "Hola Taller Mingo, me interesa cotizar una reparación mecánica o modificación 4x4."
    : "Hello Taller Mingo, I would like to get a quote for standard mechanical repair or 4x4 lift modification.";

  const whatsappUrl = `https://wa.me/50588730334?text=${encodeURIComponent(whatsappText)}`;
  const phoneUrl = "tel:+50588730334";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden h-12 border-t-2 border-[oklch(20%_0.01_60)] shadow-[0_-4px_10px_rgba(20,20,20,0.1)] rounded-none w-full max-w-full overflow-hidden box-border bg-white" id="mobile-sticky-action-bar">
      
      {/* Left Action Split - CALL NOW */}
      <a 
        href={phoneUrl}
        className="w-1/2 bg-[oklch(20%_0.01_60)] text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 font-space font-black text-xs uppercase tracking-wider rounded-none no-underline border-r border-white/10"
        id="mobile-call-action-btn"
      >
        <Phone className="h-4 w-4 stroke-[2.5]" />
        <span>
          {isEs ? "LLAMAR" : "CALL NOW"}
        </span>
      </a>

      {/* Right Action Split - WHATSAPP SPEED DIAL */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-1/2 bg-[oklch(65%_0.22_55%)] text-[oklch(20%_0.01_60)] hover:bg-[oklch(65%_0.22_55%)]/90 transition-colors flex items-center justify-center gap-2 font-space font-black text-xs uppercase tracking-wider rounded-none no-underline"
        id="mobile-whatsapp-action-btn"
      >
        <MessageSquare className="h-4 w-4 stroke-[2.5]" />
        <span>
          WHATSAPP
        </span>
      </a>

    </div>
  );
}
