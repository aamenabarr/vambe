"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onUpload: (file: File) => void;
}

export function Header({ onUpload }: HeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      e.target.value = "";
    }
  };

  return (
    <header className="bg-gradient-to-r from-white via-white/40 via-70% to-[#0c1445] border-b border-white/10">
      <div className="mx-auto max-w-[1600px] px-6 py-4 flex items-center justify-between">
        <Image src="/logo.png" alt="Vambe" width={120} height={40} priority />
        <div className="flex items-center gap-4">
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            onClick={() => inputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            Subir CSV
          </Button>
        </div>
      </div>
    </header>
  );
}
