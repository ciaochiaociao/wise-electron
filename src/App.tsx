import './App.css'
import { MyChatbot } from './components/Chatbot/Chatbot'
import EmotionDashboard from './pages/EmotionDashboard'
import Sidebar from './components/Sidebar/Sidebar'
import SidebarContainer from './components/SidebarContainer/SidebarContainer'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { useState } from 'react'
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
  const [activePage, setActivePage] = useState('');

  return (
    <>
      <SidebarContainer>
        <Sidebar>
          <ul className='list-none p-0'>
            <li className='cursor-pointer p-2 hover:bg-gray-700 text-white' onClick={() => setActivePage('MyChatbot')}>Chatbot</li>
            <li className='cursor-pointer p-2 hover:bg-gray-700 text-white' onClick={() => setActivePage('ChartPage')}>Chart Page</li>
          </ul>
        </Sidebar>
        {activePage === 'MyChatbot' && <ErrorBoundary><MyChatbot /></ErrorBoundary>}
        {activePage === 'ChartPage' && <EmotionDashboard />}
      </SidebarContainer>
      
    </>
  )
}

export default App
