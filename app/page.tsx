"use client"
import { Star, Calendar, User } from "@yamada-ui/lucide"
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
  Tabs,
  Tab,
  TabPanel,
  CardBody,
} from "@yamada-ui/react"
import { Layout } from "@/components/layouts"

export default function Home() {
  return (
    <Layout>
      <Head />
      <HStack w="full">
        <VStack w="full" gap="md">
          <ContentsCard />
          <RecentActivities />
        </VStack>
        <VStack w="50%" gap="md" display={{ md: "none" }}>
          <TopContributeUser />
          <GithubButtons />
        </VStack>
      </HStack>
    </Layout>
  )
}

function Head() {
  return (
    <Card
      w="full"
      textAlign="center"
      p="lg"
      borderRadius="md"
      backgroundColor="primary.200"
    >
      <VStack gap="md">
        <Heading as="h1">オープンソースで技術ブログを革新する</Heading>
        <Text>Githubを活用、した共同執筆で、より質の高いコンテンツを </Text>

        <ButtonGroup gap="md" margin="0 auto">
          <Button>はじめる</Button>
          <Button>詳しく見る</Button>
        </ButtonGroup>
      </VStack>
    </Card>
  )
}

function TopContributeUser() {
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
    <Card w="full" backgroundColor="White" p="md">
      <VStack w="full">
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
      </VStack>
    </Card>
  )
}

function ContentsCard() {
  const contents = [
    {
      title: "タイトル",
      description:
        "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
      tags: ["タグ1", "タグ2"],
      avatars: [
        { src: "", name: "" },
        { src: "", name: "" },
      ],
      updatedAt: "2000-01-01",
      stars: 10,
    },

    {
      title: "タイトル",
      description: "説明",
      tags: ["タグ1", "タグ2"],
      avatars: [
        { src: "", name: "" },
        { src: "", name: "" },
      ],
      updatedAt: "2000-01-01",
      stars: 10,
    },
  ]
  return (
    <Box w="full">
      {contents.map((content, index) => (
        <Card key={index} p="md">
          <VStack gap="md" p="md">
            <Heading as="h3" mb="md">
              {content.title}
            </Heading>
            <Text>{content.description}</Text>
            <HStack textAlign="right">
              {content.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </HStack>

            <HStack>
              <HStack>
                <User />
                {content.avatars.map((avatar) => (
                  <Avatar key={avatar.name} src={avatar.src} />
                ))}
              </HStack>
              <Spacer />
              <HStack>
                <Calendar />
                <Text>{content.updatedAt}</Text>
              </HStack>
              <HStack>
                <Star />
                <Text>{content.stars}</Text>
              </HStack>
            </HStack>
          </VStack>
        </Card>
      ))}
    </Box>
  )
}

function GithubButtons() {
  return (
    <Card w="full" backgroundColor="white" p="md">
      <Box w="90%" m="0 auto" textAlign="left">
        <Heading as="h3" mb="md">
          参加する
        </Heading>
        <VStack gap="md" m="0 auto">
          <Button>GitHub</Button>
          <Button>Twitter</Button>
        </VStack>
      </Box>
    </Card>
  )
}

function RecentActivities() {
  const activityLinks = [
    {
      link: "https://github.com",
    },
    {
      link: "https://github.com",
    },
    {
      link: "https://github.com",
    },
  ]
  const issueLinks = [
    {
      link: "https://github.com",
    },
    {
      link: "https://github.com",
    },
    {
      link: "https://github.com",
    },
  ]

  const pulRequestLinks = [
    {
      link: "https://github.com",
    },
    {
      link: "https://github.com",
    },
    {
      link: "https://github.com",
    },
  ]

  return (
    <Card w="full" backgroundColor="white" p="md">
      <CardBody>
        <Tabs m="0 auto" variant="sticky" align="start">
          <Tab>新着記事</Tab>
          <Tab>最近のIssue</Tab>
          <Tab>最近のPR</Tab>
          <TabPanel>
            {activityLinks.map((link) => (
              <Button key={link.link}>{link.link}</Button>
            ))}
          </TabPanel>
          <TabPanel>
            {issueLinks.map((link) => (
              <Button key={link.link}>{link.link}</Button>
            ))}
          </TabPanel>
          <TabPanel>
            {pulRequestLinks.map((link) => (
              <Button key={link.link}>{link.link}</Button>
            ))}
          </TabPanel>
        </Tabs>
      </CardBody>
    </Card>
  )
}
