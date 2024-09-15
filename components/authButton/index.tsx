// components/authButton.tsx (クライアントコンポーネント)
"use client"

import { Button } from "@yamada-ui/react"
import { signIn, signOut, useSession } from "next-auth/react"

const AuthButtons = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <>
      {session ? (
        <Button onClick={() => signOut()}>Sign out</Button>
      ) : (
        <Button onClick={() => signIn()}>Sign in</Button>
      )}
    </>
  )
}

export default AuthButtons
