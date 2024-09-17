import React from 'react';
import { Switch } from '@headlessui/react';

interface ConfigOption {
  label: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

interface ConfigPageProps {
  options: ConfigOption[];
}

const ConfigSwitch: React.FC<ConfigOption> = ({ label, enabled, setEnabled }) => (
  <div className="flex items-center justify-between">
    <span className="text-lg">{label}</span>
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-16 p-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
    >
      <span
        className={`${
          enabled ? 'translate-x-11' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </Switch>
  </div>
);

const ConfigPage: React.FC<ConfigPageProps> = ({ options }) => {
  return (
    <div className="mx-auto p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Configuration</h2>
      <div className="space-y-4">
        {options.map((option, index) => (
          <ConfigSwitch key={index} {...option} />
        ))}
      </div>
    </div>
  );
};

export default ConfigPage;