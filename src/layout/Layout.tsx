'use client'

import { themeAtom } from '@/provider'
import { Monitor, Moon, Sun } from '@tamagui/lucide-icons'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { Anchor, Button, H1, Separator, SizableText, Tooltip, XStack, YStack } from 'tamagui'

const icons: any = {
  dark: <Moon />,
  light: <Sun />,
  system: <Monitor />,
}

const navItems: { label: string; slug: string; tooltip: string }[] = [
  { label: 'NLLB200', slug: 'nllb200', tooltip: 'No Language Left Behind' },
  { label: 'VinAI Vi-En', slug: 'vinaivi2en', tooltip: 'VinAI translate Vietnamese to English v2' },
  { label: 'VinAI En-Vi', slug: 'vinaien2vi', tooltip: 'VinAI translate English to Vietnamese v2' },
  { label: 'VietAI Vi-En', slug: 'vietai', tooltip: 'VietAI Vietnamese <-> English translation' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const [theme, toggle] = useAtom(themeAtom)
  const pathname = usePathname()

  return (
    <YStack f={1} h="100vh" jc="center" ai="center" p="$4" gap="$4">
      <YStack gap="$4" bc="$" jc="center">
        <H1 ta="center">Transformers.js + Tamagui</H1>
        <SizableText ta="center">
          ML-powered multilingual translation directly in your browser!
        </SizableText>
      </YStack>

      <XStack gap="$4">
        <SizableText>Model:</SizableText>
        {navItems.map(({ label, slug, tooltip }) => (
          <Tooltip placement="bottom" key={slug}>
            <Tooltip.Trigger>
              <Link
                href={`/${slug}`}
                style={{ textDecoration: `${pathname === `/${slug}` ? 'none' : 'underline'}` }}
              >
                <SizableText size="$4">{label}</SizableText>
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Content
              enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
              scale={1}
              x={0}
              y={0}
              opacity={1}
              animation={[
                'quick',
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
            >
              <Tooltip.Arrow />
              <SizableText size="$2" lineHeight="$1">
                {tooltip}
              </SizableText>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </XStack>
      <Separator als="stretch" />

      {children}

      <XStack pos="absolute" b="$4">
        <SizableText ta="center">
          Made with{' '}
          <Anchor href="https://github.com/xenova/transformers.js">🤗 Transformers.js</Anchor>
          {' + '}
          <Anchor href="https://github.com/tamagui/tamagui">Tamagui 🪄</Anchor>
          {'. '}
          <Anchor href="https://github.com/huuquyet/tranlator-tamagui">Give it a ⭐️</Anchor>
        </SizableText>
      </XStack>

      <Button pos="absolute" b={30} l={20} icon={icons[theme]} onPress={toggle as any} circular />
    </YStack>
  )
}
