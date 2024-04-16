import dynamic from 'next/dynamic'
import './globals.css'

export default function Page() {
  const App = dynamic(() => import('@/App'), { ssr: false })

  return <App />
}
