"use client"
import {
  colorModeManager,
  ColorModeScript,
  themeSchemeManager,
  ThemeSchemeScript,
  UIProvider,
} from "@yamada-ui/react"
import type { FC, ReactNode } from "react"
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
        {children}
      </UIProvider>
    </>
  )
}
