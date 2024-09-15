"use client"

import { GitPullRequestIcon } from "@yamada-ui/lucide"
import {
  Avatar,
  Box,
  Button,
  Card,
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

export const ContributorList: FC = () => {
  const { contributors } = useI18n()
  const contributorsList = contributors?.contributors
  return (
    <>
      <Heading as="h2" pt="xl" pb="md">
        コントリビューター一覧
      </Heading>
      <VStack flexWrap="wrap" gap="md">
        {contributorsList?.map((contributor) => (
          <Card p="md" px="lg" key={contributor.login}>
            <HStack justifyContent="space-between">
              <HStack key={contributor.login}>
                <Avatar src={contributor.avatar_url} />
                <VStack>
                  <Text>{contributor.login}</Text>
                  <Tag rounded="full">コントリビュータ</Tag>
                </VStack>
              </HStack>
              <Spacer />
              <VStack w="30%">
                <HStack justifyContent="end">
                  <HStack>
                    <GitPullRequestIcon />
                    <Text>{contributor.commitCount}</Text>
                  </HStack>
                </HStack>
                <Box justifyContent="end" textAlign="end">
                  <Button
                    size="sm"
                    textAlign="end"
                    as={Link}
                    href={`/contributors/${contributor.login}`}
                  >
                    プロフィールを見る
                  </Button>
                </Box>
              </VStack>
            </HStack>
          </Card>
        ))}
      </VStack>
    </>
  )
}
