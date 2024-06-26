import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactNode, useState } from 'react'
import {
  AnimatePresence,
  SizableText,
  type StackProps,
  type TabLayout,
  Tabs,
  type TabsContentProps,
  type TabsTabProps,
  Tooltip,
  YStack,
} from 'tamagui'

const navItems: { label: string; slug: string; tooltip: string }[] = [
  { label: 'NLLB200', slug: 'nllb200', tooltip: 'No Language Left Behind' },
  { label: 'VinAI Vi-En', slug: 'vinaivi2en', tooltip: 'VinAI translate Vietnamese to English v2' },
  { label: 'VinAI En-Vi', slug: 'vinaien2vi', tooltip: 'VinAI translate English to Vietnamese v2' },
  { label: 'VietAI Vi-En', slug: 'vietai', tooltip: 'VietAI Vietnamese <-> English translation' },
]

export default function HorizontalTabs({ children }: { children?: ReactNode }) {
  const pathname = usePathname()
  const [tabState, setTabState] = useState<{
    currentTab: string
    intentAt: TabLayout | null // Layout of the Tab user might intend to select (hovering / focusing)
    activeAt: TabLayout | null // Layout of the Tab user selected
    prevActiveAt: TabLayout | null // Used to get the direction of activation for animating the active indicator
  }>({
    activeAt: null,
    currentTab: 'Nllb200',
    intentAt: null,
    prevActiveAt: null,
  })

  const setCurrentTab = (currentTab: string) => setTabState({ ...tabState, currentTab })
  const setIntentIndicator = (intentAt: any) => setTabState({ ...tabState, intentAt })
  const setActiveIndicator = (activeAt: any) =>
    setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt })
  const { activeAt, intentAt, prevActiveAt, currentTab } = tabState

  // 1 = right, 0 = nowhere, -1 = left
  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0
    }
    return activeAt.x > prevActiveAt.x ? -1 : 1
  })()

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
    if (type === 'select') {
      setActiveIndicator(layout)
    } else {
      setIntentIndicator(layout)
    }
  }

  return (
    <Tabs
      defaultValue={currentTab}
      onValueChange={setCurrentTab}
      orientation="horizontal"
      s="$4"
      fd="column"
      // width={400}
      // height={150}
      br="$4"
      bw="$0.25"
      overflow="hidden"
      borderColor="$borderColor"
      activationMode="manual"
      bc="$background"
    >
      <YStack>
        <AnimatePresence>
          {intentAt && (
            <TabsRovingIndicator width={intentAt.width} height="$0.5" x={intentAt.x} bottom={0} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeAt && (
            <TabsRovingIndicator
              theme="active"
              active
              width={activeAt.width}
              height="$0.5"
              x={activeAt.x}
              bottom={0}
            />
          )}
        </AnimatePresence>
        <Tabs.List
          disablePassBorderRadius="bottom"
          aria-label="Choose the model"
          loop={false}
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          pd="$1.5"
          borderColor="$color3"
          borderBottomWidth="$0.5"
          bc="transparent"
        >
          {navItems.map(({ label, slug, tooltip }) => (
            <Tabs.Tab
              unstyled
              paddingHorizontal="$3"
              paddingVertical="$2"
              value="label"
              key={slug}
              onInteraction={handleOnInteraction}
            >
              <Tooltip placement="top">
                <Tooltip.Trigger>
                  <Link
                    href={`/${slug}`}
                    style={{ textDecoration: `${pathname === `/${slug}` ? 'none' : 'underline'}` }}
                  >
                    <SizableText size="$4" ff="$body">
                      {label}
                    </SizableText>
                  </Link>
                </Tooltip.Trigger>
                <Tooltip.Content
                  enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                  exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
                  scale={1}
                  x={0}
                  y={0}
                  opacity={1}
                  animation={[
                    'quick',
                    {
                      opacity: {
                        overshootClamping: true,
                      },
                    },
                  ]}
                >
                  <Tooltip.Arrow />
                  <SizableText size="$2" lineHeight="$1">
                    {tooltip}
                  </SizableText>
                </Tooltip.Content>
              </Tooltip>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </YStack>
      <AnimatePresence exitBeforeEnter custom={{ direction }} initial={false}>
        <TabsContent value={currentTab} key={currentTab}>
          {children}
        </TabsContent>
      </AnimatePresence>
    </Tabs>
  )
}

function TabsContent(props: TabsContentProps) {
  return (
    <Tabs.Content
      backgroundColor="$background"
      padding="$2"
      alignItems="center"
      justifyContent="center"
      flex={1}
      borderColor="$background"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      {...props}
    >
      {props.children}
    </Tabs.Content>
  )
}

const TabsRovingIndicator = ({ active, ...props }: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: '$color8',
        opacity: 0.6,
      })}
      {...props}
    />
  )
}
