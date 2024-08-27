import React from 'react';
import './ChatbotMessage.css';
import { ICustomComponents } from '../../interfaces/IConfig';
interface IChatbotMessageProps {
    message: string;
    withAvatar?: boolean;
    loading?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: any[];
    delay?: number;
    id: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState?: React.Dispatch<React.SetStateAction<any>>;
    customComponents?: ICustomComponents;
    customStyles: {
        backgroundColor: string;
    };
}
declare const ChatbotMessage: ({ message, withAvatar, loading, messages, customComponents, setState, customStyles, delay, id, }: IChatbotMessageProps) => React.JSX.Element;
export default ChatbotMessage;
