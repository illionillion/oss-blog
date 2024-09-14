import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

export function GET() {
  return NextResponse.json(
    {
      message: responseMessage.success.get,
      data: {},
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
