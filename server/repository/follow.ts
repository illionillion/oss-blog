import { PrismaClient } from "@prisma/client"
import type { Follow } from "@prisma/client"

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
