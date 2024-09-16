import { Card, CardBody, Heading, HStack, Text, VStack } from "@yamada-ui/react"
import type { ArticleMetadata } from "article"
import type { FC } from "react"
import { Contributor } from "../data-display/contributors"
import { ArticleButtons } from "../forms/article-buttons"
import { CustomMarkdown } from "../md/custom-markdown"
import { TableOfContents } from "../navigation/table-of-contents"
import { ArticleButtons } from "../forms/article-buttons"

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
      <ArticleButtons metadata={metadata} />
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
        <Contributor contributors={metadata?.contributors} avatarSize="10" />
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
        <Contributor contributors={metadata?.contributors} avatarSize="10" />
        <TableOfContents content={content} />
      </VStack>
    </HStack>
  )
}
