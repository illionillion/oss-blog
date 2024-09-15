import { PrismaClient } from "@prisma/client"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id: number = Number(params.id)

  const articleList: Array<{ article: { url: string } }> =
    await prisma.bookmark.findMany({
      where: {
        userId: id,
      },
      include: {
        article: {
          select: {
            url: true,
          },
        },
      },
    })

  return NextResponse.json(
    {
      message: responseMessage.success.get,
      data: {
        articleList: articleList,
      },
    },
    { status: 200 },
  )
}
