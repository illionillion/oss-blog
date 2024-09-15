import { fetchFromPerplexity } from "@/app/api/search/perplexityApi"
import {
  searchQiita,
  searchZenn,
  searchHatena,
} from "@/app/api/search/searchService"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const query = url.searchParams.get("query")
  if (!query) {
    console.error("Error fetching data: query is empty")
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
  try {
    // 複数のAPIリクエストを並行して実行
    const [perplexityResult, qiitaResult, zennResult, hatenaResult] =
      await Promise.all([
        fetchFromPerplexity(query),
        searchQiita(query),
        searchZenn(query),
        searchHatena(query),
      ])

    // 結果をまとめて返す
    return new Response(
      JSON.stringify({
        perplexityResult,
        qiitaResult,
        zennResult,
        hatenaResult,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
