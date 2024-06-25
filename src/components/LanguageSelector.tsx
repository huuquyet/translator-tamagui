import { LinearGradient } from '@tamagui/linear-gradient'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useMemo } from 'react'
import { Adapt, Label, Select, Sheet, XStack, YStack } from 'tamagui'

interface LanguageSelectorProps {
  type: string
  onChange: any
  defaultLanguage: string
  disableSelect: boolean
  LANGUAGES: object
}

export const LanguageSelector = ({
  type,
  onChange,
  defaultLanguage,
  disableSelect,
  LANGUAGES,
}: LanguageSelectorProps) => {
  return (
    <XStack f={1} ai="center" jc="space-evenly" gap="$4">
      <Label>{type}: </Label>
      <Select onValueChange={onChange} value={defaultLanguage} disablePreventBodyScroll>
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
              {useMemo(
                () =>
                  Object.entries(LANGUAGES).map(([key, value], index) => (
                    <Select.Item index={index} key={key} value={value}>
                      <Select.ItemText>{key}</Select.ItemText>
                      <Select.ItemIndicator ml="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )),
                [LANGUAGES]
              )}
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
