import { Button, H1, Paragraph, Separator, Text, XStack, YStack } from '@my/ui'
import { Monitor, Moon, Sun } from '@tamagui/lucide-icons'
import { useThemeStore } from 'app/zustand'
import { Translator } from './Translator'

const icons = {
  dark: <Moon />,
  light: <Sun />,
  system: <Monitor />,
}

export function HomeScreen() {
  const { scheme, toggleScheme } = useThemeStore()

  return (
    <YStack f={1} jc="center" ai="center" p="$4" gap="$4">
      <YStack gap="$4" bc="$" jc="center">
        <H1 ta="center">Transformers.js + Tamagui</H1>
        <Paragraph ta="center">ML-powered multilingual translation in React!</Paragraph>
      </YStack>

      <Translator />

      <Button pos="absolute" b={30} l={20} icon={icons[scheme]} onPress={toggleScheme} circular />
    </YStack>
  )
}
