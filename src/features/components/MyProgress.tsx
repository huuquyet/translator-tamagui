import { Paragraph, Progress, YStack } from 'tamagui'

export const MyProgress = ({ text, percentage }) => {
  percentage = percentage ?? 0
  return (
    <YStack h="60" ai="center" gap>
      <Paragraph h="30" o="0.5">
        {text} ({`${percentage.toFixed(2)}%`})
      </Paragraph>
      <Progress size="$4" value={percentage}>
        <Progress.Indicator animation="bouncy" />
      </Progress>
    </YStack>
  )
}
