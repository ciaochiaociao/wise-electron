import './App.css'
import { MyChatbot } from './components/Chatbot/Chatbot'
import EmotionDashboard from './pages/EmotionDashboard'
import Sidebar from './components/Sidebar/Sidebar'
import SidebarContainer from './components/SidebarContainer/SidebarContainer'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { useRef, useEffect, useState } from 'react'
import BubbleIcon from './assets/chat-bubble.svg?react'
import PieIcon from './assets/pie.svg?react'
import LiveViewIcon from './assets/live-view.svg?react'
import SettingsIcon from './assets/settings.svg?react'
import VoiceIcon from './assets/voice.svg?react'
import EmotionIcon from './assets/emotion.svg?react'
import TitleBar from './components/TitleBar/TitleBar'
import ConfigPage from './pages/ConfigPage'
import LiveViewPage from './pages/LiveViewPage'
import chatbot from './processes/Chatbot'
import VoiceInteractionPage from './pages/VoiceInteractionPage'
import LiveViewEmotionPage from './pages/LiveViewEmotionPage'

function App() {
  const [activePage, setActivePage] = useState('ChartPage');
  const [emotionDetection, setEmotionDetection] = useState<string>("detecting");
  const [emotionDetectionEnabled, setEmotionDetectionEnabled] = useState(true);
  const [keywordAwakeningEnabled, setKeywordAwakeningEnabled] = useState(true);
  const [focusDetectionEnabled, setFocusDetectionEnabled] = useState(false);
  const [automaticFocusBoostingEnabled, setAutomaticFocusBoostingEnabled] = useState(false);
  const [automaticPostureReminderEnabled, setAutomaticPostureReminderEnabled] = useState(false);
  const [emotionDetectionSwitch, setEmotionDetectionSwitch] = useState(false);
  const [postureDetectionSwitch, setPostureDetectionSwitch] = useState(false);
  const emotionInterval = useRef<number | null>(null)

  useEffect(() => {
    if (activePage === "ChartPage") {
      console.log("emotionDetection changed: detecting")
      setEmotionDetection("detecting")
    }
  }, [activePage])

  // set up interval for emotion detection
  useEffect(() => {
    if (emotionDetection === "detecting" && emotionDetectionEnabled) {
      emotionInterval.current = window.setInterval(async () => {
        console.log(window.hmx.getEmotion())
        const emotion = await window.hmx.getEmotion()
        if (emotion === "bad") {
          console.log("Bad mood detected!")
          setActivePage("MyChatbot")
          setEmotionDetection("bad")
          console.log("emotionDetection changed: bad")
          window.systemControls.bringToForeground()
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
  }, [emotionDetection, emotionDetectionEnabled])


  useEffect(() => {
    const handleKeywordDetected = () => {
      if (keywordAwakeningEnabled) {
        console.log("keyword detected")
        setActivePage('MyChatbot')
        window.systemControls.bringToForeground()
      }
    }
    window.ipcRenderer.on('keyword-detected', handleKeywordDetected)
    return () => {
      window.ipcRenderer.off('keyword-detected', handleKeywordDetected)
    }
  }, [keywordAwakeningEnabled])

  useEffect(() => {
    const handleClearMessages = () => {
      localStorage.removeItem('chat_messages');
      chatbot.clear_chat_history();
      setEmotionDetection("detecting");
    };

    window.ipcRenderer.on('clear-chat-messages', handleClearMessages);

    return () => {
      window.ipcRenderer.off('clear-chat-messages', handleClearMessages);
    };
  }, []);



  return (
    <div className="app-container">
      <TitleBar />
      <SidebarContainer>
        <Sidebar>
          <div className="sidebar-top">
            <ul>
              <li onClick={() => setActivePage('MyChatbot')}><BubbleIcon /></li>
              <li onClick={() => setActivePage('VoiceInteractionPage')}><VoiceIcon /></li>
              <li onClick={() => setActivePage('ChartPage')}><PieIcon /></li>
            </ul>
          </div>
          <div className="sidebar-bottom">
            <ul>
              <li onClick={() => setActivePage('LiveViewPage')}><LiveViewIcon /></li>
              <li onClick={() => setActivePage('LiveViewEmotionPage')}><EmotionIcon /></li>
              <li onClick={() => setActivePage('ConfigPage')}><SettingsIcon /></li>
            </ul>
          </div>
        </Sidebar>
        {activePage === 'MyChatbot' && <ErrorBoundary>
          <MyChatbot 
            emotionDetection={emotionDetection}
            setEmotionDetection={setEmotionDetection} />
        </ErrorBoundary>}
        {activePage === 'ChartPage' && <ErrorBoundary><EmotionDashboard /></ErrorBoundary>}
        {activePage === 'ConfigPage' && <ErrorBoundary>
          <ConfigPage
            options={[
              {
                label: "Keyword Awakening",
                enabled: keywordAwakeningEnabled,
                setEnabled: setKeywordAwakeningEnabled
              },
              {
                label: "Automatic Emotion Boosting",
                enabled: emotionDetectionEnabled,
                setEnabled: setEmotionDetectionEnabled
              },
              {
                label: "Automatic Focus Boosting (Coming)",
                enabled: automaticFocusBoostingEnabled,
                setEnabled: setAutomaticFocusBoostingEnabled
              },
              {
                label: "Automatic Posture Reminder (Coming)",  
                enabled: automaticPostureReminderEnabled,
                setEnabled: setAutomaticPostureReminderEnabled
              },
              {
                label: "Emotion Detection",
                enabled: emotionDetectionSwitch,
                setEnabled: setEmotionDetectionSwitch
              },
              {
                label: "Focus Detection (Coming)",
                enabled: focusDetectionEnabled,
                setEnabled: setFocusDetectionEnabled
              },
              {
                label: "Posture Detection (Coming)",
                enabled: postureDetectionSwitch,
                setEnabled: setPostureDetectionSwitch
              }
            ]}
          />
        </ErrorBoundary>}
        {activePage === 'LiveViewPage' && <ErrorBoundary><LiveViewPage /></ErrorBoundary>}
        {activePage === 'LiveViewEmotionPage' && <ErrorBoundary><LiveViewEmotionPage /></ErrorBoundary>}
        {activePage === 'VoiceInteractionPage' && <ErrorBoundary><VoiceInteractionPage /></ErrorBoundary>}
      </SidebarContainer>
    </div>
  )
}

export default App
