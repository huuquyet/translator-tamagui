'use client'

import dynamic from 'next/dynamic'

export default function Page() {
  const App = dynamic(() => import('@/models/VinAIVi2En'), { ssr: false })
  return <App />
}
