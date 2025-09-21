
"use client"
import Image from "next/image";
import {textToSpeech} from "@/app/elevenApi"
import { useState, useEffect } from "react";
import EntryForm from "@/components/EntryForm";
import Header from "@/components/Header"
import TableObject from "@/components/TableObject";
import Spinner from "@/components/Spinner";
import { Protect } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { user } from "@/components/server"


type Handle = {
  voiceID: string
  text: string
}

export default function AppFunction() {

  const [voice, setVoice] = useState<string>("")

  const [speechText, setSpeechText] = useState("")

  const [loading, setLoading] = useState(false)

  const [audioUrl, setAudioUrl] = useState<string>("");

  




  // const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY



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

        // const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
        //   method: "POST",
        //   headers: {
        //     "xi-api-key": `${apiKey}`,
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify({
        //     "text": `${speechText}`,
        //     "model_id": "eleven_multilingual_v2"
        //   }),
          const response = await fetch("/api/speak", {
            method: "POST",
            body: JSON.stringify({ voiceID: voice, text: speechText }),
            headers: { "Content-Type": "application/json" },
          })

        

        if (!response) {
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



  return(
    
    <div>

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

            <div >
        
        
                <Header />
                
                <EntryForm onsubmit={handleSubmit} voice={voice} onVoiceChange={setVoice} speechText={speechText} onTextChange={setSpeechText} />
    
                <div className="flex flex-row p-10 items-center justify-center bg-blue-400">{loading ? <Spinner /> : "" }</div>
    
                <TableObject audioName="Text to Speech" audioUrl={audioUrl} />
            
        
            
        
            </div>
            


        </Protect>

    </div>


  )
    

}

