import { PrismaClient } from "@prisma/client"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

import type { Article, Bookmark } from "@prisma/client"

const prisma = new PrismaClient()

interface ResponseBookmark {
  id: number;
  userId: number;
  articleUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
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

  if (!body.userId || !body.articleUrl) {
    return NextResponse.json(
      { message: responseMessage.error.invalidRequest },
      { status: 400 },
    )
  }

  const article: Pick<Article, 'id'> | null = await prisma.article.findFirst({
    where: {
      url: body.articleUrl,
    },
    select: {
      id: true,
    },
  })

  // 記事が存在しない場合
  if (!article) {
    return NextResponse.json(
      { message: responseMessage.error.notFound },
      { status: 404 },
    )
  }

  const bookmark: Pick<Bookmark, 'userId' | 'articleId'> = {
    userId: body.userId,
    articleId: article.id,
  }

  // 重複したデータが存在するか確認
  const isExist: boolean =
    (await prisma.bookmark.findFirst({
      where: bookmark,
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

  const createdData: Bookmark & { article: { url: string }} = await prisma.bookmark.create({
    data: bookmark,
    include: {
      article: {
        select: {
          url: true,
        },
      },
    },
  })

  const responseData: ResponseBookmark = {
    id: createdData.id,
    userId: createdData.userId,
    articleUrl: createdData.article.url,
    createdAt: createdData.createdAt,
    updatedAt: createdData.updatedAt,
  }

  return NextResponse.json(
    {
      message: responseMessage.success.post,
      data: responseData,
    },
    { status: 201 },
  )
}

export async function DELETE(request: NextRequest) {
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

  if (!body.userId || !body.articleUrl) {
    return NextResponse.json(
      { message: responseMessage.error.invalidRequest },
      { status: 400 },
    )
  }

  const article: Pick<Article, 'id'> | null = await prisma.article.findFirst({
    where: {
      url: body.articleUrl,
    },
    select: {
      id: true,
    },
  })

  // 記事が存在しない場合
  if (!article) {
    return NextResponse.json(
      { message: responseMessage.error.notFound },
      { status: 404 },
    )
  }

  const bookmark: Pick<Bookmark, 'userId' | 'articleId'> = {
    userId: body.userId,
    articleId: article.id,
  }

  // 重複したデータが存在するか確認
  const bookmarkData: Pick<Bookmark, 'id'> | null = await prisma.bookmark.findFirst({
    where: bookmark,
    select: {
      id: true,
    },
  })

  if (!bookmarkData) {
    return NextResponse.json(
      { message: responseMessage.error.notFound },
      { status: 404 },
    )
  }

  await prisma.bookmark.delete({
    where: {
      id: bookmarkData.id,
    },
  })

  return NextResponse.json(
    {
      message: responseMessage.success.delete,
    },
    { status: 201 },
  )
}
