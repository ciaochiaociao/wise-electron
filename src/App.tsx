import './App.css'
import { MyChatbot } from './components/Chatbot/Chatbot'
import EmotionDashboard from './pages/EmotionDashboard'
import Sidebar from './components/Sidebar/Sidebar'
import SidebarContainer from './components/SidebarContainer/SidebarContainer'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { useRef, useEffect, useState } from 'react'
import BubbleIcon from './assets/chat-bubble.svg?react'
import PieIcon from './assets/pie.svg?react'
// window.addEventListener("storage", () => {
//   console.log("Storage event")
//   const boostMood = localStorage.getItem("boostMood")
//   if (boostMood !== null) {
//     console.log("boostMood: " + boostMood)
//   } else {
//     console.log("boostMood is null")
//   }
// })


function App() {
  const [activePage, setActivePage] = useState('ChartPage');
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
          setActivePage("MyChatbot")
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


  useEffect(() => {
    const handleKeywordDetected = () => {
      console.log("keyword detected")
      setActivePage('MyChatbot')
    }
    window.ipcRenderer.on('keyword-detected', handleKeywordDetected)
    return () => {
      window.ipcRenderer.off('keyword-detected', handleKeywordDetected)
    }
  }, []);

  return (
    <>
      <SidebarContainer>
        <Sidebar>
          <ul className='list-none p-0'>
            <li className='cursor-pointer p-2 hover:bg-gray-700 text-white' onClick={() => setActivePage('MyChatbot')}><BubbleIcon className='w-7 m-auto'/></li>
            <li className='cursor-pointer p-2 hover:bg-gray-700 text-white' onClick={() => setActivePage('ChartPage')}><PieIcon className='w-7 m-auto'/></li>
          </ul>
        </Sidebar>
        {activePage === 'MyChatbot' && <ErrorBoundary>
          <MyChatbot 
            emotionDetection={emotionDetection}
            setEmotionDetection={setEmotionDetection} />
          </ErrorBoundary>}
        {activePage === 'ChartPage' && <ErrorBoundary><EmotionDashboard /></ErrorBoundary>}
      </SidebarContainer>
      
    </>
  )
}

export default App
