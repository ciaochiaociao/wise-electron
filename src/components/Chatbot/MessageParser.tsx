import React from 'react'
import type { Actions } from './ActionProvider';
// import Chat from '../../react-chatbot-kit/src/components/Chat/Chat'

function parseCommand(input: string): { type: string; value?: number | null } {
  const brightnessRegex = /Set the brightness to (\d*\.?\d*%?)/i;
  const brightnessMatch = input.match(brightnessRegex);

  if (brightnessMatch) {
    let value: string | number | null = brightnessMatch[1];
    if (value.includes('%')) {
      value = parseFloat(value.replace('%', '')) / 100;
    } else {
      value = parseFloat(value);
    }
    return { type: 'setBrightness', value };
  }

  return { type: 'generalChat' };
}

interface ChildProps {
  parse: (message: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    if (emotionDetection === "asking") {
      handleEmotionDetection(message);
      return;
    }

    const parsedMessage = parseCommand(message);

    switch (parsedMessage.type) {
      case 'setBrightness':
        console.log("Set the brightness with prompt: " + parsedMessage.value);
        actions.handleSetBrightness(message, parsedMessage.value as number);
        break;
      case 'generalChat':
      default:
        console.log(message);
        actions.handleGeneralChat(message);
    }
  };

  const handleEmotionDetection = (message: string) => {
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
  };

  return (
    <>
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
    </>
  );
};

export default MessageParser;