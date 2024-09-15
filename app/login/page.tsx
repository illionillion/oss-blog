import React from "react"
import { SignInButton, SignOutButton } from "../../components/authButton"
import { auth } from "../../utils/auth/auth"

const Page = async () => {
  const session = await auth()
  console.log(session)
  console.log(session?.user)
  return <div>{session?.user ? <SignOutButton /> : <SignInButton />}</div>
}

export default Page
