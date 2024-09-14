import { PrismaClient } from "@prisma/client"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

const prisma = new PrismaClient()

type Follow = {
  fromUserId: number
  toUserId: number
}

export async function POST(request: NextRequest) {
  let body

  try {
    body = await request.json()
  } catch (error) {
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

  const follow: Follow = {
    fromUserId: body.fromUserId,
    toUserId: body.toUserId,
  }

  const responseData = await prisma.follow.create({
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

  const follow: Follow = {
    fromUserId: body.fromUserId,
    toUserId: body.toUserId,
  }

  const targetData = await prisma.follow.findFirst({
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

  return NextResponse.json(
    {
      message: responseMessage.success.delete,
    },
    { status: 200 },
  )
}
