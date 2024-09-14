import { PrismaClient } from "@prisma/client"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId: number = Number(params.id)

  const userList = await prisma.follow.findMany({
    where: {
      fromUserId: userId,
    },
    select: {
      toUserId: true,
    },
  })

  const userIdList = userList.map((user) => user.toUserId)

  return NextResponse.json(
    {
      message: responseMessage.success.get,
      userIdList: userIdList,
    },
    { status: 200 },
  )
}
