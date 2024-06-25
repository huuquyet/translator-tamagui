'use client'

import { type mode, themeWithToggle } from '@/atoms/theme'
import { NextThemeProvider, useRootTheme, useThemeSetting } from '@tamagui/next-theme'
import { useAtom } from 'jotai'
import { useServerInsertedHTML } from 'next/navigation'
import type { ReactNode } from 'react'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { appConfig as config } from '../../tamagui.config'

export const themeAtom = themeWithToggle('dark' as mode)

const NextTamaguiProvider = ({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) => {
  const [_, setTheme] = useRootTheme()
  const themeSetting = useThemeSetting()!
  const [scheme] = useAtom(themeAtom)

  const current = () => {
    if (scheme === ('system' as mode)) {
      return themeSetting.systemTheme as mode
    }
    return scheme
  }

  return (
    <NextThemeProvider onChangeTheme={setTheme as any}>
      <TamaguiProvider config={config} defaultTheme={current()} disableInjectCSS {...rest}>
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  )
}

export default function Provider({ children }: { children: ReactNode }) {
  useServerInsertedHTML(() => {
    return (
      <>
        <style
          dangerouslySetInnerHTML={{
            // the first time this runs you'll get the full CSS including all themes
            // after that, it will only return CSS generated since the last call
            __html: config.getNewCSS(),
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: config.getCSS({
              // if you are using "outputCSS" option, you should use this "exclude"
              // if not, then you can leave the option out
              exclude: process.env.NODE_ENV === 'production' ? 'design-system' : null,
            }),
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            // avoid flash of animated things on enter:
            __html: `document.documentElement.classList.add('t_unmounted')`,
          }}
        />

        <style jsx global>{`
          html {
            font-family: 'Inter';
          }
        `}</style>
      </>
    )
  })

  return <NextTamaguiProvider>{children}</NextTamaguiProvider>
}
