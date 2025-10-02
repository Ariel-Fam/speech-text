
"use client"
import Image from "next/image";
import {textToSpeech} from "@/app/elevenApi"
import { useState, useEffect } from "react";
import EntryForm from "@/components/EntryForm";
import Header from "@/components/Header"
import TableObject from "@/components/TableObject";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { Button } from "./ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {Protect} from "@clerk/nextjs"

type Handle = {
  voiceID: string
  text: string
}

export default function AppFunction() {

  const [voice, setVoice] = useState<string>("")

  const [speechText, setSpeechText] = useState("")

  const [loading, setLoading] = useState(false)

  const [audioUrl, setAudioUrl] = useState<string>("");

  useEffect(() => {

    return () => {
      
      if (audioUrl){
      URL.revokeObjectURL(audioUrl);
    }
  }

  }, [audioUrl])



  const handleSubmit = async ({voiceID: voice, text:speechText}: Handle) => {

    if (voice && speechText) {

      console.log(voice, speechText)

      setLoading(true)

      try{

          const response = await fetch("/api/speak", {
            method: "POST",
            body: JSON.stringify({ voiceID: voice, text: speechText }),
            headers: { "Content-Type": "application/json" },
          })

        if (!response || !response.ok) {
          if (response && response.status === 402) {
            throw new Error("Insufficient credits. Please subscribe to continue.")
          }
          throw new Error("Unable to connect to api")
        }

        const data = await response.blob()

        const audioBlob = new Blob([data], {type:"audio/mpeg"})
        const audioUrl = URL.createObjectURL(audioBlob)

        setAudioUrl(audioUrl)

        

        console.log(audioUrl)


        console.log(data)

      }
      catch(e){

        console.error("Not able to connect to the Api", e)
      }
      finally{
        setLoading(false)
      }
    }
  }

  const remaining = useQuery(api.credits.getRemaining, {})

  if (remaining === 0) {
    return (

      <Protect
      fallback={
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-500 via-green-500 to-blue-500 ">
                <Header />

                <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl mt-8 shadow-2xl hover:scale-110">

                <h1 className="text-xl font-semibold mb-2">Upgrade required</h1>
                <p className="mb-4">Subscribe to unlock text-to-speech.</p>
                <Link href="/subscribe" prefetch={false} className="underline">
                    <Button  className="cursor-pointer hover:scale-110">Go to Subscribe</Button>
                </Link>
                </div>

                
                <div className="mt-20">
                    <Image
                    src={"/example.png"}
                    height={400}
                    width={600}
                    alt="img"
                    className="rounded-3xl shadow-2xl mb-40 hover:scale-120"
                    />
                </div>
            </div>


      }
      
      >
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-500 via-green-500 to-blue-500 ">
        <Header />
        <div className="w-full max-w-xl px-4">

         

          <CreditsBanner  />
           
          <div className="mt-6">
            <Alert variant="default">
              <AlertTitle>Upgrade required</AlertTitle>
              <AlertDescription>
                You have 0 credits left. Subscribe to continue using text-to-speech.
              </AlertDescription>
            </Alert>
          </div>
          <div className="flex justify-start mt-4">
            <Link href="/subscribe" prefetch={false} className="underline">
              <Button className="cursor-pointer">Go to Subscribe</Button>
            </Link>
          </div>
        </div>
        <div className="mt-20">
          <Image
            src={"/example.png"}
            height={400}
            width={600}
            alt="img"
            className="rounded-3xl shadow-2xl mb-40 hover:scale-120"
          />
        </div>
      </div>
        
      </Protect>
      
    )
  }

  return(

    <Protect

    plan={"monthly_plan"}
        fallback={
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-500 via-green-500 to-blue-500 ">
                    <Header />

                    <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl mt-8 shadow-2xl hover:scale-110">

                    <h1 className="text-xl font-semibold mb-2">Upgrade required</h1>
                    <p className="mb-4">Subscribe to unlock text-to-speech.</p>
                    <Link href="/subscribe" prefetch={false} className="underline">
                        <Button  className="cursor-pointer hover:scale-110">Go to Subscribe</Button>
                    </Link>
                    </div>

                    
                    <div className="mt-20">
                        <Image
                        src={"/example.png"}
                        height={400}
                        width={600}
                        alt="img"
                        className="rounded-3xl shadow-2xl mb-40 hover:scale-120"
                        />
                    </div>
                </div>


        }
    
    
    >

      <div>
        <div>
          <Header />
          <div className="w-full max-w-xl px-4">
           
          </div>
          <EntryForm onsubmit={handleSubmit} voice={voice} onVoiceChange={setVoice} speechText={speechText} onTextChange={setSpeechText} />
          <div className="flex flex-row p-10 items-center justify-center bg-blue-400">{loading ? <Spinner /> : "" }</div>
          <TableObject audioName="Text to Speech" audioUrl={audioUrl} />
        </div>
      </div>

    </Protect>
  )
}

