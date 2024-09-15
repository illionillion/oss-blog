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
import type { FC } from "react"
import { useI18n } from "@/contexts"

export const TopContributor: FC = () => {
  const { contributors } = useI18n()
  const top_contributors = contributors?.top_contributors
  return (
    <Card w="full" p="md">
      <CardBody>
        <Heading as="h2">Top Contributor</Heading>
        <Text>集計：{contributors?.date}</Text>
        <VStack m="0 auto">
          {top_contributors?.map((contributor) => (
            <HStack key={contributor.login}>
              <Avatar src={contributor.avatar_url} />
              <Text>{contributor.login}</Text>
              <Spacer />
              <Tag rounded="full">
                <Text>{contributor.commitCount}</Text>
              </Tag>
            </HStack>
          ))}
        </VStack>
      </CardBody>
    </Card>
  )
}
