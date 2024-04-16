import { themeAtom } from '@/_layout'
import { Monitor, Moon, Sun } from '@tamagui/lucide-icons'
import { Tabs } from 'expo-router'
import { useAtom } from 'jotai'
import { Button, Text } from 'tamagui'

const icons = {
  dark: <Moon />,
  light: <Sun />,
  system: <Monitor />,
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <Text>Hello!</Text>,
          headerRight: () => <ThemeButton />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <Text>Hello!</Text>,
          headerRight: () => <ThemeButton />,
        }}
      />
    </Tabs>
  )
}

const ThemeButton = () => {
  const [theme, toggle] = useAtom(themeAtom)

  return <Button icon={icons[theme]} onPress={toggle} circular />
}
