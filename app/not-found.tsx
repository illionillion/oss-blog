import { Box, Text, Button } from "@yamada-ui/react"

import Link from "next/link"
import type { ReactNode } from "react"
import React from "react"

export default function Component(): ReactNode {
  return (
    <Box
      display="flex"
      minHeight="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="background"
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
          Oops, page not found!
        </Text>
        <Text mt="4" color="muted-foreground">
          We couldn't find the page you were looking for. Don't worry, it's
          probably just a temporary glitch. Let's get you back on track.
        </Text>
        <Box mt="6">
          <Link href="#" prefetch={false}>
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
              Take me home
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
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
