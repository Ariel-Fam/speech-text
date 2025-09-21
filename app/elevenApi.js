import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js"
import { Readable } from "stream"


export async function textToSpeech(voiceID, text) {

    const audioStream = await elevenlabs.textToSpeech.stream(voiceID, {
        text: text,
        modelId: 'eleven_multilingual_v2',

    });

    const stream = await stream(Readable.from(audioStream))

    return stream

}