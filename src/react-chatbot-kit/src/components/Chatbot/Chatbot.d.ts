import React from 'react';
import IConfig from '../../interfaces/IConfig';
import { IMessage } from '../../interfaces/IMessages';
interface IChatbotProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionProvider: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messageParser: any;
    config: IConfig;
    headerText?: string;
    placeholderText?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    saveMessages?: (ref: any) => any;
    messageHistory?: IMessage[] | string;
    validator?: (input: string) => boolean;
    runInitialMessagesWithHistory?: boolean;
    disableScrollToBottom?: boolean;
    emotionDetection?: string;
    setEmotionDetection?: (value: string) => void;
}
declare const Chatbot: ({ actionProvider, messageParser, config, headerText, placeholderText, saveMessages, messageHistory, runInitialMessagesWithHistory, disableScrollToBottom, validator, emotionDetection, setEmotionDetection, ...rest }: IChatbotProps) => React.JSX.Element;
export default Chatbot;
