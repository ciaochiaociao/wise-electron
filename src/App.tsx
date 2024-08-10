import './App.css'
import { MyChatbot } from './components/Chatbot/Chatbot'

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

  return (
    <>
      <MyChatbot />
    </>
  )
}

export default App
