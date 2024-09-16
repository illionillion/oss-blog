"use client"
import React, { FC } from "react"
import { IconButton, VStack } from "@yamada-ui/react"
import Link from "next/link"
import {
  ThumbsUpIcon,
  InfoIcon,
  CodeIcon,
  XIcon,
  BookMarkedIcon,
} from "@yamada-ui/lucide"
import { ArticleMetadata } from "article"
import { useSession } from "next-auth/react"

interface ArticleButtonsProps {
  metadata: ArticleMetadata | undefined
}

export const ArticleButtons: FC<ArticleButtonsProps> = ({ metadata }) => {
  const { data: session, status } = useSession()
  const handleLike = async () => {
    if (status === "loading" && !session) return
    console.log(session?.user?.id)
    console.log(metadata?.slug)
    if (!session?.user?.id || 0) return

    const res = await fetch(`/api/likes/`, {
      method: "POST",
      body: JSON.stringify({
        userId: session.user.id,
        articleUrl: metadata?.slug,
      }),
    })
    const data = await res.json()
    console.log(data)
  }
  return (
    <VStack
      maxW="2xs"
      w="full"
      alignItems="center"
      position="sticky"
      top="4rem"
      py="lg"
      display={{ base: "flex", md: "none" }}
    >
      <IconButton
        variant="ghost"
        colorScheme="primary"
        fontSize="3xl"
        boxSize="10"
        onClick={handleLike}
        icon={<ThumbsUpIcon />}
      />
      <IconButton
        variant="ghost"
        colorScheme="primary"
        fontSize="3xl"
        boxSize="10"
        as={Link}
        href="#"
        icon={<BookMarkedIcon />}
      />
      <IconButton
        variant="ghost"
        colorScheme="primary"
        fontSize="3xl"
        boxSize="10"
        as={Link}
        target="_blank"
        href="https://github.com/illionillion/oss-blog/issues/new?template=feature_request_article.yml"
        icon={<InfoIcon />}
      />
      <IconButton
        variant="ghost"
        colorScheme="primary"
        fontSize="3xl"
        boxSize="10"
        as={Link}
        target="_blank"
        href={`https://github.com/illionillion/oss-blog/tree/main/contents/${metadata?.slug}`}
        icon={<CodeIcon />}
      />
      <IconButton
        variant="ghost"
        colorScheme="primary"
        fontSize="3xl"
        boxSize="10"
        as={Link}
        href="#"
        icon={<XIcon />}
      />
    </VStack>
  )
}
