import { Flex, Box, Text, Heading, Spacer } from "@yamada-ui/react"
import Link from "next/link"
import React from "react"
export const Footer = () => {
  const links = [
    { href: "/welcome", label: "About" },
    {
      href: "https://github.com/illionillion/oss-blog/blob/main/CONTRIBUTING.ja.md",
      label: "貢献する",
      isBlank: true,
    },
    {
      href: "https://github.com/illionillion/oss-blog/blob/main/CODE_OF_CONDUCT.ja.md",
      label: "行動規範",
      isBlank: true,
    },
  ]

  const community = [
    { href: "https://github.com/illionillion/oss-blog/", label: "GitHub" },
  ]

  return (
    <Box
      as="footer"
      w="full"
      px="lg"
      backgroundColor="primary.300"
      position="sticky"
      top="100vh"
    >
      <Box m="0 auto">
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
            {links.map((link) =>
              link.isBlank ? (
                <Link href={link.href} target="_blank" key={link.href}>
                  <Text>{link.label}</Text>
                </Link>
              ) : (
                <Link href={link.href} key={link.href}>
                  <Text>{link.label}</Text>
                </Link>
              ),
            )}
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
          © 2024 OSSBlog. All rights reserved.
        </Text>
      </Box>
    </Box>
  )
}
