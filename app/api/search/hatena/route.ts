import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { responseMessage } from "@/app/api/types/responseMessage"

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams
  const keyword: string | null = searchParams.get("keyword")

  // ここで検索のロジックを実装する

  return NextResponse.json(
    {
      message: responseMessage.success.get,
      data: {
        // 結果を返す
        keyword: keyword,
      },
    },
    { status: 200 },
  )
}
