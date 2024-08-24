interface EmotionRecord {
  emotion: number
  confidence: number
  created_at: string
}

async function fetchEmotionRecords(): Promise<EmotionRecord[] | undefined> { 
// fetch emotion data from the server with error handling
  try {
    const response = await fetch("http://localhost:8000/emotionrecords/?format=json")
    if (!response.ok) throw new Error('Failed to fetch emotion data from the server')
    const data: EmotionRecord[] = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export default fetchEmotionRecords