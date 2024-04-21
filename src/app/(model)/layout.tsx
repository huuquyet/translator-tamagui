import Layout from '@/layout'
import type { ReactNode } from 'react'

export default function PageLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>
}
