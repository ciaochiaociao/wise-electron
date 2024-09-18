import React, { useEffect, useRef, useState } from 'react';
import { InferenceEngine, CVImage } from 'inferencejs';

const LiveViewPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    setupCamera();

    const initializeRoboflow = async () => {
      console.log("initializing roboflow");
      const inferEngine = new InferenceEngine();
      const config = {scoreThreshold: 0.5, iouThreshold: 0.5, maxNumBoxes: 20};
      console.log("starting worker");
      const startTime = performance.now();
      const workerId = await inferEngine.startWorker(
        "student-attention-tracking",
        "1",
        "rf_Ktnkrip2SiNY49In26me0OK3ckV2",
        [config],
      );
      const endTime = performance.now();
      console.log("time taken to start worker:", endTime - startTime);
      console.log("workerId:", workerId);

      const detectFrame = async () => {
        if (videoRef.current && canvasRef.current) {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Perform inference on the extracted frame
          const _video = new CVImage(video);
          const predictions = await inferEngine.infer(workerId, _video);
          console.log("predictions:", predictions);
          setPredictions(predictions);

          drawBoxes(predictions, ctx);
        }
        // Schedule next frame with a delay
      setTimeout(() => requestAnimationFrame(detectFrame), 100); // Adjust delay as needed
      };

      detectFrame();
    };

    initializeRoboflow();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const drawBoxes = (predictions: any[], ctx: CanvasRenderingContext2D | null) => {
    if (!ctx) return;
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 4;
    ctx.font = "18px Arial";
    ctx.fillStyle = "#00FFFF";

    predictions.forEach((prediction) => {
      const x = prediction.bbox.x - prediction.bbox.width / 2;
      const y = prediction.bbox.y - prediction.bbox.height / 2;
      console.log("drawing box", x, y, prediction.bbox.width, prediction.bbox.height);
      // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeRect(x, y, prediction.bbox.width, prediction.bbox.height);
      ctx.fillText(
        `${prediction.class} ${(prediction.confidence * 100).toFixed(2)}%`,
        x,
        y > 10 ? y - 5 : 10
      );
    });
  };

  return (
    <div className="live-view-container">
      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline muted />
        <canvas ref={canvasRef} className="detection-canvas" />
      </div>
      <div className="predictions">
        <h2>Predictions:</h2>
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>
              {prediction.class}: {(prediction.confidence * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveViewPage;
