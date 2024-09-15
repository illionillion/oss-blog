"use client"

import { Tab, TabPanel, Tabs } from "@yamada-ui/react"
import type { FC } from "react"
import React from "react"
import type { getArticleList } from "@/utils/articles"

interface ProfileTabsProps {
  articles: Awaited<ReturnType<typeof getArticleList>>
}

export const ProfileTabs: FC<ProfileTabsProps> = () => {
  return (
    <>
      <Tabs>
        <Tab>コントリビュート</Tab>
        <Tab>いいね</Tab>
        <Tab>ブックマーク</Tab>

        <TabPanel>コントリビュート</TabPanel>
        <TabPanel>いいね</TabPanel>
        <TabPanel>ブックマーク</TabPanel>
      </Tabs>
    </>
  )
}
