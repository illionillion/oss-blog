"use client"

import {
  Avatar,
  Card,
  CardBody,
  Heading,
  HStack,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import { useI18n } from "@/contexts"

export const TopContributor: FC<{ isLink?: boolean }> = ({ isLink }) => {
  const { contributors } = useI18n()
  const top_contributors = contributors?.top_contributors
  return (
    <Card w="full" p="md">
      <CardBody>
        <Heading as="h2" fontSize="xl">
          Top Contributor
        </Heading>
        <Text>集計：{contributors?.date}</Text>
        <VStack m="0 auto">
          {top_contributors?.map((contributor) => (
            <HStack key={contributor.login}>
              <Avatar
                src={contributor.avatar_url}
                as={Link}
                href={`/contributors/${contributor.login}`}
              />
              <Text>{contributor.login}</Text>
              <Spacer />
              <Tag rounded="full">
                <Text>{contributor.commitCount}</Text>
              </Tag>
            </HStack>
          ))}
        </VStack>
        {isLink ? (
          <Text as={Link} href="/contributors">
            もっと見る
          </Text>
        ) : undefined}
      </CardBody>
    </Card>
  )
}
