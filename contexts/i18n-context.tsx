import type { Dict } from "@yamada-ui/react"
import type { PropsWithChildren, FC } from "react"
import { createContext, useMemo, useContext } from "react"
import CONTENT from "@/i18n/content.json"
import CONTRIBUTORS from "@/i18n/contributors.json"

// Define the type for an individual contributor
type ContributorType = {
  id: number
  login: string
  avatar_url: string
  html_url: string
  commitCount: number
  bio: string
}

// Define the I18nContext type
type I18nContextType = {
  contents: Dict[]
  contributors:
    | {
        date: string
        contributors: ContributorType[] // All contributors
        top_contributors: ContributorType[] // Top contributors
      }
    | undefined
}

// Create the context
const I18nContext = createContext<I18nContextType>({
  contents: [],
  contributors: undefined,
})

export type I18nProviderProps = PropsWithChildren

// Define the provider
export const I18nProvider: FC<I18nProviderProps> = ({ children }) => {
  const contents = CONTENT
  const contributors = CONTRIBUTORS

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({ contents, contributors }),
    [contents, contributors],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// Hook to use the I18nContext in other components
export const useI18n = () => {
  const context = useContext(I18nContext)
  return context
}
