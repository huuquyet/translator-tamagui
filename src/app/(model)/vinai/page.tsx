'use client'

import dynamic from 'next/dynamic'

export default function Page() {
  const Vinai = dynamic(() => import('@/vinai/Translator'), { ssr: false })
  return <Vinai />
}
