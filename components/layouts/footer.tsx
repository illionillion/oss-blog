import { Flex, Box, Text, Heading, Spacer } from "@yamada-ui/react"
import Link from "next/link"
import React from "react"
export const Footer = () => {
  const links = [
    { href: "/about", label: "About" },
    { href: "/contribute", label: "貢献する" },
    { href: "/contact", label: "行動規範" },
  ]

  const community = [
    { href: "", label: "Twitter" },
    { href: "", label: "GitHub" },
    { href: "", label: "Discord" },
  ]

  return (
    <Box w="full" backgroundColor="primary.300">
      <Box maxW="6xl" m="0 auto">
        <Flex w="full" gap="md" flexDir={{ base: "row", md: "column" }}>
          <Box m={{ md: "0 auto" }} textAlign={{ base: "left", md: "center" }}>
            <Heading size="md" py="md">
              OSSBlog
            </Heading>
            <Text>オープンソースの力で、より良い技術ブログを</Text>
          </Box>
          <Spacer />
          <Box m={{ md: "0 auto" }} textAlign={{ base: "left", md: "center" }}>
            <Heading size="md" py="md">
              リンク
            </Heading>
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                <Text>{link.label}</Text>
              </Link>
            ))}
          </Box>
          <Spacer />
          <Box m={{ md: "0 auto" }} textAlign={{ base: "left", md: "center" }}>
            <Heading size="md" py="md">
              コミュニティ
            </Heading>
            {community.map((link) => (
              <Link href={link.href} key={link.href}>
                <Text>{link.label}</Text>
              </Link>
            ))}
          </Box>
        </Flex>
        <Text m="0 auto" py="md" textAlign="center">
          © 2021 OSSBlog. All rights reserved.
        </Text>
      </Box>
    </Box>
  )
}
