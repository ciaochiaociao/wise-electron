import React from 'react';
import { Switch } from '@headlessui/react';

interface ConfigPageProps {
  emotionDetectionEnabled: boolean;
  setEmotionDetectionEnabled: (enabled: boolean) => void;
}

const ConfigPage: React.FC<ConfigPageProps> = ({ emotionDetectionEnabled, setEmotionDetectionEnabled }) => {
  return (
    <div className="mx-auto p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Configuration</h2>
      <div className="flex items-center justify-between">
        <span className="text-lg">Emotion Detection</span>
        <Switch
          checked={emotionDetectionEnabled}
          onChange={setEmotionDetectionEnabled}
          className={`${
            emotionDetectionEnabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable emotion detection</span>
          <span
            className={`${
              emotionDetectionEnabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </div>
  );
};

export default ConfigPage;