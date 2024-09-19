import React, { useEffect, useRef, useState } from 'react';

const LiveViewPage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [jsonResults, setJsonResults] = useState<string>('');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create WebSocket connection
    wsRef.current = new WebSocket(`ws://localhost:8001/ws`);

    wsRef.current.onmessage = (event) => {
      if (typeof event.data === "string") {
        // Handle JSON results
        const parsedResults = JSON.parse(event.data);
        setJsonResults(JSON.stringify(parsedResults, null, 2));
      } else {
        // Handle image frame
        const url = URL.createObjectURL(event.data);
        setImageUrl(url);
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    // Cleanup old image URL when a new one is set
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="live-view-container overflow-y-scroll overflow-x-hidden h-full">
      <div className="video-container">
        {imageUrl && <img src={imageUrl} alt="Live feed" className="detection-canvas" />}
      </div>
      <pre className="json-results">{jsonResults}</pre>
    </div>
  );
};

export default LiveViewPage;
