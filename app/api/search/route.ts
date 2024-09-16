import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { completionsPerplexity } from "./perplexityApi"
export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams
  const keyword: string | null = searchParams.get("query")

  // キーワードがない場合はエラーを返す
  if (!keyword) {
    return NextResponse.json(
      {
        message: "キーワードを入力してください",
        data: {
          keyword: keyword,
        },
      },
      { status: 400 },
    )
  }

  // AI検索
  const perplexityResponse = await completionsPerplexity(keyword)

  const response = perplexityResponse.choices[0].message.content

  return NextResponse.json(
    {
      message: "検索結果",
      data: {
        articleList: response,
      },
    },
    { status: 200 },
  )
}
