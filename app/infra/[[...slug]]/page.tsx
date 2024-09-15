import { Text } from "@yamada-ui/react"
import React from "react"
import { Layout } from "@/components/layouts"
import { ArticleLayout } from "@/components/layouts/article-layout"
import {
  generateArticleMetadata,
  generateStaticArticleParams,
  getStaticArticleContent,
} from "@/utils/next"

interface Props {
  params: { slug?: string[] }
}

export const dynamicParams = false

export const generateMetadata = generateArticleMetadata("infra")

export const generateStaticParams = generateStaticArticleParams("infra")

const Page = async ({ params }: Props) => {
  const { slug } = params

  if (!slug) {
    return <Text>Home page or default content</Text>
  }

  const { content, metadata } = await getStaticArticleContent("infra")(slug)

  return (
    <Layout>
      <ArticleLayout {...{ content, metadata }} />
    </Layout>
  )
}

export default Page
