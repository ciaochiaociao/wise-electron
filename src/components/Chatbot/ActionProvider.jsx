import React from 'react';
import chatbot from '../../processes/Chatbot'

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleGeneralChat = async (userInput) => {
    const message = await chatbot.ask_question(userInput);
    const messageStr = message['result'];

    setState((prev) => {
      const botMessage = createChatBotMessage(messageStr);

      return {
      ...prev,
      messages: [...prev.messages, botMessage],
    }});
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleGeneralChat,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;