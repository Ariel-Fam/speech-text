'use client'

import { SignIn, useUser } from '@clerk/nextjs'
import Header from '@/components/Header'
import Intro from "@/components/Intro"

export default function Home() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    
    return (

        <div className={"flex flex-col items-center justify-center"}>
            <Header/>

            <div className={"mb-20"}>

                <SignIn  />

            </div>


            <Intro />
        </div>
    )
  }

  return <div>Welcome!</div>
}