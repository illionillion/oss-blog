"use client"
import { LinkIcon } from "@yamada-ui/lucide"
import type { HeadingProps } from "@yamada-ui/react"
import { Text, Link as UiLink } from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import React from "react"
import { extractTextFromChildren } from "./md-utils"

export type LinkedHeadingProps = HeadingProps

export const LinkedHeading: FC<LinkedHeadingProps> = ({
  id,
  children,
  ...rest
}) => {
  const headingId = id || extractTextFromChildren(children)

  return (
    <Text
      id={headingId}
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
