import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import type { Article } from "../../types/article"
import { searchQiita } from "@/app/api/search/searchService"
import { responseMessage } from "@/app/api/types/responseMessage"

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams
  const keyword: string | null = searchParams.get("keyword")

  // キーワードがない場合はエラーを返す
  if (!keyword) {
    return NextResponse.json(
      {
        message: responseMessage.error.invalidRequest,
        data: {
          keyword: keyword,
        },
      },
      { status: 400 },
    )
  }

  // Qittaから記事を検索
  const articleList: Array<Article> = await searchQiita(keyword)

  return NextResponse.json(
    {
      message: responseMessage.success.get,
      data: {
        articleList: articleList,
      },
    },
    { status: 200 },
  )
}
