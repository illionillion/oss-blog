import { PrismaClient } from "@prisma/client"
import type { Bookmark } from "@prisma/client"

const prisma = new PrismaClient()

export const bookmarkRepository: {
  findByUserId: (userId: string) => Promise<Array<{ article: { url: string } }>>
  findUsersByArticleId: (
    articleId: number,
  ) => Promise<Array<{ userId: string }>>
  create: (data: Pick<Bookmark, "userId" | "articleId">) => Promise<Bookmark>
  delete: (bookmarkId: number) => Promise<void>
} = {
  findByUserId: async (
    userId: string,
  ): Promise<Array<{ article: { url: string } }>> => {
    return await prisma.bookmark.findMany({
      where: { userId },
      include: {
        article: {
          select: { url: true },
        },
      },
    })
  },

  findUsersByArticleId: async (
    articleId: number,
  ): Promise<Array<{ userId: string }>> => {
    return await prisma.bookmark.findMany({
      where: { articleId },
      select: { userId: true },
    })
  },

  create: async (
    data: Pick<Bookmark, "userId" | "articleId">,
  ): Promise<Bookmark> => {
    return await prisma.bookmark.create({ data })
  },

  delete: async (bookmarkId: number): Promise<void> => {
    await prisma.bookmark.delete({ where: { id: bookmarkId } })
  },
}
