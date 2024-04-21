import { LinearGradient } from '@tamagui/linear-gradient'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { Adapt, Paragraph, Select, Sheet, XStack, YStack } from 'tamagui'

export const LanguageSelector = ({
  type,
  onChange,
  defaultLanguage,
  disableSelect,
  LANGUAGES,
}: {
  type: string
  onChange: any
  defaultLanguage: string
  disableSelect: boolean
  LANGUAGES: object
}) => {
  return (
    <XStack f={1} ai="center" jc="space-evenly">
      <Paragraph>{type}: </Paragraph>
      <Select onValueChange={onChange} defaultValue={defaultLanguage}>
        <Select.Trigger w="$15" iconAfter={ChevronDown} disabled={disableSelect}>
          <Select.Value placeholder="Languages" />
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet native={false} modal dismissOnSnapToBottom animation="quick">
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton ai="center" jc="center" pos="relative" w="100%" h="$3">
            <YStack zi={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', 'transparent']}
              br="$4"
            />
          </Select.ScrollUpButton>
          <Select.Viewport minWidth="$15">
            <Select.Group>
              <Select.Label>Languages</Select.Label>
              {Object.entries(LANGUAGES).map(([key, value], index) => (
                <Select.Item index={index} key={key} value={value}>
                  <Select.ItemText>{key}</Select.ItemText>
                  <Select.ItemIndicator ml="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton ai="center" jc="center" pos="relative" w="100%" h="$3">
            <YStack zi={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['transparent', '$background']}
              br="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    </XStack>
  )
}
