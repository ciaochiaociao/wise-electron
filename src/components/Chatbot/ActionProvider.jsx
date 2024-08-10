import React from 'react';
import chatbot from '../../processes/Chatbot'

const ActionProvider = ({ createChatBotMessage, setState, children, emotionDetection, setEmotionDetection }) => {
  
  const handleBoostMood = () => {
    console.log("Boosting mood!");
    setEmotionDetection("boosting mood");
    const botMessageStr = "Boosting mood!";
    chatbot.addAIMessageToChatHistory(botMessageStr);
    setState((prev) => {
      const botMessage = createChatBotMessage(botMessageStr);

      return {
      ...prev,
      messages: [...prev.messages, botMessage],
    }});
    // play music
    // callback after playing music
    const finishBoostingCallback = () => {
      console.log("Finished boosting mood!");
      setEmotionDetection("detecting");
      const botMessageStr = "Finished boosting mood!";
      chatbot.addAIMessageToChatHistory(botMessageStr);
      setState((prev) => {
        const botMessage = createChatBotMessage(botMessageStr);

        return {
        ...prev,
        messages: [...prev.messages, botMessage],
      }})
    };
    // simulate playing music
    setTimeout(finishBoostingCallback, 4000);
  }

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
            handleBoostMood,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;