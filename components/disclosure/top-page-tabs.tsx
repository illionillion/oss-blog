"use client"
import { Button, Center, Loading, Tab, TabPanel, Tabs } from "@yamada-ui/react"
import { useSession, signIn } from "next-auth/react"
import type { FC } from "react"
import React from "react"
import { ArticleCard } from "../data-display/article-card"
import type { getArticleList } from "@/utils/articles"

interface TopPageTabsProps {
  articles: Awaited<ReturnType<typeof getArticleList>>
}
export const TopPageTabs: FC<TopPageTabsProps> = ({ articles }) => {
  const { data: session, status } = useSession()
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
        {status === "loading" ? (
          <Center w="full" h="full">
            <Loading />
          </Center>
        ) : session ? (
          articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))
        ) : (
          <Center w="full" h="full">
            <Button onClick={() => signIn()}>ログインしてください</Button>
          </Center>
        )}
      </TabPanel>
    </Tabs>
  )
}
