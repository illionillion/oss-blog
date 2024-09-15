"use client"
import { Avatar, AvatarGroup, Box, forwardRef, Tooltip } from "@yamada-ui/react"
import type { AvatarGroupProps, AvatarProps } from "@yamada-ui/react"
import type { ArticleMetadata } from "article"
import { memo } from "react"

export type ContributorProps = AvatarGroupProps & {
  contributors?: ArticleMetadata["contributors"]
  avatarSize?: AvatarProps["boxSize"]
}

export const Contributor = memo(
  forwardRef<ContributorProps, "div">(
    ({ contributors, avatarSize = "7", ...rest }, ref) => {
      if (!contributors?.length) return null

      return (
        <AvatarGroup
          ref={ref}
          borderColor={["white", "black"]}
          gap="-3"
          max={5}
          {...rest}
        >
          {contributors.map(({ login, avatar_url, html_url }) => (
            <Box
              key={login}
              position="relative"
              borderRadius="full"
              sx={{ borderWidth: "3px" }}
              bg={["white", "black"]}
            >
              <Tooltip label={login} placement="top" flexShrink="0">
                <Avatar
                  as="a"
                  target="_blank"
                  href={html_url}
                  name={login}
                  src={avatar_url}
                  boxSize={avatarSize}
                />
              </Tooltip>
            </Box>
          ))}
        </AvatarGroup>
      )
    },
  ),
)

Contributor.displayName = "Contributor"
