import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

export function GET() {
  return NextResponse.json(
    {
      message: responseMessage.success.get,
    },
    { status: 200 },
  )
}
