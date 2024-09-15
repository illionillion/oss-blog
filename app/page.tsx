import { GitPullRequestIcon, InfoIcon } from "@yamada-ui/lucide"
import {
  ButtonGroup,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Card,
  CardBody,
} from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import { TopContributor } from "@/components/data-display/top-contributor"
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
          {/* <Box px="md">
            <RecentActivitiesTabs />
          </Box> */}
        </VStack>
        <VStack
          maxW="sm"
          w="full"
          gap="md"
          display={{ base: "flex", md: "none" }}
        >
          <TopContributor />
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
      bgGradient="linear(to-r, purple.500, blue.400)"
    >
      <VStack gap="md">
        <Heading color="white" as="h1">
          オープンソースで技術ブログを革新する
        </Heading>
        <Text color="white">
          Githubを活用、した共同執筆でより質の高いコンテンツを
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

const GithubButtons: FC = () => {
  return (
    <Card w="full" p="md">
      <CardBody textAlign="left">
        <Heading as="h3" mb="md">
          参加する
        </Heading>
        <VStack gap="md" m="0 auto">
          <Button
            variant="outline"
            colorScheme="primary"
            leftIcon={<InfoIcon />}
            as="a"
            target="_blank"
            href="https://github.com/illionillion/oss-blog/issues"
          >
            Issueを見る
          </Button>
          <Button
            variant="outline"
            colorScheme="primary"
            leftIcon={<GitPullRequestIcon />}
            as="a"
            target="_blank"
            href="https://github.com/illionillion/oss-blog/pulls"
          >
            Pull Requestを見る
          </Button>
        </VStack>
      </CardBody>
    </Card>
  )
}
