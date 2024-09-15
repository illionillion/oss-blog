import React from "react"
import { SignInButton } from "../../components/authButton"
import { auth } from "../../utils/auth/auth"

const Page = async () => {
  const session = await auth()
  console.log(session)
  console.log(session?.user)
  return (
    <div>
      <SignInButton />
    </div>
  )
}

export default Page
