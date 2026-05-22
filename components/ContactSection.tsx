"use client";

import { Dictionary } from "@/lib/dictionaries";
import { MapPin, Clock, Compass } from "lucide-react";

interface ContactSectionProps {
  lang: string;
  dict: Dictionary;
}

export default function ContactSection({ lang, dict }: ContactSectionProps) {
  const isEs = lang === "es";

  return (
    <section id="contact-details" className="w-full bg-white py-20 lg:py-28 border-b-2 border-[oklch(20%_0.01_60)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Subtle ID reference tag - ONLY place allowed for monospace */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-mono text-[10px] text-[oklch(20%_0.01_60)]/45 uppercase tracking-wider font-semibold select-none">
            [LOC-REF: CHINANDEGA-MAIN]
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[oklch(65%_0.22_55%)] text-[oklch(20%_0.01_60)] text-[10px] font-black uppercase px-2.5 py-1 tracking-wider">
            {isEs ? "PUNTO DE REFERENCIA CENTRAL" : "CENTRAL LANDMARK LOCATION"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column (The Workshop Ledger) */}
          <div className="flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-6">
              <span className="font-space text-xs font-black uppercase text-[oklch(65%_0.22_55%)] tracking-wider">
                {isEs ? "UBICACIÓN Y LOGÍSTICA" : "LOCATION & DIRECTIONS"}
              </span>
              
              <h2 className="font-space font-black text-3xl sm:text-4xl text-[oklch(20%_0.01_60)] uppercase tracking-tighter leading-none text-balance">
                {isEs ? "DIRECCIÓN Y HORARIOS DE ATENCIÓN" : "ADDRESS & OPENING HOURS"}
              </h2>

              <p className="text-[oklch(20%_0.01_60)]/70 text-sm md:text-base leading-relaxed font-sans max-w-2xl">
                {isEs 
                  ? "Para los conductores en Nicaragua, las señas son vitales. Nos encontramos justo en el centro de Chinandega, facilitando el acceso rápido para reparaciones cotidianas y montajes 4x4 pesados."
                  : "Chinandega drivers rely on standard local landmarks for seamless navigation. We are situated in the city's operational core for effortless vehicle drop-offs."}
              </p>
            </div>

            {/* Landmark details box */}
            <div className="border-2 border-[oklch(20%_0.01_60)] p-6 md:p-8 bg-[oklch(98%_0.005_90)] flex flex-col gap-6 rounded-none shadow-[3px_3px_0px_0px_rgba(20,20,20,1)]">
              
              {/* Point of Reference Block */}
              <div className="flex items-start gap-4">
                <div className="bg-[oklch(20%_0.01_60)] text-white p-3 shrink-0 rounded-none">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-space font-extrabold text-xs text-[oklch(20%_0.01_60)] uppercase tracking-wider mb-1">
                    {isEs ? "DIRECCIÓN EXACTA (SEÑA TÍPICA)" : "EXACT LOCAL LANDMARK"}
                  </h4>
                  <p className="text-[oklch(20%_0.01_60)] text-sm font-semibold tracking-tight uppercase leading-snug">
                    Del Supermercado Palí, 1 cuadra al sur, Santa Ana, Chinandega, Nicaragua.
                  </p>
                  
                  {/* Social Proof Button */}
                  <div className="mt-4">
                    <a 
                      href="https://www.facebook.com/tallermingochinandega/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border-2 border-[oklch(20%_0.01_60)] bg-white text-[oklch(20%_0.01_60)] hover:bg-[oklch(20%_0.01_60)] hover:text-white font-sans font-black text-xs uppercase px-4 py-2.5 transition-all rounded-none shadow-[2px_2px_0px_0px_rgba(20,20,20,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                      id="facebook-social-btn"
                    >
                      <span>[ VISITAR FACEBOOK / VISIT OUR FACEBOOK ]</span>
                    </a>
                  </div>

                  <span className="text-[oklch(20%_0.01_60)]/65 text-[11px] font-sans font-medium uppercase mt-3.5 block">
                    {isEs ? "★ Frente a calle principal, portón negro de seguridad pesada." : "★ Directly facing main avenue, secured heavy metal gates."}
                  </span>
                </div>
              </div>

              {/* Working Hours Block */}
              <div className="flex items-start gap-4 border-t border-[oklch(20%_0.01_60)]/15 pt-6">
                <div className="bg-[oklch(20%_0.01_60)] text-white p-3 shrink-0 rounded-none">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="w-full">
                  <h4 className="font-space font-extrabold text-xs text-[oklch(20%_0.01_60)] uppercase tracking-wider mb-2">
                    {isEs ? "HORARIO DE ATENCIÓN" : "BUSINESS HOURS"}
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    <div className="flex justify-between items-center text-xs font-semibold text-[oklch(20%_0.01_60)] uppercase">
                      <span>Lunes a Viernes (Monday - Friday)</span>
                      <span className="font-bold">8:30 AM – 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold text-[oklch(20%_0.01_60)] uppercase border-t border-[oklch(20%_0.01_60)]/5 pt-2">
                      <span>Sábado (Saturday)</span>
                      <span className="font-bold">8:30 AM – 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold text-[oklch(20%_0.01_60)]/45 uppercase border-t border-[oklch(20%_0.01_60)]/5 pt-2">
                      <span>Domingo (Sunday)</span>
                      <span className="font-bold text-red-600">{isEs ? "CERRADO" : "CLOSED"}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Local help notice */}
            <div className="flex gap-2.5 items-center bg-[oklch(65%_0.22_55%)]/10 border border-[oklch(65%_0.22_55%)]/30 p-4 rounded-none">
              <Compass className="h-5 w-5 text-[oklch(20%_0.01_60)]/80 shrink-0" />
              <p className="text-[oklch(20%_0.01_60)]/80 text-xs font-semibold uppercase leading-tight">
                {isEs 
                  ? "Sugerencia: Si viaja de León o Managua, ingrese por la rotonda central de Chinandega y siga directo al Palí Santa Ana."
                  : "Travel Tip: If driving from León or Managua, enter via Chinandega main roundabout towards Palí Santa Ana."}
              </p>
            </div>
          </div>
          
          {/* Right Column (The Interactive Map) */}
          <div className="relative flex flex-col justify-between gap-4 h-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.2805665510914!2d-87.13417869999999!3d12.629590199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f70f18d30378b25%3A0xecc4b38d7dc24db3!2sTaller%20Mingo!5e0!3m2!1sen!2sus!4v1779451781300!5m2!1sen!2sus" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              className="w-full border-2 border-[oklch(20%_0.01_60)] rounded-none h-full min-h-[450px]"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
