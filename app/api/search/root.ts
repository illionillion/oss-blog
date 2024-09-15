import { fetchFromPerplexity } from "@/app/api/search/perplexityApi"
import {
  searchQiita,
  searchZenn,
  searchHatena,
} from "@/app/api/search/searchService"

async function main() {
  const query = "TypeScript"

  // Perplexity API から全体の概要を取得
  const perplexityResult = await fetchFromPerplexity(query)
  console.log("Perplexity API Result:", perplexityResult)

  // Qittaから記事を検索
  const qiitaResult = await searchQiita(query)
  console.log("Qiita Articles:", qiitaResult)

  // Zennから記事を検索
  const zennResult = await searchZenn(query)
  console.log("Zenn Articles:", zennResult)

  // Hatenaから記事を検索
  const hatenaResult = await searchHatena(query)
  console.log("Hatena Articles:", hatenaResult)
}

main().catch(console.error)
