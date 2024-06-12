import Provider from '@/provider'
import '@tamagui/core/reset.css'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

if (process.env.NODE_ENV === 'production') {
  require('../../public/tamagui.css')
}

const APP_NAME = 'Translator Demo'
const APP_DEFAULT_TITLE = 'Translator demo app built with Transformers.js + Tamagui + Next.js'
const APP_TITLE_TEMPLATE = '%s - Translator'
const APP_DESCRIPTION = 'Translator demo app built with Transformer.js + Tamagui + Next.js'
const APP_URL = 'https://hf.co/spaces/huuquyet/translator-tamagui/'
const TWITTER = '@HuuQuyetNg'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  metadataBase: new URL('https://${process.env.VERCEL_URL}'),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: APP_URL,
    images: ['/images/vercel.svg'],
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    site: TWITTER,
  },
  keywords: ['Translator', 'Transformers.js', 'Next.js', 'Tamagui'],
}
