import React from 'react';

const MessageParser = ({ children, actions, emotionDetection, setEmotionDetection }) => {
  const parse = (message) => {
    
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
      let value = brightnessMatch ? brightnessMatch[1] : null;
      if (value.includes('%')) {
        value = value.replace('%', '');
        value = parseFloat(value) / 100;
      } else {
        value = parseFloat(value);
      }

      console.log("Set the brightness with prompt: " + value);
      actions.handleSetBrightness(message, value);
    } else {
      console.log(message);
      actions.handleGeneralChat(message);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;