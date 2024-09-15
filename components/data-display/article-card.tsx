import { CalendarIcon, StarIcon, UserIcon } from "@yamada-ui/lucide"
import {
  Card,
  CardBody,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Spacer,
  Tag,
  Text,
} from "@yamada-ui/react"
import type { ArticleMetadata } from "article"
import Link from "next/link"
import type { FC } from "react"
import { Contributor } from "./contributors"

interface ArticleCardProps {
  article: ArticleMetadata
}

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card key={article.slug} as={LinkBox}>
      <CardBody gap="md">
        <Heading as="h3" fontSize="xl" mb="md">
          <LinkOverlay href={`/${article.slug}`} as={Link}>
            {article.title}
          </LinkOverlay>
        </Heading>
        <Text>{article.description}</Text>
        <HStack textAlign="right">
          {article?.keyword?.map((word) => <Tag key={word}>{word}</Tag>)}
        </HStack>

        <HStack>
          <HStack>
            <UserIcon />
            <Contributor contributors={article.contributors} />
          </HStack>
          <Spacer />
          <HStack>
            <CalendarIcon />
            <Text>{article.latest_date}</Text>
          </HStack>
          <HStack>
            <StarIcon />
            <Text>10</Text>
          </HStack>
        </HStack>
      </CardBody>
    </Card>
  )
}
