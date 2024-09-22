import { PrismaClient } from "@prisma/client"
import type { Article } from "@prisma/client"

const prisma = new PrismaClient()

// Repository for interacting with Articles
export const articleRepository: {
  findByUrl: (url: string) => Promise<Article | null>
  findFirstWithIdByUrl: (url: string) => Promise<Pick<Article, "id"> | null>
  findAll: () => Promise<Article[]>
  create: (data: Pick<Article, "url">) => Promise<Article>
  updateUrlById: (id: number, url: string) => Promise<Article>
  deleteById: (id: number) => Promise<void>
} = {
  findByUrl: async (url: string): Promise<Article | null> => {
    return await prisma.article.findFirst({ where: { url } })
  },

  findFirstWithIdByUrl: async (
    url: string,
  ): Promise<Pick<Article, "id"> | null> => {
    return await prisma.article.findFirst({
      where: { url },
      select: { id: true },
    })
  },

  findAll: async (): Promise<Article[]> => {
    return await prisma.article.findMany()
  },

  create: async (data: Pick<Article, "url">): Promise<Article> => {
    return await prisma.article.create({ data })
  },

  updateUrlById: async (id: number, url: string): Promise<Article> => {
    return await prisma.article.update({
      where: { id },
      data: { url },
    })
  },

  deleteById: async (id: number): Promise<void> => {
    await prisma.article.delete({ where: { id } })
  },
}
