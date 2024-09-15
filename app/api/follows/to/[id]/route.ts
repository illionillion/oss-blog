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

  const userList:Array<{fromUserId:number}> = await prisma.follow.findMany({
    where: {
      toUserId: userId,
    },
    select: {
      fromUserId: true,
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
