import { PrismaClient } from "@prisma/client"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } },
) {
  const name: string = params.name

  const tag = await prisma.tag.findFirst({
    where: {
      name: name,
    },
  })

  if (!tag) {
    return NextResponse.json(
      { message: responseMessage.error.notFound },
      { status: 404 },
    )
  }

  return NextResponse.json(
    {
      message: responseMessage.success.get,
      data: tag,
    },
    { status: 200 },
  )
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { name: string } },
) {
  const name: string = params.name

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

  const tag = await prisma.tag.findFirst({
    where: {
      name: name,
    },
  })

  if (!tag) {
    return NextResponse.json(
      { message: responseMessage.error.notFound },
      { status: 404 },
    )
  }

  const updatedName = body.name !== undefined ? body.name : tag.name

  const updatedIconUrl = body.iconUrl !== undefined ? body.iconUrl : tag.iconUrl

  const responseData = await prisma.tag.update({
    where: {
      id: tag.id,
    },
    data: {
      name: updatedName,
      iconUrl: updatedIconUrl,
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
