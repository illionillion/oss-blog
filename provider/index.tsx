import type { ReactNode } from "react"
import { ConfigProvider } from "./config"
import { ContextProvider } from "./context"

type Props = {
  children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  return (
    <ConfigProvider>
      <ContextProvider>{children}</ContextProvider>
    </ConfigProvider>
  )
}
