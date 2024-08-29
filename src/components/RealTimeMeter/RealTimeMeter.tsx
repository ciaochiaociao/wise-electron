import React, { useEffect, useRef, useState } from 'react';

const emotionMap = {
  1: { name: 'Happy', value: 0.75 },
  2: { name: 'Sad', value: 0.25 },
  3: { name: 'Anger', value: 0 },
  4: { name: 'Surprise', value: 0.5 },
  5: { name: 'Disgust', value: 0.1 },
  6: { name: 'Fear', value: 0.15 },
  7: { name: 'Neutral', value: 0.5 },
  8: { name: 'Contempt', value: 0.2 },
};

interface EmotionData {
  x: number;
  y: number;
  width: number;
  height: number;
  yaw: number;
  pitch: number;
  emotion: number;
  score: number;
}

const RealTimeMeter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [emotionValue, setEmotionValue] = useState(0.5);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // WebSocket connection
    socketRef.current = new WebSocket('ws://localhost:6789');

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    socketRef.current.onmessage = (event) => {
      // console.log(event.data);
      // console.log(typeof );
      const data: EmotionData = JSON.parse(event.data.replace(/'/g, '"'));
      console.log('Received data:', data);

      const emotionInfo = emotionMap[data.emotion];
      if (emotionInfo) {
        const adjustedValue = emotionInfo.value * data.score;
        console.log(adjustedValue);
        setEmotionValue(adjustedValue);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#FF6347');  // Red (negative emotions)
    gradient.addColorStop(0.5, '#FFD700'); // Yellow (neutral)
    gradient.addColorStop(1, '#32CD32');  // Green (positive emotions)
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw marker
    const markerPosition = emotionValue * width;
    ctx.beginPath();
    ctx.moveTo(markerPosition, 0);
    ctx.lineTo(markerPosition, height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Negative', width * 0.1, height - 10);
    ctx.fillText('Neutral', width * 0.5, height - 10);
    ctx.fillText('Positive', width * 0.9, height - 10);

  }, [emotionValue]);

  return (
    <div>
      <canvas ref={canvasRef} width="300" height="50" />
    </div>
  );
};

export default RealTimeMeter;
