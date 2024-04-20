'use client'

import { type mode, themeWithToggle } from '@/atoms/theme'
import { NextThemeProvider, useRootTheme, useThemeSetting } from '@tamagui/next-theme'
import { useAtom } from 'jotai'
import { useServerInsertedHTML } from 'next/navigation'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { config } from '../../tamagui.config'

export const themeAtom = themeWithToggle('system' as mode)

export default function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const [theme, setTheme] = useRootTheme()
  const themeSetting = useThemeSetting()!
  const [scheme] = useAtom(themeAtom)

  const current = () => {
    if (scheme === ('system' as mode)) {
      return themeSetting.systemTheme as mode
    }
    return scheme
  }

  useServerInsertedHTML(() => {
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: config.getNewCSS({
            // if you are using "outputCSS" option, you should use this "exclude"
            // if not, then you can leave the option out
            exclude: process.env.NODE_ENV === 'production' ? 'design-system' : null,
          }),
        }}
      />
    )
  })

  return (
    <NextThemeProvider onChangeTheme={setTheme as any}>
      <TamaguiProvider config={config} defaultTheme={current()} disableInjectCSS {...rest}>
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  )
}
