"use client";

import { useRef, useTransition } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { uploadCSVAction } from "@/lib/actions/upload-csv-action";

export function Header() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      e.target.value = "";
      const formData = new FormData();
      formData.append("file", file);
      startTransition(async () => {
        await uploadCSVAction(formData);
        queryClient.invalidateQueries({ queryKey: ["leads"] });
      });
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
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            Subir CSV
          </Button>
        </div>
      </div>
    </header>
  );
}
