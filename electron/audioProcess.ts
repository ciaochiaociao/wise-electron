import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import AudioRecorder from 'node-audiorecorder';
import { app } from 'electron';

console.log("import.meta.env.VITE_OPENAI_API_KEY", import.meta.env.VITE_OPENAI_API_KEY)
const client = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });

const audioRecorder = new AudioRecorder({
  program: 'sox',
  silence: 0.5,
  thresholdStart: 0.5,
  thresholdStop: 0.5,
  keepSilence: true,
  type: 'wav',  // Explicitly set the audio type to WAV
  device: null,
  command: 'rec',
}, console);


async function startListening(callback) {
  
  const outputFilePath = path.join(app.getPath('temp'), 'temp_audio.wav');
  let outputFileStream = fs.createWriteStream(outputFilePath);
  console.log("startListening (outputFilePath: " + outputFilePath + ")");

  const recordAudio = async () => {
    console.log("Starting recording cycle");
    audioRecorder.start().stream().pipe(outputFileStream);

    await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust this timeout as needed

    console.log("Stopping recording...");
    audioRecorder.stop();
    outputFileStream.end();
    
    // Add a small delay to ensure the file is fully written
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const stats = fs.statSync(outputFilePath);
    console.log(`File size after recording: ${stats.size} bytes`);
    
    if (stats.size > 0) {
      console.log("Transcribing audio...");
      const transcription = await transcribeAudio(outputFilePath);
      callback(transcription);
    } else {
      console.log("No audio detected.");
      callback("No audio detected.");
    }

    // Prepare for the next recording
    outputFileStream = fs.createWriteStream(outputFilePath);
    
    // Start the next recording cycle
    await recordAudio();
  };

  // Start the initial recording cycle
  await recordAudio();
}

async function transcribeAudio(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist: ${filePath}`);
    }
    const stats = fs.statSync(filePath);
    console.log(`File size: ${stats.size} bytes`);
    
    const response = await client.audio.transcriptions.create({
      model: "whisper-1",
      file: fs.createReadStream(filePath)
    });
    return response.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return '';
  }
}

export { startListening };