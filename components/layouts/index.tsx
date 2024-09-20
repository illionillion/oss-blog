"use client"

import type { StackProps } from "@yamada-ui/react"
import { Center, VStack } from "@yamada-ui/react"
import type { FC } from "react"
import { Footer } from "./footer"
import { Header } from "./header"

export type LayoutProps = StackProps

export const Layout: FC<LayoutProps> = ({ ...rest }) => {
  return (
    <VStack w="full" minH="100dvh" gap={0}>
      <Header />

      <Center as="main" w="full" flexGrow={1}>
        <VStack
          alignItems="flex-start"
          w="full"
          maxW="9xl"
          gap={{ base: "lg", md: "md" }}
          py="lg"
          px={{ base: "lg", md: "md" }}
          {...rest}
        />
      </Center>
      <Footer />
    </VStack>
  )
}
