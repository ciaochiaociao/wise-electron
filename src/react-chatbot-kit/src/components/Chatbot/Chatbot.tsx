import React, { useEffect } from 'react';

import Chat from '../Chat/Chat';

import ChatbotError from '../ChatbotError/ChatbotError';

import IConfig from '../../interfaces/IConfig';

import {
  getCustomStyles,
  getCustomComponents,
  getBotName,
  getCustomMessages,
  isConstructor,
} from './utils';

import useChatbot from '../../hooks/useChatbot';
import { IMessage } from '../../interfaces/IMessages';
import { createChatBotMessage } from '../..';

interface IChatbotProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionProvider: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messageParser: any;
  config: IConfig;
  headerText?: string;
  placeholderText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveMessages?: (messages: IMessage[], html: string) => any;
  messageHistory?: IMessage[] | string;
  validator?: (input: string) => boolean;
  runInitialMessagesWithHistory?: boolean;
  disableScrollToBottom?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chatbot?: any;
  emotionDetection?: string;
  setEmotionDetection?: (value: string) => void;
}

const Chatbot = ({
  actionProvider,
  messageParser,
  config,
  headerText,
  placeholderText,
  saveMessages,
  messageHistory,
  runInitialMessagesWithHistory,
  disableScrollToBottom,
  validator,
  chatbot,
  emotionDetection,
  setEmotionDetection,
  ...rest
}: IChatbotProps) => {
  const {
    configurationError,
    invalidPropsError,
    ActionProvider,
    MessageParser,
    widgetRegistry,
    messageContainerRef,
    actionProv,
    messagePars,
    state,
    setState,
  } = useChatbot({
    config,
    actionProvider,
    messageParser,
    messageHistory,
    saveMessages,
    runInitialMessagesWithHistory,
    ...rest,
  });

  if (configurationError) {
    return <ChatbotError message={configurationError} />;
  }

  if (invalidPropsError.length) {
    return <ChatbotError message={invalidPropsError} />;
  }

  const customStyles = getCustomStyles(config);
  const customComponents = getCustomComponents(config);
  const botName = getBotName(config);
  const customMessages = getCustomMessages(config);
  // console.log("emotionDetection ", emotionDetection)

  useEffect(() => {
    const listener = (event) => {
      console.log("keyword detected")
      const botMessageStr = "You call me? what's up?"
      chatbot.addAIMessageToChatHistory(botMessageStr)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setState((prev: any) => ({
        ...prev,
        messages: [
          ...prev.messages,
          createChatBotMessage(botMessageStr, {loading: false})
        ]
      }))
    }
    window.ipcRenderer.on('keyword-detected', listener)
    return () => {
      window.ipcRenderer.off('keyword-detected', listener)
    }
  }, [])

  useEffect(() => {
    if (emotionDetection == "bad") {
      console.log("Bad emotion detected!") // Test emotion detection
      // todo: add emotion detection
      const botMessageStr = "Bad mood detected! Do you want to boost your mood?"
      chatbot.addAIMessageToChatHistory(botMessageStr)
      console.log("Added message to chat history")
      setEmotionDetection("asking")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setState((prev: any) => ({
        ...prev,
        messages: [
          ...prev.messages,
          createChatBotMessage(botMessageStr, null)
        ]
      }))

    }
  }, [emotionDetection])

  if (isConstructor(ActionProvider) && isConstructor(MessageParser)) {
    return (
      <Chat
        state={state}
        setState={setState}
        widgetRegistry={widgetRegistry}
        actionProvider={actionProv}
        messageParser={messagePars}
        customMessages={customMessages}
        customComponents={{ ...customComponents }}
        botName={botName}
        customStyles={{ ...customStyles }}
        headerText={headerText}
        placeholderText={placeholderText}
        validator={validator}
        messageHistory={messageHistory}
        disableScrollToBottom={disableScrollToBottom}
        messageContainerRef={messageContainerRef}
      />
    );
  } else {
    return (
      <ActionProvider
        state={state}
        setState={setState}
        createChatBotMessage={createChatBotMessage}
        emotionDetection={emotionDetection}
        setEmotionDetection={setEmotionDetection}
      >
        <MessageParser 
          setEmotionDetection={setEmotionDetection}
          emotionDetection={emotionDetection}
          >
          <Chat
            state={state}
            setState={setState}
            widgetRegistry={widgetRegistry}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
            customMessages={customMessages}
            customComponents={{ ...customComponents }}
            botName={botName}
            customStyles={{ ...customStyles }}
            headerText={headerText}
            placeholderText={placeholderText}
            validator={validator}
            messageHistory={messageHistory}
            disableScrollToBottom={disableScrollToBottom}
            messageContainerRef={messageContainerRef}
          />
        </MessageParser>
      </ActionProvider>
    );
  }
};

export default Chatbot;
