"use client"
import {
  Card,
  CardBody,
  Tab,
  TabPanel,
  Tabs,
  Text,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import React from "react"

const activityLinks = [
  {
    link: "https://github.com",
  },
  {
    link: "https://github.com",
  },
  {
    link: "https://github.com",
  },
]
const issueLinks = [
  {
    link: "https://github.com",
  },
  {
    link: "https://github.com",
  },
  {
    link: "https://github.com",
  },
]

const pulRequestLinks = [
  {
    link: "https://github.com",
  },
  {
    link: "https://github.com",
  },
  {
    link: "https://github.com",
  },
]

export const RecentActivitiesTabs: FC = () => {
  return (
    <Card w="full">
      <CardBody>
        <Tabs m="0 auto" variant="sticky" align="start">
          <Tab>新着記事</Tab>
          <Tab>最近のIssue</Tab>
          <Tab>最近のPR</Tab>
          <TabPanel>
            <VStack>
              {activityLinks.map((link) => (
                <Text as={Link} href="#" key={link.link}>
                  {link.link}
                </Text>
              ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack>
              {issueLinks.map((link) => (
                <Text as={Link} href="#" key={link.link}>
                  {link.link}
                </Text>
              ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack>
              {pulRequestLinks.map((link) => (
                <Text as={Link} href="#" key={link.link}>
                  {link.link}
                </Text>
              ))}
            </VStack>
          </TabPanel>
        </Tabs>
      </CardBody>
    </Card>
  )
}
