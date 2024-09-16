// Perplexity APIとの通信ロジック
import axios from "axios"

export async function fetchFromPerplexity(query: string): Promise<any> {
  const url = `https://api.perplexity.ai/search`
  try {
    const response = await axios.post(
      url,
      { query },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )
    return response.data
  } catch (error) {
    console.error("Error fetching from Perplexity:", error)
    throw error
  }
}

const options = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.TEAM_APIKEY}`,
    "Content-Type": "application/json",
  },
  body: '{"model":"llama-3.1-sonar-large-128k-online","messages":[{"content":"Qiitaで記事を検索","role":"user"}],"max_tokens":30,"temperature":0.2,"top_p":0.5,"return_citations":true,"search_domain_filter":["Zenn","hatenablog","frontend","backend","data engineering"]}',
}

export const completionsPerplexity = async (keyword: string) => {
  console.log("keyword", keyword)
  try {
    const request = await fetch(
      "https://api.perplexity.ai/chat/completions",
      options,
    )
    console.log("keyword", keyword)
    const response = await request.json()
    console.log(response)

    return response
  } catch (error) {
    console.error("Error fetching from Perplexity:", error)
    throw error
  }
}
