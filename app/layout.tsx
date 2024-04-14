import Provider from '@/provider'
import { Analytics } from '@vercel/analytics/next'
import React, { type ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  )
}
