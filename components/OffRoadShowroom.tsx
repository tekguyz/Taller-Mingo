"use client";

import { Dictionary } from "@/lib/dictionaries";
import { 
  ArrowUpRight, 
  Layers, 
  ShieldCheck, 
  Zap,
  Star
} from "lucide-react";

interface OffRoadShowroomProps {
  lang: string;
  dict: Dictionary;
  onSelectModification: (serviceName: string, notesText: string) => void;
}

export default function OffRoadShowroom({ lang, dict, onSelectModification }: OffRoadShowroomProps) {
  // Brand list for premium vehicle badges
  const supportedBrands = [
    { name: "TOYOTA", sub: "HILUX • LAND CRUISER • PRADO" },
    { name: "ISUZU", sub: "D-MAX • MU-X" },
    { name: "SUZUKI", sub: "JIMNY LIFTED • VITARA" },
    { name: "MITSUBISHI", sub: "L200 SPORTERO • MONTERO" },
  ];

  const columns = [
    {
      id: "susp",
      icon: Layers,
      title: dict.showroom_col_susp_title,
      description: dict.showroom_col_susp_desc,
      bullets: [
        dict.showroom_col_susp_li1,
        dict.showroom_col_susp_li2,
        dict.showroom_col_susp_li3,
        dict.showroom_col_susp_li4,
      ],
      brandFocus: "ROUGH COUNTRY / IRONMAN 4X4",
      serviceMapping: dict.bay1_name,
      notesSuggest: lang === "es" 
        ? "Solicitud de instalación de Suspensión Elevada Rough Country y Brazos reforzados Ironman" 
        : "Request for active lift-kit suspension installation from Rough Country and Ironman systems"
    },
    {
      id: "armor",
      icon: ShieldCheck,
      title: dict.showroom_col_armor_title,
      description: dict.showroom_col_armor_desc,
      bullets: [
        dict.showroom_col_armor_li1,
        dict.showroom_col_armor_li2,
        dict.showroom_col_armor_li3,
        dict.showroom_col_armor_li4,
      ],
      brandFocus: "ARB BUMPERS & DEFENSA SEVERA",
      serviceMapping: dict.bay2_name,
      notesSuggest: lang === "es" 
        ? "Solicitud de instalación de Defensa de Acero ARB, Winch de 12,000 lbs y Placas de Deslizamiento" 
        : "Request for ARB premium steel collision bumpers, 12,000 lbs winch, and full skid plates"
    },
    {
      id: "lighting",
      icon: Zap,
      title: dict.showroom_col_light_title,
      description: dict.showroom_col_light_desc,
      bullets: [
        dict.showroom_col_light_li1,
        dict.showroom_col_light_li2,
        dict.showroom_col_light_li3,
        dict.showroom_col_light_li4,
      ],
      brandFocus: "ARB INTENSITY & LED SYSTEMS",
      serviceMapping: dict.bay4_name,
      notesSuggest: lang === "es" 
        ? "Instalación de Sistema Eléctrico Auxiliar, Faros LED y Barras ARB de alta potencia" 
        : "Premium auxiliary led lighting array installation with sealed dual battery wiring"
    }
  ];

  return (
    <section id="offroad-showroom" className="w-full bg-[oklch(98%_0.005_90)] py-20 lg:py-28 border-b-2 border-[oklch(20%_0.01_60)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header: Underlined by a solid 2px charcoal rule */}
        <div className="border-b-2 border-[oklch(20%_0.01_60)] pb-6 mb-12">
          <span className="font-space text-xs font-black text-[oklch(65%_0.22_55%)] uppercase tracking-wider mb-2 block">
            {dict.showroom_section_tag}
          </span>
          <h2 className="font-space font-black text-3xl md:text-4xl text-[oklch(20%_0.01_60)] uppercase tracking-tighter leading-none" id="showroom-heavy-header">
            {dict.showroom_section_title}
          </h2>
          <p className="max-w-3xl text-[oklch(20%_0.01_60)]/70 text-sm md:text-base mt-2 font-sans leading-relaxed">
            {dict.showroom_section_desc}
          </p>
        </div>

        {/* Minimalist, High-Contrast Platform Brand Badges Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16" id="brand-platforms-container">
          {supportedBrands.map((brand, bIdx) => (
            <div 
              key={bIdx}
              className="bg-white border-2 border-[oklch(20%_0.01_60)] p-5 flex flex-col justify-center items-center text-center shadow-[2px_2px_0px_0px_rgba(20,20,20,1)] hover:shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] hover:-translate-y-0.5 transition-all rounded-none select-none group"
            >
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-[oklch(65%_0.22_55%)] fill-[oklch(65%_0.22_55%)]" />
                <span className="font-space font-black text-lg md:text-xl text-[oklch(20%_0.01_60)] tracking-widest uppercase">
                  {brand.name}
                </span>
                <Star className="h-3 w-3 text-[oklch(65%_0.22_55%)] fill-[oklch(65%_0.22_55%)]" />
              </div>
              <span className="font-sans text-[9px] text-[oklch(20%_0.01_60)]/50 font-bold uppercase tracking-widest mt-1.5 border-t border-[oklch(20%_0.01_60)]/10 pt-1.5 w-full">
                {brand.sub}
              </span>
            </div>
          ))}
        </div>

        {/* High-Margin Feature Panels: 3 robust columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-4">
          {columns.map((col) => {
            const ColIcon = col.icon;
            return (
              <div 
                key={col.id}
                className="bg-white border-2 border-[oklch(20%_0.01_60)] p-8 flex flex-col justify-between hover:shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] hover:-translate-y-0.5 transition-all rounded-none group text-[oklch(20%_0.01_60)]"
                id={`showroom-card-${col.id}`}
              >
                <div>
                  {/* Brand Focus Tag */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-space text-[10px] text-[oklch(65%_0.22_55%)] bg-[oklch(20%_0.01_60)] px-2.5 py-1 font-black uppercase tracking-wider block">
                      {col.brandFocus}
                    </span>
                    <ColIcon className="h-5 w-5 text-[oklch(20%_0.01_60)]/40 group-hover:text-[oklch(65%_0.22_55%)] transition-colors shrink-0" />
                  </div>

                  <h3 className="font-space font-black text-xl uppercase tracking-tight mb-4 text-balance">
                    {col.title}
                  </h3>

                  <p className="text-[oklch(20%_0.01_60)]/80 text-xs md:text-sm leading-relaxed mb-6 font-sans">
                    {col.description}
                  </p>

                  {/* Bullet Spec Checklist */}
                  <ul className="flex flex-col gap-3 py-4 border-t border-b border-[oklch(20%_0.01_60)]/10 mb-8">
                    {col.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs font-bold uppercase tracking-tight leading-snug">
                        <span className="h-1.5 w-1.5 bg-[oklch(65%_0.22_55%)] border border-[oklch(20%_0.01_60)] shrink-0 mt-1.5"></span>
                        <span className="text-[oklch(20%_0.01_60)]/90">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct CTA connector */}
                <div>
                  <button 
                    onClick={() => onSelectModification(col.serviceMapping, col.notesSuggest)}
                    className="w-full bg-[oklch(65%_0.22_55%)] hover:bg-[oklch(20%_0.01_60)] hover:text-white text-[oklch(20%_0.01_60)] py-3.5 px-4 font-space font-black text-xs uppercase border-2 border-[oklch(20%_0.01_60)] flex items-center justify-center gap-2 transition-all cursor-pointer rounded-none"
                    id={`btn-quote-mod-${col.id}`}
                  >
                    <span>{dict.showroom_cta}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick diagnostic help note */}
        <div className="border-t border-[oklch(20%_0.01_60)]/15 pt-8 mt-12 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-semibold text-[oklch(20%_0.01_60)]/60 uppercase">
          <span>{lang === "es" ? "★ Todos los ensambles off-road incluyen garantía mecánica estructurada y torque controlado oficial." : "★ All premium custom work includes calibrated torque verification and chassis safety certification."}</span>
          <span className="font-space font-black tracking-widest text-[oklch(20%_0.01_60)] select-none">TALLER MINGO • CHINANDEGA PRO SPECS</span>
        </div>

      </div>
    </section>
  );
}
