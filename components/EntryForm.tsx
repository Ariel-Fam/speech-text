import {
    Select,
    SelectTrigger,
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


            <div className="w-full bg-gray-700 flex flex-col items-center justify-center py-6 sm:py-8 px-3 sm:px-4">


             <Select 
                value={voice}
                onValueChange={onVoiceChange}
                
                >

                    <SelectTrigger className="w-full max-w-sm sm:max-w-md text-sm sm:text-base">{voice ? voice: "Select a voice" }</SelectTrigger>

                    <SelectContent>
                    <SelectItem value="ntdpYtDTd78wjhHJ6unR">Mixed Accent - Male Voice</SelectItem>
                    <SelectItem value="bHDY9dhlJ8tPHo1Y74jn">British Accent - Female Voice</SelectItem>
                    <SelectItem value="Dslrhjl3ZpzrctukrQSN">American Accent - Male</SelectItem>
                    <SelectItem value="EXAVITQu4vr4xnSDxMaL">American Accent - female</SelectItem>
                    <SelectItem value="pqHfZKP75CvOlQylNhV4">Male Voice</SelectItem>
                    <SelectItem value="LcfcDJNUP1GQjkzn1xUU">Female Voice</SelectItem> 

                    </SelectContent>




                </Select>

                <h1 className="text-xl sm:text-3xl md:text-4xl mt-4 sm:mt-6 text-white text-center">Select a Voice</h1>
            </div>



            <div className="w-full bg-blue-500/85 flex flex-col items-center justify-center py-6 sm:py-8 px-3 sm:px-4">

                <div className="flex flex-col items-center justify-center bg-white px-3 py-2 mt-2 rounded-xl mb-3 sm:mb-4 shadow">
                    <p className="text-sm sm:text-base">{ Max - used } characters remaining </p>
                    <Keyboard className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <Textarea 
                value={speechText}
                onChange={(e)=>{onTextChange(e.target.value)}}
                placeholder="Write text to convert into Speech"
                className="w-full max-w-sm sm:max-w-2xl h-36 sm:h-48 md:h-56 text-sm sm:text-base shadow-xl hover:shadow-2xl transition"
                maxLength={Max}
                >


                </Textarea>

                <div className="w-full max-w-2xl flex justify-center sm:justify-end">
                    <Button size="sm" className="mt-4 sm:h-9 sm:px-4 text-sm sm:text-base hover:scale-105 hover:bg-fuchsia-950 transition" type="submit"> {<Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />} Generate Speech</Button>
                </div>


                


                
            
            </div>


        

        </form>
    );


<div>


</div>}

export default EntryForm;