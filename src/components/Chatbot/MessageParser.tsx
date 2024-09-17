import React from 'react'
import type { Actions } from './ActionProvider';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// async function parseCommand(input: string): Promise<{ type: string; value?: number | null }> {
//   const brightnessRegex = /Set the brightness to (\d*\.?\d*%?)/i;
//   const brightnessMatch = input.match(brightnessRegex);

//   if (brightnessMatch) {
//     let value: string | number | null = brightnessMatch[1];
//     if (value.includes('%')) {
//       value = parseFloat(value.replace('%', '')) / 100;
//     } else {
//       value = parseFloat(value);
//     }
//     return { type: 'setBrightness', value };
//   }

//   return { type: 'generalChat' };
// }

async function parseCommandWithAI(input: string): Promise<{ type: string; value?: number | null }> {
  const prompt = `
    Parse the following user input and categorize it into one of these types:
    1. setBrightness (if the user wants to set screen brightness)
    2. generalChat (for any other general conversation)

    If the type is setBrightness, extract the brightness value (between 0 and 1).
    
    User input: "${input}"

    Respond with only a JSON object in this format:
    {
      "type": "setBrightness" or "generalChat",
      "value": number or null (only for setBrightness, between 0 and 1)
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content;
    console.log("Raw AI response:", content);

    // Use another AI call to extract and validate JSON
    const jsonExtractionPrompt = `
      Extract the valid JSON object from the following text. If there are any formatting issues, fix them to create a valid JSON object. Here's the text:

      ${content}

      Respond with only the extracted and validated JSON object, nothing else.
    `;

    const jsonExtractionResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: jsonExtractionPrompt }],
    });

    const extractedJson = jsonExtractionResponse.choices[0].message.content.trim();
    console.log("Extracted JSON:", extractedJson);

    const result = JSON.parse(extractedJson);
    return result;
  } catch (error) {
    console.error("Error parsing command with AI:", error);
    return { type: 'generalChat' };
  }
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
  const parse = async (message: string) => {
    if (emotionDetection === "asking") {
      handleEmotionDetection(message);
      return;
    }

    const parsedMessage = await parseCommandWithAI(message);

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