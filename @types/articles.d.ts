declare module "article" {
  interface ArticleMetadata {
    title: string
    description: string
    keyword: string[]
    contributors: {
      id: number | undefined
      login: string | undefined
      avatar_url: string | undefined
      html_url: string | undefined
    }[]
    latest_date: string
  }
}
