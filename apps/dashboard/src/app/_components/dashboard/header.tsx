'use client'

import Image from 'next/image'

import { UploadCsvButton } from '../upload-csv-button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1E3A8A]/40 bg-[#0A1121]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Vambe" width={120} height={32} className="h-8 w-auto" />
        </div>
        <UploadCsvButton />
      </div>
    </header>
  )
}
