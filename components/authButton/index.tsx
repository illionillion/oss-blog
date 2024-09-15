import { Button } from "@yamada-ui/react"
import React from "react"
import { auth, signIn, signOut } from "../../utils/auth/auth"

export async function SignInButton() {
  const session = await auth()
  if (!session?.user) console.log(session)
  return (
    <>
      <form
        action={async () => {
          "use server"
          await signIn()
        }}
      >
        <Button type="submit">Sign in</Button>
      </form>
    </>
  )
}

export async function SignOutButton() {
  return (
    <>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </>
  )
}
