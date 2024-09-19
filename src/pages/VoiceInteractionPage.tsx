import React, { useState, useEffect, useRef } from 'react';
import chatbot from '../processes/Chatbot';

const VoiceInteractionPage: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isListening) {
      window.ipcRenderer.send('start-listening');
    } else {
      window.ipcRenderer.send('stop-listening');
    }
  }, [isListening]);

  useEffect(() => {
    const handleTranscription = (_event: any, transcription: string) => {
      setTranscript(transcription);
      handleBotResponse(transcription);
    };

    window.ipcRenderer.on('transcription-result', handleTranscription);

    return () => {
      window.ipcRenderer.off('transcription-result', handleTranscription);
    };
  }, []);

  const handleBotResponse = async (userInput: string) => {
    chatbot.addHumanMessageToChatHistory(userInput);
    const response = await chatbot.ask_question(userInput);
    const botMessage = response.result;
    chatbot.addAIMessageToChatHistory(botMessage);
    setBotResponse(botMessage);
    speakResponse(botMessage);
  };

  const speakResponse = (text: string) => {
    window.ipcRenderer.send('speak-text', text);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="voice-interaction-container p-4 overflow-y-scroll overflow-x-hidden w-full">
      <h2 className="text-2xl font-bold mb-4">Voice Interaction</h2>
      <button
        className={`px-4 py-2 rounded ${
          isListening ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}
        onClick={toggleListening}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Transcript:</h3>
        <p>{transcript}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Bot Response:</h3>
        <p>{botResponse}</p>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default VoiceInteractionPage;