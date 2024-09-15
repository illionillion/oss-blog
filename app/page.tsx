import {
  Box,
  ButtonGroup,
  Heading,
  Text,
  Button,
  VStack,
  Avatar,
  HStack,
  Tag,
  Spacer,
  Card,
  CardBody,
} from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import { RecentActivitiesTabs } from "@/components/disclosure/recent-activities-tabs"
import { TopPageTabs } from "@/components/disclosure/top-page-tabs"
import { Layout } from "@/components/layouts"
import { getArticleList } from "@/utils/articles"

export default async function Home() {
  const articles = await getArticleList()
  return (
    <Layout>
      <Banner />
      <HStack w="full" alignItems="start">
        <VStack w="full" gap="md">
          <TopPageTabs articles={articles} />
          <Box px="md">
            <RecentActivitiesTabs />
          </Box>
        </VStack>
        <VStack
          maxW="sm"
          w="full"
          gap="md"
          display={{ base: "flex", md: "none" }}
        >
          <TopContributeUser />
          <GithubButtons />
        </VStack>
      </HStack>
    </Layout>
  )
}

const Banner: FC = () => {
  return (
    <Card
      w="full"
      textAlign="center"
      p="lg"
      borderRadius="md"
      bgGradient="linear(to-r, #2663eb, #4f46e5)"
    >
      <VStack gap="md">
        <Heading color="white" as="h1">
          オープンソースで技術ブログを革新する
        </Heading>
        <Text color="white">
          Githubを活用、した共同執筆で、より質の高いコンテンツを{" "}
        </Text>

        <ButtonGroup gap="md" margin="0 auto">
          <Button>はじめる</Button>
          <Button as={Link} href="/welcome">
            詳しく見る
          </Button>
        </ButtonGroup>
      </VStack>
    </Card>
  )
}

const TopContributeUser: FC = () => {
  const users = [
    {
      name: "yamada",
      avatar: "",
      count: 10,
    },
    {
      name: "yamada",
      avatar: "",
      count: 10,
    },
    {
      name: "yamada",
      avatar: "",
      count: 10,
    },
  ]

  return (
    <Card w="full" p="md">
      <CardBody>
        <Heading as="h2">Top Contributer</Heading>
        <VStack m="0 auto">
          {users.map((user) => (
            <HStack key={user.name}>
              <Avatar src={user.avatar} />
              <Text>{user.name}</Text>
              <Spacer />
              <Tag rounded="full">
                <Text>{user.count}</Text>
              </Tag>
            </HStack>
          ))}
        </VStack>
      </CardBody>
    </Card>
  )
}

const GithubButtons: FC = () => {
  return (
    <Card w="full" p="md">
      <CardBody textAlign="left">
        <Heading as="h3" mb="md">
          参加する
        </Heading>
        <VStack gap="md" m="0 auto">
          <Button as={Link} href="https://github.com/illionillion/oss-blog">
            GitHub
          </Button>
          <Button>Twitter</Button>
        </VStack>
      </CardBody>
    </Card>
  )
}
