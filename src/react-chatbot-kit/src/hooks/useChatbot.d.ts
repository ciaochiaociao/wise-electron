import React from 'react';
import WidgetRegistry from '../components/WidgetRegistry/WidgetRegistry';
import IConfig from '../interfaces/IConfig';
import { IMessage } from '../interfaces/IMessages';
interface IUseChatbotParams {
    config: IConfig | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionProvider: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messageParser: any;
    messageHistory: IMessage[] | string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    saveMessages: (messages: IMessage[], html: string) => any | null;
    runInitialMessagesWithHistory?: boolean;
}
declare const useChatbot: ({ config, actionProvider, messageParser, messageHistory, runInitialMessagesWithHistory, saveMessages, ...rest }: IUseChatbotParams) => {
    configurationError: string;
    invalidPropsError?: undefined;
    widgetRegistry?: undefined;
    actionProv?: undefined;
    messagePars?: undefined;
    state?: undefined;
    setState?: undefined;
    messageContainerRef?: undefined;
    ActionProvider?: undefined;
    MessageParser?: undefined;
} | {
    invalidPropsError: string;
    configurationError?: undefined;
    widgetRegistry?: undefined;
    actionProv?: undefined;
    messagePars?: undefined;
    state?: undefined;
    setState?: undefined;
    messageContainerRef?: undefined;
    ActionProvider?: undefined;
    MessageParser?: undefined;
} | {
    widgetRegistry: WidgetRegistry;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionProv: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messagePars: any;
    configurationError: string;
    invalidPropsError: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState: React.Dispatch<any>;
    messageContainerRef: React.MutableRefObject<HTMLDivElement>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ActionProvider: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MessageParser: any;
};
export default useChatbot;
