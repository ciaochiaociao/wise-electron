import config from './config.js';

// @ts-ignore
import MessageParser from './MessageParser.jsx'
// @ts-ignore
import ActionProvider from './ActionProvider.jsx'

import Chatbot from '../../react-chatbot-kit/src/components/Chatbot/Chatbot'
import '../../react-chatbot-kit/src/main.css'
import chatbot from '../../processes/Chatbot'

import { useRef, useEffect, useState } from 'react'



// type IEmotionDetection = {
//   current: "detecting" | "not bad" | "bad" | "boosting mood" | "boosted mood"
// }

export const MyChatbot = () => {
  const [emotionDetection, setEmotionDetection] = useState("detecting")
  const emotionInterval = useRef(null)

  // set up interval for emotion detection
  useEffect(() => {
    if (emotionDetection === "detecting") {
      emotionInterval.current = setInterval(async () => {
        console.log(hmx.getEmotion())
        const emotion = await hmx.getEmotion()
        if (emotion === "bad") {
          console.log("Bad mood detected!")
          setEmotionDetection("bad")
        }
      }, 3000)
      console.log("Emotion interval started")
      return () => {
        clearInterval(emotionInterval.current)
        console.log("Emotion interval cleared")
      }
    }
  }, [emotionDetection])


  // alert(emotionDetection)

  return (
    <div>
      <button onClick={() => setEmotionDetection("not bad")}>Not bad!</button>
      <button onClick={() => setEmotionDetection("detecting")}>Detecting!</button>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        chatbot={chatbot}
        emotionDetection={emotionDetection}
        setEmotionDetection={setEmotionDetection}
      />
    </div>
  );
};