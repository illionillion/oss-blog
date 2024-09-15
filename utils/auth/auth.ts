import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const config: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  basePath: "/api/auth",
  callbacks: {
    authorized: async ({ request }) => {
      try {
        const { pathname } = request.nextUrl
        if (pathname === "/") return true
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name
      return token
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
