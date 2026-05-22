"use client";

import { use, useState, useEffect, useRef } from "react";
import { getDictionary } from "@/lib/dictionaries";
import ServicesGrid from "@/components/ServicesGrid";
import OffRoadShowroom from "@/components/OffRoadShowroom";
import ContactSection from "@/components/ContactSection";
import MobileActionBar from "@/components/MobileActionBar";
import { 
  Phone,
  CheckCircle,
  Layers, 
  ShieldCheck, 
  Wrench, 
  Cpu, 
  Settings, 
  ArrowRight,
  Award,
  Clock,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function LangPage({ params }: PageProps) {
  const { lang } = use(params);
  const dict = getDictionary(lang);

  // Form states matching CRO optimization guidelines
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [drivetrain, setDrivetrain] = useState("4x4");
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [contactMethod, setContactMethod] = useState("whatsapp");
  const [notes, setNotes] = useState("");
  
  // Success state
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Formats Nicaragua phone number dynamically
  const formatNicaraguaPhone = (value: string): string => {
    const hasPlus = value.startsWith("+");
    const cleaned = value.replace(/[^\d]/g, "");

    // Check if they typed the 505 country code or started with a plus
    if (hasPlus || cleaned.startsWith("505")) {
      let localDigits = "";
      if (cleaned.startsWith("505")) {
        localDigits = cleaned.slice(3);
      } else {
        localDigits = cleaned;
      }

      // Limit local digits to 8 digits max
      const limitedLocal = localDigits.slice(0, 8);

      // Format the local digits part as XXXX-XXXX
      let formattedLocal = limitedLocal;
      if (limitedLocal.length > 4) {
        formattedLocal = `${limitedLocal.slice(0, 4)}-${limitedLocal.slice(4)}`;
      }

      if (cleaned.startsWith("505") || (hasPlus && cleaned.length >= 3 && cleaned.startsWith("505"))) {
        return formattedLocal ? `+505 ${formattedLocal}` : "+505";
      } else {
        return `+${cleaned.slice(0, 11)}`;
      }
    } else {
      // Local 8-digit format: XXXX-XXXX
      const limited = cleaned.slice(0, 8);
      if (limited.length > 4) {
        return `${limited.slice(0, 4)}-${limited.slice(4)}`;
      }
      return limited;
    }
  };

  const isValidNicaraguaPhone = (phoneNum: string): boolean => {
    const digitsOnly = phoneNum.replace(/[^\d]/g, "");
    if (digitsOnly.startsWith("505")) {
      return digitsOnly.length === 11;
    }
    return digitsOnly.length === 8;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const formatted = formatNicaraguaPhone(val);
    setPhone(formatted);

    // Dynamic error clearing/validation: Only show live error once they enter enough details, otherwise clear error
    const digitsOnly = formatted.replace(/[^\d]/g, "");
    if (digitsOnly.length > 0) {
      if (digitsOnly.startsWith("505")) {
        if (digitsOnly.length === 11) {
          setPhoneError("");
        } else if (digitsOnly.length > 11) {
          setPhoneError(
            lang === "es"
              ? "Número inválido. No debe exceder de 8 dígitos después de +505."
              : "Invalid number. Must not exceed 8 digits after +505."
          );
        } else {
          setPhoneError(""); // Let them type
        }
      } else {
        if (digitsOnly.length === 8) {
          setPhoneError("");
        } else if (digitsOnly.length > 8) {
          setPhoneError(
            lang === "es"
              ? "Número inválido. El teléfono local debe tener exactamente 8 dígitos."
              : "Invalid number. Local phone must have exactly 8 digits."
          );
        } else {
          setPhoneError(""); // Let them type
        }
      }
    } else {
      setPhoneError("");
    }
  };

  const handlePhoneBlur = () => {
    if (phone && !isValidNicaraguaPhone(phone)) {
      setPhoneError(
        lang === "es"
          ? "Número de teléfono inválido para Nicaragua. Debe tener exactamente 8 dígitos (ej. 8873-0334 o +505 8873-0334)."
          : "Invalid phone number for Nicaragua. Must have exactly 8 digits (e.g. 8873-0334 or +505 8873-0334)."
      );
    } else {
      setPhoneError("");
    }
  };

  const quoteFormRef = useRef<HTMLDivElement>(null);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model || !year || !service || !phone) return;

    // Validate phone number format for Nicaragua
    if (!isValidNicaraguaPhone(phone)) {
      setPhoneError(
        lang === "es"
          ? "Número de teléfono inválido para Nicaragua. Debe tener exactamente 8 dígitos (ej. 8873-0334 o +505 8873-0334)."
          : "Invalid phone number for Nicaragua. Must have exactly 8 digits (e.g. 8873-0334 or +505 8873-0334)."
      );
      return;
    }

    const requestNotes = notes || "Mantenimiento general / Modificación personalizada.";

    // Route lead submission details to our server endpoint
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          make,
          model,
          year,
          drivetrain,
          service,
          notes: requestNotes,
          phone,
          contactMethod
        })
      });
      if (response.ok) {
        console.log("Server API accepted the transmission successfully.");
      }
    } catch (err) {
      console.error("Failed to connect to local submit endpoint:", err);
    }

    // Clear form inputs
    setMake("");
    setModel("");
    setYear("");
    setDrivetrain("4x4");
    setService("");
    setPhone("");
    setPhoneError("");
    setContactMethod("whatsapp");
    setNotes("");
    
    // Set success indicator
    setSubmitSuccess(true);
  };

  const handleSelectServiceDirect = (serviceName: string) => {
    const serviceLower = serviceName.toLowerCase();
    let serviceMapping = "";
    if (serviceLower.includes("mecánica") || serviceLower.includes("mechanic")) {
      serviceMapping = lang === "es" ? "Mecánica General" : "General Mechanics";
    } else if (serviceLower.includes("freno") || serviceLower.includes("brake")) {
      serviceMapping = lang === "es" ? "Frenos y Seguridad" : "Brakes & Safety";
    } else if (serviceLower.includes("pintura") || serviceLower.includes("paint") || serviceLower.includes("enderezado") || serviceLower.includes("bodywork")) {
      serviceMapping = lang === "es" ? "Enderezado y Pintura" : "Bodywork & Paint";
    } else if (serviceLower.includes("electric") || serviceLower.includes("electri") || serviceLower.includes("batería") || serviceLower.includes("battery")) {
      serviceMapping = lang === "es" ? "Electricidad Automotriz" : "Electrical Systems";
    } else {
      serviceMapping = lang === "es" ? "Modificaciones 4x4" : "4x4 Customization";
    }
    setService(serviceMapping);
    quoteFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectModificationDirect = (serviceName: string, notesText: string) => {
    const serviceMapping = lang === "es" ? "Modificaciones 4x4" : "4x4 Customization";
    setService(serviceMapping);
    setNotes(notesText);
    quoteFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col gap-0 select-none bg-[oklch(98%_0.005_90)] min-h-screen">
      
      {/* SECTION 1: SPLIT HERO LAYOUT (60/40 Desktop, Stacked Mobile) */}
      <section className="relative w-full border-b-2 border-[oklch(20%_0.01_60)] overflow-hidden py-16 lg:py-24 bg-[oklch(98%_0.005_90)]">
        {/* Crisp grid aesthetics using our premium background color */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Left Side (The Hook): Brand Authority & Visual Stance */}
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-sans text-[10px] font-bold text-white bg-[oklch(20%_0.01_60)] px-3 py-1.2 uppercase tracking-widest">
                {lang === "es" ? "MECÁNICA PROFESIONAL" : "PROFESSIONAL MECHANICS"}
              </span>
              <span className="font-sans text-[10px] font-bold text-[oklch(20%_0.01_60)] bg-[oklch(65%_0.22_55%)]/20 px-3 py-1.2 uppercase tracking-wider border border-[oklch(65%_0.22_55%)]/40">
                {lang === "es" ? "EQUIPAMIENTO 4X4 ELITE" : "PREMIUM 4X4 BUILDS"}
              </span>
            </div>

            <h1 className="font-space font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-[oklch(20%_0.01_60)] leading-none text-balance uppercase">
              {dict.hero_title}
            </h1>

            <p className="text-[oklch(20%_0.01_60)]/80 text-sm md:text-base leading-relaxed max-w-xl font-sans">
              {dict.hero_subtitle}
            </p>

            {/* Premium Badges for Commercial credibility */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mt-2 border-t border-b border-[oklch(20%_0.01_60)]/15 py-4">
              <div className="flex items-center gap-3">
                <div className="bg-[oklch(20%_0.01_60)]/5 p-2 shrink-0">
                  <Award className="h-5 w-5 text-[oklch(65%_0.22_55%)]" />
                </div>
                <div>
                  <h4 className="font-space font-extrabold text-xs text-[oklch(20%_0.01_60)] uppercase">
                    {lang === "es" ? "MANO DE OBRA CERTIFICADA" : "CERTIFIED LABOR"}
                  </h4>
                  <p className="text-[oklch(20%_0.01_60)]/60 text-[10px] uppercase font-semibold mt-0.5">
                    {lang === "es" ? "Mecánicos especializados" : "Rigorous diagnostic training"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[oklch(20%_0.01_60)]/5 p-2 shrink-0">
                  <Clock className="h-5 w-5 text-[oklch(62%_0.19_145%)]" />
                </div>
                <div>
                  <h4 className="font-space font-extrabold text-xs text-[oklch(20%_0.01_60)] uppercase">
                    {lang === "es" ? "REFACCIONES GENUINAS" : "GENUINE HIGH-TIER PARTS"}
                  </h4>
                  <p className="text-[oklch(20%_0.01_60)]/60 text-[10px] uppercase font-semibold mt-0.5">
                    {lang === "es" ? "Sin alteraciones ni piezas imitación" : "Direct ARB & Rough Country dealer"}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Pulse CTA Button & Secondary smooth scroll trigger */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4">
              <a 
                href="tel:+50588730334"
                className="inline-flex items-center justify-center gap-3 bg-[oklch(65%_0.22_55%)] hover:bg-[oklch(65%_0.22_55%)]/95 text-[oklch(20%_0.01_60)] font-space font-black text-sm uppercase px-6 py-4.5 border-2 border-[oklch(20%_0.01_60)] shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] hover:shadow-[2px_2px_0px_0px_rgba(20,20,20,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center rounded-none"
                id="phone-cta-btn"
              >
                <span className="relative flex h-3.5 w-3.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(20%_0.01_60)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[oklch(20%_0.01_60)]"></span>
                </span>
                <span>{lang === "es" ? "LLAMAR: +505 8873-0334" : "CALL NOW: +505 8873-0334"}</span>
              </a>

              <a 
                href="#quote-card"
                className="inline-flex items-center justify-center gap-2 border-2 border-[oklch(20%_0.01_60)] bg-white hover:bg-[oklch(20%_0.01_60)]/5 text-[oklch(20%_0.01_60)] font-space font-black text-sm uppercase px-6 py-4.5 transition-colors text-center rounded-none"
              >
                <span>{lang === "es" ? "SOLICITAR COTIZACIÓN" : "GET FREE QUOTE"}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Right Side (The Quote Engine / Pricing container) */}
          <div className="w-full lg:w-[460px] shrink-0" ref={quoteFormRef} id="quote-card">
            <div className="bg-white border-2 border-[oklch(20%_0.01_60)] p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] relative overflow-hidden h-full flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  /* The Optimistic Success Interaction flat green stamp take-over */
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[oklch(62%_0.19_145%)] text-[oklch(20%_0.01_60)] cursor-default flex flex-col items-center justify-center p-8 text-center z-10"
                    id="success-stamp-container"
                  >
                    <CheckCircle className="h-16 w-16 text-[oklch(20%_0.01_60)] animate-bounce stroke-[2.5] mb-5" />
                    
                    <h3 className="font-space font-black text-2xl tracking-tighter uppercase leading-tight text-[oklch(20%_0.01_60)] mb-3">
                      {lang === "es" ? "SOLICITUD RECIBIDA" : "SUCCESS!"}
                    </h3>

                    <p className="font-sans text-sm md:text-base font-semibold text-[oklch(20%_0.01_60)]/90 leading-relaxed max-w-xs mb-8">
                      {dict.form_success_stamp}
                    </p>

                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="font-space font-black text-xs text-[oklch(20%_0.01_60)] bg-white border-2 border-[oklch(20%_0.01_60)] uppercase px-4 py-2.5 shadow-[2px_2px_0px_0px_rgba(20,20,20,1)] active:translate-y-0.5 transition-all text-center cursor-pointer pointer-events-auto"
                      id="reset-quote-form"
                    >
                      [ {dict.form_reset} ]
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5 h-full"
                  >
                    <div>
                      <h3 className="font-space font-black text-xl text-[oklch(20%_0.01_60)] uppercase tracking-tight leading-none mb-1.5">
                        {dict.form_title}
                      </h3>
                      <p className="text-[oklch(20%_0.01_60)]/60 text-xs uppercase font-bold">
                        {dict.form_subtitle}
                      </p>
                    </div>

                    <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-4">
                      {/* Vehicle Make Dropdown */}
                      <div className="flex flex-col gap-1">
                        <label className="font-space text-[10px] font-black text-[oklch(20%_0.01_60)] uppercase tracking-wider">
                          {dict.form_make} *
                        </label>
                        <select 
                          required
                          value={make}
                          onChange={(e) => setMake(e.target.value)}
                          className="w-full bg-[oklch(98%_0.005_90)] border-2 border-[oklch(20%_0.01_60)] p-3 font-sans text-sm font-semibold focus:outline-none focus:bg-white text-[oklch(20%_0.01_60)] hover:border-[oklch(65%_0.22_55%)] transition-colors rounded-none"
                          id="make-select"
                        >
                          <option value="">{lang === "es" ? "-- SELECCIONE MARCA --" : "-- SELECT MAKE --"}</option>
                          <option value="Toyota">TOYOTA</option>
                          <option value="Nissan">NISSAN</option>
                          <option value="Ford">FORD</option>
                          <option value="Mitsubishi">MITSUBISHI</option>
                          <option value="Jeep">JEEP</option>
                          <option value="Isuzu">ISUZU</option>
                          <option value="Suzuki">SUZUKI</option>
                          <option value="Chevrolet">CHEVROLET</option>
                          <option value="Other">{lang === "es" ? "OTRA MARCA" : "OTHER"}</option>
                        </select>
                      </div>

                      {/* Model & Year Inline Row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="font-space text-[10px] font-black text-[oklch(20%_0.01_60)] uppercase tracking-wider">
                            {dict.form_model} *
                          </label>
                          <input 
                            type="text"
                            required
                            placeholder="e.g. Hilux / Pajero / Wrangler"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full bg-[oklch(98%_0.005_90)] border-2 border-[oklch(20%_0.01_60)] p-3 font-sans text-sm font-semibold focus:outline-none focus:bg-white text-[oklch(20%_0.01_60)] placeholder:text-[oklch(20%_0.01_60)]/40 focus:border-[oklch(65%_0.22_55%)] transition-colors rounded-none"
                            id="model-input"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-space text-[10px] font-black text-[oklch(20%_0.01_60)] uppercase tracking-wider">
                            {dict.form_year} *
                          </label>
                          <select 
                            required
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full bg-[oklch(98%_0.005_90)] border-2 border-[oklch(20%_0.01_60)] p-3 font-sans text-sm font-semibold focus:outline-none focus:bg-white text-[oklch(20%_0.01_60)] hover:border-[oklch(65%_0.22_55%)] transition-colors rounded-none"
                            id="year-select"
                          >
                            <option value="">{lang === "es" ? "-- AÑO --" : "-- YEAR --"}</option>
                            <option value="2026">2026</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2018-2019">2018 - 2019</option>
                            <option value="2015-2017">2015 - 2017</option>
                            <option value="2010-2014">2010 - 2014</option>
                            <option value="Before 2010">Antes de 2010</option>
                          </select>
                        </div>
                      </div>

                      {/* Drivetrain Differentiate Select */}
                      <div className="flex flex-col gap-1">
                        <label className="font-space text-[10px] font-black text-[oklch(20%_0.01_60)] uppercase tracking-wider">
                          {dict.form_drive} *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setDrivetrain("4x4")}
                            className={`p-3 text-xs font-space font-extrabold uppercase border-2 text-center transition-all ${drivetrain === "4x4" ? "bg-[oklch(20%_0.01_60)] text-white border-[oklch(20%_0.01_60)] shadow-sm" : "bg-white text-[oklch(20%_0.01_60)] border-[oklch(20%_0.01_60)]/20 hover:border-[oklch(20%_0.01_60)]"}`}
                            id="drive-4x4-btn"
                          >
                            ▲ TRACCIÓN 4X4
                          </button>
                          <button
                            type="button"
                            onClick={() => setDrivetrain("4x2")}
                            className={`p-3 text-xs font-space font-extrabold uppercase border-2 text-center transition-all ${drivetrain === "3x5" || drivetrain === "4x2" ? "bg-[oklch(20%_0.01_60)] text-white border-[oklch(20%_0.01_60)] shadow-sm" : "bg-white text-[oklch(20%_0.01_60)] border-[oklch(20%_0.01_60)]/20 hover:border-[oklch(20%_0.01_60)]"}`}
                            id="drive-4x2-btn"
                          >
                            ▼ TRACCIÓN 4X2
                          </button>
                        </div>
                      </div>

                      {/* Required Workshop Service Selection */}
                      <div className="flex flex-col gap-1">
                        <label className="font-space text-[10px] font-black text-[oklch(20%_0.01_60)] uppercase tracking-wider">
                          {dict.form_service} *
                        </label>
                        <select 
                          required
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full bg-[oklch(98%_0.005_90)] border-2 border-[oklch(20%_0.01_60)] p-3 font-sans text-sm font-semibold focus:outline-none focus:bg-white text-[oklch(20%_0.01_60)] hover:border-[oklch(65%_0.22_55%)] transition-colors rounded-none"
                          id="service-select"
                        >
                          <option value="">{lang === "es" ? "-- SELECCIONE SERVICIO --" : "-- SELECT SERVICE --"}</option>
                          <option value={lang === "es" ? "Mecánica General" : "General Mechanics"}>
                            {lang === "es" ? "Mecánica General" : "General Mechanics"}
                          </option>
                          <option value={lang === "es" ? "Frenos y Seguridad" : "Brakes & Safety"}>
                            {lang === "es" ? "Frenos y Seguridad" : "Brakes & Safety"}
                          </option>
                          <option value={lang === "es" ? "Enderezado y Pintura" : "Bodywork & Paint"}>
                            {lang === "es" ? "Enderezado y Pintura" : "Bodywork & Paint"}
                          </option>
                          <option value={lang === "es" ? "Electricidad Automotriz" : "Electrical Systems"}>
                            {lang === "es" ? "Electricidad Automotriz" : "Electrical Systems"}
                          </option>
                          <option value={lang === "es" ? "Modificaciones 4x4" : "4x4 Customization"}>
                            {lang === "es" ? "Modificaciones 4x4" : "4x4 Customization"}
                          </option>
                        </select>
                      </div>

                      {/* Custom Repair & Mod specs Details text */}
                      <div className="flex flex-col gap-1">
                        <label className="font-space text-[10px] font-black text-[oklch(20%_0.01_60)] uppercase tracking-wider">
                          {dict.form_notes}
                        </label>
                        <textarea 
                          rows={2}
                          placeholder={dict.form_notes_placeholder}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full bg-[oklch(98%_0.005_90)] border-2 border-[oklch(20%_0.01_60)] p-3 font-sans text-xs font-medium focus:outline-none focus:bg-white text-[oklch(20%_0.01_60)] placeholder:text-[oklch(20%_0.01_60)]/45 focus:border-[oklch(65%_0.22_55%)] transition-colors rounded-none resize-none"
                          id="notes-textarea"
                        />
                      </div>

                      {/* Phone & Contact Method Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="font-space text-[10px] font-black text-[oklch(20%_0.01_60)] uppercase tracking-wider">
                            {dict.form_phone} *
                          </label>
                          <input 
                            type="tel"
                            required
                            placeholder={lang === "es" ? "ej. 8873-0334 o +505 8873-0334" : "e.g. 8873-0334 or +505 8873-0334"}
                            value={phone}
                            onChange={handlePhoneChange}
                            onBlur={handlePhoneBlur}
                            className={`w-full bg-[oklch(98%_0.005_90)] border-2 p-3 font-sans text-sm font-semibold focus:outline-none focus:bg-white text-[oklch(20%_0.01_60)] placeholder:text-[oklch(20%_0.01_60)]/40 transition-colors rounded-none ${phoneError ? "border-red-600 focus:border-red-600 bg-red-50/30" : "border-[oklch(20%_0.01_60)] focus:border-[oklch(65%_0.22_55%)]"}`}
                            id="phone-input"
                          />
                          {phoneError && (
                            <span className="font-sans text-[10px] font-bold text-red-600 uppercase mt-1 leading-tight">
                              ⚠ {phoneError}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-space text-[10px] font-black text-[oklch(20%_0.01_60)] uppercase tracking-wider">
                            {dict.form_contact_method} *
                          </label>
                          <select 
                            required
                            value={contactMethod}
                            onChange={(e) => setContactMethod(e.target.value)}
                            className="w-full bg-[oklch(98%_0.005_90)] border-2 border-[oklch(20%_0.01_60)] p-3 font-sans text-sm font-semibold focus:outline-none focus:bg-white text-[oklch(20%_0.01_60)] hover:border-[oklch(65%_0.22_55%)] transition-colors rounded-none"
                            id="contact-method-select"
                          >
                            <option value="whatsapp">{dict.form_contact_whatsapp}</option>
                            <option value="call">{dict.form_contact_call}</option>
                          </select>
                        </div>
                      </div>

                      {/* Transmit Order/Quote button */}
                      <button
                        type="submit"
                        className="w-full bg-[oklch(65%_0.22_55%)] text-[oklch(20%_0.01_60)] py-4 font-space font-black text-sm uppercase border-2 border-[oklch(20%_0.01_60)] shadow-[3px_3px_0px_0px_rgba(20,20,20,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(20,20,20,1)] hover:bg-neutral-900 hover:text-white transition-all text-center shrink-0 cursor-pointer pointer-events-auto"
                        id="submit-quote-btn"
                      >
                        {dict.form_submit}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2-A: BILINGUAL CORE SERVICES GRID */}
      <div id="general-services" className="w-full">
        <ServicesGrid 
          lang={lang}
          dict={dict}
          onSelectService={handleSelectServiceDirect}
        />
      </div>

      {/* SECTION 2-B: PREMIUM 4X4 OFF-ROAD SHOWROOM */}
      <div id="offroad-showroom" className="w-full">
        <OffRoadShowroom 
          lang={lang}
          dict={dict}
          onSelectModification={handleSelectModificationDirect}
        />
      </div>

      {/* SECTION 3: BILINGUAL LANDMARK CONTACT & MAP BLOCK */}
      <div id="contact-details" className="w-full">
        <ContactSection 
          lang={lang}
          dict={dict}
        />
      </div>

      {/* MOBILE-ONLY QUICK ACTION SPEED DIAL BAR */}
      <MobileActionBar 
        lang={lang}
      />

    </div>
  );
}
