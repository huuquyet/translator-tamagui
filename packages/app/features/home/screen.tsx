import { Anchor, Button, H1, Paragraph, Separator, Text, XStack, YStack } from '@my/ui'
import { Monitor, Moon, Sun } from '@tamagui/lucide-icons'
import { useThemeStore } from 'app/zustand'

const icons = {
  dark: <Moon />,
  light: <Sun />,
  system: <Monitor />,
}

export function HomeScreen() {
  const { scheme, toggleScheme } = useThemeStore()

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" bc="$" jc="center">
        <H1 ta="center">Welcome to Tamagui.</H1>
        <Paragraph ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native.
        </Paragraph>
      </YStack>

      <XStack space="$4" ai="center"></XStack>

      <Button pos="absolute" b={30} l={20} icon={icons[scheme]} onPress={toggleScheme} circular />
    </YStack>
  )
}
