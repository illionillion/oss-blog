import { Box, Text, Button } from "@yamada-ui/react"

import Link from "next/link"

import React from "react"
import { Layout } from "@/components/layouts"

export default function Component() {
  return (
    <Layout h="full">
      <Box
        flexGrow={1}
        display="flex"
        w="100vw"
        minH="100vh"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="0 auto"
        px="4"
        py="12"
      >
        <Box mx="auto" maxW="md" textAlign="center">
          <FrownIcon />
          <Text
            as="h1"
            mt="4"
            fontSize="3xl"
            fontWeight="bold"
            color="foreground"
          >
            404 Not Found
          </Text>
          <Text mt="4" color="muted-foreground">
            お探しのページは見つかりませんでした。
          </Text>
          <Box mt="6">
            <Link href="/">
              <Button
                as="a"
                display="inline-flex"
                alignItems="center"
                borderRadius="md"
                bg="primary"
                px="4"
                py="2"
                fontSize="sm"
                fontWeight="medium"
                color="primary-foreground"
                shadow="sm"
                _hover={{ bg: "primary/90" }}
                _focus={{
                  outline: "none",
                  ring: 2,
                  ringColor: "primary",
                  ringOffset: 2,
                }}
              >
                トップページに戻る
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

function FrownIcon() {
  return (
    <svg
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  )
}
