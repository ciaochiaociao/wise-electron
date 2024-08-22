import config from './config.js'

import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'

import Chatbot from '../../react-chatbot-kit/src/components/Chatbot/Chatbot'
import '../../react-chatbot-kit/src/main.css'
import './Chatbot.css'
import chatbot from '../../processes/Chatbot'

import { useRef, useEffect, useState } from 'react'



// type IEmotionDetection = {
//   current: "detecting" | "not bad" | "bad" | "boosting mood" | "boosted mood"
// }

declare global {
  interface Window {
    hmx: Hmx
  }

  type Hmx = {
    getEmotion: () => Promise<string>
  }
}


export const MyChatbot = () => {
  const [emotionDetection, setEmotionDetection] = useState<string>("detecting")
  const emotionInterval = useRef<number | null>(null)

  // set up interval for emotion detection
  useEffect(() => {
    if (emotionDetection === "detecting") {
      emotionInterval.current = window.setInterval(async () => {
        console.log(window.hmx.getEmotion())
        const emotion = await window.hmx.getEmotion()
        if (emotion === "bad") {
          console.log("Bad mood detected!")
          setEmotionDetection("bad")
        }
      }, 3000)
      console.log("Emotion interval started")
      return () => {
        if (emotionInterval.current != null) {
          clearInterval(emotionInterval.current)
          console.log("Emotion interval cleared")
        }
      }
    }
  }, [emotionDetection])


  // alert(emotionDetection)

  return (
    <>
      {/* <button onClick={() => setEmotionDetection("not bad")}>Not bad!</button>
      <button onClick={() => setEmotionDetection("detecting")}>Detecting!</button> */}
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        chatbot={chatbot}
        emotionDetection={emotionDetection}
        setEmotionDetection={setEmotionDetection}
      />
    </>
  );
};