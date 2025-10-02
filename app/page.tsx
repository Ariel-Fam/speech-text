"use client"

import Header from "@/components/Header"
import { Authenticated, Unauthenticated } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import AppFunction from "@/components/AppAccess";
import Intro from "@/components/Intro"
import { ArrowLeft } from 'lucide-react';


export default function Home() {

  return (
    
    <>
      <Authenticated>

        <div className="mx-4 sm:mx-6 md:mx-14 flex items-center gap-3 sm:gap-4 mt-8 sm:mt-12 md:mt-20 bg-amber-400 p-2 sm:p-3 rounded-lg">

          <UserButton   />

          <h4 className="text-sm sm:text-base md:text-lg flex items-center gap-2"> <ArrowLeft /> Account Info</h4>
        </div>


        <Content />


      </Authenticated>

      <Unauthenticated>


        <div className="flex flex-col items-center justify-center  ">

          <Header />



      
          <div className="flex flex-col items-center justify-center bg-blue-700 w-40 p-7 rounded-3xl mb-40 text-white">
            
            <SignInButton  />

          </div>
        


        </div>

        

        <Intro />


      </Unauthenticated>
    </>
  )
}

function  Content() {

  



  return(<AppFunction />)
    
    
  
}







// Original Code:


// export default function Home() {

//   const [voice, setVoice] = useState<string>("")

//   const [speechText, setSpeechText] = useState("")

//   const [loading, setLoading] = useState(false)

//   const [audioUrl, setAudioUrl] = useState<string>("");


//   // const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY



//   useEffect(() => {

//     return () => {
      
//       if (audioUrl){
//       URL.revokeObjectURL(audioUrl);
//     }
//   }

//   }, [audioUrl])



//   const handleSubmit = async ({voiceID: voice, text:speechText}: Handle) => {

//     if (voice && speechText) {

//       console.log(voice, speechText)

//       setLoading(true)

//       try{

//         // const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
//         //   method: "POST",
//         //   headers: {
//         //     "xi-api-key": `${apiKey}`,
//         //     "Content-Type": "application/json"
//         //   },
//         //   body: JSON.stringify({
//         //     "text": `${speechText}`,
//         //     "model_id": "eleven_multilingual_v2"
//         //   }),
//           const response = await fetch("/api/speak", {
//             method: "POST",
//             body: JSON.stringify({ voiceID: voice, text: speechText }),
//             headers: { "Content-Type": "application/json" },
//           })

        

//         if (!response) {
//           throw new Error("Unable to connect to api")
//         }

//         const data = await response.blob()

//         const audioBlob = new Blob([data], {type:"audio/mpeg"})
//         const audioUrl = URL.createObjectURL(audioBlob)

//         setAudioUrl(audioUrl)

       

//         console.log(audioUrl)


//         console.log(data)

//       }
//       catch(e){

//         console.error("Not able to connect to the Api", e)
//       }
//       finally{
//         setLoading(false)
//       }
//     }
//   }

//   return (
//     <div >

//     <Header />
      
//     <EntryForm onsubmit={handleSubmit} voice={voice} onVoiceChange={setVoice} speechText={speechText} onTextChange={setSpeechText} />

//     <div className="flex flex-row p-10 items-center justify-center bg-blue-400">{loading ? <Spinner /> : "" }</div>

//     <TableObject audioName="Text to Speech" audioUrl={audioUrl} />

    

    

//     </div>
//   );
// }
