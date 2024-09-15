import { Book, Code, GitPullRequest } from "@yamada-ui/lucide"
import {
  Avatar,
  Flex,
  Heading,
  Text,
  VStack,
  Link,
  Box,
  Card,
  HStack,
  Spacer,
  Tag,
  Button,
} from "@yamada-ui/react"
import React from "react"
import Layout from "../layout"
const users = [
  {
    icons: "https://github.com/yamada-ui.png",
    name: "Yamada",
    raul: "コントリビューター",
    description: "自己紹介",
    github: "https://github.com/yamada-ui",
    contribution: 100,
    article: "https://github.com/yamada-ui",
    repository: "https://github.com/yamada-ui",
    repositoryCount: 100,
    reviewCount: 100,
    issueCount: 100,
  },
  {
    icons: "https://github.com/yamada-ui.png",
    name: "Yamada",
    raul: "コントリビューター",
    description: "自己紹介",
    github: "https://github.com/yamada-ui",
    contribution: 100,
    article: "https://github.com/yamada-ui",
    repositoryCount: 100,
    reviewCount: 100,
    issueCount: 100,
  },
  {
    icons: "https://github.com/yamada-ui.png",
    name: "Yamada",
    raul: "コントリビューター",
    description: "yamada",
    github: "https://github.com/yamada-ui",
    contribution: 100,
    article: "https://github.com/yamada-ui",
    repositoryCount: 100,
    reviewCount: 100,
    issueCount: 100,
  },
]
const Page = () => {
  return (
    <Layout>
      <Box p={4} w="90%" m="0 auto">
        <Heading as="h1" p="pd">
          Contributors
        </Heading>
        <Text p="md">
          OSSBlogに時間・労力・思考を提供してくれた素晴らしいエンジニア。彼らの貢献に深く感謝します。
        </Text>
        <TopContributors />
        <Contributor />
      </Box>
    </Layout>
  )
}
const TopContributors = () => {
  return (
    <>
      <Heading as="h2" mb="md">
        メンテナー
      </Heading>
      <Flex gap={4}>
        {users.map((user) => (
          <>
            <Card w="full" p={4}>
              <VStack justifyContent="space-between">
                <HStack>
                  <Avatar src={user.icons} key={user.name} />
                  <Box>
                    <Text>{user.name}</Text>
                    <Text>{user.raul}</Text>
                  </Box>
                </HStack>
                <Spacer />

                <VStack>
                  <Text>{user.description}</Text>
                </VStack>
                <HStack>
                  <Text>総貢献数</Text>
                  <Spacer />
                  <Text>{user.contribution}</Text>
                </HStack>
                <Box>
                  <Text>トップ記事</Text>
                  <Link href={user.github}>
                    <Text>{user.article}</Text>
                  </Link>
                </Box>
              </VStack>
            </Card>
          </>
        ))}
      </Flex>
    </>
  )
}

const Contributor = () => {
  return (
    <>
      <Heading as="h2" pt="xl" pb="md">
        コントリビューター一覧
      </Heading>
      <VStack flexWrap="wrap" gap="md">
        {users.map((user) => (
          <>
            <Card p="md" px="lg">
              <HStack justifyContent="space-between">
                <HStack key={user.name}>
                  <Avatar src={user.icons} key={user.name} />
                  <VStack>
                    <Text>{user.name}</Text>
                    <Tag rounded="full">
                      <label>{user.raul}</label>
                    </Tag>
                  </VStack>
                </HStack>
                <Spacer />
                <VStack w="30%">
                  <HStack justifyContent="end">
                    <HStack>
                      <Book />
                      <Text>{user.repositoryCount}</Text>
                    </HStack>

                    <HStack>
                      <Code />
                      <Text>{user.reviewCount}</Text>
                    </HStack>
                    <HStack>
                      <GitPullRequest />
                      <Text>{user.issueCount}</Text>
                    </HStack>
                  </HStack>

                  <Box justifyContent="end" textAlign="end">
                    <Button size="sm" textAlign="end">
                      プロフィールを見る
                    </Button>
                  </Box>
                </VStack>
              </HStack>
            </Card>
          </>
        ))}
      </VStack>
    </>
  )
}
export default Page
