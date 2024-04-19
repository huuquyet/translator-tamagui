'use client'

import { Translator } from '@/components/Translator'
import { themeAtom } from '@/provider'
import { Monitor, Moon, Sun } from '@tamagui/lucide-icons'
import { useAtom } from 'jotai'
import { Button, H1, Paragraph, Separator, YStack } from 'tamagui'

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
        <Paragraph ta="center">ML-powered multilingual translation in React!</Paragraph>
      </YStack>
      <Separator />

      <Translator />

      <Button pos="absolute" b={30} l={20} icon={icons[theme]} onPress={toggle as any} circular />
    </YStack>
  )
}
