import { createChatBotMessage } from '../../react-chatbot-kit/src/components/Chat/chatUtils';

const config = {
  initialMessages: [createChatBotMessage(`Hello! How can I help you today?`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#303030",
    },
  },
};

export default config;