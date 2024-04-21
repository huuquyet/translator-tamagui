'use client'

import dynamic from 'next/dynamic'

export default function Page() {
  const App = dynamic(() => import('@/VinAIEn2Vi'), { ssr: false })
  return <App />
}
