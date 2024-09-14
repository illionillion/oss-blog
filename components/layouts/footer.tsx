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
    <Flex w="full" gap="md" flexDir={{ base: "row", md: "column" }}>
      <Box>
        <Box>© 2020</Box>
      </Box>
      <Spacer />
      <Box>
        <Heading size="md">リンク</Heading>
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <Text>{link.label}</Text>
          </Link>
        ))}
      </Box>
      <Spacer />
      <Box>
        <Heading size="md">コミュニティ</Heading>
        {community.map((link) => (
          <Link href={link.href} key={link.href}>
            <Text>{link.label}</Text>
          </Link>
        ))}
      </Box>
    </Flex>
  )
}
