import type { Article } from "@prisma/client"
import { PrismaClient } from "@prisma/client"

import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { url: string } },
) {
  const url: string = params.url

  const article: Article | null = await prisma.article.findFirst({
    where: {
      url: url,
    },
  })

  if (!article) {
    return NextResponse.json(
      { message: responseMessage.error.notFound },
      { status: 404 },
    )
  }

  return NextResponse.json(
    {
      message: responseMessage.success.get,
      data: article,
    },
    { status: 200 },
  )
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { url: string } },
) {
  const url: string = params.url

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

  const article: Pick<Article, "id"> | null = await prisma.article.findFirst({
    where: {
      url: url,
    },
    select: {
      id: true,
    },
  })

  if (!article) {
    return NextResponse.json(
      { message: responseMessage.error.notFound },
      { status: 404 },
    )
  }

  const responseData: Article = await prisma.article.update({
    where: {
      id: article.id,
    },
    data: {
      url: body.url,
    },
  })

  return NextResponse.json(
    {
      message: responseMessage.success.put,
      data: responseData,
    },
    { status: 201 },
  )
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { url: string } },
) {
  const url: string = params.url

  const article: Pick<Article, "id"> | null = await prisma.article.findFirst({
    where: {
      url: url,
    },
    select: {
      id: true,
    },
  })

  if (!article) {
    return NextResponse.json(
      { message: responseMessage.error.notFound },
      { status: 404 },
    )
  }

  await prisma.article.delete({
    where: {
      id: article.id,
    },
  })

  return NextResponse.json(
    {
      message: responseMessage.success.delete,
    },
    { status: 200 },
  )
}
