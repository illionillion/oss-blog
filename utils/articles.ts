import { readFile } from "fs/promises"
import type { ArticleMetadata } from "article"
import { glob } from "glob"
import matter from "gray-matter"

export const getArticlePaths = async (dir: string): Promise<string[][]> => {
  const articlePaths = (await glob(`contents/${dir}/**/*.md`)).map((filePath) =>
    filePath
      .replace(/\\/g, "/")
      .replace(/^contents\//, "")
      .replace(".md", "")
      .split("/"),
  )
  return articlePaths
}

export const getArticleList = async () => {
  const articlePaths = await glob(`contents/**/*.md`)

  const articleList = await Promise.all(
    articlePaths.map(async (articlePath) => {
      const { metadata } = await getArticleContent(
        articlePath.replace(".md", ""),
      )
      const slug = articlePath
        .replace(/\\/g, "/")
        .replace(/^contents\//, "")
        .replace(".md", "")
      return { ...metadata, slug }
    }),
  )

  return articleList
}

export const getArticleContent = async (
  dir: string,
): Promise<{ content: string; metadata?: ArticleMetadata }> => {
  const articleFilePath = dir + ".md"

  try {
    const fileContent = await readFile(articleFilePath, "utf-8")
    const { data, content } = matter(fileContent)
    const metadataContent = data as ArticleMetadata
    return { content, metadata: metadataContent }
  } catch (error) {
    console.error(`Failed to read markdown file: ${error}`)
    return { content: "" }
  }
}
