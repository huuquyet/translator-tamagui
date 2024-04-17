'use client'

import dynamic from 'next/dynamic'
import '../tamagui.css'

export default function Page() {
  const App = dynamic(() => import('@/App'), { ssr: false })

  return <App />
}
