'use client'

import dynamic from 'next/dynamic'

export default function Page() {
  const Nllb = dynamic(() => import('@/components/Translator'), { ssr: false })
  return <Nllb />
}
