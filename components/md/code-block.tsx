"use client"
import { Box, Center, Loading, Text } from "@yamada-ui/react"
import mermaid from "mermaid"
import { Highlight as ReactHighlight } from "prism-react-renderer"
import type { HighlightProps as ReactHighlightProps } from "prism-react-renderer"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import React, { isValidElement, useLayoutEffect, useState } from "react"
import { extractTextFromChildren } from "./md-utils"
import { CopyButton } from "@/components/forms/copy-button"

export type PreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

export const Pre: FC<PreProps> = ({ children }) => {
  const code = extractTextFromChildren(children).trim()

  const language =
    isValidElement(children) && typeof children.props.className === "string"
      ? children.props.className.replace(/language-/, "")
      : "sh"

  return <CodeBlock code={code} language={language} />
}

export interface CodeBlockProps {
  code: string
  language: string
}

export const CodeBlock: FC<CodeBlockProps> = ({ code, language }) => {
  const [isClient, setIsClient] = useState(false)

  useLayoutEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      mermaid.initialize({ startOnLoad: true })
      mermaid.contentLoaded() // MermaidがDOMを処理できるように通知
    }
  }, [isClient])
  return (
    <Box position="relative" my="6">
      {language === "mermaid" ? (
        isClient ? (
          <Center w="full" className="mermaid">
            {code}
          </Center>
        ) : (
          <Center w="full" h="sm">
            <Loading fontSize="6xl" />
          </Center>
        )
      ) : (
        <Box
          h="full"
          rounded="md"
          bg={["neutral.800", "neutral.900"]}
          sx={{ "& > div": { py: "6" } }}
          overflow="hidden"
        >
          <Highlight {...{ code, language }} />
        </Box>
      )}

      <CopyButton
        value={code}
        position="absolute"
        top="4.5"
        right="4"
        zIndex="1"
      />
    </Box>
  )
}

export type HighlightProps = Omit<ReactHighlightProps, "children">

export const Highlight: FC<HighlightProps> = ({ language, ...rest }) => {
  return (
    <ReactHighlight language={language} {...rest}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box fontSize="sm" overflowX="auto" data-language={language}>
          <Box
            as="pre"
            className={className}
            minW="fit-content"
            style={{ ...style, backgroundColor: "inherit", marginBottom: 0 }}
          >
            {tokens.map((line, index) => (
              <Box
                key={index}
                minW="fit-content"
                pl="4"
                pr="16"
                {...getLineProps({ line })}
              >
                {line.map((token, index) => (
                  <Text key={index} as="span" {...getTokenProps({ token })} />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </ReactHighlight>
  )
}
