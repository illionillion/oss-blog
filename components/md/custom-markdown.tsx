"use client"

import { Markdown } from "@yamada-ui/markdown"
import type { FC } from "react"
import React from "react"
import { Pre } from "@/components/md/code-block"
import { LinkedHeading } from "@/components/md/linked-heading"

export const CustomMarkdown: FC<{ content: string }> = ({ content }) => {
  return (
    <Markdown
      components={{
        h1: ({ children }) => <LinkedHeading as="h1" {...{ children }} />,
        h2: ({ children }) => <LinkedHeading as="h2" {...{ children }} />,
        h3: ({ children }) => <LinkedHeading as="h3" {...{ children }} />,
        h4: ({ children }) => <LinkedHeading as="h4" {...{ children }} />,
        h5: ({ children }) => <LinkedHeading as="h5" {...{ children }} />,
        h6: ({ children }) => <LinkedHeading as="h6" {...{ children }} />,
        pre: ({ children }) => <Pre {...{ children }} />,
      }}
    >
      {content}
    </Markdown>
  )
}
