import { PrismaClient } from "@prisma/client"
import type { Follow, Like } from "@prisma/client"

const prisma = new PrismaClient()

export const followRepository: {
  findFollowing: (fromUserId: string) => Promise<Array<{ toUserId: string }>>
  findFollowers: (toUserId: string) => Promise<Array<{ fromUserId: string }>>
  create: (data: Pick<Follow, "fromUserId" | "toUserId">) => Promise<Follow>
  delete: (followId: number) => Promise<void>
} = {
  findFollowing: async (
    fromUserId: string,
  ): Promise<Array<{ toUserId: string }>> => {
    return await prisma.follow.findMany({
      where: { fromUserId },
      select: { toUserId: true },
    })
  },

  findFollowers: async (
    toUserId: string,
  ): Promise<Array<{ fromUserId: string }>> => {
    return await prisma.follow.findMany({
      where: { toUserId },
      select: { fromUserId: true },
    })
  },

  create: async (
    data: Pick<Follow, "fromUserId" | "toUserId">,
  ): Promise<Follow> => {
    return await prisma.follow.create({ data })
  },

  delete: async (followId: number): Promise<void> => {
    await prisma.follow.delete({ where: { id: followId } })
  },
}

// Repository for interacting with Likes
export const likeRepository = {
  findUsersByArticleId: async (
    articleId: number,
  ): Promise<Array<{ userId: string }>> => {
    return await prisma.like.findMany({
      where: { articleId },
      select: { userId: true },
    })
  },

  findArticlesLikedByUser: async (
    userId: string,
  ): Promise<Array<{ article: { url: string } }>> => {
    return await prisma.like.findMany({
      where: { userId },
      include: {
        article: {
          select: { url: true },
        },
      },
    })
  },

  create: async (data: Pick<Like, "userId" | "articleId">): Promise<Like> => {
    return await prisma.like.create({ data })
  },

  delete: async (likeId: number): Promise<void> => {
    await prisma.like.delete({ where: { id: likeId } })
  },
}
