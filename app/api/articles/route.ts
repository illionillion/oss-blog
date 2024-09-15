import type { Article } from "@prisma/client"
import { PrismaClient } from "@prisma/client"

import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

const prisma = new PrismaClient()

export async function GET() {
  const articleList: Array<Article> = await prisma.article.findMany()

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

export async function POST(request: NextRequest) {
  let body

  try {
    body = await request.json()
  } catch (error) {
    // リクエストボディが存在しない場合にエラーを返す
    console.log(error)
    return NextResponse.json(
      { message: responseMessage.error.invalidRequest },
      { status: 400 },
    )
  }

  if (body.url == null) {
    return NextResponse.json(
      { message: responseMessage.error.invalidRequest },
      { status: 400 },
    )
  }

  const article: Pick<Article, "url"> = {
    url: body.url,
  }

  // 重複したデータが存在するか確認
  const isExist: boolean =
    (await prisma.article.findFirst({
      where: article,
      select: {
        id: true,
      },
    })) !== null

  if (isExist) {
    return NextResponse.json(
      { message: responseMessage.error.conflict },
      { status: 409 },
    )
  }

  const responseData: Article = await prisma.article.create({
    data: article,
  })

  return NextResponse.json(
    {
      message: responseMessage.success.post,
      data: responseData,
    },
    { status: 201 },
  )
}
