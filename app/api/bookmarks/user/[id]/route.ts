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

  const articleList:Array<{article:{url:string}}> = await prisma.bookmark.findMany({
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

  const articleUrlList = articleList.map((a) => a.article.url)

  return NextResponse.json(
    {
      message: responseMessage.success.get,
      data: {
        articleUrlList: articleUrlList,
      },
    },
    { status: 200 },
  )
}
