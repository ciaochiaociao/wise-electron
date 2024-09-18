import React from 'react';

interface YesNoButtonsProps {
  actions: {
    handleYesClick: () => void;
    handleNoClick: () => void;
  };
}

const YesNoButtons: React.FC<YesNoButtonsProps> = ({ actions }) => {
  return (
    <div className="yes-no-buttons">
      <button onClick={actions.handleYesClick}>Yes</button>
      <button onClick={actions.handleNoClick}>No</button>
    </div>
  );
};

export default YesNoButtons;