import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  fallback: ['Courier New', 'Courier', 'monospace'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['400', '500', '600', '700'],
  fallback: ['Courier New', 'Courier', 'monospace'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
  fallback: ['Courier New', 'Courier', 'monospace'],
});

export const metadata: Metadata = {
  title: 'Taller Mecánico Automotriz Mingo | Chinandega',
  description: 'Servicio mecánico severo y modificaciones off-road 4x4. Ingeniería rígida.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="bg-[oklch(96%_0.01_90%)] text-[oklch(25%_0.01_60%)] antialiased min-h-full flex flex-col selection:bg-[oklch(65%_0.22_55%)] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
