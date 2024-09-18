import { createChatBotMessage } from '../../react-chatbot-kit/src/components/Chat/chatUtils';
import YesNoButtons from './widgets/YesNoButtons';


const config = {
  initialMessages: [createChatBotMessage(`Hello! How can I help you today?`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#303030",
    },
  },
  widgets: [
    {
      widgetName: "yesNoButtons",
      widgetFunc: (props) => <YesNoButtons {...props} />,
    },
  ],
};

export default config;