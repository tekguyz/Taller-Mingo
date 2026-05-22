import { getDictionary } from '@/lib/dictionaries';
import LayoutClientWrapper from '@/components/LayoutClientWrapper';
import { Metadata } from 'next';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

// NextJS 15 Bilingual Dynamic Metadata Engine
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang !== 'en';
  
  const title = isEs 
    ? 'Taller Mingo | Mecánica General y Modificaciones 4x4 Chinandega'
    : 'Taller Mingo | Master Mechanical Repair & 4x4 Customization';
    
  const description = isEs
    ? 'Taller mecánico experto en Chinandega. Especialistas en mantenimiento automotriz, frenos, enderezado y pintura, y modificaciones 4x4 premium como kits de suspensión Rough Country y defensas ARB.'
    : 'Expert auto repair shop in Chinandega. Specialists in general mechanics, brakes, bodywork, and premium 4x4 off-road modifications including Rough Country lift kits and ARB armor.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEs ? 'es_NI' : 'en_US',
      url: `https://tallermingo.com/${lang}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  
  // Local SEO Schema for Industrial Workshops Schema requirements
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Taller Mingo",
    "image": "https://tallermingo.com/og-image.png",
    "@id": "https://tallermingo.com/#automotive-repair",
    "url": `https://tallermingo.com/${lang}`,
    "telephone": "+50588730334",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Del Supermercado Palí, 1 cuadra al sur, Santa Ana",
      "addressLocality": "Chinandega",
      "addressRegion": "Chinandega",
      "addressCountry": "NI"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.629590,
      "longitude": -87.134179
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:30",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/tallermingochinandega/"
    ]
  };

  return (
    <>
      {/* Inject direct structured JSON-LD data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <LayoutClientWrapper lang={lang}>
        {children}
      </LayoutClientWrapper>
    </>
  );
}
