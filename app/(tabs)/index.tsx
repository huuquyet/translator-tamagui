import { Button, H1, Paragraph, Separator, Text, XStack, YStack } from 'tamagui'
import { Translator } from './Translator'

export default function TabOneScreen() {
  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" bc="$" jc="center">
        <H1 ta="center">Transformers.js + Tamagui</H1>
        <Paragraph ta="center">ML-powered multilingual translation in React!</Paragraph>
      </YStack>

      <Translator />
    </YStack>
  )
}
