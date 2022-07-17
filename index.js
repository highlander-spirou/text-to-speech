const fs = require('fs')
const speech = require('@google-cloud/speech');


async function transcribe() {
    const client = new speech.SpeechClient();
    const filename = './test.raw'

    const audioBytes = fs.readFileSync(filename).toString('base64')
    const audio = {
        content: audioBytes,
    }
    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'vi-VN',
    }
    const request = {
        audio: audio,
        config: config
    }
    const [response] = await client.recognize(request)
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n')
    console.log(`Transcription: ${transcription}`)    

}

transcribe().catch(console.error)