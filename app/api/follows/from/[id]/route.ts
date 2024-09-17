import { PrismaClient } from "@prisma/client"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId: string = params.id

  const userList: Array<{ toUserId: string }> = await prisma.follow.findMany({
    where: {
      fromUserId: userId,
    },
    select: {
      toUserId: true,
    },
  })

  return NextResponse.json(
    {
      message: responseMessage.success.get,
      userList: userList,
    },
    { status: 200 },
  )
}
