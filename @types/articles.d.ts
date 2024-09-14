declare module "article" {
  interface ArticleContent {
    id: string
    lv: number
    title: string
  }
  interface ArticleMetadata {
    title: string
    description: string
    keyword: string[]
    contributors: {
      id: number
      login: string
      avatar_url: string
      html_url: string
    }[]
    latest_date: string
  }
}
