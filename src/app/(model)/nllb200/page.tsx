'use client'

import dynamic from 'next/dynamic'

export default function Page() {
  const App = dynamic(() => import('@/models/Nllb200'), { ssr: false })
  return <App />
}
