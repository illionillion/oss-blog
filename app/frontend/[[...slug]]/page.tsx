import { Center, Heading, Text, VStack } from "@yamada-ui/react"
import React from "react"
import { Layout } from "@/components/layouts"
import { CustomMarkdown } from "@/components/md/custom-markdown"
import {
  generateArticleMetadata,
  generateStaticArticleParams,
  getStaticArticleContent,
} from "@/utils/next"

interface Props {
  params: { slug?: string[] }
}

export const dynamicParams = false

export const generateMetadata = generateArticleMetadata("frontend")

export const generateStaticParams = generateStaticArticleParams("frontend")

const Page = async ({ params }: Props) => {
  const { slug } = params

  if (!slug) {
    return <Text>Home page or default content</Text>
  }

  const { content, metadata } = await getStaticArticleContent("frontend")(slug)

  return (
    <Layout>
      <Center as={VStack}>
        <Heading>{metadata?.title}</Heading>
        <Text>{metadata?.description}</Text>
        <CustomMarkdown content={content} />
      </Center>
    </Layout>
  )
}

export default Page
