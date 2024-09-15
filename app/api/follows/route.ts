import type { Follow } from "@prisma/client"
import { PrismaClient } from "@prisma/client"

import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

const prisma = new PrismaClient()

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

  if (!body.fromUserId || !body.toUserId) {
    return NextResponse.json(
      { message: responseMessage.error.invalidRequest },
      { status: 400 },
    )
  }

  if (body.fromUserId === body.toUserId) {
    return NextResponse.json(
      { message: responseMessage.error.invalidRequest },
      { status: 400 },
    )
  }

  const follow: Pick<Follow, "fromUserId" | "toUserId"> = {
    fromUserId: body.fromUserId,
    toUserId: body.toUserId,
  }

  // 重複したデータが存在するか確認
  const isExist: boolean =
    (await prisma.follow.findFirst({
      where: follow,
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

  const responseData: Follow = await prisma.follow.create({
    data: follow,
  })

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

  if (!body.fromUserId || !body.toUserId) {
    return NextResponse.json(
      { message: responseMessage.error.invalidRequest },
      { status: 400 },
    )
  }

  const follow: Pick<Follow, "fromUserId" | "toUserId"> = {
    fromUserId: body.fromUserId,
    toUserId: body.toUserId,
  }

  const targetData: Pick<Follow, "id"> | null = await prisma.follow.findFirst({
    where: follow,
    select: {
      id: true,
    },
  })

  if (!targetData) {
    return NextResponse.json(
      { message: responseMessage.error.notFound },
      { status: 404 },
    )
  }

  await prisma.follow.delete({
    where: {
      id: targetData.id,
    },
  })

  return NextResponse.json(
    {
      message: responseMessage.success.delete,
    },
    { status: 200 },
  )
}
