"use client"
import { List as ListIcon } from "@yamada-ui/lucide"
import {
  Box,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
  dataAttr,
  forwardRef,
  mergeRefs,
  useMotionValueEvent,
  useScroll,
  useToken,
  useUpdateEffect,
} from "@yamada-ui/react"
import type { StackProps } from "@yamada-ui/react"
import type { ArticleContent } from "article"
import type { RefObject } from "react"
import { createRef, memo, useRef, useState } from "react"
import scrollIntoView from "scroll-into-view-if-needed"
import { ScrollShadow } from "@/components/data-display/scroll-shadow"
import { TextWithCode } from "@/components/typography"
import { useEventListener } from "hooks"

export type TableOfContentsProps = StackProps & { content: string }

export const TableOfContents = memo(
  forwardRef<TableOfContentsProps, "div">(({ content, ...rest }, ref) => {
    const contents = getTableOfContents(content)
    const [selectedId, setSelectedId] = useState<string>("")
    const containerRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<Map<string, RefObject<HTMLLIElement>>>(new Map())
    const pl = useToken("spaces", "4")
    const { scrollY } = useScroll()
    const prevValue = useRef<number>(0)
    const directionRef = useRef<"up" | "down">("down")

    useMotionValueEvent(scrollY, "change", (value) => {
      directionRef.current = prevValue.current < value ? "down" : "up"

      prevValue.current = value
    })

    useEventListener(
      "scroll",
      () => {
        let currentId = ""

        for (const { id } of contents) {
          const el = document.getElementById(id)

          if (!el) continue

          if (el.getBoundingClientRect().top < 100) currentId = id
        }

        setSelectedId(currentId)
      },
      () => document,
      { passive: true },
    )

    useUpdateEffect(() => {
      if (!containerRef.current) return

      const itemRef = itemRefs.current.get(selectedId)

      if (!itemRef?.current) return

      scrollIntoView(itemRef.current, {
        behavior: (actions) =>
          actions.forEach(({ el, top }) => {
            if (directionRef.current === "down") {
              el.scrollTop = top + 16
            } else {
              el.scrollTop = top - 16
            }
          }),
        scrollMode: "if-needed",
        block: "nearest",
        inline: "nearest",
        boundary: containerRef.current,
      })
    }, [selectedId])

    return (
      <VStack ref={mergeRefs(ref, containerRef)} as="nav" w="full" {...rest}>
        <VStack pb="16" pl="md" overflowY="auto" overscrollBehavior="contain">
          <HStack gap="sm">
            <ListIcon fontSize="2xl" />
            <Text>もくじ</Text>
          </HStack>

          <List gap="0" fontSize="sm" color="muted" ml="sm">
            {contents.map(({ lv, title, id }) => {
              const isSelected = selectedId == id
              const ref = createRef<HTMLLIElement>()

              itemRefs.current.set(id, ref)

              return (
                <ListItem key={id} ref={ref}>
                  <Box
                    as="a"
                    display="block"
                    href={`#${id}`}
                    outline="0"
                    _hover={{
                      color: isSelected ? undefined : ["black", "white"],
                    }}
                    _focusVisible={{
                      boxShadow: "inline",
                    }}
                    transitionProperty="colors"
                    transitionDuration="normal"
                  >
                    <Box
                      data-selected={dataAttr(isSelected)}
                      py="sm"
                      pl={`calc(${lv} * ${pl})`}
                      position="relative"
                      zIndex="-1"
                      userSelect="none"
                      borderLeftWidth="1px"
                      borderLeftColor={isSelected ? `primary.400` : "border"}
                      _selected={{
                        color: [`black`, "white"],
                        bg: [`primary.300`, `primary.300`],
                      }}
                      _before={{
                        content: "''",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: "white",
                        opacity: 0.8,
                      }}
                      _dark={{
                        _before: {
                          bg: "black",
                          opacity: 0.86,
                        },
                      }}
                    >
                      <TextWithCode
                        position="relative"
                        zIndex="yamcha"
                        isTruncated
                      >
                        {title}
                      </TextWithCode>
                    </Box>
                  </Box>
                </ListItem>
              )
            })}
          </List>
        </VStack>

        <ScrollShadow />
      </VStack>
    )
  }),
)

export const getTableOfContents = (
  raw: string,
  maxLv = Infinity,
): ArticleContent[] => {
  raw = raw.replace(/```[\s\S]*?```/g, "")

  const matches = Array.from(raw.matchAll(/^(# |## |### |#### )(.*)\n/gm))

  if (!matches.length) return []

  return matches
    .map((match, index) => {
      const nextMatch = matches[index + 1]
      const title = match[2].trim().replaceAll("`", "")
      const lv = match[1].trim().split("#").length - 1

      const id = title

      const propMatches = Array.from(
        raw
          .slice(Number(match.index), nextMatch?.index)
          .matchAll(/<PropsCard\s+[^>]*?name="([^"]+)"/g),
      )

      let results = [{ id, title, lv }]

      if (propMatches.length) {
        const props = propMatches.map((match) => {
          const title = match[1].trim()

          return {
            id: `${id.replace("props", "")}-${title.toLowerCase()}`,
            title,
            lv: lv + 1,
          }
        })

        results = [...results, ...props]
      }

      return results
    })
    .flat()
    .filter(({ lv }) => maxLv >= lv)
}
