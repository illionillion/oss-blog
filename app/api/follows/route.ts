import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

export async function POST() {
  return NextResponse.json(
    {
      message: responseMessage.success.post,
    },
    { status: 201 },
  )
}

export function DELETE() {
  return NextResponse.json(
    {
      message: responseMessage.success.delete,
    },
    { status: 200 },
  )
}
