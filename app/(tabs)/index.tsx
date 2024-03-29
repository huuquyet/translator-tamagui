import { H1, Paragraph, YStack } from 'tamagui'
import { Translator } from '../components/Translator'

export default function TabOneScreen() {
  return (
    <YStack f={1} jc="center" ai="center" p="$4" gap>
      <YStack gap="$4" bc="$" jc="center">
        <H1 ta="center">Transformers.js + Tamagui</H1>
        <Paragraph ta="center">ML-powered multilingual translation in React!</Paragraph>
      </YStack>

      <Translator />
    </YStack>
  )
}
