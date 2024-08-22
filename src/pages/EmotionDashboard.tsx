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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Emotion Dashboard</h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '45%', height: '300px' }}>
          <h2>Emotion Distribution</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={emotionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
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
        <div style={{ width: '45%', height: '300px' }}>
          <h2>Emotion Intensity</h2>
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
        <h2>Overall Mood</h2>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={overallMood} 
          onChange={(e) => setOverallMood(e.target.value)}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Negative</span>
          <span>Neutral</span>
          <span>Positive</span>
        </div>
        <p>Current mood: {overallMood > 50 ? 'Positive' : overallMood < 50 ? 'Negative' : 'Neutral'}</p>
      </div>
    </div>
  );
};

export default EmotionDashboard;