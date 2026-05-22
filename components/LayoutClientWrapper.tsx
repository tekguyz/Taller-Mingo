'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LayoutClientWrapperProps {
  children: React.ReactNode;
  lang: string;
}

export default function LayoutClientWrapper({ children, lang }: LayoutClientWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const targetLang = lang === 'es' ? 'en' : 'es';

  return (
    <div className="flex flex-col min-h-screen bg-[oklch(98%_0.005_90)] text-[oklch(20%_0.01_60)] font-sans">
      
      {/* CRISP WHITE NAVIGATION BAR */}
      <header className="sticky top-0 bg-white z-40 border-b-2 border-[oklch(20%_0.01_60)] transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-20 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex flex-col select-none no-underline">
            <span className="font-space font-black text-xl md:text-3xl tracking-tighter uppercase text-[oklch(20%_0.01_60)] leading-none">
              TALLER MINGO
            </span>
            <span className="hidden md:block font-sans text-[10px] text-[oklch(20%_0.01_60)]/60 font-bold tracking-widest uppercase mt-1">
              CHINANDEGA, NICARAGUA
            </span>
          </Link>

          {/* Desktop Navigation Links inside header - only visible on md and larger */}
          <nav className="hidden md:flex items-center gap-6 font-space text-xs font-black uppercase tracking-widest text-[oklch(20%_0.01_60)]">
            <Link href="#general-services" className="hover:text-[oklch(65%_0.22_55%)] transition-colors no-underline">
              [ {lang === 'es' ? 'SERVICIOS' : 'SERVICES'} ]
            </Link>
            <Link href="#offroad-showroom" className="hover:text-[oklch(65%_0.22_55%)] transition-colors no-underline">
              [ {lang === 'es' ? 'PREPARACIONES 4X4' : '4X4 BUILDS'} ]
            </Link>
            <Link href="#contact-details" className="hover:text-[oklch(65%_0.22_55%)] transition-colors no-underline">
              [ {lang === 'es' ? 'UBICACIÓN' : 'LOCATION'} ]
            </Link>
          </nav>

          {/* Desktop Menu Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href={`/${targetLang}`}
              className="font-space text-xs md:text-sm font-black uppercase transition-colors hover:text-[oklch(65%_0.22_55%)] text-[oklch(20%_0.01_60)] no-underline"
              id="lang-toggle-link"
            >
              [ {targetLang.toUpperCase()} ]
            </Link>

            <a
              href="tel:+50588730334"
              className="bg-[oklch(65%_0.22_55%)] text-[oklch(20%_0.01_60)] font-space font-black text-xs md:text-sm uppercase px-5 py-3 border-2 border-[oklch(20%_0.01_60)] shadow-[2px_2px_0px_0px_rgba(20,20,20,1)] hover:bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(20,20,20,1)] transition-all flex items-center gap-2 rounded-none no-underline"
              id="call-now-btn"
            >
              <span>CALL NOW:</span>
              <span className="underline font-bold">+505 8873-0334</span>
            </a>
          </div>

          {/* Compact Mobile Menu trigger button */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex md:hidden bg-[oklch(98%_0.005_90)] border-2 border-[oklch(20%_0.01_60)] px-3 py-1.5 font-space font-black text-xs uppercase text-[oklch(20%_0.01_60)] tracking-wider hover:bg-[oklch(20%_0.01_60)] hover:text-white transition-all rounded-none cursor-pointer"
            id="mobile-drawer-toggle-btn"
          >
            [ MENU ]
          </button>
        </div>
      </header>

      {/* HARD-EDGED SLIDE-OVER MOBILE DRAWER */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/40 md:hidden" 
          id="mobile-menu-overlay" 
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-80 h-full bg-white border-l-2 border-[oklch(20%_0.01_60)] flex flex-col p-6 rounded-none shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            id="mobile-drawer-panel"
          >
            {/* Close Button Trigger */}
            <button 
              onClick={() => setIsOpen(false)}
              className="self-end font-space font-black text-xs uppercase tracking-wider text-[oklch(20%_0.01_60)] hover:text-[oklch(65%_0.22_55%)] py-2 px-3 border border-[oklch(20%_0.01_60)]/20 hover:border-[oklch(20%_0.01_60)] mb-6 rounded-none cursor-pointer"
              id="close-drawer-btn"
            >
              [ {lang === 'es' ? 'CERRAR X' : 'CLOSE X'} ]
            </button>

            {/* Isolated Bilingual Toggle Row */}
            <div className="border-b-2 border-[oklch(20%_0.01_60)]/10 pb-4 mb-6 flex justify-between items-center" id="drawer-lang-row">
              <span className="font-space text-[10px] font-black uppercase text-[oklch(20%_0.01_60)]/50 tracking-wider">
                {lang === 'es' ? 'IDIOMA' : 'LANGUAGE'}
              </span>
              <Link
                href={`/${targetLang}`}
                onClick={() => setIsOpen(false)}
                className="font-space text-sm font-black uppercase text-[oklch(20%_0.01_60)] bg-[oklch(98%_0.005_90)] border-2 border-[oklch(20%_0.01_60)] px-3 py-1.5 rounded-none no-underline"
                id="drawer-lang-toggle"
              >
                [ {targetLang.toUpperCase()} ]
              </Link>
            </div>

            {/* Core Anchor Directories Stack with Large Touch Area */}
            <div className="flex flex-col gap-2" id="drawer-nav-links">
              <Link 
                href="#general-services"
                onClick={() => setIsOpen(false)}
                className="font-sans font-black text-xl text-[oklch(20%_0.01_60)] uppercase tracking-tight py-4 border-b border-[oklch(20%_0.01_60)]/10 hover:text-[oklch(65%_0.22_55%)] block no-underline"
              >
                {lang === 'es' ? 'SERVICIOS' : 'SERVICES'}
              </Link>
              <Link 
                href="#offroad-showroom"
                onClick={() => setIsOpen(false)}
                className="font-sans font-black text-xl text-[oklch(20%_0.01_60)] uppercase tracking-tight py-4 border-b border-[oklch(20%_0.01_60)]/10 hover:text-[oklch(65%_0.22_55%)] block no-underline"
              >
                {lang === 'es' ? 'PREPARACIONES 4X4' : '4X4 BUILDS'}
              </Link>
              <Link 
                href="#contact-details"
                onClick={() => setIsOpen(false)}
                className="font-sans font-black text-xl text-[oklch(20%_0.01_60)] uppercase tracking-tight py-4 border-b border-[oklch(20%_0.01_60)]/10 hover:text-[oklch(65%_0.22_55%)] block no-underline"
              >
                {lang === 'es' ? 'UBICACIÓN' : 'LOCATION'}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* VIEWPORT CONTROLLER MAIN CONTENT */}
      <main className="flex-grow">
        {children}
      </main>

      {/* COHESIVE, PREMIUM 3-COLUMN COMMERCIAL FOOTER */}
      <footer className="bg-[oklch(20%_0.01_60)] text-white/90 border-t-2 border-[oklch(20%_0.01_60)] py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left items-start">
          
          {/* COLUMN 1: BRAND LOGO & LANDMARK LEDGER */}
          <div className="flex flex-col gap-4 items-center md:items-start w-full">
            <h4 className="font-space font-black text-2xl tracking-tighter uppercase text-white">
              TALLER MINGO
            </h4>
            <p className="text-white/70 text-xs leading-relaxed max-w-sm">
              Autoridad Automotriz y Todoterreno en Nicaragua / Nicaraguan Off-Road Vehicle Authority.
            </p>
            {/* Address Box wrapped in hard-bordered frame */}
            <div className="border border-white/20 p-4 bg-white/5 w-full max-w-sm rounded-none text-left">
              <span className="font-space text-[10px] font-black text-[oklch(65%_0.22_55%)] tracking-wider block mb-1">
                {lang === 'es' ? 'UBICACIÓN REGISTRADA' : 'REGISTERED LANDMARK'}
              </span>
              <p className="font-sans text-xs text-white uppercase font-bold leading-normal">
                Del Supermercado Palí, 1 cuadra al sur, Santa Ana, Chinandega.
              </p>
            </div>
            <p className="text-white/40 text-[10px] tracking-widest mt-2 uppercase font-medium">
              © 2026 Taller Mingo. All Rights Reserved.
            </p>
          </div>

          {/* COLUMN 2: DIRECTORY ARCHITECTURE & VIEWPORT CONTROL */}
          <div className="flex flex-col gap-4 items-center md:items-start w-full">
            <h5 className="font-space text-xs font-black tracking-widest text-[oklch(65%_0.22_55%)] uppercase mb-1">
              {lang === 'es' ? 'DIRECTORIO DE ACCRESO' : 'CATALOGUE DIRECTORY'}
            </h5>
            <div className="flex flex-col gap-2 font-space text-xs font-black uppercase text-left">
              <Link href="#general-services" className="text-white/80 hover:text-[oklch(65%_0.22_55%)] transition-colors no-underline">
                • {lang === 'es' ? 'SERVICIOS PRINCIPALES' : 'CORE SERVICES'}
              </Link>
              <Link href="#offroad-showroom" className="text-white/80 hover:text-[oklch(65%_0.22_55%)] transition-colors no-underline">
                • {lang === 'es' ? 'PREPARACIONES TOYOTA 4X4' : 'TOYOTA 4X4 BUILDS'}
              </Link>
              <Link href="#contact-details" className="text-white/80 hover:text-[oklch(65%_0.22_55%)] transition-colors no-underline">
                • {lang === 'es' ? 'COBERTURA Y HORARIOS' : 'HOUR LEDGER & MAP'}
              </Link>
            </div>
            
            {/* Dynamic Smooth scroll to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-4 inline-flex items-center gap-1 font-space text-xs font-black uppercase text-white bg-transparent border-2 border-white px-4 py-2 hover:bg-white hover:text-[oklch(20%_0.01_60)] transition-all cursor-pointer rounded-none"
              id="scroll-to-top-btn"
            >
              [ {lang === 'es' ? 'SUBIR / TOP ↑' : 'SUBIR / TOP ↑'} ]
            </button>
          </div>

          {/* COLUMN 3: OPERATIONAL LOG & SOCIAL HUB */}
          <div className="flex flex-col gap-4 items-center md:items-start w-full">
            <h5 className="font-space text-xs font-black tracking-widest text-[oklch(65%_0.22_55%)] uppercase mb-1">
              {lang === 'es' ? 'REGISTRO DE HORAS' : 'SHIFT TIMETABLE'}
            </h5>
            <div className="w-full max-w-sm text-left border border-white/20 p-4 bg-white/5 font-mono text-xs flex flex-col gap-2 rounded-none">
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span className="text-white/65">LUN - SAB (MON - SAT):</span>
                <span className="font-bold text-white">08:30 AM - 05:00 PM</span>
              </div>
              <div className="flex justify-between text-yellow-600 font-bold">
                <span>DOMINGO (SUN):</span>
                <span>CERRADO / CLOSED</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center md:items-start w-full mt-2">
              <span className="font-sans text-[10px] text-white/50 uppercase font-black tracking-widest">
                {lang === 'es' ? 'CONEXIÓN SOCIAL COMPLETA' : 'OFFICIAL SOCIAL CONNECTION'}
              </span>
              <a 
                href="https://www.facebook.com/tallermingochinandega/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center border-2 border-[oklch(65%_0.22_55)] bg-[oklch(65%_0.22_55)] hover:bg-transparent text-[oklch(20%_0.01_60)] hover:text-white font-space font-black text-xs uppercase px-5 py-2.5 transition-colors duration-150 rounded-none no-underline"
              >
                [ FACEBOOK PAGE ]
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
