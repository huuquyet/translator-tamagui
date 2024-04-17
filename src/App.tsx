'use client'

import { Translator } from '@/components/Translator'

export default function App() {
  return (
    <div className="container mx-auto p-2">
      <h1 className="text-5xl font-bold mb-2">Transformers.js + Next.js</h1>
      <h3 className="text-2xl font-semibold mb-4">
        ML-powered multilingual translation w/{' '}
        <a className="underline" href="http://github.com/xenova/transformers.js">
          🤗 Transformers.js!
        </a>
      </h3>

      <Translator />
    </div>
  )
}
