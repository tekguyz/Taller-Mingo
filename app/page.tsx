"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/es");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[oklch(96%_0.01_90%)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[oklch(65%_0.22_55%)] border-t-transparent animate-spin" />
        <span className="font-space text-sm tracking-widest text-[oklch(20%_0.01_60)] uppercase">
          CARGANDO TALLER MINGO...
        </span>
      </div>
    </div>
  );
}
