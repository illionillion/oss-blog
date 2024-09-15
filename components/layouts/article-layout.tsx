import {
  ThumbsUpIcon,
  InfoIcon,
  CodeIcon,
  XIcon,
  BookMarkedIcon,
} from "@yamada-ui/lucide"
import {
  Card,
  CardBody,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { ArticleMetadata } from "article"
import Link from "next/link"
import type { FC } from "react"
import { Contributor } from "../data-display/contributors"
import { CustomMarkdown } from "../md/custom-markdown"
import { TableOfContents } from "../navigation/table-of-contents"

export interface ArticleLayoutProps {
  metadata: ArticleMetadata | undefined
  content: string
}

export const ArticleLayout: FC<ArticleLayoutProps> = ({
  content,
  metadata,
}) => {
  return (
    <HStack maxW="9xl" w="full" alignItems="start" m="auto">
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
          as={Link}
          href="#"
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
          href="https://github.com/illionillion/oss-blog/issues/new"
          icon={<InfoIcon />}
        />
        <IconButton
          variant="ghost"
          colorScheme="primary"
          fontSize="3xl"
          boxSize="10"
          as={Link}
          target="_blank"
          href={`https://github.com/yamada-ui/yamada-components/tree/main/contents/${metadata?.slug}`}
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
      <VStack gap="md" flexGrow={1}>
        <VStack>
          <Heading>{metadata?.title}</Heading>
          <Text>{metadata?.description}</Text>
        </VStack>
        <Card>
          <CardBody>
            <CustomMarkdown content={content} />
          </CardBody>
        </Card>
        <Text>コントリビューター</Text>
        <Contributor contributors={metadata?.contributors} avatarSize="14" />
      </VStack>
      <VStack
        position="sticky"
        pt="lg"
        top="4rem"
        w="sm"
        maxH="calc(100dvh - 4rem- 2rem)"
        display={{ base: "flex", lg: "none" }}
      >
        <Text>コントリビューター</Text>
        <Contributor contributors={metadata?.contributors} avatarSize="14" />
        <TableOfContents content={content} />
      </VStack>
    </HStack>
  )
}
