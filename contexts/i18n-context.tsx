import type { Dict } from "@yamada-ui/react"

import type { PropsWithChildren, FC } from "react"
import { createContext, useMemo, useContext } from "react"
import CONTENT from "@/i18n/content.json"

type I18nContext = {
  contents: Dict[]
}

const I18nContext = createContext<I18nContext>({
  contents: [],
})

export type I18nProviderProps = PropsWithChildren

export const I18nProvider: FC<I18nProviderProps> = ({ children }) => {
  const contents = CONTENT

  const value = useMemo(() => ({ contents }), [contents])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const context = useContext(I18nContext)

  return context
}
