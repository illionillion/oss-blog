// 各プラットフォーム（Qiita, Zenn, Hatena）の記事を検索するための関数を定義するファイル
import axius from "axios"
import { config } from "../config"
import type { Article } from "../types/article"

export async function searchQiita(query: string): Promise<Article[]> {
  try {
    const response = await axius.get(
      `${config.searchEndpoints.qiita}?query=${query}`,
    )
    return response.data.map((item: any) => ({
      title: item.title,
      url: item.url,
      platofrom: "Qiita",
    }))
  } catch (error) {
    console.error("Error fetching from Qiita:", error)
    return []
  }
}

export async function searchZenn(query: string): Promise<Article[]> {
  const zennUrl = "https://zenn.dev/"

  try {
    const response = await axius.get(
      `${config.searchEndpoints.zenn}?q=${query}`,
    )
    console.log("Zenn response:", response.data)
    return response.data.articles.map((item: any) => ({
      title: item.title,
      url: zennUrl + item.path,
      platofrom: "Zenn",
    }))
  } catch (error) {
    console.error("Error fetching from Zenn:", error)
    return []
  }
}

export async function searchHatena(query: string): Promise<Article[]> {
  try {
    const response = await axius.get(
      `${config.searchEndpoints.hatena}?query=${query}`,
    )
    return response.data.map((item: any) => ({
      title: item.title,
      url: item.url,
      platofrom: "Hatena",
    }))
  } catch (error) {
    console.error("Error fetching from Hatena:", error)
    return []
  }
}
