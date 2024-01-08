import { TamaguiProvider, TamaguiProviderProps, config } from '@my/ui'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { createThemeStore, type mode, useThemeStore } from 'app/zustand'
import { useEffect } from 'react'
import { Appearance } from 'react-native'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const { scheme } = useThemeStore()

  useEffect(() => {
    createThemeStore.persist.rehydrate()
  }, [])

  const current = () => {
    if (scheme === ('system' as mode)) {
      return Appearance.getColorScheme() as mode
    }
    return scheme
  }

  return (
    <ThemeProvider value={current() === 'dark' ? DarkTheme : DefaultTheme}>
      <TamaguiProvider config={config} defaultTheme={current()} disableInjectCSS {...rest}>
        {children}
      </TamaguiProvider>
    </ThemeProvider>
  )
}
