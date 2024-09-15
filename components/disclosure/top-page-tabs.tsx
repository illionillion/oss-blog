"use client"
import { Tab, TabPanel, Tabs } from "@yamada-ui/react"
import type { FC } from "react"
import React from "react"
import { ArticleCard } from "../data-display/article-card"
import type { getArticleList } from "@/utils/articles"

interface TopPageTabsProps {
  articles: Awaited<ReturnType<typeof getArticleList>>
}
export const TopPageTabs: FC<TopPageTabsProps> = ({ articles }) => {
  return (
    <Tabs>
      <Tab>一覧</Tab>
      <Tab>いいね</Tab>
      <Tab>ブックマーク</Tab>
      <Tab>フォロー中</Tab>
      <Tab>AI厳選</Tab>

      <TabPanel>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </TabPanel>
      <TabPanel>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </TabPanel>
      <TabPanel>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </TabPanel>
      <TabPanel>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </TabPanel>
      <TabPanel>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </TabPanel>
    </Tabs>
  )
}
