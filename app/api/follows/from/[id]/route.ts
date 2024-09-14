import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

export function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId: number = Number(params.id)

  return NextResponse.json(
    {
      message: responseMessage.success.get,
      userId,
    },
    { status: 200 },
  )
}
