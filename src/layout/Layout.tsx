'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const navItems: { label: string; slug: string; tooltip: string }[] = [
  { label: 'NLLB200', slug: 'nllb200', tooltip: 'No Language Left Behind' },
  { label: 'VinAI Vi-En', slug: 'vinaivi2en', tooltip: 'VinAI translate Vietnamese to English v2' },
  { label: 'VinAI En-Vi', slug: 'vinaien2vi', tooltip: 'VinAI translate English to Vietnamese v2' },
  { label: 'VietAI Vi-En', slug: 'vietai', tooltip: 'VietAI Vietnamese <-> English translation' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-5xl font-bold mb-2">Transformers.js + Next.js</h1>
      <h3 className="text-2xl font-semibold mb-4">
        ML-powered multilingual translation w/{' '}
        <a className="underline" href="http://github.com/xenova/transformers.js">
          🤗 Transformers.js!
        </a>
      </h3>

      <div className="flex gap-2 justify-center">
        {navItems.map(({ label, slug, tooltip }) => (
          <Link
            key={slug}
            href={`/${slug}`}
            className={`${
              pathname === `/${slug}` ? 'disabled' : 'underline'
            } group relative inline-block text-blue-500 hover:text-red-500 duration-300`}
          >
            {label}
            {/* Tooltip text here */}
            <span className="absolute hidden group-hover:flex -top-2 -right-3 translate-x-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:top-1/2  before:right-[100%] before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-gray-700">
              {tooltip}
            </span>
          </Link>
        ))}
      </div>

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
