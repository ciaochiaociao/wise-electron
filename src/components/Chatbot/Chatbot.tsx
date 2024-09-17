import config from './config.js'

import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'

import Chatbot from '../../react-chatbot-kit/src/components/Chatbot/Chatbot'
import '../../react-chatbot-kit/src/main.css'
import './Chatbot.css'
import chatbot from '../../processes/Chatbot'




// type IEmotionDetection = {
//   current: "detecting" | "not bad" | "bad" | "boosting mood" | "boosted mood"
// }


export const MyChatbot = ({emotionDetection, setEmotionDetection}: {emotionDetection: string, setEmotionDetection: (emotion: string) => void}) => {

  const saveMessages = (messages: any, HTMLString: string) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages))
  }

  const loadMessages = () => {
    return JSON.parse(localStorage.getItem('chat_messages') || '[]')
    // return []
  }

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
        messageHistory={loadMessages()}
        saveMessages={saveMessages}
      />
    </>
  );
};