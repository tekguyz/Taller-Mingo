"use client";

import { Dictionary } from "@/lib/dictionaries";
import { 
  Wrench, 
  ShieldCheck, 
  Paintbrush, 
  Zap, 
  Check 
} from "lucide-react";

interface ServicesGridProps {
  lang: string;
  dict: Dictionary;
  onSelectService: (serviceName: string) => void;
}

export default function ServicesGrid({ lang, dict, onSelectService }: ServicesGridProps) {
  const services = [
    {
      id: "MECH-01",
      icon: Wrench,
      title: dict.service_mech_title,
      description: dict.service_mech_desc,
      specs: [
        dict.service_mech_spec1,
        dict.service_mech_spec2,
        dict.service_mech_spec3,
        dict.service_mech_spec4,
      ]
    },
    {
      id: "BRK-02",
      icon: ShieldCheck,
      title: dict.service_brk_title,
      description: dict.service_brk_desc,
      specs: [
        dict.service_brk_spec1,
        dict.service_brk_spec2,
        dict.service_brk_spec3,
        dict.service_brk_spec4,
      ]
    },
    {
      id: "PT-03",
      icon: Paintbrush,
      title: dict.service_paint_title,
      description: dict.service_paint_desc,
      specs: [
        dict.service_paint_spec1,
        dict.service_paint_spec2,
        dict.service_paint_spec3,
        dict.service_paint_spec4,
      ]
    },
    {
      id: "ELEC-04",
      icon: Zap,
      title: dict.service_elec_title,
      description: dict.service_elec_desc,
      specs: [
        dict.service_elec_spec1,
        dict.service_elec_spec2,
        dict.service_elec_spec3,
        dict.service_elec_spec4,
      ]
    }
  ];

  return (
    <section id="general-services" className="w-full bg-white py-20 lg:py-28 border-b-2 border-[oklch(20%_0.01_60)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header content matching premium layout and whitespace density instructions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b-2 border-[oklch(20%_0.01_60)]/10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-[oklch(65%_0.22_55%)]/15 text-[oklch(20%_0.01_60)] px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4 border border-[oklch(65%_0.22_55%)]/30">
              {lang === "es" ? "CAPACIDADES AUTOMOTRICES" : "ENGINE WORK & FLEET REPAIR"}
            </div>
            
            <h2 className="font-space font-black text-3xl sm:text-4xl text-[oklch(20%_0.01_60)] uppercase tracking-tighter leading-none text-balance">
              {dict.services_grid_title}
            </h2>
          </div>
          <div className="max-w-md shrink-0">
            <p className="text-[oklch(20%_0.01_60)]/70 text-sm md:text-base leading-relaxed font-sans">
              {dict.services_grid_subtitle}
            </p>
          </div>
        </div>

        {/* Categories Grid (2x2 or responsive list) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc) => {
            const IconComponent = svc.icon;
            return (
              <div 
                key={svc.id}
                className="bg-[oklch(98%_0.005_90)] border-2 border-[oklch(20%_0.01_60)] p-8 md:p-10 flex flex-col justify-between hover:shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all text-[oklch(20%_0.01_60)] relative group rounded-none"
                id={`service-card-${svc.id.toLowerCase()}`}
              >
                
                {/* Specific tracking tag - ONLY place allowed for monospace fonts */}
                <div className="absolute top-6 right-6 font-mono text-[10px] text-[oklch(20%_0.01_60)]/45 uppercase tracking-wider font-semibold select-none">
                  [SYS-REF: {svc.id}]
                </div>

                <div className="flex flex-col gap-6">
                  {/* Icon Area */}
                  <div className="bg-[oklch(20%_0.01_60)] text-white p-4 inline-block self-start group-hover:bg-[oklch(65%_0.22_55%)] group-hover:text-[oklch(20%_0.01_60)] transition-colors rounded-none">
                    <IconComponent className="h-6 w-6 stroke-[2.5]" />
                  </div>

                  {/* Title and Description */}
                  <div>
                    <h3 className="font-space font-black text-xl md:text-2xl uppercase tracking-tight mb-3">
                      {svc.title}
                    </h3>
                    <p className="text-[oklch(20%_0.01_60)]/80 text-sm leading-relaxed max-w-xl font-sans">
                      {svc.description}
                    </p>
                  </div>

                  {/* Operational specs list */}
                  <div className="border-t border-[oklch(20%_0.01_60)]/15 pt-6 mt-2">
                    <div className="text-[10px] font-space font-black tracking-widest uppercase text-[oklch(20%_0.01_60)]/40 mb-3 block">
                      {lang === "es" ? "TAREAS OPERATIVAS" : "OPERATIONAL PARAMETERS"}
                    </div>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" id={`svc-list-${svc.id.toLowerCase()}`}>
                      {svc.specs.map((spec, specIdx) => (
                        <li key={specIdx} className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-[oklch(20%_0.01_60)]/90 uppercase tracking-tight font-sans">
                          <Check className="h-4 w-4 text-[oklch(65%_0.22_55%)] shrink-0 stroke-[3.5]" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Dispatch direct connector click */}
                <div className="mt-8 pt-6 border-t border-[oklch(20%_0.01_60%)]/5 flex justify-end">
                  <button
                    onClick={() => onSelectService(svc.title)}
                    className="font-space text-xs font-black bg-[oklch(20%_0.01_60)] text-white hover:bg-[oklch(65%_0.22_55%)] hover:text-black hover:shadow-[2px_2px_0px_0px_rgba(20,20,20,1)] px-5 py-3 transition-all rounded-none uppercase cursor-pointer pointer-events-auto"
                    id={`btn-select-${svc.id.toLowerCase()}`}
                  >
                    {lang === "es" ? "COTIZAR SERVICIO CORRESPONDIENTE" : "QUOTE VEHICLE SERVICE"}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
