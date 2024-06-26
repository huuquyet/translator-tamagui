'use client'

import { themeAtom } from '@/provider'
import { Monitor, Moon, Sun } from '@tamagui/lucide-icons'
import { useAtom } from 'jotai'
import type { ReactNode } from 'react'
import { Anchor, Button, H1, ScrollView, Separator, SizableText, XStack, YStack } from 'tamagui'
import HorizontalTabs from './HorizontalTabs'

const icons: any = {
  dark: <Moon />,
  light: <Sun />,
  system: <Monitor />,
}

export default function Layout({ children }: { children?: ReactNode }) {
  const [scheme, toggle] = useAtom(themeAtom)

  return (
    <ScrollView h="100vh" w="100vw" br="$4">
      <YStack f={1} h="100vh" w="100vw" jc="center" ai="center" p="$4" gap="$4">
        <YStack jc="center" gap="$4">
          <H1 ta="center">Transformers.js + Tamagui</H1>
          <SizableText ta="center">
            ML-powered multilingual translation directly in your browser!
          </SizableText>
        </YStack>

        <HorizontalTabs>{children}</HorizontalTabs>

        <Separator als="stretch" />

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

        <Button
          pos="absolute"
          b={40}
          l={30}
          icon={icons[scheme]}
          onPress={toggle as any}
          circular
        />
      </YStack>
    </ScrollView>
  )
}
