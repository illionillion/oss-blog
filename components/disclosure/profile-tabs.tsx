"use client"

import { Center, Tab, TabPanel, Tabs, Text, VStack } from "@yamada-ui/react"
import type { FC } from "react"
import React from "react"
import { ArticleCard } from "../data-display/article-card"
import type { getArticleList } from "@/utils/articles"

interface ProfileTabsProps {
  articles: Awaited<ReturnType<typeof getArticleList>>
}

export const ProfileTabs: FC<ProfileTabsProps> = ({ articles }) => {
  return (
    <Tabs>
      <Tab>コントリビュート</Tab>
      <Tab>いいね</Tab>
      <Tab>ブックマーク</Tab>

      <TabPanel>
        <VStack>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </VStack>
      </TabPanel>
      <TabPanel>
        <Center>
          <Text>いいねした記事はありません</Text>
        </Center>
      </TabPanel>
      <TabPanel>
        <Center>
          <Text>ブックマークした記事はありません</Text>
        </Center>
      </TabPanel>
    </Tabs>
  )
}
