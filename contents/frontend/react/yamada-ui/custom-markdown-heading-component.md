---
title: Yamada UIのMarkdownの見出しタグをカスタムしたい
description: Yamada UIのMarkdownの見出しタグをQiitaやZennなどのリンク付きの見出しにカスタムする方法解説
keyword:
  - React
  - TypeScript
  - Yamada UI
contributors:
  - id: 60034520
    login: illionillion
    avatar_url: "https://avatars.githubusercontent.com/u/60034520?v=4"
    html_url: "https://github.com/illionillion"
    avatar_url: "https://avatars.githubusercontent.com/u/60034520?v=4"
    html_url: "https://github.com/illionillion"
  - id: 109452865
    login: taku10101
    avatar_url: "https://avatars.githubusercontent.com/u/109452865?v=4"
    html_url: "https://github.com/taku10101"
latest_date: "2024-09-15T08:13:26Z"
---

# Yamada UIの`Markdown`コンポーネント

このようにマークダウンのプレビューを表示することができる

https://yamada-ui.com/ja/components/data-display/markdown

コンポーネントをカスタマイズするには以下のようにカスタマイズすることができる

```tsx
const components = {
  h2: (props) => (
    <Heading
      size="2xl"
      bgGradient="linear(to-l, #f37bdf, #59a9e1)"
      bgClip="text"
      isTruncated
      {...props}
    />
  ),
}

return <Markdown components={components}>{README}</Markdown>
```

# やりたいこと

こういうリンク付きの見出しになるようにカスタマイズしたい

<img width="125" alt="image" src="https://github.com/user-attachments/assets/1080b829-447a-4f0e-824f-b39016bf80d0">

# やり方

まず見出し用のコンポーネントを作成

```tsx
"use client"
import { LinkIcon } from "@yamada-ui/lucide"
import type { HeadingProps } from "@yamada-ui/react"
import { Text, Link as UiLink } from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import React from "react"

export type LinkedHeadingProps = HeadingProps

export const LinkedHeading: FC<LinkedHeadingProps> = ({
  id,
  children,
  ...rest
}) => {
  const headingId = id || extractTextFromChildren(children) // ReactNodeを文字列に変換

  return (
    <Text
      id={headingId} // idとして入れる
      color={["black", "white"]}
      css={{ scrollMarginBlock: "6rem" }}
      _hover={{
        base: { "& > a": { opacity: 1 } },
        md: { "& > a": { opacity: 0 } },
      }}
      {...rest}
    >
      {children}

      {headingId ? (
        <UiLink
          as={Link}
          href={`#${headingId}`}
          aria-label="anchor"
          display={{ base: "inline-block", md: "none" }}
          ps="2"
          color="link"
          opacity="0"
          _hover={{ opacity: 1 }}
          _focus={{ outline: "none" }}
          _focusVisible={{ boxShadow: "none" }}
          tabIndex={-1}
        >
          <LinkIcon fontSize="0.875em" />
        </UiLink>
      ) : null}
    </Text>
  )
}

const extractTextFromChildren = (children: ReactNode): string => {
  if (isString(children)) {
    return children
  } else if (isArray(children)) {
    return children.map(extractTextFromChildren).join("")
  } else if (isObject(children) && !isNull(children) && "props" in children) {
    return extractTextFromChildren(children.props.children)
  }
  return ""
}
```

そしてそれを`Markdown`コンポーネントに適用

```tsx
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
```

これで見出しが`id`付きのリンク見出しになった！

```md
# Yamada UIの`Markdown`コンポーネント
```

![結果](/assets/custom-md-heading-component.png)
