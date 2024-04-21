'use client'

import dynamic from 'next/dynamic'

export default function Page() {
  const App = dynamic(() => import('@/nllb'), { ssr: false })
  return <App />
}
