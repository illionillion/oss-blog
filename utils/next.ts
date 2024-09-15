import path from "path"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleContent, getArticlePaths } from "./articles"

interface Props {
  params: { slug?: string[] }
}

export const generateArticleMetadata =
  (categoryGroupName: string) =>
  async ({ params }: Props): Promise<Metadata> => {
    const { slug } = params

    if (!slug)
      return {
        title: "Not Found",
        description: "Not Found",
      }

    const { metadata } = await getStaticArticleContent(categoryGroupName)(slug)

    return {
      title: metadata?.title || "Not Content Found",
      description: metadata?.description || "Not Content Found",
      keywords: metadata?.keyword,
    }
  }

export const generateStaticArticleParams =
  (categoryGroupName: string) => async () => {
    const paths = await getArticlePaths(categoryGroupName)
    console.log(paths)

    return paths
  }

export const getStaticArticleContent =
  (categoryGroupName: string) => async (slug?: string[]) => {
    const contentsPath = path.join(
      process.cwd(),
      "contents",
      categoryGroupName,
      ...(slug || []),
    )
    const { content, metadata } = await getArticleContent(contentsPath)

    if (!content) {
      notFound()
    }

    return {
      content: content || "No content found",
      metadata: metadata,
    }
  }
