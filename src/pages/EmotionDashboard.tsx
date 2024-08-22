import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmotionDashboard = () => {
  const [overallMood, setOverallMood] = useState(50);

  const emotionData = [
    { name: 'Happy', value: 30, color: '#FFD700' },
    { name: 'Sad', value: 15, color: '#4169E1' },
    { name: 'Angry', value: 10, color: '#FF6347' },
    { name: 'Anxious', value: 25, color: '#8A2BE2' },
    { name: 'Excited', value: 20, color: '#32CD32' },
  ];

  const intensityData = [
    { name: 'Happy', intensity: 8 },
    { name: 'Sad', intensity: 5 },
    { name: 'Angry', intensity: 7 },
    { name: 'Anxious', intensity: 6 },
    { name: 'Excited', intensity: 9 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Emotion Dashboard</h1>
      
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="w-full md:w-[45%] h-80 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Emotion Distribution</h2>
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
        <div className="w-full md:w-[45%] h-80">
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
        </div>
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