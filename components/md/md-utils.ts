"use client"
import { isArray, isNull, isObject, isString } from "@yamada-ui/react"
import type { ReactNode } from "react"

export const extractTextFromChildren = (children: ReactNode): string => {
  if (isString(children)) {
    return children
  } else if (isArray(children)) {
    return children.map(extractTextFromChildren).join("")
  } else if (isObject(children) && !isNull(children) && "props" in children) {
    return extractTextFromChildren(children.props.children)
  }
  return ""
}
