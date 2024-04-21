'use client'

import { Translator } from '@/components/Translator'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto p-2">
      <h1 className="text-5xl font-bold mb-2">Transformers.js + Next.js</h1>
      <h3 className="text-2xl font-semibold mb-4">
        ML-powered multilingual translation w/{' '}
        <a className="underline" href="http://github.com/xenova/transformers.js">
          🤗 Transformers.js!
        </a>
      </h3>

      {children}

      <div className="fixed bottom-4 right-4 left-4">
        Made with{' '}
        <a className="underline" href="https://github.com/xenova/transformers.js">
          🤗 Transformers.js
        </a>{' '}
        + Tamagui{' '}
        <a className="underline" href="https://github.com/huuquyet/translator-tamagui">
          Give it a ⭐️
        </a>
      </div>
    </div>
  )
}
