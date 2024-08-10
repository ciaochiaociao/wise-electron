import React from 'react'
import type { Actions } from './ActionProvider';
// import Chat from '../../react-chatbot-kit/src/components/Chat/Chat'



interface ChildProps {
  parse: (message: string) => void;
  actions: any; // Replace 'any' with a more specific type if possible
}

export interface MessageParserProps {
  // children: typeof Chat;
  children: React.ReactNode;
  actions: Actions;
  emotionDetection: string;
  setEmotionDetection: (value: string) => void;
}

const MessageParser = ({ children, actions, emotionDetection, setEmotionDetection }: MessageParserProps) => {
  const parse = (message: string) => {
    
    // console.log("Testing storage event:")
    // localStorage.setItem("boostMood", "true");

    if (emotionDetection === "asking") {
      if (message === "yes") {
        setEmotionDetection("boosting mood");
        actions.handleBoostMood();
        console.log("User answers yes to boosting mood");
      } else if (message === "no") {
        setEmotionDetection("detecting");
        console.log("User answers no mood boost");
      } else {
        console.warn("User answers with something else (to be handled)");
        // todo: handle other answers
        actions.handleGeneralChat(message);
      }
      return;
    }
    const brightnessRegex = /Set the brightness to (\d*\.?\d*%?)/i;
    const brightnessMatch = message.match(brightnessRegex);

    if (brightnessMatch) {
      let value: string | number | null = brightnessMatch ? brightnessMatch[1] : null;
      if (value !== null) {
        if (value.includes('%')) {
          value = value.replace('%', '');
          value = parseFloat(value) / 100;
        } else {
          value = parseFloat(value);
        }
      }

      console.log("Set the brightness with prompt: " + value);
      actions.handleSetBrightness(message, value as number);
    } else {
      console.log(message);
      actions.handleGeneralChat(message);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ChildProps>(child)) {
          return React.cloneElement(child as React.ReactElement<ChildProps>, {
            parse: parse,
            actions,
          });
        } else {
          return child;
        }
      })}
    </div>
  );
};

export default MessageParser;