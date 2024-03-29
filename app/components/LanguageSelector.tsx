import { LinearGradient } from '@tamagui/linear-gradient'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { Platform } from 'react-native'
import { Adapt, Paragraph, Select, Sheet, YStack } from 'tamagui'
import { LANGUAGES } from '../zustand'

export const LanguageSelector = ({
  type,
  onChange,
  defaultLanguage,
}: { type: string; defaultLanguage: string; onChange: any }) => {
  return (
    <YStack>
      <Paragraph>{type}: </Paragraph>
      <Select size="$4" onValueChange={onChange} defaultValue={defaultLanguage}>
        <Select.Trigger iconAfter={ChevronDown}>
          <Select.Value placeholder="Languages" />
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet native={Platform.OS !== 'web'} modal dismissOnSnapToBottom animation="quick">
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

        <Select.Content zi={200000}>
          <Select.ScrollUpButton ai="center" jc="center" pos="relative" w="100%" h="$3">
            <YStack zi={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', '$backgroundTransparent']}
              br="$4"
            />
          </Select.ScrollUpButton>
          <Select.Viewport>
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

            {Platform.OS !== 'web' && (
              <YStack pos="absolute" r={0} t={0} b={0} ai="center" jc="center" w="$4" pe="none">
                <ChevronDown />
              </YStack>
            )}
          </Select.Viewport>
          <Select.ScrollDownButton ai="center" jc="center" pos="relative" w="100%" h="$3">
            <YStack zi={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$backgroundTransparent', '$background']}
              br="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    </YStack>
  )
}
