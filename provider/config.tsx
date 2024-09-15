"use client"
import {
  colorModeManager,
  ColorModeScript,
  themeSchemeManager,
  ThemeSchemeScript,
  UIProvider,
} from "@yamada-ui/react"
import { SessionProvider } from "next-auth/react"
import type { FC, ReactNode } from "react"
import { I18nProvider } from "@/contexts"
import { theme, config } from "@/theme"

export const ConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <ColorModeScript
        type="cookie"
        nonce="testing"
        initialColorMode={config.initialColorMode}
      />
      <ThemeSchemeScript
        type="cookie"
        nonce="testing"
        initialThemeScheme={config.initialThemeScheme}
      />
      <UIProvider
        config={config}
        theme={theme}
        colorModeManager={colorModeManager.cookieStorage}
        themeSchemeManager={themeSchemeManager.cookieStorage}
      >
        <I18nProvider>
          <SessionProvider>{children}</SessionProvider>
        </I18nProvider>
      </UIProvider>
    </>
  )
}
