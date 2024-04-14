'use client'

import { type mode, useThemeStore } from '@/zustand'
import { NextThemeProvider, useRootTheme, useThemeSetting } from '@tamagui/next-theme'
import { useServerInsertedHTML } from 'next/navigation'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { config } from '../../tamagui.config'

export default function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const [theme, setTheme] = useRootTheme()
  const themeSetting = useThemeSetting()!
  const { scheme } = useThemeStore()

  const current = () => {
    if (scheme === ('system' as mode)) {
      return themeSetting.systemTheme as mode
    }
    return scheme
  }

  useServerInsertedHTML(() => {
    // the first time this runs you'll get the full CSS including all themes
    // after that, it will only return CSS generated since the last call
    return <style dangerouslySetInnerHTML={{ __html: config.getNewCSS() }} />
  })

  return (
    <NextThemeProvider onChangeTheme={setTheme as any}>
      <TamaguiProvider config={config} defaultTheme={current()} disableInjectCSS {...rest}>
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  )
}
