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

  const article = await prisma.article.findFirst({
    where: {
      url: url,
    },
  })

  return NextResponse.json(
    {
      message: responseMessage.success.get,
      data: article,
    },
    { status: 200 },
  )
}

export function PUT() {
  return NextResponse.json(
    {
      message: responseMessage.success.put,
      data: {},
    },
    { status: 201 },
  )
}

export function DELETE() {
  return NextResponse.json(
    {
      message: responseMessage.success.delete,
      data: {},
    },
    { status: 200 },
  )
}
