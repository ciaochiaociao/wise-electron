import React from 'react';
import { Switch } from '@headlessui/react';

interface ConfigPageProps {
  emotionDetectionEnabled: boolean;
  setEmotionDetectionEnabled: (enabled: boolean) => void;
  keywordAwakeningEnabled: boolean;
  setKeywordAwakeningEnabled: (enabled: boolean) => void;
  focusDetectionEnabled: boolean;
  setFocusDetectionEnabled: (enabled: boolean) => void;
}

const ConfigPage: React.FC<ConfigPageProps> = ({
  emotionDetectionEnabled,
  setEmotionDetectionEnabled,
  keywordAwakeningEnabled,
  setKeywordAwakeningEnabled,
  focusDetectionEnabled,
  setFocusDetectionEnabled
}) => {
  return (
    <div className="mx-auto p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Configuration</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg">Automatic Emotion Boosting</span>
          <Switch
            checked={emotionDetectionEnabled}
            onChange={setEmotionDetectionEnabled}
            className={`${
              emotionDetectionEnabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-0`}
          >
            <span
              className={`${
                emotionDetectionEnabled ? 'translate-x-11' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg">Keyword Awakening</span>
          <Switch
            checked={keywordAwakeningEnabled}
            onChange={setKeywordAwakeningEnabled}
            className={`${
              keywordAwakeningEnabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-16 p-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            <span
              className={`${
                keywordAwakeningEnabled ? 'translate-x-11' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg">Focus Detection (Demo)</span>
          <Switch
            checked={focusDetectionEnabled}
            onChange={setFocusDetectionEnabled}
            className={`${
              focusDetectionEnabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-16 p-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            <span
              className={`${
                focusDetectionEnabled ? 'translate-x-11' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;