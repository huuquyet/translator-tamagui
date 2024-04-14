'use client'

import { useThemeStore } from '@/zustand'
import { Monitor, Moon, Sun } from '@tamagui/lucide-icons'
import { Button, H1, Paragraph, Separator, YStack } from 'tamagui'
import { Translator } from './Translator'

const icons: any = {
  dark: <Moon />,
  light: <Sun />,
  system: <Monitor />,
}

export default function HomeScreen() {
  const { scheme, toggleScheme } = useThemeStore()

  return (
    <YStack f={1} h="100vh" jc="center" ai="center" p="$4" gap="$4">
      <YStack gap="$4" bc="$" jc="center">
        <H1 ta="center">Transformers.js + Tamagui</H1>
        <Paragraph ta="center">ML-powered multilingual translation in React!</Paragraph>
      </YStack>
      <Separator />

      <Translator />

      <Button pos="absolute" b={30} l={20} icon={icons[scheme]} onPress={toggleScheme} circular />
    </YStack>
  )
}
