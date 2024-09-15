import type { ReactNode } from "react"
type Props = {
  children: ReactNode
}
export const ContextProvider = ({ children }: Props) => {
  return <>{children}</>
}
