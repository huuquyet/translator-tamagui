import { type mode, themeWithToggle } from '@/atoms/theme'
import { Inter_400Regular, Inter_900Black, useFonts } from '@expo-google-fonts/inter'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { inject } from '@vercel/analytics'
import { SplashScreen, Stack } from 'expo-router'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Appearance } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import '../tamagui-web.css'
import { config } from '../tamagui.config'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

export const themeAtom = themeWithToggle('light' as mode)

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter_400Regular,
    Inter_900Black,
  })

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const [scheme] = useAtom(themeAtom)

  const current = () => {
    if (scheme === ('system' as mode)) {
      return Appearance.getColorScheme() as mode
    }
    return scheme
  }

  return (
    <ThemeProvider value={current() === 'dark' ? DarkTheme : DefaultTheme}>
      <TamaguiProvider config={config} defaultTheme={current()}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </TamaguiProvider>
    </ThemeProvider>
  )
}
