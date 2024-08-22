import React from 'react';
import chatbot from '../../processes/Chatbot'

declare global {
  interface Window {
    systemControls: {
      setBrightness: (value: number) => void
    }
  }
}

interface ActionProviderProps {
  children: React.ReactNode;
  emotionDetection: string;
  setEmotionDetection: (value: string) => void;
  createChatBotMessage: (message: string) => any;
  setState: (value: any) => void;
}

export type Actions = {
  handleSetBrightness: (message: string, value: number) => void
  handleGeneralChat: (message: string) => void
  handleBoostMood: () => void
}

interface ChildProps {
  actions: Actions;
}


const ActionProvider: React.FC<ActionProviderProps> = ({ createChatBotMessage, setState, children, emotionDetection, setEmotionDetection }) => {
  
  const handleBoostMood = () => {
    console.log("Boosting mood!");
    setEmotionDetection("boosting mood");
    const botMessageStr = "Boosting mood!";
    chatbot.addAIMessageToChatHistory(botMessageStr);
    setState((prev: any) => {
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
      setState((prev: any) => {
        const botMessage = createChatBotMessage(botMessageStr);

        return {
        ...prev,
        messages: [...prev.messages, botMessage],
      }})
    };
    // simulate playing music
    setTimeout(finishBoostingCallback, 4000);
  }

  const handleSetBrightness = (message: string, value: number) => {
    let botMessageStr;
    if ( value < 0 || value > 1) {
      console.log("Brightness value must be between 0 and 1 :(");
      botMessageStr = "Brightness value must be between 0 and 1 :(";
    } else {
      console.log("Set Screen Brightness");
      window.systemControls.setBrightness(value);
      botMessageStr = "Screen brightness set to " + value + ".";
    }
    setState((prev: any) => {
      chatbot.addHumanMessageToChatHistory(message);
      chatbot.addAIMessageToChatHistory(botMessageStr);
      const botMessage = createChatBotMessage(botMessageStr);

      return {
      ...prev,
      messages: [...prev.messages, botMessage],
    }});
  }
  
  const handleGeneralChat = async (userInput: string) => {
    const message = await chatbot.ask_question(userInput);
    const messageStr = message['result'];

    setState((prev: any) => {
      const botMessage = createChatBotMessage(messageStr);

      return {
      ...prev,
      messages: [...prev.messages, botMessage],
    }});
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ChildProps>(child)) {
          return React.cloneElement(child as React.ReactElement<ChildProps>, {
            actions: {
              handleSetBrightness,
              handleGeneralChat,
              handleBoostMood,
            },
          });
        } else {
          return child;
        }
      })}
    </>
  );
};

export default ActionProvider;