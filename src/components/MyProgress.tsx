import { Progress, SizableText, YStack } from 'tamagui'

interface MyProgressProps {
  text: string
  percentage: number
}

export const MyProgress = ({ text, percentage }: MyProgressProps) => {
  percentage = percentage ?? 0
  return (
    <YStack h="$8" ai="center" gap="$4">
      <SizableText h={30} o={0.5}>
        {text} {/* ({`${percentage.toFixed(2)}%`}) */}
      </SizableText>
      {percentage !== 100 && (
        <Progress size="$6" value={percentage}>
          <Progress.Indicator animation="bouncy" />
        </Progress>
      )}
    </YStack>
  )
}
