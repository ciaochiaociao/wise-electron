// Define the return type of createChatBotMessage
interface ChatBotMessage {
  loading: boolean;
  widget?: string;
  delay?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
  message: string;
  type: string;
  id: number;
}

// Declare the config object
declare const config: {
  initialMessages: ChatBotMessage[];
  widgets: {
    widgetName: string;
    widgetFunc: (props: any) => React.ReactNode;
  }[];
  customStyles: {
    botMessageBox: {
      backgroundColor: string;
    };
  };
};

// Export the config object as the default export
export default config;