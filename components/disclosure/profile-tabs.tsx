"use client"

import { Tab, TabPanel, Tabs } from "@yamada-ui/react"
import type { FC } from "react"
import React from "react"
import { ArticleCard } from "../data-display/article-card"
import type { getArticleList } from "@/utils/articles"

interface ProfileTabsProps {
  articles: Awaited<ReturnType<typeof getArticleList>>
}

export const ProfileTabs: FC<ProfileTabsProps> = ({ articles }) => {
  return (
    <>
      <Tabs>
        <Tab>コントリビュート</Tab>
        <Tab>いいね</Tab>
        <Tab>ブックマーク</Tab>

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
    </>
  )
}
