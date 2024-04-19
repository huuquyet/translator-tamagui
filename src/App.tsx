'use client'

import { Translator } from '@/components/Translator'
import { themeAtom } from '@/provider'
import { Monitor, Moon, Sun } from '@tamagui/lucide-icons'
import { useAtom } from 'jotai'
import { Anchor, Button, H1, Paragraph, XStack, YStack } from 'tamagui'

const icons: any = {
  dark: <Moon />,
  light: <Sun />,
  system: <Monitor />,
}

export default function HomeScreen() {
  const [theme, toggle] = useAtom(themeAtom)

  return (
    <YStack f={1} h="100vh" jc="center" ai="center" p="$4" gap="$4">
      <YStack gap="$4" bc="$" jc="center">
        <H1 ta="center">Transformers.js + Tamagui</H1>
        <Paragraph ta="center">
          ML-powered multilingual translation directly in your browser!
        </Paragraph>
      </YStack>

      <Translator />

      <XStack pos="absolute" b="$4">
        <Paragraph ta="center">
          Made with{' '}
          <Anchor href="https://github.com/xenova/transformers.js">🤗 Transformers.js</Anchor>
          {' + '}
          <Anchor href="https://github.com/tamagui/tamagui">Tamagui 🪄</Anchor>
          {'. '}
          <Anchor href="https://github.com/huuquyet/tranlator-tamagui">Give it a ⭐️</Anchor>
        </Paragraph>
      </XStack>

      <Button pos="absolute" b={30} l={20} icon={icons[theme]} onPress={toggle as any} circular />
    </YStack>
  )
}
