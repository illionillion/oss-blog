import {
  GitPullRequestArrow,
  BookOpen,
  UsersRound,
  Puzzle,
} from "@yamada-ui/lucide"

import {
  Button,
  Heading,
  Text,
  Container,
  Card,
  CardHeader,
  CardFooter,
  SimpleGrid,
  GridItem,
  Accordion,
  AccordionItem,
  VStack,
  Icon,
} from "@yamada-ui/react"
import { Layout } from "@/components/layouts"

export default function Home() {
  return (
    <Layout>
      <Container textAlign="center" w="80%" margin="0 auto">
        <Heading as="h1">OSSBlogへようこそ</Heading>
        <Text>
          オープンソースの力で、より良い技術ブログを一緒に作り上げましょう
        </Text>
        <Button minW={40} maxW={80} margin="0 auto">
          今すぐ始める
        </Button>
      </Container>

      <FeatureCard />
      <HowToJoin />
      <QuestionAccordion />
      <CommunityIntroduction />
    </Layout>
  )
}

const FeatureCard = () => {
  const features = [
    {
      title: "オープンソースの力",
      icon: GitPullRequestArrow,
      description:
        "Githubを活用した共同執筆で、より質の高い技術コンテンツを生み出します。",
    },
    {
      title: "活発なコミュニティー",
      icon: BookOpen,
      description:
        "エンジニア同士が知識を共有し、お互いに学び合える環境を提供します。",
    },
    {
      title: "幅広い技術トピック",
      icon: UsersRound,
      description:
        "フロントエンド、バックエンド、データベース、セキュリティなど、幅広い技術トピックをカバーします。",
    },
    {
      title: "キャリア成長",
      icon: Puzzle,
      description:
        "記事の執筆やレビューを通うじて、技術力とコミュニケーション能力を向上させます",
    },
  ]
  return (
    <>
      <Heading as="h2" margin="0 auto">
        OSSBlogの特徴
      </Heading>
      <SimpleGrid w="full" columns={{ base: 2, md: 1 }} gap="md">
        {features.map((feature) => (
          <GridItem key={feature.title} w="full" h={200} rounded="md">
            <Card h="100%" w="100%">
              <CardHeader
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={feature.icon} fontSize="4xl" />
                <Heading as="h3">{feature.title}</Heading>
              </CardHeader>

              <CardFooter pt="lg" display="flex">
                <Text>{feature.description}</Text>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </SimpleGrid>
    </>
  )
}
//参加方法
const HowToJoin = () => {
  const steps = [
    {
      description:
        "まだアカウントをお持ちでない場合は、Githubアカウントを作成してください。",
    },
    {
      description: "OSSBlogのリポジトリをフォークする",
    },
    {
      description: "ローカル環境にクローンし、新しい記事を作成する",
    },
    {
      description: "変更をコミットし、プルリクエストを作成する",
    },
    {
      description: "コミュニティからのフィードバックを受け記事を改善する",
    },
    {
      description: "マージされたら、記事が公開される",
    },
  ]
  return (
    <Container>
      <Heading as="h3" m="0 auto">
        参加方法
      </Heading>
      <Card p="md">
        {steps.map((step, index) => (
          <Text key={step.description} py="md">
            {index + 1}.{step.description}
          </Text>
        ))}
      </Card>
    </Container>
  )
}
//よくある質問
const QuestionAccordion = () => {
  const questions = [
    {
      question: "OSSBlogで記事を書くにはどうすればいいですか？",
      answer:
        "まだアカウントをお持ちでない場合は、Githubアカウントを作成してください。",
    },
    {
      question: "OSSBlogで扱うトピックに制限はありますか",
      answer:
        "ありません。作成したいトピックが存在しない場合は、あなた自身でトピックを作成してください。",
    },
  ]
  return (
    <Container>
      <VStack>
        <Accordion variant="basic">
          {questions.map((question) => (
            <AccordionItem label={question.question} key={question.answer}>
              <Text p="ms">{question.answer}</Text>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Container>
  )
}
const CommunityIntroduction = () => {
  return (
    <Container textAlign="center" w="80%" margin="0 auto">
      <Heading as="h1">OSSBlogコミュニティに参加しよう</Heading>
      <Text>
        あなたの知識と経験を共有し、他の開発者から学び、一緒に成長しましょう
      </Text>
      <Button minW={40} maxW={80} margin="0 auto">
        Githubリポジトリ
      </Button>
    </Container>
  )
}
