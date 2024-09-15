"use client"

import {
  GitForkIcon,
  LogInIcon,
  LogOutIcon,
  Moon,
  Palette,
  Sun,
} from "@yamada-ui/lucide"
import type {
  ColorMode,
  IconButtonProps,
  MenuProps,
  PopoverProps,
  CenterProps,
} from "@yamada-ui/react"
import {
  HStack,
  Spacer,
  useColorMode,
  MenuButton,
  IconButton,
  Menu,
  MenuList,
  MenuOptionGroup,
  MenuOptionItem,
  Popover,
  PopoverTrigger,
  useDisclosure,
  useTheme,
  PopoverContent,
  PopoverBody,
  Box,
  Center,
  useScroll,
  useMotionValueEvent,
  Flex,
  Heading,
  Loading,
} from "@yamada-ui/react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import type { FC } from "react"
import { useRef, useState, memo } from "react"
import { Search, SearchButton } from "../forms/search"

export type HeaderProps = CenterProps

export const Header: FC<HeaderProps> = ({ ...rest }) => {
  const ref = useRef<HTMLHeadingElement>()
  const { scrollY } = useScroll()
  const [y, setY] = useState<number>(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  useMotionValueEvent(scrollY, "change", setY)

  const isScroll = y > height

  const { data: session, status } = useSession()

  return (
    <Center
      ref={ref}
      as="header"
      w="full"
      bg={isScroll ? ["whiteAlpha.500", "blackAlpha.200"] : undefined}
      backdropFilter="auto"
      backdropSaturate="180%"
      backdropBlur="10px"
      shadow={isScroll ? ["base", "dark-sm"] : undefined}
      transitionProperty="common"
      transitionDuration="slower"
      position="sticky"
      top="0"
      left="0"
      right="0"
      zIndex="guldo"
      {...rest}
    >
      <HStack w="full" maxW="9xl" py="3" px={{ base: "lg", md: "md" }}>
        <HStack
          as={Link}
          gap="sm"
          href="/"
          aria-label="OSS Blog"
          _hover={{ opacity: 0.7 }}
          transitionProperty="opacity"
          transitionDuration="slower"
          _focus={{ outline: "none" }}
          _focusVisible={{ boxShadow: "outline" }}
          rounded="md"
        >
          <GitForkIcon color="primary" fontSize="4xl" />
          <Heading as="h1" size="md">
            OSS Blog
          </Heading>
        </HStack>
        <NavMenu />
        <Spacer />
        <Search
          display={{ base: "flex", md: "none" }}
          borderColor={isScroll ? "transparent" : "border"}
          bg={
            isScroll ? ["whiteAlpha.600", "blackAlpha.500"] : ["white", "black"]
          }
          backdropFilter="auto"
          backdropSaturate="180%"
          backdropBlur="10px"
        />
        <HStack>
          <SearchButton display={{ base: "none", md: "inline-flex" }} />
          <ThemeSchemeButton />
          <ColorModeButton />
          {status === "loading" ? (
            <Loading />
          ) : session ? (
            <IconButton
              variant="ghost"
              fontSize="2xl"
              icon={<LogInIcon />}
              onClick={() => signOut()}
            />
          ) : (
            <IconButton
              variant="ghost"
              fontSize="2xl"
              icon={<LogOutIcon />}
              onClick={() => signIn()}
            />
          )}
        </HStack>
      </HStack>
    </Center>
  )
}

type ColorModeButtonProps = IconButtonProps & {
  menuProps?: MenuProps
}

const NavMenu: FC = () => {
  // TODO: ページに応じてリンクを変更
  const linkList = [
    { href: "/", label: "記事一覧" },
    { href: "/", label: "タグ" },
    { href: "/", label: "コントリビュータ" },
    { href: "/", label: "About" },
  ]
  return (
    <Flex display={{ base: "flex", lg: "none" }} gap="md">
      {linkList.map((link) => (
        <Link key={link.label} href={link.href}>
          {link.label}
        </Link>
      ))}
    </Flex>
  )
}
const ColorModeButton: FC<ColorModeButtonProps> = memo(
  ({ menuProps, ...rest }) => {
    const { colorMode, internalColorMode, changeColorMode } = useColorMode()

    return (
      <Menu
        restoreFocus={false}
        modifiers={[
          {
            name: "preventOverflow",
            options: {
              padding: {
                top: 32,
                bottom: 32,
                left: 32,
                right: 32,
              },
            },
          },
        ]}
        {...menuProps}
      >
        <MenuButton
          as={IconButton}
          aria-label="Open color mode switching menu"
          variant="ghost"
          colorScheme="gray"
          color="muted"
          icon={
            colorMode === "dark" ? (
              <Sun fontSize="2xl" />
            ) : (
              <Moon fontSize="2xl" />
            )
          }
          {...rest}
        />

        <MenuList>
          <MenuOptionGroup<ColorMode | "system">
            value={internalColorMode}
            onChange={changeColorMode}
            type="radio"
          >
            <MenuOptionItem value="light" closeOnSelect>
              Light
            </MenuOptionItem>
            <MenuOptionItem value="dark" closeOnSelect>
              Dark
            </MenuOptionItem>
            <MenuOptionItem value="system" closeOnSelect>
              System
            </MenuOptionItem>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    )
  },
)

ColorModeButton.displayName = "ColorModeButton"

type ThemeSchemeButtonProps = IconButtonProps & {
  popoverProps?: PopoverProps
}

const ThemeSchemeButton: FC<ThemeSchemeButtonProps> = memo(
  ({ popoverProps, ...rest }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { theme, changeThemeScheme } = useTheme()
    const { colorSchemes = [] } = theme

    return (
      <Popover
        {...popoverProps}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        closeOnButton={false}
        restoreFocus={false}
        modifiers={[
          {
            name: "preventOverflow",
            options: {
              padding: {
                top: 32,
                bottom: 32,
                left: 32,
                right: 32,
              },
            },
          },
        ]}
      >
        <PopoverTrigger>
          <IconButton
            aria-label="Open color mode switching menu"
            variant="ghost"
            colorScheme="gray"
            color="muted"
            icon={<Palette fontSize="2xl" />}
            {...rest}
          />
        </PopoverTrigger>

        <PopoverContent>
          <PopoverBody
            display="grid"
            gridTemplateColumns={{ base: "repeat(4, 1fr)" }}
          >
            {colorSchemes.map((colorScheme: string) => (
              <Box
                as="button"
                type="button"
                key={colorScheme}
                bg={`${colorScheme}.500`}
                minW={{ base: "12", md: "10" }}
                minH={{ base: "12", md: "10" }}
                rounded="md"
                boxShadow="inner"
                outline="0"
                _hover={{ bg: `${colorScheme}.600` }}
                _active={{ bg: `${colorScheme}.700` }}
                _focusVisible={{ shadow: "outline" }}
                transitionProperty="common"
                transitionDuration="slower"
                onClick={() => {
                  changeThemeScheme(colorScheme)
                  onClose()
                }}
              />
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  },
)

ThemeSchemeButton.displayName = "ThemeSchemeButton"
