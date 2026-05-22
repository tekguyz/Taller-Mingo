import { ImageResponse } from 'next/og';

export const alt = 'Taller Mingo - Mechanical & 4x4';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  // Await the local language parameter
  const { lang } = await params;
  const isEs = lang !== 'en';
  const subHeadline = isEs 
    ? 'MECÁNICA GENERAL & DIRECCIÓN 4X4 / CHINANDEGA, NICARAGUA'
    : 'GENERAL MECHANICS & 4X4 CUSTOMIZATION / CHINANDEGA, NICARAGUA';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#141414',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* Crisp industrial blueprint grid lines overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexWrap: 'wrap',
            opacity: 0.15,
          }}
        >
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '100px',
                height: '100px',
                border: '1px solid #e07a16',
              }}
            />
          ))}
        </div>

        {/* Framing border - absolute rounded-none */}
        <div
          style={{
            position: 'absolute',
            inset: '30px',
            border: '4px solid #e07a16',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '40px',
          }}
        >
          {/* Logo Brand / Top Corner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#e07a16' }}>
              [ EST. 1995 ]
            </span>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#ffffff' }}>
              CHINANDEGA
            </span>
          </div>

          {/* Main Typography Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span
              style={{
                fontSize: 90,
                fontWeight: 950,
                color: '#ffffff',
                lineHeight: 1,
                letterSpacing: '-2px',
              }}
            >
              TALLER MINGO
            </span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: '#e07a16',
                marginTop: '10px',
              }}
            >
              {subHeadline}
            </span>
          </div>

          {/* Bottom stats / credentials */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>
              TEL: +505 8873-0334
            </span>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#e07a16' }}>
              ROUGH COUNTRY AUTHORIZED CENTER & ARB PARTNER
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
