'use client'

import dynamic from 'next/dynamic'

export default function Page() {
  const App = dynamic(() => import('@/vinai'), { ssr: false })
  return <App />
}
