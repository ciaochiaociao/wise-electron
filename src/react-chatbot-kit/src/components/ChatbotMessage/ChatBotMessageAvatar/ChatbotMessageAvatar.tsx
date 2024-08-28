import React from 'react';
import AIAvatarIcon from '../../../assets/icons/ai-avatar.svg?react';

const ChatbotMessageAvatar = ({ className = '' }) => {
  return (
    <div className={"react-chatbot-kit-chat-bot-avatar " + className}>
      <div className="react-chatbot-kit-chat-bot-avatar-container">
        <p className="react-chatbot-kit-chat-bot-avatar-letter"><AIAvatarIcon className='w-7' /></p>
      </div>
    </div>
  );
};

export default ChatbotMessageAvatar;
