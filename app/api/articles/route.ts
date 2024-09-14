import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

export function GET() {
  return NextResponse.json(
    {
      message: responseMessage.success.get,
      data: {
        articleList: [],
      },
    },
    { status: 200 },
  )
}

export function POST() {
  return NextResponse.json(
    {
      message: responseMessage.success.post,
      data: {},
    },
    { status: 201 },
  )
}
