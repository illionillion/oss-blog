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
