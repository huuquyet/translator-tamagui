'use client'

import dynamic from 'next/dynamic'

export default function Page({ params }: { params: { model: string } }) {
  const Component = dynamic(() => import(`@/models/${params.model}`), { ssr: false })

  return <Component />
}
