import type { Follow } from "@prisma/client"
import PrismaClient from "@prisma/client"
const prisma = new PrismaClient()

export const FollowRepository: {
  finedManyByIDs(fromUserId: string, toUserId: string): Promise<Follow[] | null>
  finedIDByFollowIDs(
    fromUserId: string,
    toUserId: string,
  ): Promise<string | null>
  finedToUserIdByFromUserId(fromUserId: string): Promise<string | null>
  finedFromUserIdByToUserId(fromUserId: string): Promise<string | null>
  finedUserByFollowIDs(
    fromUserId: string,
    toUserId: string,
  ): Promise<string | null>

  create(fromUserId: string, toUserId: string): Promise<Follow>
  delete(fromUserId: string, toUserId: string): Promise<Follow>
} = {
  async finedManyByIDs(
    fromUserId: string,
    toUserId: string,
  ): Promise<Follow[] | null> {
    return await prisma.follow.findMany({
      where: {
        fromUserId: fromUserId,
        toUserId: toUserId,
      },
    })
  },
  async finedToUserIdByFromUserId(fromUserId: string): Promise<string | null> {
    return await prisma.follow.findMany({
      where: {
        fromUserId: fromUserId,
      },
      select: {
        toUserId: true,
      },
    })
  },

  async finedIDByFollowIDs(
    fromUserId: string,
    toUserId: string,
  ): Promise<string | null> {
    return await prisma.follow.findFirst({
      where: {
        fromUserId: fromUserId,
        toUserId: toUserId,
      },
      select: {
        id: true,
      },
    })
  },

  async finedFromUserIdByToUserId(fromUserId: string): Promise<string | null> {
    return await prisma.follow.findMany({
      where: {
        toUserId: fromUserId,
      },
      select: {
        fromUserId: true,
      },
    })
  },

  async finedUserByFollowIDs(
    fromUserId: string,
    toUserId: string,
  ): Promise<string | null> {
    return await prisma.follow.findMany({
      where: {
        fromUserId: fromUserId,
        toUserId: toUserId,
      },
      select: {
        id: true,
      },
    })
  },

  async create(fromUserId: string, toUserId: string): Promise<Follow> {
    return await prisma.follow.create({
      data: {
        fromUserId: fromUserId,
        toUserId: toUserId,
      },
    })
  },

  async delete(fromUserId: string, toUserId: string): Promise<Follow> {
    return await prisma.follow.delete({
      where: {
        fromUserId_toUserId: {
          fromUserId: fromUserId,
          toUserId: toUserId,
        },
      },
    })
  },
}
