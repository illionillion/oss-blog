import { GitPullRequestIcon, UsersIcon } from "@yamada-ui/lucide"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from "@yamada-ui/react"
import { getArticleList } from "../../../utils/articles"
import { ProfileTabs } from "@/components/disclosure/profile-tabs"
import { Layout } from "@/components/layouts"

interface Props {
  params: { username?: string }
}

export const dynamicParams = false

// メタデータの生成
export const generateMetadata = async ({ params }: Props) => {
  const { username } = params

  // ユーザー名が存在しない場合のデフォルトメタデータ
  if (!username) {
    return {
      title: "User not found",
      description: "No user data available for this page",
    }
  }

  // 動的にタイトルや説明文を生成
  return {
    title: `${username}'s Profile`,
    description: `Explore the articles and contributions made by ${username}.`,
  }
}

// Static Params の生成
export const generateStaticParams = async () => {
  // 記事リストを取得して、contributors の配列をマッピング
  const articleList = await getArticleList()
  const allContributors = articleList.flatMap((item) => item.contributors || [])

  // ユーザー名（login）のみを集め、重複を排除
  const uniqueUsernames = Array.from(
    new Set(allContributors.map((contributor) => contributor.login)),
  )

  // 各ユーザー名に対してパスを生成
  return uniqueUsernames.map((username) => ({ username }))
}

const Page = async ({ params }: Props) => {
  const { username } = params

  const articles = await getArticleList()

  // ユーザー名が表示されることを確認するためのサンプル
  return (
    <Layout>
      <Container maxW="9xl" w="full">
        <Card>
          <CardBody>
            <HStack w="full">
              <Box>
                <Avatar boxSize="16" />
              </Box>
              <VStack flexGrow={1}>
                <Text fontSize="md">{username}</Text>
                <Text fontSize="sm" color="gray.100">
                  説明
                </Text>
                <HStack>
                  <Center gap="sm">
                    <UsersIcon color="gray.100" />
                    <Flex>
                      <Text>1234</Text>
                      <Text color="gray.100">フォロワー</Text>
                    </Flex>
                  </Center>
                  <Center gap="sm">
                    <UsersIcon color="gray.100" />
                    <Flex>
                      <Text>1234</Text>
                      <Text color="gray.100">フォロー</Text>
                    </Flex>
                  </Center>
                  <Center gap="sm">
                    <GitPullRequestIcon color="gray.100" />
                    <Flex>
                      <Text>1234</Text>
                      <Text color="gray.100">フォロワー</Text>
                    </Flex>
                  </Center>
                </HStack>
              </VStack>
              <Center>
                <Button>フォローする</Button>
              </Center>
            </HStack>
          </CardBody>
        </Card>
        <ProfileTabs articles={articles} />
      </Container>
    </Layout>
  )
}

export default Page
