import React from 'react';
import chatbot from '../../processes/Chatbot'
// import brightness from 'brightness';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  
  const handleSetBrightness = (message, value) => {
    let botMessageStr;
    if ( value < 0 || value > 1) {
      console.log("Brightness value must be between 0 and 1 :(");
      botMessageStr = "Brightness value must be between 0 and 1 :(";
    } else {
      console.log("Set Screen Brightness");
      systemControls.setBrightness(value);
      botMessageStr = "Screen brightness set to " + value + ".";
    }
    setState((prev) => {
      chatbot.addHumanMessageToChatHistory(message);
      chatbot.addAIMessageToChatHistory(botMessageStr);
      const botMessage = createChatBotMessage(botMessageStr);

      return {
      ...prev,
      messages: [...prev.messages, botMessage],
    }});
  }
  
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
            handleSetBrightness,
            handleGeneralChat,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;