import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import fetchEmotionRecords from '../services/fetchData';
interface EmotionRecord {
  emotion: number
  confidence: number
  created_at: string
}

interface EmotionData {
  name: string
  value: number
  color: string
}

const emotionDict = {
  1: ['Happy', '#FFD700'],
  2: ['Sad', '#4169E1'],
  3: ['Angry', '#FF6347'],
  4: ['Surprised', '#8A2BE2'],
  5: ['Disgusted', '#32CD32'],
  6: ['Fearful', '#FF4500'],
  7: ['Neutral', '#A9A9A9'],
}

function getEmotionName(emotion: number): string {
  if (emotion in emotionDict) return emotionDict[emotion][0]
  return 'Unknown'
}

function getEmotionColor(emotion: number): string {
  if (emotion in emotionDict) return emotionDict[emotion][1]
  return '#000000'
}


function convertData(data: EmotionRecord[]): EmotionData[] {
  const emotionData: EmotionData[] = [];
  for (let i = 0; i < data.length; i++) {
    const name = getEmotionName(data[i].emotion);
    const color = getEmotionColor(data[i].emotion);
    const value = data[i].confidence;
    // const created_at = data[i].created_at;
    emotionData.push({ name, value, color });
  }

  return emotionData;
}

const EmotionDashboard = async () => {
  const [overallMood, setOverallMood] = useState(50);
  const [selectedDuration, setSelectedDuration] = useState('day');


  let emotionData = [
    { name: 'Happy', value: 30, color: '#FFD700' },
    { name: 'Sad', value: 15, color: '#4169E1' },
    { name: 'Angry', value: 10, color: '#FF6347' },
    { name: 'Surprised', value: 25, color: '#8A2BE2' },
    { name: 'Disgusted', value: 20, color: '#32CD32' },
    { name: 'Fearful', value: 10, color: '#FF4500' },
    { name: 'Neutral', value: 10, color: '#A9A9A9' },
  ];

  // const intensityData = [
  //   { name: 'Happy', intensity: 8 },
  //   { name: 'Sad', intensity: 5 },
  //   { name: 'Angry', intensity: 7 },
  //   { name: 'Surprised', intensity: 6 },
  //   { name: 'Disgusted', intensity: 9 },
  //   { name: 'Fearful', intensity: 4 },
  //   { name: 'Neutral', intensity: 3 },
  // ];

  if (selectedDuration === 'day') {
    console.log('Day selected')
    const data = await fetchEmotionRecords()
    
    if (!data) return null
    else {
      emotionData = convertData(data)
    }
    console.log(JSON.stringify(emotionData[0]))
  } else if (selectedDuration === 'week') {
    console.log('Week selected')

  }
  else if (selectedDuration === 'month') {
    console.log('Month selected')
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <select
          id="duration"
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="w-full md:w-[45%] h-80 mb-4 md:mb-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={emotionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {emotionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* <div className="w-full md:w-[45%] h-80">
          <h2 className="text-xl font-semibold mb-2">Emotion Intensity</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={intensityData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="intensity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Overall Mood</h2>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={overallMood} 
          onChange={(e) => setOverallMood(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span className="text-red-500">Negative</span>
          <span className="text-yellow-500">Neutral</span>
          <span className="text-green-500">Positive</span>
        </div>
        <p className="mt-2">
          Current mood: 
          <span className={`font-semibold ${
            overallMood > 50 ? 'text-green-500' : 
            overallMood < 50 ? 'text-red-500' : 
            'text-yellow-500'
          }`}>
            {overallMood > 50 ? 'Positive' : overallMood < 50 ? 'Negative' : 'Neutral'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmotionDashboard;