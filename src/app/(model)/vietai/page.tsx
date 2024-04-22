'use client'

import dynamic from 'next/dynamic'

export default function Page() {
  const App = dynamic(() => import('@/models/VietAI'), { ssr: false })
  return <App />
}
