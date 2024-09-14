"use client"

import { Markdown } from "@yamada-ui/markdown"
import type { FC } from "react"
import React from "react"
import { LinkedHeading } from "@/components/md/linked-heading"

export const CustomMarkdown: FC<{ content: string }> = ({ content }) => {
  return (
    <Markdown
      components={{
        h1: (props) => <LinkedHeading as="h1" {...props} />,
        h2: (props) => <LinkedHeading as="h2" {...props} />,
        h3: (props) => <LinkedHeading as="h3" {...props} />,
        h4: (props) => <LinkedHeading as="h4" {...props} />,
        h5: (props) => <LinkedHeading as="h5" {...props} />,
        h6: (props) => <LinkedHeading as="h6" {...props} />,
      }}
    >
      {content}
    </Markdown>
  )
}
