import React, { useEffect, useRef, useState } from 'react';

const RealTimeMeter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      const width = canvas.width;
      const height = canvas.height;
      if (ctx) {
        // Function to draw the meter
        const drawMeter = () => {
          ctx.clearRect(0, 0, width, height);

          // Draw the background of the meter
          ctx.fillStyle = '#ccc';
          ctx.fillRect(0, height * 0.2, width, height * 0.6);

          // Draw the intensity level
          ctx.fillStyle = 'green';
          ctx.fillRect(0, height * 0.2, (width * intensity) / 100, height * 0.6);
        };

        // Update the meter at each frame
        const updateMeter = () => {
          drawMeter();
          requestAnimationFrame(updateMeter);
        };

        updateMeter();
      }
    }
  }, [intensity]);

  useEffect(() => {
    // Simulate real-time data update
    const interval = setInterval(() => {
      window.hmx.onRealTimeEmotion((data: number) => {
        console.log('Real-time emotion:', data);
        setIntensity(data);
      })
      // setIntensity(Math.random() * 100); // Replace with real data source
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width="300" height="100" />
    </div>
  );
};

export default RealTimeMeter;
