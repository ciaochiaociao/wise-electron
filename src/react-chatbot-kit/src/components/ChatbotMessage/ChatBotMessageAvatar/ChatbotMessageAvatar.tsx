import React from 'react';

const ChatbotMessageAvatar = ({ className = '' }) => {
  return (
    <div className={"react-chatbot-kit-chat-bot-avatar " + className}>
      <div className="react-chatbot-kit-chat-bot-avatar-container">
        <p className="react-chatbot-kit-chat-bot-avatar-letter">B</p>
      </div>
    </div>
  );
};

export default ChatbotMessageAvatar;
