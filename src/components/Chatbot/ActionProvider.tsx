import React from 'react';
import chatbot from '../../processes/Chatbot'

declare global {
  interface Window {
    systemControls: {
      setBrightness: (value: number) => void;
      bringToForeground: () => void;
      bringToBackground: () => void;
    }
  }
}

interface ActionProviderProps {
  children: React.ReactNode;
  emotionDetection: string;
  setEmotionDetection: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createChatBotMessage: (message: string) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setState: (value: any) => void;
}

export type Actions = {
  handleSetBrightness: (message: string, value: number) => void
  handleGeneralChat: (message: string) => void
  handleBoostMood: () => void
  handleYesClick: () => void
  handleNoClick: () => void
}

interface ChildProps {
  actions: Actions;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ActionProvider: React.FC<ActionProviderProps> = ({ createChatBotMessage, setState, children, emotionDetection, setEmotionDetection }) => {
  
  const handleBoostMood = () => {
    console.log("Boosting mood!");
    setEmotionDetection("boosting mood");
    const botMessageStr = "Boosting mood!";
    chatbot.addAIMessageToChatHistory(botMessageStr);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState((prev: any) => {
      const botMessage = createChatBotMessage(messageStr);

      return {
      ...prev,
      messages: [...prev.messages, botMessage],
    }});
  };

  const handleYesClick = () => {
    console.log("User clicked Yes");
    setEmotionDetection("boosting mood");
    handleBoostMood();
  };

  const handleNoClick = () => {
    console.log("User clicked No");
    setEmotionDetection("detecting");
    const botMessageStr = "Alright, I won't boost your mood. Let me know if you need anything else!";
    chatbot.addAIMessageToChatHistory(botMessageStr);
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, createChatBotMessage(botMessageStr)],
    }));
    setTimeout(() => {
      window.systemControls.bringToBackground();
    }, 3000);
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
              handleYesClick,
              handleNoClick,
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