import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent, 
    SelectItem
} from "@/components/ui/select"


import { Keyboard } from "lucide-react";



import { Textarea } from "./ui/textarea";

import React from "react";
import { Button } from "./ui/button";
import { Megaphone } from "lucide-react";

type Entry =  {
    onsubmit: ( data: {voiceID: string, text: string})=> void
    voice: string
    speechText: string
    onTextChange: (text: string) => void
    onVoiceChange: (voice: string) => void

}


function EntryForm({onsubmit, voice, speechText, onTextChange, onVoiceChange}: Entry) {

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        onsubmit({voiceID: voice, text:speechText})
        
    }

    const Max = 3000

    const used = speechText.length


    return (  

        
        <form onSubmit={handleSubmit}>


            <div className="w-screen h-100 bg-gray-700 flex flex-col items-center justify-center">


             <Select 
                value={voice}
                onValueChange={onVoiceChange}
                
                >

                    <SelectTrigger className="w-70">{voice ? voice: "Select a voice" }</SelectTrigger>

                    <SelectContent>
                    <SelectItem value="ntdpYtDTd78wjhHJ6unR">Mixed Accent - Male Voice</SelectItem>
                    <SelectItem value="bHDY9dhlJ8tPHo1Y74jn">British Accent - Female Voice</SelectItem>
                    <SelectItem value="Dslrhjl3ZpzrctukrQSN">American Accent - Male</SelectItem>
                    <SelectItem value="EXAVITQu4vr4xnSDxMaL">American Accent - female</SelectItem>
                    <SelectItem value="pqHfZKP75CvOlQylNhV4">Male Voice</SelectItem>
                    <SelectItem value="LcfcDJNUP1GQjkzn1xUU">Female Voice</SelectItem> 

                    </SelectContent>




                </Select>

                <h1 className="text-4xl mt-10 text-white">Select a Voice</h1>
            </div>



            <div className="w-screen h-100 bg-blue-500/85 flex flex-col items-center justify-center">

                <div className="flex flex-col items-center justify-center bg-white p-2 mt-4 rounded-2xl mb-4">
                    <p >{ Max - used } characters remaining </p>
                    <Keyboard />
                </div>

                <Textarea 
                value={speechText}
                onChange={(e)=>{onTextChange(e.target.value)}}
                placeholder="Write text to convert into Speech"
                className="w-70 h-40  shadow-xl hover:scale-105 hover:shadow-2xl sm:w-80 xs:w-70"
                maxLength={Max}
                >


                </Textarea>

                <Button className="mt-4 ml-40 hover:scale-110 hover:bg-fuchsia-950 " type="submit"> {<Megaphone />} Generate Speech</Button>


                


                
            
            </div>


        

        </form>
    );


<div>


</div>}

export default EntryForm;